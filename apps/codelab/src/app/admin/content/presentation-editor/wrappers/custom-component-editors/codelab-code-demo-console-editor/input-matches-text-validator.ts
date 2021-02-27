import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[validateInputMatchesText]',
  providers: [{provide: NG_VALIDATORS, useExisting: InputMatchesTextValidatorDirective, multi: true}]
})
export class InputMatchesTextValidatorDirective implements Validator {
  @Input('validateInputMatchesText') code: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value === null) {
      return null;
    }

    let regex: RegExp;
    try {
      regex = new RegExp(control.value);
    } catch {
      return {'invalidRegex': true};
    }

    if (!regex.test(this.code)) {
      return {'regexDoesNotMatch': true};
    }


    return null;
  }
}
