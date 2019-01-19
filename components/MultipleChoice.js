import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import Markdown from 'react-native-simple-markdown';
import GridView from 'react-native-super-grid';

class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      userSolution: [],
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

  selectAnswer(originalIdx) {
    if (this.props.solution === this.props.options[originalIdx]) {
      this.props.showResult("Correct!");
      this.props.incrementScore();    
    } else {
      this.props.showResult("Incorrect!");
      this.props.decrementScore();  
    }
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <Text style={{marginBottom: 20}}>Category: {this.props.category}</Text>
        <View style={{marginBottom: 20}}>
          <Markdown>
            ### Press the correct multiple choice answer.
          </Markdown>
          <Markdown>
            ### {this.props.question}
          </Markdown>          
        </View>
        <GridView
          itemDimension={130}
          items={this.state.options}
          style={styles.gridView}
          renderItem={(item, idx) => (
            <TouchableOpacity
              style={[styles.itemContainer, { backgroundColor: Colors.multipleChoice[idx] }]}
              onPress={() => this.selectAnswer(idx)}
            >
              <Text style={styles.itemName}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        {this.props.questionImage && <Image source={{uri : this.props.questionImage}} style={{width: 200, height: 200, resizeMode: 'contain', alignSelf: 'center'}}/>}
      </View>
    );
  }
}

export default MultipleChoice;

const styles = StyleSheet.create({
  cardContainer: {
    height: 600
  },
  gridView: {
    paddingTop: 25,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCategory: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
