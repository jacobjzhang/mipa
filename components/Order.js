import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Markdown from 'react-native-simple-markdown'

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
    } else {
      this.props.showResult("Incorrect!");
    }

    this.props.changeScore();    
  }

  updateOrderView(newOptions, originalIdx, newTextWithOrderNum) {
    newOptions[originalIdx] = newTextWithOrderNum;
    this.setState({options: newOptions, orderIdx: this.state.orderIdx+1});
  }

  updateViewAndUpdateSolution(answer, originalIdx) {
    let newText = '';
    const match = /\d\.\s/.exec(answer);
    if (match) {
      const removal = answer.slice(match.index, match[0].length);
      newText = removal;
    } else {
      newText = `${this.state.orderIdx}. ${answer}`;
    }

    this.updateOrderView(this.state.options, originalIdx, newText);

    this.state.userSolution.push(newText);

    if (this.state.userSolution.length === this.state.options.length) {
      this.checkAnswer(this.props.solution, this.state.userSolution);
    }
  }

  render() {
    return (
      <View>
        <Text>Category: {this.props.category}</Text>
        <View  style={{marginBottom: 20}}>
          <Markdown>
            ### Tap on the below steps in the order they occur for *{this.props.question}*
          </Markdown>
        </View>
        {
          this.state.options.map((text, originalIdx) => (
            <View key={originalIdx} style={{marginBottom: 20}}>
              <Button
                small
                raised
                onPress={() => this.updateViewAndUpdateSolution(text, originalIdx)}
                backgroundColor='#303952'
                title={text} />
            </View>
          ))
        }
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
      </View>
    );
  }
}

export default Order;