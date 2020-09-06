import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNameBabel'
})
export class ShortNameBabelPipe implements PipeTransform {
  transform(value: string): any {
    return value.replace(/[a-z]+/g, '');
  }
}
