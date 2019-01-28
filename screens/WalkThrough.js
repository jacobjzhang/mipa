"use strict";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform
} from "react-native";
import { withNavigation } from "react-navigation";
import { Card, Button } from "react-native-elements";
import Markdown from 'react-native-simple-markdown';

import Database from "../models/Database";
import Colors from "../constants/Colors";
import SyntaxHighlighter from "react-native-syntax-highlighter";

class WalkThrough extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: 'Currently waiting for the walkthrough to load, please be patient.',
      solution: 'Here is a sample solution.',
      contentView: true,
    };

    this.toggleContent = this.toggleContent.bind(this);
  }

  async componentDidMount() {
    const question = this.props.navigation.getParam("walkthrough", {});
    // const filePath = `../content/${question.fileName}}`;

    // let file = Expo.Asset.fromModule(require('../content/flood-bucket-fill.md'));
    // await file.downloadAsync() // Optional, saves file into cache
    let content = ""
    await fetch(`https://storage.googleapis.com/mipa-backend/static/graphs/${question.fileName}.md`)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('bad response')
        }
        return response.text();
      }).then(function(resp) {
        content = resp;
        console.log(resp)
      }).catch(function(error) {
        console.log('bad response')
      });

      let solution = ""
      await fetch(`https://storage.googleapis.com/mipa-backend/static/graphs/${question.fileName}-solution.md`)
        .then(function(response) {
          if (!response.ok) {
            throw new Error('bad response')
          }
          return response.text();
        }).then(function(resp) {
          solution = resp;
          console.log(resp)
        }).catch(function(error) {
          console.log('bad response')
        });      

    await this.setState({content: content, solution: solution});
  }

  toggleContent() {
    this.setState({ contentView: !this.state.contentView })
  }

  render() {
    const content = this.state.content;
    const solution = this.state.solution;

    console.log(content, '000')
    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: "white" }}>
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
        <ScrollView style={{ marginBottom: 20, padding: 20, minHeight: 300 }}>
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
            {this.state.contentView ? content : solution}
          </Markdown>
        </ScrollView>
        <Button
          icon={{ name: "home" }}
          backgroundColor="#03A9F4"
          onPress={() => {
            return this.toggleContent();
          }}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title={this.state.contentView ? "VIEW SOLUTION": "VIEW QUESTION"}
        />
      </View>
    );
  }
}

export default withNavigation(WalkThrough);
