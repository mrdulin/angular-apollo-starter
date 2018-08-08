import gql from 'graphql-tag';

const GET_ALL = gql`
  query {
    comments {
      id
      content
    }
  }
`;

export { GET_ALL };
