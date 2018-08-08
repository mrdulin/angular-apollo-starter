import gql from 'graphql-tag';

const ADD = gql`
  subscription {
    addComment {
      id
      content
    }
  }
`;

export { ADD };
