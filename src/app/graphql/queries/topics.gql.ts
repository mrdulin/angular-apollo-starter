import gql from 'graphql-tag';

const TOPICS = gql`
  query($owner: String!, $name: String!, $first: Int) {
    repository(owner: $owner, name: $name) {
      id
      name
      repositoryTopics(first: $first) {
        nodes {
          id
          topic {
            id
            name
          }
        }
        totalCount
      }
    }
  }
`;

export { TOPICS };
