import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepositoryListComponent } from './repositories/repository-list/repository-list.component';
import { FollowersComponent } from './followers/followers.component';
import { RepositoryComponent } from './repositories/repository/repository.component';
import { UploadComponent } from './upload/upload.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: 'repoes', component: RepositoryListComponent },
  { path: 'followers', component: FollowersComponent },
  { path: 'repo/:name', component: RepositoryComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'subscription', component: SubscriptionComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
