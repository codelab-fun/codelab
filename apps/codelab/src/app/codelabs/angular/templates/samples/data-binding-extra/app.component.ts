import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'my-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  readonly person = { emailAddress: 'lol@lol.com', birthday: '4/1' };
  isSpecial = true;
  helpLabel = 'help';
}
