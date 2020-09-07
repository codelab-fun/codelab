import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[kirjs-finish]',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {
  @Input() position = { x: 0, y: 0 };

  constructor() {}

  ngOnInit() {}
}
