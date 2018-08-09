import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
// 共享模块
import { SharedModule } from './shared/shared.module';
// 路由模块
import { AppRoutingModule } from './app-routing.module';
// 核心模块
import { CoreModule } from './core/core.module';
// 特性模块
import { RepositoriesModule } from './repositories/repositories.module';
import { GraphqlModule } from './graphql/graphql.module';

import { FollowersComponent } from './followers/followers.component';
import { UploadComponent } from './upload/upload.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
  declarations: [AppComponent, FollowersComponent, UploadComponent, SubscriptionComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    GraphqlModule,
    HttpClientModule,
    RepositoriesModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
