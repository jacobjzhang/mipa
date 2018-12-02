import firebase from 'firebase';
import firestore from 'firebase/firestore';
import auth from './auth';

class Database {
  constructor() {
    firebase.initializeApp(auth);
    this.db = firebase.firestore();

    // Disable deprecated features
    this.db.settings({
      timestampsInSnapshots: true
    });
  }

  async getChallenges() {
    const challengesQuery = this.db.collection("Challenges");
    let challenges = [];

    await challengesQuery
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          challenges.push(doc.data());
        });
      })
      .catch(function(error) {
        console.log("Error getting documents:", error);
      });

    return challenges;
  }

  async getQuestions(challengeId) {
    const questionQuery = this.db.collection("Questions");
    const query = questionQuery.where("challenge", "==", challengeId);

    let questions = [];
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

    return questions;
  }

  insert(type, records) {
    records.forEach(q => {
      this.db
        .collection(type)
        .add({
          challenge: q.challenge,
          type: q.type,
          question: q.question,
          solution: q.solution,
          hint: q.hint,
          category: q.category,
          options: q.options ? q.options : "",
          questionImage: q.questionImage ? q.questionImage : "",
          hintImage: q.hintImage ? q.hintImage : ""
        })
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
