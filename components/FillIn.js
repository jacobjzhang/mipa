import React from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import SyntaxHighlighter from 'react-native-syntax-highlighter';

class FillIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      userSolution: '',
    }
  }

  componentWillMount() {
    this.props = {
      ...this.props,
      ...this.getNavigationParams
    }
  }  

  getNavigationParams() {
    return this.props.navigation.state.params || {}
  }

  checkAnswer() {
    if (this.state.userSolution.toLowerCase() === this.props.solution.toLowerCase()) {
      this.props.showResult({ correct: true, message: 'Amazing answer, you\'re right!' });
      this.props.changeScore(true);
    } else {
      this.props.showResult({ correct: false, message: this.props.solution });
      this.props.changeScore(false);
    }
  }

  render() {
    const match = /(\s+)_{2}_+/g.exec(this.props.code);
    const divider = match[0];
    const spaceLen = match[1].length + 40;
    const fillInQuestion = this.props.code.split(divider);

    return (
      <View>
        <Text>
          Fill in the code that would make this algorithm correct. {this.props.question}
        </Text>
        <SyntaxHighlighter 
          language='python' 
          highlighter={"prism" || "hljs"}
          fontSize={13}          
          customStyle={{paddingBottom: 0, marginBottom: 0}}
        >
          {fillInQuestion[0]}
        </SyntaxHighlighter>
        <View style={{backgroundColor: '#F0F0F0', marginHorizontal: 8, padding: 0, marginVertical: 0}}>
          <TextInput
              style={[styles.fillInInput, { marginLeft: spaceLen, width: 200, marginHorizontal: 0, paddingHorizontal: 0 }]}
              placeholder="# enter missing line here"
              onChangeText={(userSolution) => this.setState({userSolution})}
              autoCapitalize='none'
            />
        </View>
        <SyntaxHighlighter 
          language='python' 
          highlighter={"prism" || "hljs"}
          fontSize={13}
          customStyle={{paddingTop: 0, marginTop: 0}}          
        >
          {fillInQuestion[1]}
        </SyntaxHighlighter>
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
        <Button
          title="Check Answer"
          onPress={() => this.checkAnswer()}
          backgroundColor='#8BC24A'
        />
      </View>
    );
  }
}

export default FillIn;

const styles = StyleSheet.create({
  cardContainer: {
    height: 600
  },
  question: {
    width: null,
    height: null,
    fontSize: 16,
    paddingVertical: 0,
    margin: 0,
    lineHeight: null
  },
  fillInInput: {
    height: 20,
    paddingVertical: 0,
    padding: 0,
    margin: 0,
    borderBottomWidth: 1
  },
  cardImageStyle: {
    alignSelf: 'stretch'
  }
})
