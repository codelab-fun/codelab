import { Directive, HostListener, Input } from '@angular/core';
import { MultiselectListDirective } from './multiselect-list.directive';

@Directive({
  selector: '[multiselectItem]'
})
export class MultiselectItemDirective<T> {
  @Input() multiselectItem: T;

  constructor(private readonly parentList: MultiselectListDirective<T>) {}

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
