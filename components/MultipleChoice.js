import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Markdown from "react-native-simple-markdown";
import GridView from "react-native-super-grid";
import SyntaxHighlighter from "react-native-syntax-highlighter";

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userSolution: []
    };
  }

  componentWillMount() {
    this.props = {
      ...this.props,
      ...this.getNavigationParams
    };
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  selectAnswer(originalIdx) {
    if (this.props.solution === originalIdx) {
      this.props.showResult({ correct: true, message: "Great selection!" });
      this.props.changeScore(true);      
    } else {
      this.props.showResult({
        correct: false,
        message: `The answer was choice #${this.props.solution + 1}.`
      });
      this.props.changeScore(false);
    }
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={{ paddingHorizontal: 10 }}>
          <Markdown>
            #### Press the correct multiple choice answer. {this.props.question}
          </Markdown>
        </View>
        <View style={{ marginBottom: 10 }}>
          {this.props.code ? (
            <SyntaxHighlighter
              language="python"
              fontSize={13}
              highlighter={"prism" || "hljs"}
            >
              {this.props.code}
            </SyntaxHighlighter>
          ) : null}
        </View>
        <GridView
          itemDimension={130}
          items={this.props.options}
          style={styles.gridView}
          renderItem={(item, idx) => (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                { backgroundColor: Colors.multipleChoice[idx] }
              ]}
              onPress={() => this.selectAnswer(idx)}
            >
              <Text style={styles.itemName}>{`${idx + 1}. ${item}`}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default MultipleChoice;

const styles = StyleSheet.create({
  cardContainer: {
    height: 600
  },
  gridView: {
    paddingTop: 25,
    flex: 1
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 8,
    height: 150,
    padding: 8
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    textAlign: 'center'    
  },
  itemCategory: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
