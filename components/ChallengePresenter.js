import React from 'react';
import {Text, View, Image} from 'react-native';
import Markdown from 'react-native-simple-markdown';
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

class ChallengePresenter extends React.Component {
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
    return (
      <View>
        <View style={{marginBottom: 20, paddingHorizontal: 10}}>
          {this.props.question.split('\n').map((line, idx) => (
            <Markdown key={idx}>
              ### {line}
            </Markdown>
          ))}
          <Button
            icon={{ name: "forward-10" }}
            backgroundColor="#03A9F4"
            onPress={() => {
              return this.props.goToNextQuestion();
            }}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 20,
              marginTop: 20
            }}
            title="Start challenge"
          />
          <Button
            icon={{ name: "watch-later" }}
            backgroundColor="#03A9F4"
            onPress={() => {
              return this.props.navigation.navigate("Result", {
                user: false,
                challenge: this.props.challenge
              });
            }}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="View solution"
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(ChallengePresenter);