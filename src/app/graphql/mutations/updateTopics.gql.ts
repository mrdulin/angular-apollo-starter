import gql from 'graphql-tag';

const updateTopics = gql`
  mutation($input: UpdateTopicsInput!) {
    updateTopics(input: $input) {
      clientMutationId
      invalidTopicNames
    }
  }
`;

export { updateTopics };
