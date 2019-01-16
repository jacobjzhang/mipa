import React from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

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
    if (this.state.userSolution.toLowerCase() === "inorder(node.right);") {
      this.props.showResult("Correct!");
      this.props.incrementScore();      
    } else {
      this.props.showResult("Incorrect!");
      this.props.decrementScore();      
    }
  }

  render() {
    const fillInQuestion = this.props.question.split('_______________');

    return (
      <View>
        <Text>
          Fill in the code that would make this algorithm correct:
        </Text>            
        <Card>
          <Text>
            {fillInQuestion[0]}
          </Text>
          <TextInput
            style={styles.fillInInput}
            placeholder="// enter missing line here"
            onChangeText={(userSolution) => this.setState({userSolution})}
            autoCapitalize = 'none'
          />
          <Text>
            {fillInQuestion[1]}
          </Text>
        </Card>
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
        <Button title="Check Answer" onPress={() => this.checkAnswer()} />
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
    marginHorizontal: 40,
    paddingVertical: 0,
    margin: 0,
    borderBottomWidth: 1
  },
  cardImageStyle: {
    alignSelf: 'stretch'
  }
})
