import React from "react";
import { Text, View, Modal } from "react-native";
import Counter from "react-native-counter";
import { Button, ListItem } from "react-native-elements";

class ResultModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props = {
      ...this.props,
      ...this.getNavigationParams
    };
  }

  getNavigationParams() {
    return this.props.navigation.state.params || {};
  }

  render() {
    const { correct, message } = this.props.currentResult;
    const bgColor = correct ? "#009432" : "#eb2f06";
    const icon = correct ? "check" : "close";

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.resultModalVisible}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: bgColor,
            paddingBottom: 20,
            width: "100%"
          }}
        >
          <View>
            <View style={{ padding: 10 }}>
              <ListItem
                title={message}
                titleStyle={{ color: "#fff" }}
                leftIcon={{ name: icon, color: "#fff" }}
              />
              <Text style={{ padding: 10, fontSize: 16, color: "#fff" }}>
                {"\n"}SCORE:{" "}
                <Counter
                  end={this.props.latestScore} // REQUIRED End of the counter
                  start={this.props.lastScore} // Beginning of the counter
                  time={1000} // Duration (in ms) of the counter
                  digits={0} // Number of digits after the comma
                  easing="linear" // Easing function name
                />
              </Text>
            </View>
            <Button
              title="CONTINUE"
              onPress={() => this.props.goToNextQuestion()}
              backgroundColor="#9D27B0"
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default ResultModal;
