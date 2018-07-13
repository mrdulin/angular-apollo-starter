import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import * as Q from '../graphql/queries';

@Injectable()
export class UserService {
  constructor(private apollo: Apollo) {}

  public query(login: string): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: Q.USER,
        variables: { login }
      })
      .valueChanges.map(res => {
        const { data, ...rest } = res;
        return {
          user: data.user,
          ...rest
        };
      });
  }
}
