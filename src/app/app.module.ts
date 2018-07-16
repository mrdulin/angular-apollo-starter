import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { GraphQLRequest } from 'apollo-link';

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

@NgModule({
  declarations: [AppComponent, FollowersComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    SharedModule,
    RepositoriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const auth = setContext((operation: GraphQLRequest, prevContext: any) => {
      const jwt: string = localStorage.getItem('jwt') || process.env.GITHUB_ACCESS_TOKEN;

      if (!jwt) {
        return {};
      } else {
        return {
          headers: { Authorization: `Bearer ${jwt}` }
        };
      }
    });

    const http = httpLink.create({
      uri: process.env.GITHUB_GRAPHQL_API_ENDPOINT
    });

    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });
  }
}
