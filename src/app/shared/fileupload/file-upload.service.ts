import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';

import * as M from '../../graphql/mutations';

@Injectable()
export class FileUploadService {
  constructor(private apollo: Apollo) {}
  public upload(file: File): Observable<FetchResult> {
    return this.apollo
      .mutate({
        mutation: M.SINGLE_UPLOAD,
        variables: {
          file
        }
      })
      .map(res => {
        return res;
      });
  }
}
