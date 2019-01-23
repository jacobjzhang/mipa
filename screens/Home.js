"use strict";

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import GridView from "react-native-super-grid";
import Database from "../models/Database";
import { Avatar, Icon } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import Colors from "../constants/Colors";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      challenges: [
        {
          id: 1,
          name: "Loading",
          category: "Loading",
          difficulty: 1,
          parentCategory: "arrays"
        }
      ]
    };
  }

  async fetchNewInfo() {
    this.db = new Database();
    const challenges = await this.db.getChallenges();
    const fetchedUser = await this.db.getUser(1);

    console.log(fetchedUser, "fetched User");
    // datastore();
    const user = {
      name: "Jake Zhang",
      avatar:
        "https://media.licdn.com/dms/image/C4D03AQGixtUY3Frw8w/profile-displayphoto-shrink_200_200/0?e=1553731200&v=beta&t=__PqXGP5f6F9lO6RqnNmZ7pSF7mckJfNyakV9iEp7G4",
      value: String(fetchedUser.current_score),
      positive: fetchedUser.current_score > 0 ? true : false
    };

    console.log("setting state", user);
    this.setState({ challenges: challenges, user: user });
  }

  renderValue(user) {
    console.log("rendering value", user);
    const { value, positive } = user;

    if (positive) {
      return (
        <View
          style={{
            backgroundColor: "rgba(220,230,218,1)",
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 10
          }}
        >
          <Icon name="arrow-drop-up" color="green" size={25} />
          <Text
            style={{
              color: "green",
              // fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5
            }}
          >
            {value}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: "rgba(244,230,224,1)",
            width: 70,
            height: 28,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 10
          }}
        >
          <Icon name="arrow-drop-down" color="red" size={25} />
          <Text
            style={{
              color: "red",
              // fontFamily: 'regular',
              fontSize: 13,
              marginLeft: 5
            }}
          >
            {value}
          </Text>
        </View>
      );
    }
  }

  render() {
    const challenges = this.state.challenges || [];

    challenges.forEach(chal => {
      const colorId = Math.floor(
        Math.random() * (Colors[chal.parentCategory].length - 1)
      );
      chal["code"] = Colors[chal.parentCategory][colorId];
    });

    const user = {
      name: "Jake Zhang",
      avatar:
        "https://media.licdn.com/dms/image/C4D03AQGixtUY3Frw8w/profile-displayphoto-shrink_200_200/0?e=1553731200&v=beta&t=__PqXGP5f6F9lO6RqnNmZ7pSF7mckJfNyakV9iEp7G4",
      value: "- 164",
      positive: true
    };

    console.log(this.state.user, "state user");
    const currentUser = this.state.user ? this.state.user : user;

    const { name, avatar, value } = currentUser;
    console.log(name, avatar, value, "CURRENT USER");

    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: "white" }}>
        <NavigationEvents onDidFocus={() => this.fetchNewInfo()} />
        <View
          style={{
            height: 100,
            marginTop: 0,
            paddingTop: 50,
            paddingLeft: 20
          }}
        >
          <Text style={{ color: "black", fontSize: 35, fontFamily: "Arial" }}>
            # MIPA
          </Text>
        </View>
        <View
          key={1}
          style={{
            height: 60,
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: "white",
            borderRadius: 5,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <View style={{ flex: 2, flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginLeft: 15 }}>
              <Avatar
                small
                rounded
                source={{
                  uri: avatar
                }}
                activeOpacity={0.7}
              />
            </View>
            <Text
              style={{
                // fontFamily: 'regular',
                fontSize: 15,
                marginLeft: 10,
                color: "gray"
              }}
            >
              {name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginRight: 10
            }}
          >
            {this.renderValue(currentUser)}
            <View
              style={{
                backgroundColor: "rgba(222,222,222,1)",
                width: 35,
                height: 28,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10
              }}
            >
              <Icon name="person-add" color="gray" size={20} />
            </View>
          </View>
        </View>
        <GridView
          itemDimension={130}
          items={challenges}
          style={styles.gridView}
          renderItem={item => (
            <TouchableOpacity
              style={[styles.itemContainer, { backgroundColor: item.code }]}
              onPress={() => {
                return this.props.navigation.navigate("Question", {
                  user: this.state.user,
                  challengeId: item.id
                });
              }}
            >
              <Text style={styles.itemName}>{item.title}</Text>
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
