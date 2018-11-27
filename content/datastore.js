// Imports the Google Cloud client library
const questions = require('./questions');
const Datastore = require('@google-cloud/datastore');
console.log(Datastore)

// Your Google Cloud Platform project ID
const projectId = 'mipa-1540168874590';

// console.log(questions)

// Creates a client
const datastore = new Datastore({
  projectId: projectId,
});

// questions.forEach((q, idx) => {

//   // The kind for the new entity
//   const kind = 'Question';
//   // The name/ID for the new entity
//   const name = `q${idx}`;
//   // The Cloud Datastore key for the new entity
//   const taskKey = datastore.key([kind, name]);

//   // Prepares the new entity
//   const task = {
//     key: taskKey,
//     data: q
//   };

//   // Saves the entity
//   datastore
//     .upsert(task)
//     .then(() => {
//       console.log(`Saved ${task.key.name}: ${task.data.question}`);
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
// })

// console.log("let's now query for everything")

const query = datastore
  .createQuery('Question')
  .filter('challenge', '=', 1)
  // .order('name', {
  //   descending: true,
  // });

datastore.runQuery(query).then(results => {
  // Task entities found.
  const tasks = results[0];

  console.log('Questions:');
  tasks.forEach(task => console.log(task));
});