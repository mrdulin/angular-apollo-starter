import gql from 'graphql-tag';

const CREATE_COMMENT = gql`
  mutation addComment($content: String!) {
    addComment(content: $content) {
      id
      content
    }
  }
`;

export { CREATE_COMMENT };
