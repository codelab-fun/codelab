import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input
} from '@angular/core';
import {
  MULTISELECT_LIST,
  MultiselectListDirective
} from './multiselect-list.directive';

@Directive({
  selector: '[multiselectItem]'
})
export class MultiselectItemDirective<T> {
  @Input() multiselectItem: T;

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(MULTISELECT_LIST) public parentList: MultiselectListDirective<T>
  ) {}

  @HostListener('click', ['$event'])
  private handleClickEvent(event: MouseEvent) {
    if (event.ctrlKey || event.metaKey) {
      this.parentList.multiselectList.toggleSingle(this.multiselectItem);

      return;
    }

    if (event.shiftKey) {
      this.parentList.multiselectList.toggleContinuous(this.multiselectItem);

      return;
    }

    this.parentList.multiselectList.selectSingle(this.multiselectItem);
  }
}
