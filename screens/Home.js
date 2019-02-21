"use strict";

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import GridView from "react-native-super-grid";
import { NavigationEvents } from "react-navigation";

import Colors from "../constants/Colors";
import ProfileWidget from "../components/ProfileWidget";
import { ScrollView } from "react-native-gesture-handler";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: require('../content/index.json'),
      user: this.props.navigation.getParam('user', {})
    };
  }

  render() {
    const challenges = this.state.challenges || [];

    for (let chal of challenges) {
      // fixme: should be stabilized to categories always
      const categories = chal.categories;
      const colorKeys = Object.keys(Colors)
      chal['color'] = Colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]][Math.floor(Math.random() * 2)]
    };

    console.log('in home render', this.state.user)
    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: "white" }}>
        {/* <NavigationEvents onDidFocus={() => this.fetchLatestInfo()} /> */}
        <View
          style={{
            height: 100,
            marginTop: 0,
            paddingTop: 50,
            paddingLeft: 20
          }}
        >
          <Text style={{ color: "black", fontSize: 35, fontFamily: "Arial" }}>
            # ALGODAILY
          </Text>
        </View>
        <ProfileWidget user={this.state.user} />
        <GridView
          itemDimension={130}
          items={challenges}
          style={styles.gridView}
          renderItem={item => {
            if (item.kind == "Walkthrough") {
              return (
                <TouchableOpacity
                  style={[styles.itemContainer, { backgroundColor: item.color }]}
                  onPress={() => {
                    return this.props.navigation.navigate("WalkThrough", {
                      walkthrough: item
                    });
                  }}
                >
                  {" "}
                  <Text style={styles.itemKind}>{item.kind}</Text>
                  <Text style={styles.itemName}>{item.title}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  style={[styles.itemContainer, { backgroundColor: item.color }]}
                  onPress={() => {
                    return this.props.navigation.navigate("Challenge", {
                      user: this.state.user,
                      challenge: item,
                    });
                  }}
                >
                  <Text style={styles.itemKind}>{item.kind}</Text>
                  <Text style={styles.itemName}>{item.title}</Text>
                  <Text style={styles.itemCategory}>{item.categories.join(", ")}</Text>
                </TouchableOpacity>
              );
            }
          }}
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
  itemKind: {
    top: 10,
    padding: 10,
    fontSize: 10,
    position: "absolute",
    color: "#fff"
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
