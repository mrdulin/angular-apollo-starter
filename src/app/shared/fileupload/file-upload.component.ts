import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-file-upload',
  providers: [FileUploadService],
  templateUrl: './file-upload.component.html'
})
export class FileUploadComponent {
  constructor(private fileUploadService: FileUploadService) {}

  onChange(files: FileList) {
    console.log(files);
    const file = files[0];
    this.upload(file);
  }

  private upload(file) {
    this.fileUploadService.upload(file).subscribe(
      data => {
        console.log('upload successfully');
      },
      err => console.log(err)
    );
  }
}
