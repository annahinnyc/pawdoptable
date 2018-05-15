const db = require('./index.js');
let {users, pets} = require('./seed.js');

db.dropDatabase();

users.forEach((obj, err) => {
  db.saveUser(obj, (err, data) => {
    if(err) {
      console.log('error saving user', err);
    } else {
      console.log('saved user', data);
    }
  });
});

pets.forEach((obj, err) => {
  db.savePets(obj, (err, data) => {
    if (err) {
      console.log('error saving user', err);
    } else {
      console.log('saved user', data);
    }
  });
});