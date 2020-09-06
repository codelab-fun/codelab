import {
  AfterViewInit,
  Directive,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

/* tslint:disable */
@Directive({ selector: '[matHideMe]' })
export class HideMeDirective implements AfterViewInit {
  constructor(
    private parentTab: MatTab,
    private tabs: MatTabGroup,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    (tabs as any).selectChange.subscribe(({ tab }: { tab: MatTab }) => {
      this.toggleContentDisplay(tab === parentTab);
    });
  }

  toggleContentDisplay(isDisplayed: boolean) {
    if (isDisplayed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngAfterViewInit() {
    this.toggleContentDisplay(
      this.parentTab.position === this.tabs.selectedIndex
    );
  }
}
