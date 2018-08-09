import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GraphQLRequest, split, from } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';

import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';
import { WebSocketLink } from 'apollo-link-ws';
import { errorLink, uploadLink, createSubscribeClient, authLink } from '../graphql/middlewares';

@NgModule({
  declarations: [],
  imports: [],
  exports: [ApolloModule, HttpLinkModule],
  providers: []
})
export class GraphqlModule {
  constructor(apollo: Apollo, authService: AuthService) {
    const WS_URI = `ws://${environment.HOST}:${environment.PORT}${environment.WS_PATH}`;

    const wsClient = createSubscribeClient(WS_URI, {
      lazy: true,
      // When connectionParams is a function, it gets evaluated before each connection.
      connectionParams: () => {
        return {
          token: authService.getJwt()
        };
      },
      reconnect: true,
      reconnectionAttempts: 60,
      connectionCallback: (error: Error[]) => {
        if (error) {
          console.log(error);
        }
        console.log('connectionCallback');
      },
      inactivityTimeout: 60 * 1000
    });

    const wsLink = new WebSocketLink(wsClient);

    const networkLink = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      uploadLink
    );

    apollo.create({
      link: from([authLink, errorLink, networkLink]),
      cache: new InMemoryCache()
    });
  }
}
