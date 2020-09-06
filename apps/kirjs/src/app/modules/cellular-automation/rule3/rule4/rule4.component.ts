import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'kirjs-rule4',
  templateUrl: './rule4.component.html',
  styleUrls: ['./rule4.component.css']
})
export class Rule4Component implements OnChanges {
  @Input() test;
  before: string[][];
  after: number[];

  ngOnChanges() {
    this.after = this.test.table.map(a => (a === 'enable' ? 1 : 0));

    this.before = new Array(8)
      .fill(0)
      .map((v, i) =>
        (8 + i)
          .toString(2)
          .substr(1)
          .split('')
      )
      .reverse();
  }
}
