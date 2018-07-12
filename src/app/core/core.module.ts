import { NgModule } from '@angular/core';

import { UserService } from './user.service';
import { RepoService } from './repo.service';

@NgModule({
  providers: [UserService, RepoService]
})
export class CoreModule {}
