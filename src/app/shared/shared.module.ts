import { NgModule } from '@angular/core';
import { SelectPipe } from './select.pipe';

@NgModule({
  declarations: [SelectPipe],
  exports: [SelectPipe]
})
export class SharedModule {}
