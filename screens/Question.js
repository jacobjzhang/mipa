"use strict";

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { getTheme } from "react-native-material-kit";
import * as Progress from "react-native-progress";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import CardFlip from "react-native-card-flip";
import { Icon, Header } from 'react-native-elements';
import Markdown from 'react-native-simple-markdown'
import { Card } from 'react-native-elements';

import Swipe from "../components/Swipe";
import Order from "../components/Order";
import FillIn from "../components/FillIn";
import MultipleChoice from "../components/MultipleChoice";
import ResultModal from "../components/ResultModal";

import Database from "../models/Database";
import datastore from "../models/datastore";

const theme = getTheme();

class Question extends React.Component {
  constructor(props) {
    super(props);

    const questions = [
      {
        challenge: 1,
        type: "swipe", // needed to decide what view
        question: "Question A",
        solution: true,
        hint: "Hint A",
        category: "Category A",
        questionImage: "http://example.com/"
      }
    ];

    this.state = {
      questions: questions,
      answer: "",
      lastScore: 0,
      score: 0,
      currentCardIdx: 0,
      currentCard: questions[0],
      modalVisible: false,
      answeredAlready: false,
      currentResult: ""
    };

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
    const challengeId = this.props.navigation.getParam("challengeId", 1);

    const db = new Database();

    const challengeQuestions = await db.getQuestions(challengeId);
    this.setState({
      questions: challengeQuestions,
      currentCard: challengeQuestions[0]
    });
  }

  goToNextQuestion() {
    let currIdx = this.state.currentCardIdx;

    if (this.state.questions[currIdx + 1]) {
      console.log(currIdx, this.state.questions[currIdx + 1], '------QUESTIONS', this.state.questions);
      this.setState({
        currentCardIdx: currIdx + 1,
        currentCard: this.state.questions[currIdx + 1],
        answeredAlready: false
      });
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  incrementScore() {
    this.setState({ lastScore: this.state.score, score: this.state.score + 100 });
  }

  decrementScore() {
    this.setState({ lastScore: this.state.score, score: this.state.score - 100 });
  }

  showResult(currentResult) {
    this.setState({
      answeredAlready: true,
      currentResult: currentResult,
      modalVisible: true
    });
  }

  handleAnswer(question, givenSolution) {
    if (question.solution === givenSolution) {
      this.showResult("Correct!");
      this.incrementScore();
    } else {
      this.showResult("Incorrect!");
      this.decrementScore();
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

    this.handleAnswer(this.state.currentCard, answer);
  }

  onSwipeUp(gestureState) {
    this.setState({ mySelection: "You swiped up!" });
  }

  onSwipeDown(gestureState) {
    this.setState({ mySelection: "You swiped down!" });
  }

  onSwipeLeft(gestureState) {
    this.setState({ mySelection: "You swiped left!" });
  }

  onSwipeRight(gestureState) {
    this.setState({ mySelection: "You swiped right!" });
  }

  onSwipe(gestureName, gestureState) {
    if (this.state.currentCard.type == "swipe") {
      const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
      this.checkAnswer(gestureName);
      switch (gestureName) {
        case SWIPE_UP:
          this.setState({ answer: "up" });
          break;
        case SWIPE_DOWN:
          this.setState({ answer: "down" });
          break;
        case SWIPE_LEFT:
          this.setState({ answer: "FALSE" });
          break;
        case SWIPE_RIGHT:
          this.setState({ answer: "TRUE" });
          break;
      }
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const currentScore =
      this.state.currentCardIdx / this.state.questions.length;
    const currentCard = this.state.currentCard;

    let content;
    switch (currentCard.type) {
      case "swipe":
        content = (
          <Swipe
            {...currentCard}
            showResult={this.showResult}
            incrementScore={this.incrementScore}
            decrementScore={this.decrementScore}
          />
        );
        break;
      case "multiple choice":
        content = (
          <MultipleChoice
            {...currentCard}
            showResult={this.showResult}
            incrementScore={this.incrementScore}
            decrementScore={this.decrementScore}
          />
        );
        break;
      case "order":
        content = (
          <Order
            {...currentCard}
            showResult={this.showResult}
            incrementScore={this.incrementScore}
            decrementScore={this.decrementScore}
          />
        );
        break;
      case "fill in":
        content = (
          <FillIn
            {...currentCard}
            showResult={this.showResult}
            incrementScore={this.incrementScore}
            decrementScore={this.decrementScore}
          />
        );
        break;
    }

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    const pressLeft = () => {
      return this.props.navigation.navigate("Home");
    }

    const pressRight = () => {
      return this.props.navigation.navigate("Home");
    }

    return (
      <View style={{ flex: 1, paddingVertical: 0, backgroundColor: '#fff' }}>
        <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeUp={state => this.onSwipeUp(state)}
          onSwipeDown={state => this.onSwipeDown(state)}
          onSwipeLeft={state => this.onSwipeLeft(state)}
          onSwipeRight={state => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: this.state.backgroundColor
          }}
        >
          <CardFlip ref={card => (this.card = card)}>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => this.card.flip()}
            >
              <Header
                backgroundColor='#74b9ff'
                leftComponent={{ icon: 'close', color: '#000', onPress: pressLeft }}
                centerComponent={{ text: this.state.currentCard.category, style: { color: '#000', fontSize: 18 } }}
                rightComponent={{ icon: 'thumb-up', color: '#000', onPress: pressRight }}
              />
              <View style={{padding: 20}}>
                <Progress.Bar progress={currentScore} style={{ width: 320, alignSelf: 'center', margin: 10}} />
              </View>
              <View style={{padding: 20}}>
                {content}
              </View>
              <Text style={theme.cardActionStyle}>
                Tap on this card to get hints.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => this.card.flip()}
            >
              <View style={theme.cardStyle}>
                <Image
                  source={require("../assets/images/background.png")}
                  style={theme.cardImageStyle}
                />
                <Text style={theme.cardTitleStyle}>Hint</Text>

                <Markdown>
                      #Markdown in react-native is so cool! {'\n\n'}

                      You can **emphasize** what you want, or just _suggest it_ 😏…{'\n'}

                      You can even [**link your website**](https://twitter.com/Charles_Mangwa) or if you prefer: [email somebody](mailto:email@somebody.com){'\n'}

                      Spice it up with some GIFs 💃:

                      ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif){'\n'}

                      And even add a cool video 😎!{'\n'}

                      [![A cool video from YT](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ)

                      [![Another one from Vimeo](https://i.vimeocdn.com/video/399486266_640.jpg)](https://vimeo.com/57580368)
                    </Markdown>
                  <Text style={[theme.cardContentStyle, styles.question]}>
                  {currentCard.hint}
                </Text>
                {currentCard.hintImage && (
                  <Image
                    source={{ uri: currentCard.hintImage }}
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: "contain",
                      alignSelf: "center"
                    }}
                  />
                )}
                <Text style={theme.cardActionStyle}>
                  Tap on this card to go back to the question
                </Text>
              </View>
            </TouchableOpacity>
          </CardFlip>
        </GestureRecognizer>
        <ResultModal
          currentResult={this.state.currentResult}
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          goToNextQuestion={this.goToNextQuestion}
          lastScore={this.state.lastScore}
          score={this.state.score}
        />
      </View>
    );
  }
}

export default withNavigation(Question);

const styles = StyleSheet.create({
  cardContainer: {
    height: 600,
    borderWidth: 0
  },
  question: {
    width: null,
    height: null,
    fontSize: 16
  },
  cardImageStyle: {
    alignSelf: "stretch"
  },
  continueButton: {
    position: "absolute",
    left: 25,
    right: 25,
    bottom: 200,
    zIndex: 10
  }
});
