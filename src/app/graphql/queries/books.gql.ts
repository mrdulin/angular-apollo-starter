import gql from 'graphql-tag';

const BOOKS = gql`
  query {
    books {
      id
      title
      author
    }
  }
`;

export { BOOKS };
