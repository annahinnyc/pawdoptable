const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator'); //adds pre-save validation for unique fields within a Mongoose schema.
const bcrypt = require('bcrypt'); // handles password hashing in the database
const saltRounds = 5;
let Schema = mongoose.Schema;
let uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/pawdoptable';
//establish connection
mongoose.connect(uristring, (err) => {
  if (err) { console.log('mongodb not connected', err); }
  else {
    console.log('connected to database');
  }
});
mongoose.Promise = global.Promise;

module.exports = {
//set user schema
  UserSchema: new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    name: String
    // phone: String,
    // profilePhotoUrl: String,
    // location: {
    //   street: String,
    //   city: String,
    //   state: String,
    //   zip: String
    // },
    // description: String,
    // photos: Array,
    // homeType: Array,
    // yard: {
    //   yard: Boolean,
    //   size: Number
    // },
    // children: {
    //   childrenAtHome: Boolean,
    //   number: Number,
    //   ages: Array
    // },
    // pets: {
    //   petsAtHome: Boolean,
    //   number: Number,
    //   type: Array
    // },
    // favoritedPets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    // petPreferences: {
    //   species: String,
    //   mainBreed: String,
    //   subBreeds: Array,
    //   age: Number,
    //   height: Number,
    //   weight: Number,
    //   energy: Number,
    //   personalityTraits: Array,
    //   goodWith: Array,
    //   badWith: Array,
    //   specialNeeds: {
    //     specialNeeds: Boolean,
    //     needs: Array,
    //     description: String
    //   },
    //   shelter: { type: Schema.Types.ObjectId, ref: "Shelter" },
    //   distance: Number
    // },
    // backgroundCheck: Array
  }),

//compile schema into a model
  User: mongoose.model('User', UserSchema),

/**********************************************/
  PetSchema: new Schema({
    species: String,
    mainBreed: String
    // subBreeds: [],
    // name: String,
    // description: String,
    // age: String,
    // height: Number,
    // weight: Number,
    // energy: Number,
    // personalityTraits: [],
    // goodWith: [],
    // badWith: [],
    // specialNeeds: {
    //   specialNeeds: Boolean,
    //   needs: [],
    //   description: String
    // },
    // shelter: String
  }),

  Pet: mongoose.model('Pet', PetSchema),

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

  savePets: (data, callback) => {
    let pet = new Pet({
      species: data.species,
      mainBreed: data.mainBreed
    });

    pet.save((err, pet) => {
      if (err) { callback('Pet already exists', null); }
      else { callback(null, pet); }
    });
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
        name: data.name
        // phone: data.phone,
        // profilePhotoUrl: data.profileUrl,
        // type: data.type,
        // location: data.location,
        // description: data.description,
        // photos: [],
        // homeType: [],
        // yard: [],
        // childrenAtHome: [],
        // petsAtHome: [],
        // favoritedPets: [],
        // petPreferences: [],
        // backgroundCheck: []
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

// module.exports.User = User;
// module.exports.saveUser = saveUser;
// module.exports.savePets = savePets;