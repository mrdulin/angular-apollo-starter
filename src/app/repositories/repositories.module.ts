import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RepositoryListComponent } from './repository-list/repository-list.component';
import { RepositoryComponent } from './repository/repository.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [RepositoryListComponent, RepositoryComponent]
})
export class RepositoriesModule {}
