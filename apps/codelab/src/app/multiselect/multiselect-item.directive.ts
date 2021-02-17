import { Directive, HostListener, Inject, Input } from '@angular/core';
import { MULTISELECT_LIST, MultiselectListDirective } from './multiselect-list.directive';

@Directive({
  selector: '[multiselectItem]'
})
export class MultiselectItemDirective {

  @Input() item: number;

  constructor(
    @Inject(MULTISELECT_LIST) public parentList: MultiselectListDirective
  ) {

  }

  @HostListener('click', ['$event'])
  private handleClickEvent(event: MouseEvent) {
    this.parentList.multiselectService.select(event, this.item);
  }

}
