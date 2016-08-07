import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { split, from } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';

import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';
import { SubscriptionService } from '../core/subscription.service';
import { WebSocketLink } from 'apollo-link-ws';
import { errorLink, uploadLink, createAuthLink } from '../graphql/middlewares';
import introspectionQueryResultData from '../../assets/fragmentTypes.json';

@NgModule({
  declarations: [],
  imports: [],
  exports: [ApolloModule, HttpLinkModule],
  providers: []
})
export class GraphqlModule {
  constructor(
    apollo: Apollo,
    authService: AuthService,
    subscriptionService: SubscriptionService
  ) {
    const WS_URI = `wss://${environment.HOST}:${environment.PORT}${
      environment.WS_PATH
    }`;

    const wsClient = subscriptionService.getWSClient(WS_URI, {
      lazy: true,
      // When connectionParams is a function, it gets evaluated before each connection.
      connectionParams: () => {
        return {
          token: `Bearer ${authService.getJwt()}`
        };
      },
      reconnect: true,
      reconnectionAttempts: 5,
      connectionCallback: (error: Error[]) => {
        if (error) {
          console.log(error);
        }

        console.log('connectionCallback');
      },
      inactivityTimeout: 1000
    });

    const wsLink = new WebSocketLink(wsClient);

    const networkLink = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(
          query
        ) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      uploadLink
    );

    const authLink = createAuthLink(authService);
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData
    });

    apollo.create({
      link: from([authLink, errorLink, networkLink]),
      cache: new InMemoryCache({ fragmentMatcher })
    });
  }
}
