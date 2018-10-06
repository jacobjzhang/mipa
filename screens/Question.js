'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {
  MKButton,
  MKColor,
  MKIconToggle,  
  getTheme
} from 'react-native-material-kit';

import * as Progress from 'react-native-progress';
import { withNavigation } from 'react-navigation';

import cards from '../content/cards';

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
      cards: cards,
      outOfCards: false,
    }
  }

  handleYup (card) {
    this.props.navigation.navigate("MainCart",{},{
      type: "Navigate",
      routeName: "Checkout",
      params: {name:"Jo"}
    });

    // this.handleAnswer(card, true);

    console.log("correct")
  }

  handleNope (card) {
    this.handleAnswer(card, false);    
    console.log("wrong")
  }

  handleMaybe (card) {
    console.log(`Maybe for ${card.text}`)
  }

  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(cards2),
          outOfCards: true
        })
      }

    }

  }

  render() {
    const currentScore = this.state.score / this.state.cards.length;

    return (
      <View style={{flex: 1,}}>
        <Swipe />
        <Progress.Bar
          style={{position: 'absolute', bottom: 60, left: 25, right: 25,}}
          progress={0.3}
          width={320}
        />
      </View>
    )
  }
}

export default withNavigation(App);