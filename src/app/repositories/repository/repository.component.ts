import { Component, OnInit, OnDestroy } from '@angular/core';

// https://stackoverflow.com/questions/44205664/unable-to-inject-activatedroutesnapshot
import { Router, ActivatedRoute } from '@angular/router';

import { RepoService } from '../../core/repo.service';
import { UserService } from '../../core/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  templateUrl: './repository.component.html'
})
export class RepositoryComponent implements OnInit, OnDestroy {
  repo$: Observable<any>;
  repoSubscription: Subscription;
  repo: any = {};

  topicEditing = false;
  topicsString: string[];

  private newTopics: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private repoService: RepoService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const name: string = this.route.snapshot.paramMap.get('name');
    const owner = 'mrdulin';
    this.repo.name = name;
    this.repo$ = this.repoService.getTopics(owner, name, 10);
    this.repoSubscription = this.repo$.subscribe((data: any) => {
      this.repo = data.repository;
      console.log('this.repo: ', this.repo);
    });
  }

  ngOnDestroy() {
    this.repoSubscription.unsubscribe();
  }

  public onEditTopics() {
    console.log('onEditTopics');
    this.topicEditing = true;
    this.topicsString = this.repo.repositoryTopics.nodes.map(node => node.topic.name);
  }

  public onEditTopicsDone(newTopicsString: string) {
    console.log('onEditTopicsDone');
    this.topicEditing = false;
    // TODO: mutation

    this.newTopics = newTopicsString.split(',').map(topicString => topicString.trim());
    console.log('newTopics: ', this.newTopics);

    this.repoService
      .updateTopics({
        repositoryId: this.repo.id,
        topicNames: this.newTopics,
        clientMutationId: '123'
      })
      .subscribe(
        data => {
          console.log('update topics success: ', data);
        },
        err => {
          console.log('update topics failed: ', err);
        }
      );
  }

  public onEditTopicsEnter(newTopicsString: string) {
    console.log('newTopicsString: ', newTopicsString);
    // TODO: update view
  }
}
