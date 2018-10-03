'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import cards from '../content/cards';
import SwipeCards from 'react-native-swipe-cards';
import CardFlip from 'react-native-card-flip';

import {
  MKButton,
  MKColor,
  MKIconToggle,  
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();

class Card extends React.Component {
  constructor(props) {
    super(props);
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

function alertResult(question, givenSolution) {
  if (question.solution === givenSolution) {
    alert("Correct!")
  } else {
    alert("Incorrect!")
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false
    }
  }

  handleYup (card) {
    alertResult(card, true);
    console.log("correct")
  }

  handleNope (card) {
    alertResult(card, false);    
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
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        maybeViewText={"Need a hint"}

        showYup={true}
        showNope={true}
        hasMaybeAction

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}        
        cardRemoved={this.cardRemoved.bind(this)}
      />
    )
  }
}

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
