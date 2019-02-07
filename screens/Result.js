"use strict";

import React from "react";
import {
  Text,
  View,
  ScrollView
} from "react-native";
import { withNavigation } from "react-navigation";
import { Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import Database from "../models/Database";
import Colors from "../constants/Colors";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import Markdown from "react-native-simple-markdown";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: [
        {
          id: 1,
          name: "Loading",
          category: "Loading",
          difficulty: 1,
          parentCategory: "arrays"
        }
      ]
    };
  }

  async componentDidMount() {
    this.db = new Database();
  }

  render() {
    const challenges = this.state.challenges || [];

    challenges.forEach(chal => {
      const colorId = Math.floor(
        Math.random() * (Colors[chal.parentCategory].length - 1)
      );
      chal["code"] = Colors[chal.parentCategory][colorId];
    });

    const newScore = this.props.navigation.getParam("latestScore", 100);
    const user = this.props.navigation.getParam("user");
    const challenge = this.props.navigation.getParam("challenge");
    // const challengeId = challenge.id;

    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: "white" }}>
        {/* {user && <NavigationEvents onDidFocus={() => this.db.addCompletion(user, challengeId, newScore)} />} */}
        <View
          style={{
            height: 100,
            marginTop: 0,
            paddingTop: 50,
            paddingLeft: 20
          }}
        >
          <Text style={{ color: "black", fontSize: 35, fontFamily: "Arial" }}>
            # MIPA
          </Text>
        </View>
        {user && <Text style={{ marginBottom: 10, fontSize: 20, padding: 10 }}>
          Well done! You scored {this.props.navigation.getParam("latestScore", 100)}{" "}
          points for this challenge!
        </Text>}
        <ScrollView style={{ marginBottom: 10, padding: 20 }}>
          <Markdown
            rules={{
              codeBlock: {
                react: (node, output, state) => {
                  return (
                    <SyntaxHighlighter
                      key={node.content.substr(0, 30)}
                      language="js"
                      fontSize={13}
                      highlighter={"prism" || "hljs"}
                      customStyle={{ marginVertical: 20 }}
                    >{node.content}
                    </SyntaxHighlighter>
                  )
                }
              },
            }}
            styles={markdownStyles}
          // styles={{text: {fontSize: 16}}}
          >
            {challenge.solution}
          </Markdown>
        </ScrollView>
        <Text style={{ marginBottom: 10, fontSize: 20, padding: 10 }}>
          Here are some related challenges:
          </Text>
        <Button
          icon={{ name: "home" }}
          backgroundColor="#03A9F4"
          onPress={() => {
            return this.props.navigation.navigate("Home");
          }}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="GO HOME"
        />
      </View>
    );
  }
}

const markdownStyles = {
  heading1: {
    fontSize: 29,
    color: 'purple',
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  text: {
    fontSize: 17,
    color: '#555555',
  },
}

export default withNavigation(App);
