import { Component } from '@angular/core';
import { FileUploadService } from '../../core/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
  constructor(private fileUploadService: FileUploadService) {}

  onChange(evt) {
    const { files, validity } = evt.target;
    if (validity.valid) {
      this.upload(files);
    }
  }

  private upload(files: FileList) {
    this.fileUploadService.upload(files).subscribe(
      data => {
        console.log('upload successfully');
      },
      err => console.log(err)
    );
  }
}
