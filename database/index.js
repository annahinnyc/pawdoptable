const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //adds pre-save validation for unique fields within a Mongoose schema.
const bcrypt = require('bcrypt'); // handles password hashing in the database
const saltRounds = 5;
let Schema = mongoose.Schema;
let uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';
//establish connection
mongoose.connect(uristring, (err) => {
  if (err) { console.log('mongodb not connected', err); }
  else {
    console.log('connected to database');
  }
});

//set schema
let UserSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true},
  password: String,
  name: String,
  phone: String,
  profilePhotoUrl: String,
  location: String,
  description: String,
  photos: Array,
  homeType: Array,
  yard: Array,
  childrenAtHome: Array,
  petsAtHome: Array,
  favoritedPets: Array,
  petPreferences: Array,
  backgroundCheck: Array
});

//compile schema into a model
let User = mongoose.model('User', UserSchema);


module.exports = {
//database search function to ID whether uniq user exist in the db returns boolean
  checkUser: (data, callback) => {
    User.find({})
      .where('username').equals(data.username)
      .exec((err, user) => {
        if (err) {
          callback(err, null);
        } else if (!user.length) {
          console.log('User does not exist in the database');
          callback(null, false);
        } else {
          console.log('User already exists in the database');
          callback(null, true);
        }
      });
  },
//database search function to get user information
  getUser: (data, callback) => {
    let attemptedPassword = data.password;

    User.find({})
      .where('username').equals(data.username)
      .exec((err, user) => {
        if (user.length === 0) {
          err = { errors: { username: 'User does not exist' } };
          callback(err, null);
        }
        else if (user[0]) {
          let message = { errors: { password: 'Incorrect submission, try again'} };

          bcrypt.compare(attemptedPassword, user[0].password, (err, isMatch) => {
            if (err) { callback(err, null); }
            if (isMatch) { return callback(null, user); }
            else if (!isMatch) { callback(message, null); }
          });
        }
    });
  },
  //get user by id to feed deserialize user.
  getUserById: (id, callback) => {
    User.findById(id, callback);
  },

  //save user data
  saveUser: (data, callback) => {
    let plainTextPassword = data.password;
    //bcrypt password before saving it to database
    bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
      let user = new User ({
        username: data.username,
        email: data.email,
        password: hash,
        name: data.name,
        phone: data.phone,
        profilePhotoUrl: data.profileUrl,
        type: data.type,
        location: data.location,
        description: data.description,
        photos: [],
        homeType: [],
        yard: [],
        childrenAtHome: [],
        petsAtHome: [],
        favoritedPets: [],
        petPreferences: [],
        backgroundCheck: []
      });

      user.save((err, user) => {
        if (err) { callback('User already exists', null); }
        else { callback(null, user); }
      });
    });
  },
  // retrieve favorite pets
  getFavoritePets: (data, callback) => {
    User.find({type: 'pet'})
      .where('favorited').equals(data.query)
      .exec((err, pets) => {
        if (err) { callback('Error retrieving favorited pets from database'); }
        else { callback(null, pets); }
      });
  },
  // retrieve all interested families in the database
  getInterestedFamilies: (callback) => {
    User.find()
      .where('favorited').equals(data.query)
      .exec((err, families) => {
        if (err) { callback('Error getting interested families'); }
        else { callback(null, families); }
      });
  },
  // utilized by seed.js file to drop database when re-seeding
  dropDatabase: () => {
    mongoose.connection.dropDatabase();
  },
  // exports mongoose connection for server to reference
  connection: mongoose.connection
};
