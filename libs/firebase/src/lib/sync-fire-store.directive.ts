import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncFireStore]'
})
export class SyncFireStoreDirective {
  constructor() {}
}
