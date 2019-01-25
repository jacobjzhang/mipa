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
      markdown: 'Currently waiting for the walkthrough to load, please be patient.',
      solution: ''
    };
  }

  async componentDidMount() {
    const question = this.props.navigation.getParam("walkthrough", {});
    // const filePath = `../content/${question.fileName}}`;

    // let file = Expo.Asset.fromModule(require('../content/flood-bucket-fill.md'));
    // await file.downloadAsync() // Optional, saves file into cache
    let content = ""
    await fetch('http://127.0.0.1:5000/content/graphs/_flood-bucket-fill.md')
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
        user = JSON.stringify(defaultUser);
      });

      let solution = ""
      await fetch('http://127.0.0.1:5000/content/graphs/_flood-bucket-fill-solution.md')
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
          user = JSON.stringify(defaultUser);
        });      

    await this.setState({markdown: content, solution: solution});
  }

  render() {
    const content = this.state.markdown;
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
        <View
          style={{
            marginTop: 0,
            padding: 20,
            minHeight: 300
          }}
        >
          <ScrollView style={{ marginBottom: 20 }}>
            <Markdown
              rules={{
                codeBlock: {
                  react: (node, output, state) => {
                    console.log(node.content, '---')
                    return (
                      <SyntaxHighlighter
                        language="js"
                        fontSize={13}
                        highlighter={"prism" || "hljs"}
                      >{node.content}
                      </SyntaxHighlighter>
                    )
                  }
                },
              }}
              styles={{text: {fontSize: 18}}}
            >
              {content}
              {solution}
            </Markdown>
          </ScrollView>
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
      </View>
    );
  }
}

export default withNavigation(WalkThrough);
