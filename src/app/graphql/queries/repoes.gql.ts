import gql from 'graphql-tag';

const repoes = gql`
  query($login: String!, $first: Int, $after: String) {
    user(login: $login) {
      repositories(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            name
          }
        }
        totalCount
      }
    }
  }
`;

export { repoes };
