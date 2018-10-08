import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      userSolution: [],
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

  selectAnswer(originalIdx) {
    if (this.props.solution === originalIdx) {
      alert('good!')
      console.log(true)
    } else {
      alert('nope!')
    }

    this.props.goToNextQuestion();
  }

  render() {
    return (
      <View style={theme.cardStyle}>
        <Image source={require('../assets/images/background.png')} style={theme.cardImageStyle} />
        <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
        <Text style={theme.cardActionStyle}>
          Select the correct multiple choice answer:
        </Text>            
        <Text style={[theme.cardContentStyle, styles.question]}>
          {this.props.question}
        </Text>
        {this.state.options.map((text, originalIdx) => <Button
          onPress={() => this.selectAnswer(originalIdx)}
          title={text}
          color="#841584"
          key={originalIdx}
        />)}
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
      </View>
    );
  }
}

export default MultipleChoice;

const styles = StyleSheet.create({
  cardContainer: {
    height: 600
  },
  question: {
    width: null,
    height: null,
    fontSize: 16,
  },
  cardImageStyle: {
    alignSelf: 'stretch'
  }
})
