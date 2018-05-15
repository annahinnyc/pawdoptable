import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const MIXED_QUERY = gql`
	query user($username: String!) {
		# from rest endpoint
		# shelters @rest(route: ‘/shelters’) @type(type: ‘[Shelter]’) {
    #   name 
    #   location 
    # }

    # from graphql endpoint
    user(username: $username) {
      name
      username
      email 
    }

    # from local state
    # network @client {
    #   isConnected
    # }
}
`; 


// export default graphql(MIXED_QUERY)(App) from App component