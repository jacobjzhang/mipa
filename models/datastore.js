import Database from "./Database";
import challenges from "../content/challenges";
import questions from "../content/questions";

export default function() {
  const db = new Database();

  console.log('in datastore')
  db.insert('Challenges', challenges);
  db.insert('Questions', questions);
}