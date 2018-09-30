'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import CardFlip from 'react-native-card-flip';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
        <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
          <Image style={styles.thumbnail} source={{uri: this.props.image}} />
          <Text style={styles.question}>{this.props.question}</Text>
          <Text style={styles.category}>Category: {this.props.category}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
          <Text style={styles.question}>CD</Text>
        </TouchableOpacity>
      </CardFlip>
    )
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

const cards = [
  {
    question: 'The worst case time complexity for search, insert and delete operations in a general Binary Search Tree is O(n).',
    solution: true,
    category: 'Trees',
    image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'
  },
  {question: '2', image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'},
  {question: '3', image: 'https://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
  {question: '4', image: 'https://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
  {question: '5', image: 'https://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
  {question: '6', image: 'https://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
  {question: '7', image: 'https://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
  {question: '8', image: 'https://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
  {question: '9', image: 'https://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
]

const cards2 = [
  {question: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {question: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {question: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {question: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

function alertResult() {
  alert("Correct or incorrect")
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
    alertResult();
    console.log("yup")
  }

  handleNope (card) {
    alertResult();    
    console.log("nope")
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
  cardContainer:{
    flex: 1,
  },
  card:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 200,
  },
  card1: {
    backgroundColor: '#FE474C',
  },
  card2: {
    backgroundColor: '#FEB12C',
  },
  question: {
    width: 300,
    height: 300,
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000000'
  },
  category: {
    width: 150,
    height: 150,
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000000'
  },  
  thumbnail: {
    width: 100,
    height: 100,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
