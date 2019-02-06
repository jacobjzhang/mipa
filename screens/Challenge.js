"use strict";

import React from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";

import Database from "../models/Database";
import ScoreCalculator from "../models/ScoreCalculator";
import ChallengeHeader from "../components/ChallengeHeader";
import Markdown from "react-native-simple-markdown";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { Button } from "react-native-elements";

class Challenge extends React.Component {
  constructor(props) {
    super(props);

    const hints = [
      {
        type: "swipe", // needed to decide what view
        question: "Question A",
        solution: true,
        code: ""
      }
    ];

    this.state = {
      challenge: {
        question: '',
        solution: '',
        solutionCode: '',
      },
      hints: hints,
      resultModalVisible: false,
      answeredAlready: false,
      currentResult: { correct: false, message: ''}
    };

    this.ScoreCalculator = new ScoreCalculator();
    this.fetchChallenge = this.fetchChallenge.bind(this);
  }

  componentDidMount() {
    this.fetchChallenge();
  }

  async fetchChallenge() {
    const slug = this.props.navigation.getParam("challenge", {}).slug;
    const db = new Database();
    const challenge = await db.getChallenge(slug);

    this.setState({
      challenge: challenge
    });
  }

  render() {
    let question = this.state.challenge.question;

    return (
      <View style={{ flex: 1, paddingVertical: 0, backgroundColor: "#fff" }}>
        <ChallengeHeader navigation={this.props.navigation} progressScore={0.1}/>
        <View style={{marginBottom: 20, paddingHorizontal: 20}}>
          <Markdown
            rules={{
              codeBlock: {
                react: (node, output, state) => {
                  return (
                    <SyntaxHighlighter
                      key={node.content.substr(0,30)}
                      language="js"
                      fontSize={13}
                      highlighter={"prism" || "hljs"}
                      customStyle={{marginVertical: 20}}
                    >{node.content}
                    </SyntaxHighlighter>
                  )
                }
              },
            }}
            styles={{text: {fontSize: 16}}}
          >
            {question}
          </Markdown>
          <Button
            icon={{ name: "play-arrow" }}
            backgroundColor="#03A9F4"
            onPress={() => {
              return this.props.navigation.navigate("Question", {
                challenge: this.state.challenge,
              });
            }}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 20,
              marginTop: 20
            }}
            title="Start challenge"
          />
          <Button
            icon={{ name: "forward-30" }}
            backgroundColor="#03A9F4"
            onPress={() => {
              return this.props.navigation.navigate("Result", {
                user: false,
                challenge: this.props.challenge
              });
            }}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="View solution"
          />
        </View>        
      </View>
    );
  }
}

export default withNavigation(Challenge);
