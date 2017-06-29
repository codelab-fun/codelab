import { Component } from '@angular/core';
/* tslint:disable */
@Component({
  selector: 'my-app',
  template: `
    <nav md-tab-nav-bar>
      <a md-tab-link
         *ngFor="let tab of tabs"
         [routerLink]="tab.link">
        {{ tab.label }}
      </a>
    </nav>

    <router-outlet></router-outlet>`
})
export class AppComponent {
  tabs = [{
    link: '',
    label: 'Tab 1'
  }, {
    link: 'danger',
    label: 'Danger'
  }];
}
