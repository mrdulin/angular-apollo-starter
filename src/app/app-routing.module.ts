import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepositoryListComponent } from './repositories/repository-list/repository-list.component';
import { FollowersComponent } from './followers/followers.component';
import { RepositoryComponent } from './repositories/repository/repository.component';

const routes: Routes = [
  { path: 'repoes', component: RepositoryListComponent },
  { path: 'followers', component: FollowersComponent },
  { path: 'repo/:name', component: RepositoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
