import { AfterViewInit, Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { MdTab, MdTabGroup } from '@angular/material';

/* tslint:disable */
@Directive(
  {selector: '[mdHideMe]'}
)
export class HideMeDirective implements AfterViewInit {
  constructor(private parentTab: MdTab,
              private tabs: MdTabGroup,
              private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>) {
    tabs.selectChange.subscribe(({tab}: { tab: MdTab }) => {
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
    this.toggleContentDisplay(this.parentTab.position === this.tabs.selectedIndex);
  }
}
