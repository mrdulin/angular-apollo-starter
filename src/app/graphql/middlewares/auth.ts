import { setContext } from 'apollo-link-context';
import { GraphQLRequest } from 'apollo-link';

import { AuthService } from '../../core/auth.service';

function createAuthLink(authService: AuthService) {
  const authLink = setContext((operation: GraphQLRequest, prevContext: any) => {
    const jwt: string = authService.getJwt();

    if (!jwt) {
      return {};
    } else {
      return {
        headers: { Authorization: `Bearer ${jwt}` }
      };
    }
  });
  return authLink;
}

export { createAuthLink };
