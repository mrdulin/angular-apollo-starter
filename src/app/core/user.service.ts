import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

import gql from 'graphql-tag';

const userQuery = gql`
  query($login: String!, $first: Int) {
    user(login: $login) {
      avatarUrl
      login
      name
      followers(first: $first) {
        nodes {
          name
          login
        }
        totalCount
      }
    }
  }
`;

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
        return {
          user: res.data.user,
          ...res
        };
      });
  }
}
