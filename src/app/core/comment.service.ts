import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';

import * as Q from '../graphql/queries';
import * as M from '../graphql/mutations';
import * as S from '../graphql/subscriptions';

@Injectable()
export class CommentService {
  constructor(private apollo: Apollo) {}
  public getAll(): Observable<ApolloQueryResult<any>> {
    return this.apollo.watchQuery({ query: Q.GET_ALL }).valueChanges;
  }

  public create(content: string) {
    return this.apollo.mutate({
      mutation: M.CREATE_COMMENT,
      variables: {
        content
      },
      update: (proxy: DataProxy, mutationResult: FetchResult<any>) => {}
    });
  }

  public subscribe() {
    return this.apollo.subscribe({ query: S.ADD });
  }
}
