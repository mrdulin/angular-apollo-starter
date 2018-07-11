import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepositoriesComponent } from './repositories/repositories.component';
import { FollowersComponent } from './followers/followers.component';

const routes: Routes = [
  { path: 'repo', component: RepositoriesComponent },
  { path: 'followers', component: FollowersComponent }
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
