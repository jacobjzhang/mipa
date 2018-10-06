'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  MKButton,
  MKColor,
  MKIconToggle,  
  getTheme
} from 'react-native-material-kit';
import * as Progress from 'react-native-progress';
import { withNavigation } from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import CardFlip from 'react-native-card-flip';

import questions from '../content/questions';
import Swipe from '../components/Swipe'

const theme = getTheme();

let COUNT = 0;

function incrementScore() {
  this.setState({score: this.state.score++})
}

function decrementScore() {
  this.setState({score: this.state.score--})
}

function handleAnswer(question, givenSolution) {
  if (question.solution === givenSolution) {
    alert("Correct!")
    this.incrementScore();
  } else {
    alert("Incorrect!")
    this.decrementScore();
  }
}

class App extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      questions: questions,
      answer: '',
      currentCard: questions[0],
    }
  }

  checkAnswer(gestureName) {
    let answer;
    if (gestureName == SWIPE_LEFT) {
      answer = false;
    } else if (gestureName == SWIPE_RIGHT) {
      answer = true;
    }

    this.props.navigation.navigate("MainCart",{},{
      type: "Navigate",
      routeName: "Checkout",
      params: {name:"Jo"}
    });
  }

  onSwipeUp(gestureState) {
    this.setState({mySelection: 'You swiped up!'});
  }

  onSwipeDown(gestureState) {
    this.setState({mySelection: 'You swiped down!'});
  }

  onSwipeLeft(gestureState) {
    this.setState({mySelection: 'You swiped left!'});
  }

  onSwipeRight(gestureState) {
    this.setState({mySelection: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    if (this.state.currentCard.type == 'swipe') {
      const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
      this.checkAnswer(gestureName);
      switch (gestureName) {
        case SWIPE_UP:
          this.setState({answer: 'up'});
          break;
        case SWIPE_DOWN:
          this.setState({answer: 'down'});
          break;
        case SWIPE_LEFT:
          this.setState({answer: 'FALSE'});
          break;
        case SWIPE_RIGHT:
          this.setState({answer: 'TRUE'});
          break;
      }
    }

  }  

  render() {
    const currentScore = this.state.score / this.state.questions.length;
    const currentCard = this.state.questions[0];
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <View style={{flex: 1, paddingVertical: 0}}>
        <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeUp={(state) => this.onSwipeUp(state)}
          onSwipeDown={(state) => this.onSwipeDown(state)}
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: this.state.backgroundColor
          }}>
          <CardFlip ref={(card) => this.card = card} >
            <TouchableOpacity style={styles.cardContainer} onPress={() => this.card.flip()} >
              <Swipe {...currentCard} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardContainer} onPress={() => this.card.flip()} >
              <View style={theme.cardStyle}>
                <Image source={require('../assets/images/background.png')} style={theme.cardImageStyle} />
                <Text style={theme.cardTitleStyle}>Hint</Text>
                <Text style={[theme.cardContentStyle, styles.question]}>
                  {currentCard.hint}
                </Text>
                {currentCard.hintImage && <Image source={{uri : currentCard.hintImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}              
                <Text style={theme.cardActionStyle}>
                  Tap on this card to go back to the question
                </Text>
              </View>
            </TouchableOpacity>   
          </CardFlip>
          <Progress.Bar
            style={{position: 'absolute', bottom: 60, left: 25, right: 25,}}
            progress={0.3}
            width={320}
          />
          <Text style={styles.selection}>{this.state.answer}</Text>
        </GestureRecognizer>
      </View>
    )
  }
}

export default withNavigation(App);

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
  },
  selection: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 100
  }
})
