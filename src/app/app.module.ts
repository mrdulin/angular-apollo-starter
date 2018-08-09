import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { GraphQLRequest, split, from } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

// 共享模块
import { SharedModule } from './shared/shared.module';
// 路由模块
import { AppRoutingModule } from './app-routing.module';
// 核心模块
import { CoreModule } from './core/core.module';
// 特性模块
import { RepositoriesModule } from './repositories/repositories.module';

import { FollowersComponent } from './followers/followers.component';
import { UploadComponent } from './upload/upload.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AuthService } from './core/auth.service';

@NgModule({
  declarations: [AppComponent, FollowersComponent, UploadComponent, SubscriptionComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    RepositoriesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink, authService: AuthService) {
    const auth = setContext((operation: GraphQLRequest, prevContext: any) => {
      const jwt: string = localStorage.getItem('jwt') || 'default token';

      if (!jwt) {
        return {};
      } else {
        return {
          headers: { Authorization: `Bearer ${jwt}` }
        };
      }
    });

    const UPLOAD_URI = `http://${environment.HOST}:${environment.PORT}${environment.GRAPHQL_PATH}`;
    const uploadLink = createUploadLink({ uri: UPLOAD_URI });

    const errorLink = onError(({ graphQLErrors, networkError, operation, forward, response }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    });

    const WS_URI = `ws://${environment.HOST}:${environment.PORT}${environment.WS_PATH}`;
    const subscriptionClient = new SubscriptionClient(WS_URI, {
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

    subscriptionClient.onConnecting(() => {
      console.log('ws connecting');
    });
    subscriptionClient.onConnected(() => {
      console.log('ws connected');
    });
    subscriptionClient.onReconnecting(() => {
      console.log('ws reconnecting');
    });
    subscriptionClient.onReconnected(() => {
      console.log('ws reconnected');
    });
    subscriptionClient.onDisconnected(() => {
      console.log('ws disconnected');
    });
    subscriptionClient.onError(() => {
      console.log('ws error');
    });
    const wsLink = new WebSocketLink(subscriptionClient);
    // No need for file upload??
    // const http = httpLink.create({
    //   uri: environment.UPLOAD_API_ENDPOINT || environment.GITHUB_GRAPHQL_API_ENDPOINT
    // });

    // const isFile = value =>
    //   (typeof File !== 'undefined' && value instanceof File) ||
    //   (typeof Blob !== 'undefined' && value instanceof Blob) ||
    //   (typeof FileList !== 'undefined' && value instanceof FileList);

    // const isUpload = ({ variables }) => Object.values(variables).some(isFile);
    // const terminalLink = split(isUpload, uploadLink, http);

    const networkLink = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      uploadLink
    );

    apollo.create({
      link: from([auth, errorLink, networkLink]),
      cache: new InMemoryCache()
    });
  }
}
