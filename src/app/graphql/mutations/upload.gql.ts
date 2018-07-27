import gql from 'graphql-tag';

const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
    }
  }
`;

const MULTIPLE_UPLOAD = gql`
  mutation multipleUpload($files: [Upload!]!) {
    multipleUpload(files: $files) {
      id
      filename
    }
  }
`;

export { SINGLE_UPLOAD, MULTIPLE_UPLOAD };
