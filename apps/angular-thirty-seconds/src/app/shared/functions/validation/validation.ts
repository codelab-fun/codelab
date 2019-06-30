import { FormArray, FormControl, FormGroup } from '@angular/forms';

export function markFormControlsAsTouched(formGroup: FormGroup | FormArray): void {
  Object.values(formGroup.controls).forEach(
    (control) => {
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        markFormControlsAsTouched(control);
      }
    });
}
