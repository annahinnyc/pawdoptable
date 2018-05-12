const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

// const data = require('../database/seed.js');
// const users = data.users;

// Some fake data
// const books = [
//   {
//     title: "Harry Potter and the Sorcerer's stone",
//     author: "J.K. Rowling"
//   },
//   {
//     title: "Jurassic Park",
//     author: "Michael Crichton"
//   }
// ];

// type Query { books: [Book] }
// type Book { title: String, author: String }
const users = [
  {
    username: "kcloud99",
    email: "kylemcleod1@gmail.com",
    password: "password",
    name: "Kyle McLeod",
    phone: "2534684102",
    profilePhotoUrl: "https://somepic.com/kyle",
    type: "awesome dude",
    location: "97701",
    description:
      "lover of all animals, especially dogs. Looking for a great rescue dog I can run and have fun with. Needs a great personality and loving attitude.",
    photos: [],
    homeType: "house",
    yard: true,
    childrenAtHome: 0,
    petsAtHome: 2,
    favoritedPets: [],
    petPreferences: [],
    backgroundCheck: []
  },
  {
    username: "annahofthewest",
    email: "annahofthewest@gmail.com",
    password: "password",
    name: "Annah Patterson",
    phone: "9715559292",
    profilePhotoUrl: "https://somepic.com/annah",
    type: "awesome lady",
    location: "56783",
    description:
      "great home life that needs another pet. Could be either a cat or a dog, but looking to provide a loving home for an animal in need",
    photos: [],
    homeType: "apartment",
    yard: false,
    childrenAtHome: 1,
    petsAtHome: 1,
    favoritedPets: [],
    petPreferences: [],
    backgroundCheck: []
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { users: [User] }
  type User { 
    username: String, 
    email: String,
    password: String,
    name: String,
    phone: String
  }
`;

// The resolvers
const resolvers = {
  Query: { users: () => users }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
