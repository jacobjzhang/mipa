import React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Database from '../models/Database';
import { Font } from 'expo';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.db = new Database();
		this.state = { user: {} };
	}

	async componentDidMount() {
		await Font.loadAsync({
			Poppins: require('../assets/fonts/Poppins-Bold.otf')
    });
    this.setState({ fontLoaded: true });

		this.db.initSignIn();
		// const user = this.db.signInSilentAsync();
		// if (user) {
		//   this.goToHome(user);
		// }
	}

	goToHome(user) {
		return this.props.navigation.navigate('Home', {
			user: user
		});
	}

	async signIn() {
		// const user = await this.db.signIn();

		const user = {
		  displayName: 'blah',
		  photoURL: 'test.jpg'
		}

		if (user) {
		  this.goToHome(user);
		}
	}

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 200, backgroundColor: '#fff'}}>
				{this.state.fontLoaded ? <Text style={{ fontFamily: 'Poppins', fontSize: 55, textAlign: 'center' }}>AlgoDaily</Text> : null}
        <TouchableOpacity onPress={() => this.signIn()}>
          <Image style={{width: 200, height: 50, paddingVertical: 100, resizeMode: 'contain'}} source={require('../assets/images/google-sign-in.png')} />
        </TouchableOpacity>
			</View>
		);
	}
}

export default withNavigation(Login);
