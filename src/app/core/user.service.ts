import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import { userQuery } from '../core/user.gql';

@Injectable()
export class UserService {
  constructor(private apollo: Apollo) {}

  public query(login: string): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: userQuery,
        variables: {
          login,
          first: 10
        }
      })
      .valueChanges.map(res => {
        const { data, ...rest } = res;
        return {
          user: data.user,
          ...rest
        };
      });
  }

  public getRepos(login: string): Observable<any[]> {
    return this.query(login).map(data => {
      return data.user.repositories;
    });
  }
}
