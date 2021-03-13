import { Directive, InjectionToken, Input } from '@angular/core';

import { MultiselectModel } from './multiselect-model';

export const MULTISELECT_LIST = new InjectionToken<
  MultiselectListDirective<any>
>('MultiselectList');

@Directive({
  selector: '[multiselectList]',
  providers: [
    {
      provide: MULTISELECT_LIST,
      useExisting: MultiselectListDirective
    }
  ]
})
export class MultiselectListDirective<T> {
  @Input() multiselectList: MultiselectModel<T>;
}
