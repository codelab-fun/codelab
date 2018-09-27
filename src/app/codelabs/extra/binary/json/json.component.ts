import { Component, OnInit } from '@angular/core';

function strToBin(s: string) {
  return Array.from(new TextEncoder().encode(s)).map(a => (a.toString(2) as any).padStart(8, 0)).join('')
}

const zerozero = '0000000000000000';

@Component({
  selector: 'slides-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {
  code = `{
  "name": "Sarah",
  "test": true,
  "something": 1212
}`;

  match = [];

  index = 0;
  private binaries: any[];
  private binariesLength: number;
  private codeLength: number;

  constructor() {
  }

  handleLineChange({value: code, lineNumber}) {
    this.binaries = [
      {
        binary: '',
        comment: `we don't need to encode curly braces :)`
      }
    ];

    let val;
    try {
      val = JSON.parse(code);
    } catch (e) {
      return;
    }

    this.binaries = this.binaries.concat(Object.keys(val).map((key) => {
      const value = val[key];
      const data: any = {};

      if (typeof value === 'boolean') {
        data.binary = Number(value);
        data.type = 'boolean';
        data.comment = 'just one bit!';
      } else if (typeof value === 'number') {
        data.binary = value.toString(2);
        data.type = 'number';
        data.comment = 'Number';
      } else if (typeof value === 'string') {
        data.binary = strToBin(value)
        data.display = value.split('').map((value => ({
          value,
          bin: (value.charCodeAt(0).toString(2) as any).padStart(8, 0)

        })));
        data.type = 'string';
        data.comment = 'String!';
      }
      data.value = value;

      return data;
    }));

    this.match = code.split('\n').map((a, i) => ({match: a.trim(), className: `highlight-${i}`}))
    this.index = lineNumber - 1;
    this.codeLength = code.replace(/\s/g, '').length
    this.binariesLength = Math.ceil(this.binaries.map(a => a.binary.toString().length).reduce((a, b) => a + b, 0) / 8);
  }

  ngOnInit() {
  }


}
