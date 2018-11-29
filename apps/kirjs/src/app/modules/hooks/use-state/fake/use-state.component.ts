import { Component } from '@angular/core';

// Some fake stuff to make the AOT compiler relax.
@Component({
  selector: 'use-state-test',
  template: 'lol'
})
export class UseStateComponent {
}
