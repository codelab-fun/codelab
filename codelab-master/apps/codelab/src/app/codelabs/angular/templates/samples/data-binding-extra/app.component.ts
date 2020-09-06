import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly name = 'Camille Pissarro';
  isSpecial = true;
}
