"use strict";

import React from "react";
import { View } from "react-native";
import { withNavigation } from "react-navigation";

import Swipe from "../components/Swipe";
import Order from "../components/Order";
import FillIn from "../components/FillIn";
import MultipleChoice from "../components/MultipleChoice";
import ResultModal from "../components/ResultModal";
import ChallengeHeader from "../components/ChallengeHeader";

import ScoreCalculator from "../models/ScoreCalculator";

class Question extends React.Component {
  constructor(props) {
    super(props);

    const challenge = props.navigation.getParam('challenge', {});

    this.state = {
      questions: challenge.hints,
      answer: "",
      lastScore: 0,
      latestScore: 0,
      currentCardIdx: 0,
      currentCard: challenge.hints[0],
      resultModalVisible: false,
      answeredAlready: false,
      currentResult: { correct: false, message: '' }
    };

    this.ScoreCalculator = new ScoreCalculator();

    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.showResult = this.showResult.bind(this);
    this.changeScore = this.changeScore.bind(this);
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

  setModalVisible(visible) {
    this.setState({ resultModalVisible: visible });
  }

  render() {
    const currentScore =
      this.state.currentCardIdx / this.state.questions.length;
    const currentCard = this.state.currentCard;

    let content;

    switch (currentCard.kind) {
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

    return (
      <View style={{ flex: 1, paddingVertical: 0, backgroundColor: "#fff" }}>
        <ChallengeHeader navigation={this.props.navigation} progressScore={currentScore} />
        <View style={{ paddingHorizontal: 10, paddingVertical: 0 }}>{content}</View>
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
