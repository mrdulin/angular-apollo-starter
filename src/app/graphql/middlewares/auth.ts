import { setContext } from 'apollo-link-context';
import { GraphQLRequest } from 'apollo-link';

const authLink = setContext((operation: GraphQLRequest, prevContext: any) => {
  const jwt: string = localStorage.getItem('jwt') || 'default token';

  if (!jwt) {
    return {};
  } else {
    return {
      headers: { Authorization: `Bearer ${jwt}` }
    };
  }
});

export { authLink };
