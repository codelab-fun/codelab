import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-rule3',
  templateUrl: './rule3.component.html',
  styleUrls: ['./rule3.component.css']
})
export class Rule3Component implements OnInit {
  after: Array<Array<string | number>>;
  before: Array<Array<string | number>>;

  @Input() rule = 0;
  @Input() arrow = false;

  constructor() {}

  ngOnInit() {
    console.log(this.rule, 1);
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
}
