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
    this.repo$ = this.repoService.getRepoByNameAndOwner(owner, name, 10);
    this.repoSubscription = this.repo$.subscribe((data: any) => {
      this.repo = data.repository;
      console.log('this.repo: ', this.repo);
    });
  }

  ngOnDestroy() {
    this.repoSubscription.unsubscribe();
  }
}
