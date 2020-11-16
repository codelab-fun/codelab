import { Component } from '@angular/core';

@Component({
  selector: 'codelab-root',
  template: `
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>
  `,

  styles: [
    `
      .wrapper {
        margin: 0 60px;
        padding: 0 20px;
      }

      :host ::ng-deep {
        font-family: 'Helvetica Neue', sans-serif;
        font-weight: 300;
        padding: 0 20px;
        display: block;
      }
    `
  ]
})
export class AppComponent {}
