import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const testQuery = gql`
  {
    hi
    shelters {
      _id
      name
      location
    }
  }
`;

// export default graphql(testQuery)(App) from App component