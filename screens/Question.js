"use strict";

import React from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import { Header } from "react-native-elements";

import ChallengePresenter from "../components/ChallengePresenter";
import Swipe from "../components/Swipe";
import Order from "../components/Order";
import FillIn from "../components/FillIn";
import MultipleChoice from "../components/MultipleChoice";
import ResultModal from "../components/ResultModal";

import Database from "../models/Database";
import ScoreCalculator from "../models/ScoreCalculator";

class Question extends React.Component {
  constructor(props) {
    super(props);

    const questions = [
      {
        type: "swipe", // needed to decide what view
        question: "Question A",
        solution: true,
        code: ""
      }
    ];

    this.state = {
      questions: questions,
      answer: "",
      lastScore: 0,
      latestScore: 0,
      currentCardIdx: 0,
      currentCard: questions[0],
      resultModalVisible: false,
      answeredAlready: false,
      currentResult: { correct: false, message: ''}
    };

    this.ScoreCalculator = new ScoreCalculator();

    this.fetchChallenge = this.fetchChallenge.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.showResult = this.showResult.bind(this);
    this.changeScore = this.changeScore.bind(this);
  }

  componentDidMount() {
    this.fetchChallenge();
  }

  async fetchChallenge() {
    const slug = this.props.navigation.getParam("challenge", {}).slug;
    const db = new Database();
    const challengeQuestions = await db.getChallenge(slug);

    this.setState({
      questions: challengeQuestions,
      currentCard: challengeQuestions[0]
    });
  }

  goToNextQuestion() {
    let currIdx = this.state.currentCardIdx;

    if (this.state.questions[currIdx + 1]) {
      this.setState({
        currentCardIdx: currIdx + 1,
        currentCard: this.state.questions[currIdx + 1],
        answeredAlready: false
      });

      // fix for presenters!
      if (this.state.questions[currIdx].category !== 'presenter') {
        this.setModalVisible(!this.state.resultModalVisible);
      }
    } else {
      return this.props.navigation.navigate("Result", {
        latestScore: this.state.latestScore,
        user: this.props.navigation.getParam("user"),
        challenge: this.props.navigation.getParam("challenge")
      });
    }
  }

  changeScore(correct) {
    this.setState({
      lastScore: this.state.latestScore,
      latestScore: this.state.latestScore + this.ScoreCalculator.calculatedChange(correct)
    });
  }

  showResult(currentResult) {
    this.setState({
      answeredAlready: true,
      currentResult: currentResult,
      resultModalVisible: true
    });
  }

  handleAnswer(question, givenSolution) {
    if (question.solution === givenSolution) {
      this.showResult({correct: true, message: 'Nice job, it is true.'});
      this.changeScore(true);
    } else {
      this.showResult({correct: false, message: 'The statement was false.'});
      this.changeScore(false);
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
    this.setState({ resultModalVisible: visible });
  }

  render() {
    const currentScore =
      this.state.currentCardIdx / this.state.questions.length;
    const currentCard = this.state.currentCard;

    let content;
    switch (currentCard.type) {
      case "challenge presenter":
        content = (
          <ChallengePresenter
            {...currentCard}
            challenge={this.props.navigation.getParam("challenge", {})}
            showResult={this.showResult}
            changeScore={this.changeScore}
            goToNextQuestion={this.goToNextQuestion}
          />
        );
        break;      
      case "swipe":
        content = (
          <Swipe
            {...currentCard}
            showResult={this.showResult}
            changeScore={this.changeScore}
          />
        );
        break;
      case "multiple choice":
        content = (
          <MultipleChoice
            {...currentCard}
            showResult={this.showResult}
            changeScore={this.changeScore}
          />
        );
        break;
      case "order":
        content = (
          <Order
            {...currentCard}
            showResult={this.showResult}
            changeScore={this.changeScore}
          />
        );
        break;
      case "fill in":
        content = (
          <FillIn
            {...currentCard}
            showResult={this.showResult}
            changeScore={this.changeScore}
          />
        );
        break;
    }

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <View style={{ flex: 1, paddingVertical: 0, backgroundColor: "#fff" }}>
        <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: this.state.backgroundColor
          }}
        >
          <Header
            backgroundColor="#74b9ff"
            leftComponent={{ icon: "close", color: "#000", onPress: pressLeft }}
            centerComponent={{
              text: 'MIPA',
              style: { color: "#000", fontSize: 18 }
            }}
            rightComponent={{
              icon: "thumb-up",
              color: "#000",
              onPress: pressRight
            }}
          />
          <View style={{ padding: 20 }}>
            <Progress.Bar
              width={320}
              progress={currentScore}
              style={{ alignSelf: "center", margin: 10 }}
            />
          </View>
          <View style={{ paddingHorizontal: 10, paddingVertical: 0 }}>{content}</View>
        </GestureRecognizer>
        <ResultModal
          currentResult={this.state.currentResult}
          resultModalVisible={this.state.resultModalVisible}
          setModalVisible={this.setModalVisible}
          goToNextQuestion={this.goToNextQuestion}
          lastScore={this.state.lastScore}
          latestScore={this.state.latestScore}
        />
      </View>
    );
  }
}

export default withNavigation(Question);
