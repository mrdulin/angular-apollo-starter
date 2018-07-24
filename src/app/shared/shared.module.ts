import { NgModule } from '@angular/core';

import { SelectPipe } from './select.pipe';
import { TooltipComponent } from './tooltip/tooltip.component';
import { FileUploadComponent } from './fileupload/file-upload.component';

@NgModule({
  declarations: [SelectPipe, TooltipComponent, FileUploadComponent],
  exports: [SelectPipe, TooltipComponent, FileUploadComponent]
})
export class SharedModule {}
