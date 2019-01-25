import React from 'react';
import {Text, View, Image} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';
import Markdown from 'react-native-simple-markdown';

const theme = getTheme();

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
        </View>
      </View>
    );
  }
}

export default ChallengePresenter;