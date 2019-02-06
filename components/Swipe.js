import React from 'react';
import { Text, View, Image } from 'react-native';
import Markdown from 'react-native-simple-markdown';
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";

class Swipe extends React.Component {
  constructor(props) {
    super(props);
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

  handleAnswer(questionSoluton, userSolution) {
    console.log(questionSoluton, userSolution)
    if (questionSoluton === userSolution) {
      this.props.showResult({ correct: true, message: 'Nice job, it is true.' });
      this.props.changeScore(true);
    } else {
      this.props.showResult({ correct: false, message: 'The statement was false.' });
      this.props.changeScore(false);
    }
  }

  checkAnswer(gestureName) {
    let answer;

    if (gestureName == "SWIPE_LEFT") {
      answer = false;
    } else if (gestureName == "SWIPE_RIGHT") {
      answer = true;
    } else {
      return;
    }

    this.handleAnswer(this.props.solution, answer);
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.checkAnswer(direction, state)}
        config={config}
      >
        <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
          <Markdown>
            ### Swipe RIGHT if the below statement is correct, swipe LEFT if false.
          </Markdown>
        </View>
        <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
          {this.props.question.split('\n').map((line, idx) => (
            <Markdown key={idx}>
              ## {line}
            </Markdown>
          ))}
        </View>
        {this.props.code && <Text style={{ fontFamily: 'Courier', padding: 20 }} >
          {this.props.code}
        </Text>}
        {this.props.questionImage && <Image source={{ uri: this.props.questionImage }} style={{ width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center' }} />}
      </GestureRecognizer>
    );
  }
}

export default Swipe;