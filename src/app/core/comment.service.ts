import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';

import * as Q from '../graphql/queries';
import * as M from '../graphql/mutations';
import * as S from '../graphql/subscriptions';

@Injectable()
export class CommentService {
  public commentRef: QueryRef<any>;

  constructor(private apollo: Apollo) {}
  public getAll(): Observable<ApolloQueryResult<any>> {
    this.commentRef = this.apollo.watchQuery({ query: Q.GET_ALL });
    return this.commentRef.valueChanges;
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
