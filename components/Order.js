import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();

class Swipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      userSolution: [],
      orderIdx: 1
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

  addToSolution(answer, idx) {
    let newOptions = this.state.options;
    const newTextWithOrderNum = `${this.state.orderIdx}. ${answer}`;
 
    newOptions[idx] = newTextWithOrderNum;
    this.state.userSolution.push(newTextWithOrderNum);

    this.setState({options: newOptions, orderIdx: this.state.orderIdx+1});

    if (this.state.userSolution.length === this.state.options.length) {
      if (JSON.stringify(this.props.solution) == JSON.stringify(this.state.userSolution)) {
        alert('good!')
        console.log(true)
      } else {
        alert('nope!')
      }
    }
  }

  render() {

    return (
      <View style={theme.cardStyle}>
        <Image source={require('../assets/images/background.png')} style={theme.cardImageStyle} />
        <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
        <Text style={theme.cardActionStyle}>
          Select the below steps in the order they occur for the following concept:
        </Text>            
        <Text style={[theme.cardContentStyle, styles.question]}>
          {this.props.question}
        </Text>
        {this.state.options.map((text, idx) => <Button
          onPress={() => this.addToSolution(text, idx)}
          title={text}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />)}
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
      </View>
    );
  }
}

export default Swipe;

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
