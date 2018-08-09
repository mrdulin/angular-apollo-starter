import gql from 'graphql-tag';

const CREATE_COMMENT = gql`
  mutation addComment($content: String!) {
    addComment(content: $content) {
      id
      content
    }
  }
`;

const DELETE_ALL_COMMENT = gql`
  mutation {
    deleteAllComment
  }
`;

export { CREATE_COMMENT, DELETE_ALL_COMMENT };
