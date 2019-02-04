import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirjs-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {
  @Input() param = 0;
  @Input() code = '';
  start = 0;

  memory = Array.from({ length: 64 }).fill({
    value: 0,
    type: 'empty'
  }) as any;

  constructor() {}

  allocValues(values, classes = []) {
    let i = 0;
    for (let x = 0; x < values.length; x++) {
      const v = values[x];
      for (let y = 0; y < v.length; y++) {
        this.memory[i] = {
          value: v[y],
          type:
            (y === v.length - 1 ? 'cell-number-end' : 'number') +
            ' ' +
            (classes[x] || '')
        };

        i++;
      }
    }
  }

  highlightBoolean(i: number) {
    this.memory[i].type =
      (this.memory[i].type || '') + ' selected cell-selected';
  }

  highlightShouldBe(i: number) {
    this.memory[i].type = (this.memory[i].type || '') + ' selected2';
  }

  highlightNumber(i: number) {
    for (let y = 0; y < 8; y++) {
      this.memory[i * 8 + y] = {
        value: Math.round(Math.random()),
        type: y === 7 ? 'number-end-highlight' : 'number-highlight'
      };
    }
  }

  ngOnInit() {
    if (this.param === 0) {
      return;
    }

    if (this.param === 1) {
      this.allocValues('00000'.split(''));
    }

    if (this.param === 2) {
      this.allocValues('00000'.split(''));
      this.highlightBoolean(3);
    }

    if (this.param === 3) {
      this.allocValues([
        '00000000',
        '00000000',
        '00000000',
        '00000000',
        '00000000'
      ]);
    }

    if (this.param === 4) {
      this.allocValues([
        '00000000',
        '00000000',
        '00000000',
        '00000000',
        '00000000'
      ]);
      this.highlightNumber(3);
    }

    if (this.param === 5) {
      this.allocValues('10101'.split(''));
      this.highlightBoolean(3);
    }

    const bools = '10101'.split('');
    const num = '00000011';
    bools[1] = num;

    if (this.param === 6) {
      this.allocValues(bools);
      this.highlightBoolean(3);
      this.highlightShouldBe(10);
    }

    if (this.param === 7) {
      const typedArray = [
        '001',
        '1',
        '010',
        num,
        '001',
        '0',
        '001',
        '0',
        '001',
        '1',
        '000'
      ];
      this.allocValues(typedArray, [
        ' bool',
        '',
        ' number',
        '',
        ' bool',
        '',
        ' bool',
        ' cell-selected ',
        ' bool'
      ]);
    }

    const typedArray = [
      '011110',
      '010010',
      '101101',
      '110001',
      '110101',
      '001',
      '1',
      '010',
      num,
      '001',
      '0',
      '001',
      '0',
      '001',
      '1'
    ];
    if (this.param === 8) {
      this.allocValues(typedArray, [
        ' link',
        ' link',
        ' link',
        ' link',
        ' link',
        ' bool',
        '',
        ' number',
        '',
        ' bool',
        '',
        ' bool',
        '',
        ' bool'
      ]);
    }

    if (this.param === 9) {
      const typedArrayWidhBool = [...typedArray, '001', '0'];

      typedArrayWidhBool[1] = '111001';

      this.allocValues(typedArrayWidhBool, [
        ' link',
        ' link',
        ' link',
        ' link highlight',
        ' link',
        ' bool',
        '',
        ' bool',
        '',
        ' bool',
        '',
        ' bool',
        '',
        ' bool',
        '',
        ' bool'
      ]);
    }
  }
}
