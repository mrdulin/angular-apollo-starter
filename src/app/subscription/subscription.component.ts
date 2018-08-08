import { Component, OnInit } from '@angular/core';

import { CommentService } from '../core/comment.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html'
})
export class SubscriptionComponent implements OnInit {
  comments: any[] = [];

  getAllLoading: Boolean = false;
  getAllError: Error;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.getAllLoading = true;
    this.commentService.getAll().subscribe(({ data, loading }) => {
      this.getAllLoading = loading;
      this.comments = data.comments;
    }, err => (this.getAllError = err));

    this.commentService.subscribe().subscribe(({ data: { addComment } }) => {
      if (addComment) {
        this.comments = this.comments.concat(addComment);
      }
    });
  }

  create() {
    const content = 'comment content';
    this.commentService.create(content).subscribe(res => {
      console.log('create: ', res);
    });
  }
}
