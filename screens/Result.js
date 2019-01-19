"use strict";

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { withNavigation } from "react-navigation";
import GridView from "react-native-super-grid";
import Database from "../models/Database";
import { Avatar, Icon, Card, Button } from 'react-native-elements';

import datastore from "../models/datastore";
import Markdown from "react-native-simple-markdown";
import Colors from '../constants/Colors';

class App extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);

    this.state = {
      challenges: [
        {
          id: 1,
          name: "Loading",
          category: "Loading",
          difficulty: 1,
          parentCategory: 'arrays'
        }
      ]
    };
  }

  render() {
    const challenges = this.state.challenges || [];

    challenges.forEach((chal) => {
      const colorId = Math.floor(Math.random() * (Colors[chal.parentCategory].length-1));
      chal['code'] = Colors[chal.parentCategory][colorId];
    })

    const user = {
      name: 'Jake Zhang',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      value: '- 164',
    }

    const { name, avatar, value } = user;

    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: 'white' }}>
        <View
          style={{
            height: 100,
            marginTop: 0,
            paddingTop: 50,
            paddingLeft: 20
          }}
        >
          <Text style={{ color: 'black', fontSize: 35, fontFamily: 'Arial' }}>
            # MIPA
          </Text>
        </View>
        <Card
          title='WELL DONE!'
          image={require('../images/result.jpg')}>
          <Text style={{marginBottom: 10}}>
            You scored {this.props.navigation.getParam("score", 100)} points for this challenge!
          </Text>
          <Text style={{marginBottom: 10}}>
            Here are some related challenges:
          </Text>
          <Button
            icon={{name: 'home'}}
            backgroundColor='#03A9F4'
            onPress={() => { return this.props.navigation.navigate("Home");}}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='GO HOME' />
        </Card>
      </View>
    );
  }
}

export default withNavigation(App);

const styles = StyleSheet.create({
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
