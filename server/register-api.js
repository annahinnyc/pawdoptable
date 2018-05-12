import { makeExecutableSchema } from "graphql-tools";
import UsersSchema './graphql_schema/users.graphql';
import PetsSchema './graphql_schema/pets.graphql';
import SheltersSchema from './graphql_schema/shelters.graphql';



const typeDefs = [
  UsersSchema,
  PetsSchema,
  SheltersSchema
];

const resolvers = {

};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;