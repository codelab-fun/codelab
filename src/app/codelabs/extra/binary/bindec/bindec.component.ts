import { Component, Input, OnInit } from '@angular/core';


const views = {
  uint8: {
    values: Array.from(new Array(8)).map((a, i) => ({
      value: 2 ** (7 - i),
      checked: true
    })),
    toDec() {
      this.value = this.values.reduce((a, value) => {
        return a + (Number(value.checked) * value.value);
      }, 0);
    },
    update(value) {
      this.view.values = Array.from(new Array(8)).map((a, i) => ({
        value: 2 ** (7 - i) as any,
        checked: !!(value & 2 ** (7 - i))
      }));
    }
  },
  int8: {
    value: 0,
    values: [
      {
        value: '-' as any,
        checked: false,
      }
    ].concat(Array.from(new Array(7)).map((a, i) => ({
      value: 2 ** (6 - i),
      checked: true
    })) as any),
    toDec() {
      this.value = this.values.slice(1).reduce((a, value) => {
        return a + (Number(value.checked) * value.value);
      }, 0) * (this.values[0].checked ? -1 : 1);
    },
    update(value) {
      value = Number(value);

      this.values = [
        {
          value: '-',
          checked: value < 0
        }
      ].concat(Array.from(new Array(7)).map((a, i) => ({
        value: 2 ** (6 - i),
        checked: !!(value & 2 ** (6 - i))
      })) as any);
    }
  }
}

@Component({
  selector: 'slides-bindec',
  templateUrl: './bindec.component.html',
  styleUrls: ['./bindec.component.css']
})
export class BindecComponent implements OnInit {
  private view = views.int8;

  constructor() {
  }

  @Input()
  set param(p: string) {
    this.view = views[p];
    this.view.toDec();
  }

  update(value) {

  }

  ngOnInit() {
  }

}
