import { Component, OnInit } from '@angular/core';

import { RepoService } from '../../core/repo.service';

@Component({
  templateUrl: './repository-list.component.html'
})
export class RepositoryListComponent implements OnInit {
  repoes: any[];
  loginName = 'mrdulin';
  first = 1;

  constructor(private repoService: RepoService) {}

  ngOnInit() {
    this.repoService.getRepoes(this.loginName, this.first).subscribe((result: any) => {
      this.repoes = result.repoes.edges;
    });
  }

  private onLoadMore() {
    console.log('onLoadMore');
    const lastRepo = this.repoes[this.repoes.length - 1];
    const after: string = lastRepo.cursor;
    this.repoService.getRepoesMore(this.loginName, this.first, after);
  }
}
