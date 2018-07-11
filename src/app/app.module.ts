import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { GraphQLRequest } from 'apollo-link';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { RepositoriesComponent } from './repositories/repositories.component';
import { FollowersComponent } from './followers/followers.component';

@NgModule({
  declarations: [AppComponent, RepositoriesComponent, FollowersComponent],
  imports: [BrowserModule, CoreModule, AppRoutingModule, HttpClientModule, ApolloModule, HttpLinkModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const auth = setContext((operation: GraphQLRequest, prevContext: any) => {
      const jwt: string = localStorage.getItem('jwt') || '66f83ec4eec259945ecbeb22b2066fa8d381f046';

      if (!jwt) {
        return {};
      } else {
        return {
          headers: { Authorization: `Bearer ${jwt}` }
        };
      }
    });

    const http = httpLink.create({
      uri: 'https://api.github.com/graphql'
    });

    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });
  }
}
