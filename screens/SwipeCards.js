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
              <Image source={require('../assets/images/welcome_card.jpg')} style={theme.cardImageStyle} />
              <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
              <Text style={[theme.cardContentStyle, styles.question]}>
                {this.props.question}
              </Text>
              <Text style={theme.cardActionStyle}>
                Swipe right if correct, swipe left if wrong.{"\n"}
                Tap on this card to get hints.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={theme.cardContainer} onPress={() => this.card.flip()} >
              <Image source={require('../assets/images/welcome_card.jpg')} style={theme.cardImageStyle} />
              <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
              <Text style={[theme.cardContentStyle, styles.question]}>
                {this.props.hint}
              </Text>
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

const cards = [
  {
    question: 'The worst case time complexity for search, insert and delete operations in a general Binary Search Tree is O(n).',
    solution: true,
    hint: "Binary search tree (BST):\nA binary tree that uses comparable keys to assign which direction a child is.\n\n- Left child has a key smaller than it's parent node.\n- Right child has a key greater than it's parent node.\n- There can be no duplicate node.\n- Because of the above it is more likely to be used as a data structure than a binary tree.\n\nAverage case Big-O:\nIndexing: O(log n)\nSearch: O(log n)\nInsertion O(log n)",
    category: 'Trees',
    image: 'https://media.giphy.com/media/GfXFVHUzjlbOg/giphy.gif'
  },
  {
    question: 'The following is a correct example of the Inorder Traversal of a tree:\n\nInorder(tree) \n\n1. Traverse the left subtree, i.e., call Inorder(left-subtree) \n\n2. Visit the root. \n\n3. Traverse the right subtree, i.e., call Inorder(right-subtree)',
    solution: true,
    hint: "Depth First Traversals:\n(a) Inorder (Left, Root, Right)\n(b) Preorder (Root, Left, Right)\n(c) Postorder (Left, Right, Root)",
    category: 'Trees',
    image: 'https://media.giphy.com/media/irTuv1L1T34TC/giphy.gif'
  },
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
    console.log("yup")
  }

  handleNope (card) {
    alertResult(card, false);    
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
    fontSize: 18,
  },
})
