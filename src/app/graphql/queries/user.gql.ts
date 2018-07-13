import gql from 'graphql-tag';

const USER = gql`
  query($login: String!) {
    user(login: $login) {
      avatarUrl
      login
      name
    }
  }
`;

export { USER };
