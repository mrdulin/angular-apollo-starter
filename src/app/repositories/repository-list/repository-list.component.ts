import { Component, OnInit } from '@angular/core';

import { userQuery } from '../../core/user.gql';
import { UserService } from '../../core/user.service';

@Component({
  templateUrl: './repository-list.component.html'
})
export class RepositoryListComponent implements OnInit {
  repos: any[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getRepos('mrdulin').subscribe((result: any) => {
      this.repos = result.nodes;
    });
  }
}
