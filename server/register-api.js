const { makeExecutableSchema } = require("graphql-tools");
const UsersSchema = require('../API/schema/users/users.graphql');
const PetsSchema = require("../API/schema/pets/pets.graphql");
const SheltersSchema = require(".../API/schema/shelters/shelters.graphql");
const db = require('../database/index.js');

const querySchema = `
  type Query {
    user(username: String): User
    allUsers: [User]
    allShelters: [Shelter]
    allPets: [Pet]
  }
`;

const typeDefs = [
  querySchema,
  UsersSchema,
  PetsSchema,
  SheltersSchema
];

const resolvers = {
  Query: {
    user(args) {
      return db.find({ args }).then(user => user);
    }
    // shelters() {
    //   return [
    //     {
    //       _id: "aslkdfjlksjdlf",
    //       name: "Bend Pet Rescue",
    //       location: "Bend, OR"
    //     }
    //   ]
    // }
    // pets: () => pets
    // user: () => user
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports.schema;