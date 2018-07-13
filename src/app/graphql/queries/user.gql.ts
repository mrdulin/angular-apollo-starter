import gql from 'graphql-tag';

const user = gql`
  query($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      name
    }
  }
`;

export { user };
