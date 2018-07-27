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
  mutation multipleUpload($text: String, $files: [Upload!]!) {
    multipleUpload(text: $text, files: $files) {
      id
      filename
    }
  }
`;

export { SINGLE_UPLOAD, MULTIPLE_UPLOAD };
