import { Directive, HostListener, Inject, Input } from '@angular/core';
import { MULTISELECT_LIST, MultiselectListDirective } from './multiselect-list.directive';

@Directive({
  selector: '[multiselectItem]'
})
export class MultiselectItemDirective<T> {

  @Input() msItem: T;

  constructor(
    @Inject(MULTISELECT_LIST) public parentList: MultiselectListDirective<T>
  ) {

  }

  @HostListener('click', ['$event'])
  private handleClickEvent(event: MouseEvent) {
    if (event.ctrlKey || event.metaKey) {
      this.parentList.msModel.toggleSingle(this.msItem);
    } else if (event.shiftKey) {
      this.parentList.msModel.toggleContinuous(this.msItem);
    } else {
      this.parentList.msModel.selectSingle(this.msItem);
    }
  }

}
