import React from 'react';
import {TouchableHighlight, Text, View, Modal, Button} from 'react-native';
import {
  getTheme
} from 'react-native-material-kit';

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
            <Text style={{fontSize: 35, textAlign: 'center'}}>{this.props.currentResult}</Text>
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