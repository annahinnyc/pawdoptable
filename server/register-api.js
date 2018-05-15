import { makeExecutableSchema } from "graphql-tools";
import UsersSchema './graphql_schema/users.graphql';
import PetsSchema './graphql_schema/pets.graphql';
import SheltersSchema from './graphql_schema/shelters.graphql';

const testSchema = `
  type Query {
    hi: String
    user: User
    shelters: [Shelter]
    pets: [Pet]
  }
`;

const typeDefs = [
  testSchema,
  UsersSchema,
  PetsSchema,
  SheltersSchema
];

const resolvers = {
  Query: {
    hi() {
      return 'Hey there';
    }
    shelters() {
      return [
        {
          _id: "aslkdfjlksjdlf",
          name: "Bend Pet Rescue",
          location: "Bend, OR"
        }
      ]
    }
    pets: () => pets
    user: () => user
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;