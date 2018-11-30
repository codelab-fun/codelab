import { Directive, EmbeddedViewRef, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

interface UseStateContext<T = any> {
  $implicit: {
    get: T,
    set: (value: T) => void;
    detectChanges: Function;
  };
}

@Directive({
  selector: '[useState]'
})
export class UseStateDirective implements OnChanges, OnDestroy {
  @Input() useStateDefault: any;

  private context: UseStateContext = {} as any;
  private embeddedViewRef: EmbeddedViewRef<UseStateContext>;
  private value: any;

  constructor(
    private templateRef: TemplateRef<UseStateContext>,
    private vcr: ViewContainerRef
  ) {
    Object.defineProperty(this.context, '$implicit', {
      get: () => this.value,
      set: (value) => {
        this.value = value;
        if (this.embeddedViewRef) {
          this.embeddedViewRef.detectChanges();
        }
      }
    });

    this.embeddedViewRef = this.vcr.createEmbeddedView(this.templateRef, this.context);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.useStateDefault) {
      this.value = this.useStateDefault;
    }
  }

  ngOnDestroy(): void {
    this.vcr.clear();
    this.embeddedViewRef.destroy();
    this.embeddedViewRef = null;
  }
}
