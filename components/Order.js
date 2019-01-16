import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      userSolution: [],
      orderIdx: 1
    }
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

  checkAnswer(actualSolution, userSolution) {
    if (JSON.stringify(actualSolution) == JSON.stringify(userSolution)) {
      this.props.showResult("Correct!");
      this.props.incrementScore();
      console.log(true)
    } else {
      this.props.showResult("Incorrect!");
      this.props.decrementScore();      
    }
  }

  updateOrderView(newOptions, originalIdx, newTextWithOrderNum) {
    newOptions[originalIdx] = newTextWithOrderNum;
    this.setState({options: newOptions, orderIdx: this.state.orderIdx+1});
  }

  updateViewAndUpdateSolution(answer, originalIdx) {
    if (/\d\./.test(answer)) {
      return;
    }

    let newOptions = this.state.options;
    const newTextWithOrderNum = `${this.state.orderIdx}. ${answer}`;

    this.updateOrderView(newOptions, originalIdx, newTextWithOrderNum);

    this.state.userSolution.push(newTextWithOrderNum);

    console.log(this.state.userSolution.length, this.state.options.length)
    if (this.state.userSolution.length === this.state.options.length) {
      this.checkAnswer(this.props.solution, this.state.userSolution);
    }
  }

  render() {
    return (
      <View>
        <Text>{this.props.category}</Text>
        <Text>
          Select the below steps in the order they occur for the following concept:
        </Text>            
        <Text>
          {this.props.question}
        </Text>
        <List containerStyle={{marginBottom: 20}}>
          {
            this.state.options.map((text, originalIdx) => (
              <ListItem
                onPress={() => this.updateViewAndUpdateSolution(text, originalIdx)}
                key={originalIdx}
                title={text}
              />
            ))
          }
        </List>
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
      </View>
    );
  }
}

export default Order;

const styles = StyleSheet.create({
  cardContainer: {
    height: 600
  },
  question: {
    width: null,
    height: null,
    fontSize: 16,
  },
  cardImageStyle: {
    alignSelf: 'stretch'
  }
})
