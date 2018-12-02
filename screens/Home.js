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
import GridView from 'react-native-super-grid';
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
    this.setState({ questions: questions });
    // const self = this;
    // const projectId = 'mipa-1540168874590';

    // const requestBody = {
    //   "query": {
    //     "kind": [
    //       {
    //         "name": "Question"
    //       }
    //     ],
    //     "filter": {
    //       "propertyFilter": {
    //         "property": {
    //           "name": "challenge"
    //         },
    //         "op": "EQUAL",
    //         "value": {
    //           "integerValue": "1"
    //         }
    //       }
    //     }
    //   }
    // }

    // return await fetch(`https://datastore.googleapis.com/v1/projects/${projectId}:runQuery?access_token=`, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(requestBody)
    // }).then((response) => response.json())
    //   .then((responseJson) => {
    //     let qs = [];

    //     if (responseJson.batch) {
    //       qs = responseJson.batch.entityResults.map((e) => {
    //         let obj = {};
    //         const ps = e.entity.properties;
          
    //         return {
    //           type: ps.type.stringValue,
    //           solution: ps.solution.booleanValue,
    //           category: ps.category.stringValue,
    //           question: ps.question.stringValue,
    //           hint: ps.hint.stringValue,
    //           options: ps.options ? ps.options.arrayValue.values.map((s) => s.stringValue) : null,
    //           questionImage: ps.questionImage ? ps.questionImage.stringValue : null,
    //           challenge: ps.challenge.integerValue
    //         }
    //       })
    //     } else {
    //       qs = questions;
    //     }

           
    //     self.setState({ questions: qs });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
      { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
      { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
      { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
      { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
      { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
    ];

    return (
      <View style={{flex: 1, paddingVertical: 0}}>
        <GridView
          itemDimension={130}
          items={items}
          style={styles.gridView}
          renderItem={item => (
            <TouchableOpacity style={[styles.itemContainer, { backgroundColor: item.code }]}
              onPress={() => {
                console.log('pressed')
                return this.props.navigation.navigate(
                  'Question'
                )}}
              >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

export default withNavigation(App);

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
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
