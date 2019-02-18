import React from 'react';
import { Button, View, Text } from 'react-native';
import { withNavigation } from "react-navigation";
import Database from "../models/Database";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.db = new Database();
    this.state = { user: {} };
  }

  componentDidMount() {
    this.db.initSignIn();
    const user = this.db.signInSilentAsync();
    if (user) {
      this.goToHome(user);
    }
  }

  goToHome(user) {
    return this.props.navigation.navigate("Home", {
      user: user
    });
  }

  async signIn() {
    const user = await this.db.signIn();

    // const user = {
    //   displayName: 'blah',
    //   photoURL: 'test.jpg'
    // }

    if (user) {
      this.goToHome(user);
    }
  }

  render() {
    return(
      <View>
        <Text>Sign In With Google</Text>
        <Button title="Sign in with Google" onPress={() => this.signIn()} />
      </View>
    )
  }
}

export default withNavigation(Login);