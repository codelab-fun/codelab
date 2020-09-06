import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { StackFunction } from '../stack-game.component';

@Component({
  selector: 'slides-stack-function',
  templateUrl: './stack-function.component.html',
  styleUrls: ['./stack-function.component.css']
})
export class StackFunctionComponent implements OnInit {
  @Input() func: StackFunction;

  @HostBinding('class.disabled')
  @Input()
  disabled = false;
  constructor() {}

  ngOnInit() {}
}
