import gql from 'graphql-tag';

const userQuery = gql`
  query($login: String!, $first: Int) {
    user(login: $login) {
      avatarUrl
      login
      name
      followers(first: $first) {
        nodes {
          name
          login
        }
        totalCount
      }
      repositories(first: $first) {
        nodes {
          id
          name
        }
        totalCount
      }
    }
  }
`;

export { userQuery };
