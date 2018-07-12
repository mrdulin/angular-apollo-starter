import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { RepoQuery } from './repo.gql';
import { Observable } from 'rxjs';

@Injectable()
export class RepoService {
  constructor(private apollo: Apollo) {}

  public getRepoByNameAndOwner(owner: string, name: string, first?: number): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: RepoQuery,
        variables: {
          owner,
          name,
          first
        }
      })
      .valueChanges.map((res: any) => {
        const { data, ...rest } = res;
        return { repository: data.repository, ...rest };
      });
  }
}
