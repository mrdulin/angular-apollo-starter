import gql from 'graphql-tag';

const UPDATE_TOPICS = gql`
  mutation($input: UpdateTopicsInput!) {
    updateTopics(input: $input) {
      clientMutationId
      invalidTopicNames
    }
  }
`;

export { UPDATE_TOPICS };
