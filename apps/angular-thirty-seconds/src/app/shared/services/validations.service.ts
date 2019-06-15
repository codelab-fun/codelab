import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  markFormControlsAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(
      (control) => {
        if (control instanceof FormControl) {
          control.markAsTouched({onlySelf: true});
        } else if (control instanceof FormGroup || control instanceof FormArray) {
          this.markFormControlsAsTouched(control);
        }
      });
  }

  validatorMaxLines(lines: number) {
    return (control: AbstractControl) => {
      return control.value.split('\n').length > lines ? {linesError: `This field shouldn't have more than ${lines} lines`} : null;
    };
  }

  validatorMaxTags(maximumTags: number) {
    return (control: AbstractControl) => {
      return Array.isArray(control.value) && control.value.length > maximumTags ? {tagsError: `Number of tags should be below ${maximumTags + 1}`} : null;
    };
  }

}
