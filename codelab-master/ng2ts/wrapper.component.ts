import {Component} from '@angular/core';

@Component({
  selector: 'my-wrapper',
  // Just using template here to avoid extra files.
  // Please don't do this at home.
  template: `
    <my-toggle-panel>
    <div class='description'>Either show me</div>
    <div class='extra'>Or show me</div>
    </my-toggle-panel>
    `
})
export class WrapperComponent {

}
