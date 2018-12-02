import React from 'react';
import {TouchableHighlight, Text, View, Modal, Button} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';
import Counter from 'react-native-counter';

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
        <View style={{marginTop: 300, backgroundColor: 'yellow', padding: 50}}>
          <View>
            <Text style={{fontSize: 35, textAlign: 'center'}}>
              {this.props.currentResult}{"\n"}
              <Counter
                end={this.props.score}                        // REQUIRED End of the counter
                start={this.props.lastScore}                     // Beginning of the counter
                time={1000}                   // Duration (in ms) of the counter
                digits={0}                    // Number of digits after the comma
                easing="linear"               // Easing function name
              />
            </Text>
          </View>
          <Button title="CONTINUE" onPress={() => this.props.goToNextQuestion()} style={{
              position: 'absolute',
              left: 25,
              right: 25,
              bottom: 200,
              zIndex: 10
            }} />
        </View>          
      </Modal>
    );
  }
}

export default ResultModal;