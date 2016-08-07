import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import * as Q from '../graphql/queries';

@Injectable()
export class AdService {
  constructor(private apollo: Apollo) {}

  public getAds() {
    return this.apollo
      .watchQuery({
        query: Q.ADS
      })
      .valueChanges.map(res => {
        return res;
      });
  }
}
