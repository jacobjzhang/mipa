import firebase from 'firebase';
import firestore from 'firebase/firestore';
import auth from './auth';

const CONNECT_TO_DB = true;

class Database {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(auth);
    }

    this.db = firebase.firestore();

    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
  }

  async getChallenges() {
    let challenges = [];
      
    if (CONNECT_TO_DB) {
      await fetch(`http://127.0.0.1:8000/challenges/`)
        .then(function(response) {
          console.log(response)
          if (!response.ok) {
            throw new Error('bad response')
          }
          return response.json();
        }).then(function(myJson) {
          challenges = JSON.stringify(myJson);
        }).catch(function(error) {
          console.log('bad response')
        });
  
      return JSON.parse(challenges);
    } else {
      console.log('Using local data for challenges.')
      challenges = require('../content/challenges');
    }

    return challenges;
  }

  async getQuestions(challengeId) {
    let questions = [];

    if (CONNECT_TO_DB) {
      const questionQuery = this.db.collection("Questions");
      const query = questionQuery.where("challenge", "==", challengeId);
  
      await query
        .get()
        .then(function(querySnap) {
          querySnap.forEach(doc => {
            questions.push(doc.data());
          });
        })
        .catch(function(error) {
          console.log("Error getting documents:", error);
        });
    } else {
      const allQuestions = require('../content/questions');      
      questions = allQuestions.filter((q) => { return q.challenge == challengeId; })
    }
    return questions;
  }

  addCompletion(user, challengeId, pointsReceived) {
    console.log('adding completion, changing user score in db');

    console.log(user)

    var form = new FormData();
    form.append("profile", user.id);
    form.append("points_received", pointsReceived);
    form.append("challenge", challengeId);
    
    return fetch('https://mipa-postgres.appspot.com/challenge_completions/', {
      method: 'POST',
      body: form
    })
    .then(response => response.json())
    .then(response => console.log(response))
  }

  async getUser(userId) {
    console.log('fetching user from db');

    const defaultUser = {
      id: 1,
      name: "Jake Zhang",
      avatar:
        "https://media.licdn.com/dms/image/C4D03AQGixtUY3Frw8w/profile-displayphoto-shrink_200_200/0?e=1553731200&v=beta&t=__PqXGP5f6F9lO6RqnNmZ7pSF7mckJfNyakV9iEp7G4",
      current_score: 9999
    };

    let user = {};
    await fetch(`https://mipa-postgres.appspot.com/profiles/${userId}/`)
      .then(function(response) {
        console.log(response)
        if (!response.ok) {
          throw new Error('bad response')
        }
        return response.json();
      }).then(function(myJson) {
        user = JSON.stringify(myJson);
      }).catch(function(error) {
        console.log('bad response')
        user = JSON.stringify(defaultUser);
      });

    return JSON.parse(user);
  }

  insert(type, records) {
    records.forEach(q => {
      this.db
        .collection(type)
        .add({...q})
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    });
  }
}

export default Database;
