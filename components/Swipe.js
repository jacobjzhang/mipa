import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {
  MKButton,
  MKColor,
  MKIconToggle,  
  getTheme
} from 'react-native-material-kit';
import CardFlip from 'react-native-card-flip';


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
    var action = (<Text> My action</Text>);
      
    return (
        <View style={theme.cardStyle}>
          <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
            <TouchableOpacity style={styles.cardContainer} onPress={() => this.card.flip()} >
              <Image source={require('../assets/images/welcome_card.jpg')} style={[theme.cardImageStyle, {width: 340}]} />
              <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
              <Text style={[theme.cardContentStyle, styles.question]}>
                Question:{"\n\n"}
                {this.props.question}
              </Text>
              {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
              <Text style={theme.cardActionStyle}>
                Swipe right if correct, swipe left if wrong.{"\n"}
                Tap on this card to get hints.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={theme.cardContainer} onPress={() => this.card.flip()} >
              <Image source={require('../assets/images/welcome_card.jpg')} style={theme.cardImageStyle} />
              <Text style={theme.cardTitleStyle}>{this.props.category}</Text>
              <Text style={[theme.cardContentStyle, styles.question]}>
                Hint:{"\n\n"}
                {this.props.hint}
              </Text>
              {this.props.hintImage && <Image source={{uri : this.props.hintImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}              
              <Text style={theme.cardActionStyle}>
                Tap on this card to go back to the question
              </Text>
            </TouchableOpacity>     
          </CardFlip>
        </View>
    );
  }
}

export default Swipe;

const styles = StyleSheet.create({
  cardContainer: {
    width: 340,
    height: 680,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  question: {
    fontSize: 16,
  },
})
