import { AfterViewInit, Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material';

/* tslint:disable */
@Directive({ selector: '[matHideMe]' })
export class HideMeDirective {
  constructor() {}
}
