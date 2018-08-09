import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Subscription } from 'rxjs/Subscription';

import { CommentService } from '../core/comment.service';
import { SubscriptionService } from '../core/subscription.service';
import { AuthService } from '../core/auth.service';

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

  wsc: SubscriptionClient;

  constructor(
    private commentService: CommentService,
    private subService: SubscriptionService,
    private authService: AuthService
  ) {
    this.wsc = this.subService.getWSClient();
    this.subscribe = this.subscribe.bind(this);
  }

  ngOnInit(): void {
    this.getAllSub = this.commentService.getAll().subscribe({
      next: ({ data, loading }) => {
        this.getAllLoading = loading;
        this.comments = data.comments;
      },
      error: err => (this.getAllError = err),
      complete: () => {}
    });

    this.wsc.onReconnected(this.subscribe);
    this.wsc.onConnected(this.subscribe);
  }

  subscribe() {
    if (this.addCommentSub) {
      this.addCommentSub.unsubscribe();
    }
    this.addCommentSub = this.commentService.subscribe().subscribe(({ data: { addComment } }) => {
      if (addComment) {
        this.comments = this.comments.concat(addComment);
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllSub.unsubscribe();
    if (this.addCommentSub) {
      this.addCommentSub.unsubscribe();
    }
  }

  create() {
    const content = 'comment content';
    this.commentService.create(content).subscribe(res => {
      console.log('create: ', res);
    });
  }

  refreshToken() {
    this.authService.refreshJwt().then(() => {
      this.wsc.close(false, false);
    });
  }

  deleteAll() {
    this.commentService.deleteAll().subscribe({
      next: res => console.log('delete all: ', res)
    });
  }
}
