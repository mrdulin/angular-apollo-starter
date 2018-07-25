import { NgModule } from '@angular/core';

import { UserService } from './user.service';
import { RepoService } from './repo.service';
import { BookService } from './book.service';
import { FileUploadService } from './file-upload.service';

@NgModule({
  providers: [UserService, RepoService, BookService, FileUploadService]
})
export class CoreModule {}
