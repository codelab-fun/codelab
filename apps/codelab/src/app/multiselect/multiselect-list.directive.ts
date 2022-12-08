import { Directive, Input } from '@angular/core';

import { MultiselectModel } from './multiselect-model';

@Directive({
  selector: '[multiselectList]'
})
export class MultiselectListDirective<T> {
  @Input() multiselectList: MultiselectModel<T>;
}
