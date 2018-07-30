import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { GraphQLRequest, split, from } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';

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

@NgModule({
  declarations: [AppComponent, FollowersComponent, UploadComponent],
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
  constructor(apollo: Apollo, httpLink: HttpLink) {
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

    const uploadLink = createUploadLink({ uri: environment.UPLOAD_API_ENDPOINT });

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

    apollo.create({
      link: from([auth, uploadLink]),
      cache: new InMemoryCache()
    });
  }
}
