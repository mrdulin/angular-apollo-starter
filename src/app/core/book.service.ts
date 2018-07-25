import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import * as Q from '../graphql/queries';

@Injectable()
export class BookService {
  constructor(private apollo: Apollo) {}

  public getBooks(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: Q.BOOKS
      })
      .valueChanges.map(res => {
        return res;
      });
  }
}
