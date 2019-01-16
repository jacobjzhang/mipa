"use strict";

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import GridView from "react-native-super-grid";
import Database from "../models/Database";

import datastore from "../models/datastore";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: [
        {
          id: 1,
          name: "Loading",
          category: "Loading",
          code: "#000000"
        }
      ]
    };
  }

  async componentDidMount() {
    this.db = new Database();
    const challenges = await this.db.getChallenges();
    this.setState({ challenges: challenges });

    // datastore();
  }

  render() {
    const challenges = this.state.challenges || [];

    return (
      <View style={{ flex: 1, paddingVertical: 0 }}>
        <GridView
          itemDimension={130}
          items={challenges}
          style={styles.gridView}
          renderItem={item => (
            <TouchableOpacity
              style={[styles.itemContainer, { backgroundColor: item.code }]}
              onPress={() => {
                return this.props.navigation.navigate("Question", {
                  challengeId: item.id
                });
              }}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
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
