import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { RepositoryListComponent } from './repository-list/repository-list.component';
import { RepositoryComponent } from './repository/repository.component';

@NgModule({
  declarations: [RepositoryListComponent, RepositoryComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class RepositoriesModule {}
