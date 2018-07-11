import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'select'
})
export class SelectPipe implements PipeTransform {
  transform(obj: any, name: string = '') {
    if (name && obj && obj.data) {
      return name.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : undefined;
      }, obj.data);
    }
  }
}
