import firebase from 'firebase';
import firestore from 'firebase/firestore';

import { GoogleSignIn } from 'expo-google-sign-in';
import auth from './auth';

class Database {
	constructor() {
    const { fbAuth, clientId } = auth;
    this.clientId = clientId;

		if (!firebase.apps.length) {
			firebase.initializeApp(fbAuth);
		}

		this.db = firebase.firestore();
	}

	async initSignIn() {
		try {
			await GoogleSignIn.initAsync({
				isOfflineEnabled: true,
				isPromptEnabled: true,
				clientId: this.clientId
			});
			this.syncUserWithStateAsync();
		} catch ({ message }) {
			alert('GoogleSignIn.initAsync(): ' + message);
		}
	}

	async signIn() {
		try {
			await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();

			const auth = user.auth;
			if (type === 'success') {
				const credential = firebase.auth.GoogleAuthProvider.credential(auth.idToken, auth.accessToken);

				firebase
					.auth()
					.signInWithCredential(credential)
					.then((user) => {
						console.log(user);
					})
					.catch((error) => {
						console.log(error);
					});

				return user;
			}
		} catch ({ message }) {
			alert('login: Error:' + message);
		}
	}

	async signInSilentAsync() {
    const user = await GoogleSignIn.signInSilentlyAsync();
    return user;
  };

  async extractUserBuild() {
    const photoURL = await GoogleSignIn.getPhotoAsync(256);
    const user = await GoogleSignIn.getCurrentUserAsync();
    this.setState({
      user: {
        ...user.toJSON(),
        photoURL: photoURL || user.photoURL,
      },
    });  
  }

	addCompletion(user, challengeId, pointsReceived) {
		console.log('adding completion, changing user score in db');
		const uid = 'XLcQgzfFUfgI5oDq99GKTT6fivu1';
		firebase
			.firestore()
			.collection('users')
			.doc(uid)
			.set(
				{
					foo: 'abc',
					bar: 'pqr'
				},
				{ merge: true }
			)
			.then(function() {
				console.log('Document successfully written!');
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
			});
	}

	async getUser(userId) {
		console.log('fetching user from db');

		const defaultUser = {
			id: 1,
			name: 'Jake Zhang',
			avatar:
				'https://media.licdn.com/dms/image/C4D03AQGixtUY3Frw8w/profile-displayphoto-shrink_200_200/0?e=1553731200&v=beta&t=__PqXGP5f6F9lO6RqnNmZ7pSF7mckJfNyakV9iEp7G4',
			current_score: 9999
		};

		let user = {};
		await fetch(`https://mipa-postgres.appspot.com/profiles/${userId}/`)
			.then(function(response) {
				console.log(response);
				if (!response.ok) {
					throw new Error('bad response');
				}
				return response.json();
			})
			.then(function(myJson) {
				user = JSON.stringify(myJson);
			})
			.catch(function(error) {
				console.log('bad response');
				user = JSON.stringify(defaultUser);
			});

		return JSON.parse(user);
	}

	insert(type, records) {
		records.forEach((q) => {
			this.db
				.collection(type)
				.add({ ...q })
				.then(function(docRef) {
					console.log('Document written with ID: ', docRef.id);
				})
				.catch(function(error) {
					console.error('Error adding document: ', error);
				});
		});
	}
}

export default Database;
