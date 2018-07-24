import gql from 'graphql-tag';

const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
    }
  }
`;

export { SINGLE_UPLOAD };
