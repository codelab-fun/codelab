import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  static validatorMaxTags(maximumTags: number) {
    return (control: AbstractControl) => {
      return Array.isArray(control.value) && control.value.length > maximumTags ? {tagsError: `Number of tags should be below ${maximumTags + 1}`} : null;
    };
  }

  static validatorMaxLines(lines: number) {
    return (control: AbstractControl) => {
      return control.value.split('\n').length > lines ? {linesError: `This field shouldn't have more than ${lines} lines`} : null;
    };
  }
}
