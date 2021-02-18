import { Directive, ElementRef, EventEmitter, HostListener, InjectionToken, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MultiselectService } from './multiselect.service';

export const MULTISELECT_LIST = new InjectionToken<MultiselectListDirective>('MultiselectList');

@Directive({
  selector: '[multiselectList]',
  providers: [
    {
      provide: MULTISELECT_LIST,
      useExisting: MultiselectListDirective
    },
    MultiselectService
  ]
})
export class MultiselectListDirective implements OnInit, OnChanges, OnDestroy {
  elementHasFocus = false;
  @Input() items = [];
  @Input() select = [];
  @Output() selectChange = new EventEmitter<number[]>();
  @Output() reset = new EventEmitter();
  private readonly onDestroy = new Subject<void>();

  constructor(
    public readonly multiselectService: MultiselectService,
    private readonly el: ElementRef
  ) {

  }

  ngOnInit() {
    this.multiselectService.selection$
      .pipe(takeUntil(this.onDestroy))
      .subscribe((selection) => {
        this.selectChange.emit(selection);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('select' in changes) {
      if (changes.select.firstChange && changes.select.currentValue[0] >= 0) {
        const firstSelectIndex = changes.select.currentValue[0];

        this.multiselectService.addToSelection(firstSelectIndex);
        this.multiselectService.lastSingleSelection = firstSelectIndex;
      }
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  @HostListener('document:click', ['$event'])
  private handleClickEvent(event: MouseEvent) {
    this.elementHasFocus = this.el.nativeElement.contains(event.target);


    // TODO need a better way to reset
    // if (!this.elementHasFocus) {
    //   this.multiselectService.resetSelection(this.currentSlideIndex);
    // }
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.elementHasFocus) {
      return;
    }

    if (event.key === 'a' && (event.ctrlKey || event.metaKey)) {
      const allIndexes = this.items.map((_, index) => index);
      this.multiselectService.selectAll(allIndexes);

      event.preventDefault();
    }
  }

}
