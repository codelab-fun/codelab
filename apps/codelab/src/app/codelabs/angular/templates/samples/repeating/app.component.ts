import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Puppies names:</h1>
    ???
    <!--  Need to repeat puppies here  -->
  `
})
export class AppComponent {
  puppies = ['Schumann', 'Mendelssohn', 'Bach'];
}
