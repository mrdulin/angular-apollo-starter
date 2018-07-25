import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../core/file-upload.service';

import * as Q from '../graphql/queries';
@Component({
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {
  public uploads: any[] = [];
  public loading = false;

  constructor(private fileUploadService: FileUploadService) {}

  ngOnInit() {
    this.loading = true;
    this.fileUploadService.queryAll().subscribe(
      data => {
        console.log('data: ', data);
        const {
          data: { uploads },
          loading
        } = data;
        this.uploads = uploads;
        this.loading = loading;
      },
      err => console.log(err)
    );
  }
}
