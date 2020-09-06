import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-bindec',
  templateUrl: './bindec.component.html',
  styleUrls: ['./bindec.component.css']
})
export class BindecComponent implements OnInit {
  digits = [0];
  result = [0];
  displaySign = false;
  sign = false;

  constructor() {}

  get size() {
    return this.digits.length;
  }

  get convertedValue() {
    return (
      (this.sign ? -1 : 1) *
      this.result.reduce(
        (result, value, index) => result + value * this.getBaseValue(index),
        0
      )
    );
  }

  getBaseValue(i: number) {
    return 2 ** (this.size - i - 1);
  }

  update(value) {}

  ngOnInit() {}
}
