import React from 'react';
import {TouchableHighlight, Text, View, Modal} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';
import Counter from 'react-native-counter';
import { Card, Button, ListItem } from 'react-native-elements';

const theme = getTheme();

class ResultModal extends React.Component {
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: '#26de81',
          paddingBottom: 20,
          width: '100%'
        }}>
          <View>
            <View style={{padding: 10}}>
              <ListItem
                key={this.props.currentResult}
                title={this.props.currentResult}
                leftIcon={{name: 'check', color: '#fff'}}
              />{"\n"}
              <Text style={{padding: 10, fontSize: 16}}>
                SCORE: <Counter
                  end={this.props.score}                        // REQUIRED End of the counter
                  start={this.props.lastScore}                     // Beginning of the counter
                  time={1000}                   // Duration (in ms) of the counter
                  digits={0}                    // Number of digits after the comma
                  easing="linear"               // Easing function name
                />
              </Text>
            </View>
            <Button
              title="CONTINUE"
              onPress={() => this.props.goToNextQuestion()}
              style={{}}
              backgroundColor='#9D27B0'
            />
          </View>
        </View>          
      </Modal>
    );
  }
}

export default ResultModal;