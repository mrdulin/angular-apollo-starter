import gql from 'graphql-tag';

const UPLOADS = gql`
  query uploads {
    uploads {
      id
      filename
    }
  }
`;

export { UPLOADS };
