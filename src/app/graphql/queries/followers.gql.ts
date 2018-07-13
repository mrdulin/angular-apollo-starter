import gql from 'graphql-tag';

const followers = gql`
  query($login: String!, $first: Int, $after: String) {
    user(login: $login) {
      followers(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            name
            login
            avatarUrl
          }
        }
        totalCount
      }
    }
  }
`;

export { followers };
