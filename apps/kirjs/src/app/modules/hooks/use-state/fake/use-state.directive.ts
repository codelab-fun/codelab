import { Directive, OnChanges } from '@angular/core';

// Some fake stuff to make the AOT compiler relax.
@Directive({
  selector: '[lol]'
})
export class UseStateDirective {

}
