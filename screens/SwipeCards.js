'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import CardFlip from 'react-native-card-flip';

import {
  MKButton,
  MKColor,
  MKIconToggle,  
  getTheme
} from 'react-native-material-kit';

import * as Progress from 'react-native-progress';
import { withNavigation } from 'react-navigation';

import cards from '../content/cards';

const theme = getTheme();

class Card extends React.Component {
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

  render() {
    var action = (<Text> My action</Text>);
      
    return (
        <View style={theme.cardStyle}>
          <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
            <TouchableOpacity style={styles.cardContainer} onPress={() => this.card.flip()} >
              <Image source={require('../assets/images/welcome_card.jpg')} style={[theme.cardImageStyle, {width: 340}]} />
              <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
              <Text style={[theme.cardContentStyle, styles.question]}>
                Question:{"\n\n"}
                {this.props.question}
              </Text>
              {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
              <Text style={theme.cardActionStyle}>
                Swipe right if correct, swipe left if wrong.{"\n"}
                Tap on this card to get hints.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={theme.cardContainer} onPress={() => this.card.flip()} >
              <Image source={require('../assets/images/welcome_card.jpg')} style={theme.cardImageStyle} />
              <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
              <Text style={[theme.cardContentStyle, styles.question]}>
                Hint:{"\n\n"}
                {this.props.hint}
              </Text>
              {this.props.hintImage && <Image source={{uri : this.props.hintImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}              
              <Text style={theme.cardActionStyle}>
                Tap on this card to go back to the question
              </Text>
            </TouchableOpacity>     
          </CardFlip>
        </View>
    );
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more questions!</Text>
      </View>
    )
  }
}

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
        <SwipeCards
          cards={this.state.cards}
          loop={false}

          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}

          maybeViewText={"Need a hint"}

          showYup={true}
          showNope={true}
          hasMaybeAction

          handleYup={this.handleYup.bind(this)}
          handleNope={this.handleNope}
          handleMaybe={this.handleMaybe}        
          cardRemoved={this.cardRemoved.bind(this)}
        />
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

const styles = StyleSheet.create({
  cardContainer: {
    width: 340,
    height: 680,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 150,
  },
  question: {
    fontSize: 16,
  },
})
