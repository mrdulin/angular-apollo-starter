import { Component, OnInit, OnDestroy } from '@angular/core';

import { CommentService } from '../core/comment.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html'
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  comments: any[] = [];

  getAllLoading: Boolean = true;
  getAllError: Error;

  getAllSub: Subscription;
  addCommentSub: Subscription;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getAllSub = this.commentService.getAll().subscribe({
      next: ({ data, loading }) => {
        this.getAllLoading = loading;
        this.comments = data.comments;
      },
      error: err => (this.getAllError = err),
      complete: () => {}
    });

    this.addCommentSub = this.commentService.subscribe().subscribe(({ data: { addComment } }) => {
      if (addComment) {
        this.comments = this.comments.concat(addComment);
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllSub.unsubscribe();
    this.addCommentSub.unsubscribe();
  }

  create() {
    const content = 'comment content';
    this.commentService.create(content).subscribe(res => {
      console.log('create: ', res);
    });
  }
}
