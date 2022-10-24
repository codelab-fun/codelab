import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export function markFormControlsAsTouched(
  formGroup: UntypedFormGroup | UntypedFormArray
): void {
  Object.values(formGroup.controls).forEach((control) => {
    if (control instanceof UntypedFormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (
      control instanceof UntypedFormGroup ||
      control instanceof UntypedFormArray
    ) {
      markFormControlsAsTouched(control);
    }
  });
}

export function validatorMaxTags(maximumTags: number) {
  return (control: AbstractControl) => {
    return Array.isArray(control.value) && control.value.length > maximumTags
      ? { tagsError: `Number of tags should be below ${maximumTags + 1}` }
      : null;
  };
}

export function validatorMaxLines(lines: number) {
  return (control: AbstractControl) => {
    return control.value.split('\n').length > lines
      ? { linesError: `This field shouldn't have more than ${lines} lines` }
      : null;
  };
}
