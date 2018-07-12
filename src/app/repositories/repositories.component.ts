import { Component, OnInit } from '@angular/core';

import { userQuery } from '../core/user.gql';
import { UserService } from '../core/user.service';

@Component({
  templateUrl: './repositories.component.html'
})
export class RepositoriesComponent implements OnInit {
  repos: any[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getRepos('mrdulin').subscribe((result: any) => {
      this.repos = result.nodes;
    });
  }
}
