import { Pipe, PipeTransform } from '@angular/core';
import slugify from 'slugify';

@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {

  transform(value: string): any {
    return slugify(value);
  }

}
