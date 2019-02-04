import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-rule8',
  templateUrl: './rule8.component.html',
  styleUrls: ['./rule8.component.css']
})
export class Rule8Component implements OnInit {
  after: Array<Array<Array<string | number>>>;
  before: Array<Array<Array<string | number>>>;

  @Input() rule = 0;
  @Input() arrow = false;

  constructor() {}

  ngOnInit() {
    const numbers = new Array(1024).fill(0, 0, 1024);
    this.after = numbers.map(a => [[Math.round(Math.random())]]);
    this.before = numbers.map((v, i) => {
      const arr = (1024 + i).toString(2).substr(1);
      return [
        arr.substr(0, 3).split(''),
        arr.substr(3, 3).split(''),
        arr.substr(6, 3).split('')
      ];
    });
  }
}
