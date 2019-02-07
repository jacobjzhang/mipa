import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Avatar, Icon } from "react-native-elements";

class ProfileWidget extends React.Component {
  renderValue(user) {
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
    const { name, avatar, value } = this.props.user;
    return(
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
          {this.renderValue(this.props.user)}
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
    )
  }
}

export default ProfileWidget;