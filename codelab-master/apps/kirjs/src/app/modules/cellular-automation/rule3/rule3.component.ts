import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-rule3',
  templateUrl: './rule3.component.html',
  styleUrls: ['./rule3.component.css']
})
export class Rule3Component implements OnInit, OnChanges {
  after: Array<Array<string | number>>;
  before: Array<Array<string | number>>;

  @Input() rule = 0;
  @Input() indexes = false;
  @Input() arrow = false;

  constructor() {}

  ngOnChanges() {
    this.after = (256 + this.rule)
      .toString(2)
      .substr(1)
      .split('')
      .map(Number)
      .map(a => ['x', a, 'x']);
    // tslint:disable
    this.before = this.after
      .map((v, i) =>
        (8 + i)
          .toString(2)
          .substr(1)
          .split('')
      )
      .reverse();
  }

  ngOnInit() {}
}
