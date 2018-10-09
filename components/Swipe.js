import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';

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
      <View style={theme.cardStyle}>
        <Image source={require('../assets/images/background.png')} style={theme.cardImageStyle} />
        <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
        <Text style={theme.cardActionStyle}>
          Swipe right if statement is correct, left if wrong.{"\n"}
        </Text>            
        <Text style={[theme.cardContentStyle, styles.question]}>
          {this.props.question}
        </Text>
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
