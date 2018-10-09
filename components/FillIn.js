import React from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();

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
      <View style={theme.cardStyle}>
        <Image source={require('../assets/images/background.png')} style={theme.cardImageStyle} />
        <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
        <Text style={theme.cardActionStyle}>
          Fill in the code that would make this algorithm correct:
        </Text>            
        <Text style={[theme.cardContentStyle, styles.question]}>
          {fillInQuestion[0]}
        </Text>
        <TextInput
          style={styles.fillInInput}
          placeholder="// enter missing line here"
          onChangeText={(userSolution) => this.setState({userSolution})}
          autoCapitalize = 'none'
        />
        <Text style={[theme.cardContentStyle, styles.question]}>
          {fillInQuestion[1]}
        </Text>
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
