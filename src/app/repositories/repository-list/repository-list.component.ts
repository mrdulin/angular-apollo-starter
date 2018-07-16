import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RepoService } from '../../core/repo.service';

@Component({
  templateUrl: './repository-list.component.html'
})
export class RepositoryListComponent implements OnInit, OnDestroy {
  repoLoading: boolean;
  repoes: any[];
  repoesSub: Subscription;

  moreLoading: boolean;

  loginName = 'mrdulin';
  first = 3;

  private prefetched = false;

  constructor(private repoService: RepoService) {}

  ngOnInit() {
    this.repoLoading = true;
    this.repoesSub = this.repoService.getRepoes(this.loginName, this.first).subscribe((result: any) => {
      this.repoLoading = result.loading;
      this.repoes = result.repoes.edges;
    });
  }

  ngOnDestroy() {
    this.repoesSub.unsubscribe();
  }

  public prefetchRepo(name: string) {
    if (!this.prefetched) {
      console.log('prefetchRepo');
      this.repoService.prefetchTopics(this.loginName, name, 10);
      this.prefetched = true;
    }
  }

  public onLoadMore() {
    console.log('onLoadMore');
    const lastRepo = this.repoes[this.repoes.length - 1];
    const after: string = lastRepo.cursor;

    this.moreLoading = true;
    this.repoService
      .getRepoesMore(this.loginName, this.first, after)
      .then(result => {
        this.moreLoading = result.loading;
      })
      .catch(err => {
        this.moreLoading = false;
        console.log('repo load more error: ', err);
      });
  }
}
