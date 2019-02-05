import React from 'react';
import { View } from 'react-native';
import { Header } from "react-native-elements";
import * as Progress from "react-native-progress";

class ChallengeHeader extends React.Component {
  render() {
    const pressLeft = () => {
      return this.props.navigation.navigate("Home");
    };
  
    const pressRight = () => {
      return this.props.navigation.navigate("Home");
    };
        
    return (
      <View>
        <Header
          backgroundColor="#74b9ff"
          leftComponent={{ icon: "close", color: "#000", onPress: pressLeft }}
          centerComponent={{
            text: 'MIPA',
            style: { color: "#000", fontSize: 18 }
          }}
          rightComponent={{
            icon: "thumb-up",
            color: "#000",
            onPress: pressRight
          }}
        />
        <View style={{ padding: 20 }}>
          <Progress.Bar
            width={320}
            progress={this.props.progressScore}
            style={{ alignSelf: "center", margin: 10 }}
          />
        </View>
      </View>
    );
  }
}

export default ChallengeHeader;