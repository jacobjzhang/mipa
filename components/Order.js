import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();

class Order extends React.Component {
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

  checkAnswer(actualSolution, userSolution) {
    if (JSON.stringify(actualSolution) == JSON.stringify(userSolution)) {
      alert('good!')
      console.log(true)
    } else {
      alert('nope!')
    }

    this.props.goToNextQuestion();
  }

  updateOrderView(newOptions, originalIdx, newTextWithOrderNum) {
    newOptions[originalIdx] = newTextWithOrderNum;
    this.setState({options: newOptions, orderIdx: this.state.orderIdx+1});
  }

  updateViewAndUpdateSolution(answer, originalIdx) {
    if (/\d/.test(answer)) {
      return;
    }

    let newOptions = this.state.options;
    const newTextWithOrderNum = `${this.state.orderIdx}. ${answer}`;

    this.updateOrderView(newOptions, originalIdx, newTextWithOrderNum);

    this.state.userSolution.push(newTextWithOrderNum);

    if (this.state.userSolution.length === this.state.options.length) {
      this.checkAnswer(this.props.solution, this.state.userSolution);
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
        {this.state.options.map((text, originalIdx) => <Button
          onPress={() => this.updateViewAndUpdateSolution(text, originalIdx)}
          title={text}
          color="#841584"
          key={originalIdx}
          accessibilityLabel="Learn more about this purple button"
        />)}
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
      </View>
    );
  }
}

export default Order;

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
