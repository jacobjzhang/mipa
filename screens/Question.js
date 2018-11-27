'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import {
  getTheme,
  MKButton,
  MKTouchable
} from 'react-native-material-kit';
import * as Progress from 'react-native-progress';
import { withNavigation } from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import CardFlip from 'react-native-card-flip';

import questions from '../content/questions';
import Swipe from '../components/Swipe';
import Order from '../components/Order';
import FillIn from '../components/FillIn';
import MultipleChoice from '../components/MultipleChoice';
import ResultModal from '../components/ResultModal';

const theme = getTheme();

class App extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);

    this.state = {
      questions: questions,
      answer: '',
      score: 0,
      currentCardIdx: 0,
      currentCard: questions[0],
      modalVisible: false,
      answeredAlready: false,
      currentResult: ''
    }

    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.showResult = this.showResult.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.decrementScore = this.decrementScore.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const self = this;
    const projectId = 'mipa-1540168874590';

    const requestBody = {
      "query": {
        "kind": [
          {
            "name": "Question"
          }
        ],
        "filter": {
          "propertyFilter": {
            "property": {
              "name": "challenge"
            },
            "op": "EQUAL",
            "value": {
              "integerValue": "1"
            }
          }
        }
      }
    }

    return await fetch(`https://datastore.googleapis.com/v1/projects/${projectId}:runQuery?access_token=`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        const qs = responseJson.batch.entityResults.map((e) => {
          let obj = {};
          const ps = e.entity.properties;
        
          return {
            type: ps.type.stringValue,
            solution: ps.solution.booleanValue,
            category: ps.category.stringValue,
            question: ps.question.stringValue,
            hint: ps.hint.stringValue,
            options: ps.options ? ps.options.arrayValue.values.map((s) => s.stringValue) : null,
            questionImage: ps.questionImage ? ps.questionImage.stringValue : null,
            challenge: ps.challenge.integerValue
          }
        })
           
        self.setState({ questions: qs });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  goToNextQuestion() {
    let currIdx = this.state.currentCardIdx;
    console.log('-----STATE------')
    console.log(this.state.questions)
    if (this.state.questions[currIdx+1]) {
      this.setState({currentCardIdx: currIdx+1, currentCard: this.state.questions[currIdx+1], answeredAlready: false});
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  incrementScore() {
    this.setState({score: this.state.score+100})
  }
  
  decrementScore() {
    this.setState({score: this.state.score-100})
  }

  showResult(currentResult) {
    this.setState({answeredAlready: true, currentResult: currentResult, modalVisible: true});
  }
  
  handleAnswer(question, givenSolution) {
    console.log(question.solution, givenSolution)
    if (question.solution === givenSolution) {
      this.showResult("Correct!")
      this.incrementScore();
    } else {
      this.showResult("Incorrect!")
      this.decrementScore();
    }
  }  

  checkAnswer(gestureName) {
    let answer;

    if (gestureName == 'SWIPE_LEFT') {
      answer = false;
    } else if (gestureName == 'SWIPE_RIGHT') {
      answer = true;
    } else {
      return;
    }

    this.handleAnswer(this.state.currentCard, answer);
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const currentScore = this.state.currentCardIdx / this.state.questions.length;
    const currentCard = this.state.currentCard;
    console.log('---currentCard---:', this.state.currentCard)

    let content;
    switch(currentCard.type) {
      case 'swipe':
        content = <Swipe {...currentCard} showResult={this.showResult} incrementScore={this.incrementScore} decrementScore={this.decrementScore} />
        break;
      case 'multiple choice':
        content = <MultipleChoice {...currentCard} showResult={this.showResult} incrementScore={this.incrementScore} decrementScore={this.decrementScore} />
        break;
      case 'order':
        content = <Order {...currentCard} showResult={this.showResult} incrementScore={this.incrementScore} decrementScore={this.decrementScore} />
        break;
      case 'fill in':
        content = <FillIn {...currentCard} showResult={this.showResult} incrementScore={this.incrementScore} decrementScore={this.decrementScore} />
        break;        
    }

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
              {content}
              <Text style={theme.cardActionStyle}>
                Tap on this card to get hints.
              </Text>
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
          <View style={{position: 'absolute', bottom: 60, left: 25, right: 25,}} >
            <Progress.Bar
              progress={currentScore}
              width={320}
            />
          </View>
        </GestureRecognizer>
        <ResultModal currentResult={this.state.currentResult}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          goToNextQuestion={this.goToNextQuestion}
          score={this.state.score} />
      </View>
    )
  }
}

export default withNavigation(App);

const styles = StyleSheet.create({
  cardContainer: {
    height: 600,
    borderWidth: 0
  },
  question: {
    width: null,
    height: null,
    fontSize: 16,
  },
  cardImageStyle: {
    alignSelf: 'stretch'
  },
  continueButton: {
    position: 'absolute',
    left: 25,
    right: 25,
    bottom: 200,
    zIndex: 10
  }
})
