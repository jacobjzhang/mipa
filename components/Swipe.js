import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';
import Markdown from 'react-native-simple-markdown';

const theme = getTheme();

class Swipe extends React.Component {
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
        <Text>Category: {this.props.category}</Text>
        <View  style={{marginBottom: 20}}>
          <Markdown>
            ### Swipe RIGHT if statement is correct, LEFT if wrong.
          </Markdown>
        </View>
        <View  style={{marginBottom: 20}}>
          <Markdown>
            ## {this.props.question}
          </Markdown>
        </View>
        {this.props.code && <Text style={{fontFamily: 'Courier', padding: 20}} >
          {this.props.code}
        </Text>}
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
      </View>
    );
  }
}

export default Swipe;

const styles = StyleSheet.create({
  cardContainer: {
    height: 600,
    borderRadius: 0,
  }
})
