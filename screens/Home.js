"use strict";

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import GridView from "react-native-super-grid";
import Database from "../models/Database";
import { NavigationEvents } from "react-navigation";
import WalkThroughs from "../content/walkthroughs";

import Colors from "../constants/Colors";
import ProfileWidget from "../components/ProfileWidget";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: [
        {
          id: 1,
          name: "Loading",
          categories: ["Loading"],
          difficulty: 1,
          parentCategory: "arrays"
        }
      ],
      user: {
        id: 1,
        name: "Jake Zhang",
        avatar:
          "https://media.licdn.com/dms/image/C4D03AQGixtUY3Frw8w/profile-displayphoto-shrink_200_200/0?e=1553731200&v=beta&t=__PqXGP5f6F9lO6RqnNmZ7pSF7mckJfNyakV9iEp7G4",
        value: 999,
        positive: true
      }
    };
  }

  async fetchLatestInfo() {
    this.db = new Database();
    const challenges = await this.db.getChallenges();
    for (let chal of challenges) {
      chal["kind"] = 'Challenge';
    };

    const fetchedUser = await this.db.getUser(1);

    const user = {
      id: 1,
      name: "Jake Zhang",
      avatar:
        "https://media.licdn.com/dms/image/C4D03AQGixtUY3Frw8w/profile-displayphoto-shrink_200_200/0?e=1553731200&v=beta&t=__PqXGP5f6F9lO6RqnNmZ7pSF7mckJfNyakV9iEp7G4",
      value: String(fetchedUser.current_score),
      positive: fetchedUser.current_score > 0 ? true : false
    }

    this.setState({ challenges: challenges.concat(WalkThroughs), user: user });
  }

  render() {
    const challenges = this.state.challenges || [];

    for (let chal of challenges) {
      // fixme: should be stabilized to categories always
      const categories = chal.categories;
      const colorKeys = Object.keys(Colors)
      chal['color'] = Colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]][Math.floor(Math.random() * 2)]
    };

    const user = {
      name: "Jake Zhang",
      avatar:
        "https://media.licdn.com/dms/image/C4D03AQGixtUY3Frw8w/profile-displayphoto-shrink_200_200/0?e=1553731200&v=beta&t=__PqXGP5f6F9lO6RqnNmZ7pSF7mckJfNyakV9iEp7G4",
      value: "- 0",
      positive: true
    };

    const currentUser = this.state.user ? this.state.user : user;
    console.log('in home render', this.state.user)
    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: "white" }}>
        <NavigationEvents onDidFocus={() => this.fetchLatestInfo()} />
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
                  {" "}
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
