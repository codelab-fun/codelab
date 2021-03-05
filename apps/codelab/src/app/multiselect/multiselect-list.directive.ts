import {
  Directive,
  ElementRef,
  HostListener,
  InjectionToken,
  Input
} from '@angular/core';

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
  elementHasFocus = false;

  @Input() msModel: MultiselectModel<T>;

  constructor(private readonly el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  private handleClickEvent(event: MouseEvent) {
    this.elementHasFocus = this.el.nativeElement.contains(event.target);
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.elementHasFocus) {
      return;
    }

    if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      this.msModel.toggleAll();

      event.preventDefault();
    }
  }
}
