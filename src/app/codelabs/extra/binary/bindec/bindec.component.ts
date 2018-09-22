import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slides-bindec',
  templateUrl: './bindec.component.html',
  styleUrls: ['./bindec.component.css']
})
export class BindecComponent implements OnInit {

  values = Array.from(new Array(8)).map((a, i) => ({
    value: 2 ** (7 - i),
    checked: true
  }));

  constructor() {
  }

  get dec() {
    return this.values.reduce((a, value) => {
      return a + (Number(value.checked) * value.value);
    }, 0);
  }

  update(value){
    this.values = Array.from(new Array(8)).map((a, i) => ({
      value: 2 ** (7 - i),
      checked: !!(value & 2 ** (7 - i))
    }));
  }

  ngOnInit() {
  }

}
