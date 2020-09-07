import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { StackFunction } from '../stack-game.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'slides-stack-function-button',
  templateUrl: './stack-function-button.component.html',
  styleUrls: ['./stack-function-button.component.css']
})
export class StackFunctionButtonComponent {
  @Input() func: StackFunction;
  @Input() disabled = false;
}
