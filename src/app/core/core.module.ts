import { NgModule } from '@angular/core';

import { UserService } from './user.service';
import { RepoService } from './repo.service';
import { BookService } from './book.service';
import { FileUploadService } from './file-upload.service';
import { CommentService } from './comment.service';
import { AuthService } from './auth.service';
import { SubscriptionService } from './subscription.service';
import { AdService } from './ad.service';
@NgModule({
  providers: [
    UserService,
    RepoService,
    BookService,
    FileUploadService,
    CommentService,
    AuthService,
    SubscriptionService,
    AdService
  ]
})
export class CoreModule {}
