const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
import auth from './auth';
import questions from '../content/questions';

class Database {
  constructor() {
    firebase.initializeApp(auth);

    console.log(auth)
    
    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();
    console.log(this.db)
    
    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
  }

  async getChallenges() {
    const challengesQuery = this.db.collection("Challenges");
    let challenges;
    challengesQuery.get().then(function(querySnapshot) {
      querySnapshot.forEach(doc => {
        challenges.push(doc.data());
      })
    }).catch(function(error) {
        console.log("Error getting documents:", error);
    });
   
    return challenges;
  }  

  async getQuestions(challengeId) {
    const questionQuery = this.db.collection("Questions");
    const query = questionQuery.where("challenge", "==", challengeId);

    let questions = [];
    await query.get().then(function(querySnap) {
      querySnap.forEach(doc =>{
        questions.push(doc.data());
      })
    }).catch(function(error) {
        console.log("Error getting documents:", error);
    });
   
    return questions;
  }

  insert() {
    questions.forEach((q) => {
      this.db.collection('Questions').add({
        challenge: q.challenge,
        type: q.type,
        question: q.question,
        solution: q.solution,
        hint: q.hint,
        category: q.category,
        options: q.options ? q.options : '',
        questionImage: q.questionImage ? q.questionImage : '',
        hintImage: q.hintImage ? q.hintImage : ''
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    })
  }
}

export default Database;