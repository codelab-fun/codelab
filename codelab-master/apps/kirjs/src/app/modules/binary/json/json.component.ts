import { Component, Input, OnInit } from '@angular/core';

function strToBin(s: string) {
  return Array.from(new TextEncoder().encode(s))
    .map(a => a.toString(2).padStart(8, '0'))
    .join('');
}

@Component({
  selector: 'kirjs-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {
  @Input() code = `{
  "name": "Sarah",
  "test": true,
  "something": 1212
}`;

  match = [];

  index = 0;
  binaries: any[];
  binariesLength: number;
  codeLength: number;
  schema: { value: string }[] = [];
  schemaLength: number;
  error: string;

  constructor() {}

  handleLineChange({ value: code, lineNumber }) {
    this.binaries = [
      {
        binary: '',
        comment: `we don't need to encode curly braces :)`
      }
    ];

    let val;
    try {
      val = JSON.parse(code);
      this.error = '';
    } catch (e) {
      this.error = e.message;
      return;
    }

    this.binaries = this.binaries.concat(
      Object.keys(val).map(key => {
        const value = val[key];
        const data: any = {};

        data.key = key;
        data.key = key;
        if (typeof value === 'boolean') {
          data.binary = Number(value);
          data.type = 'boolean';
          data.comment = 'just one bit!';
        } else if (typeof value === 'number') {
          data.binary = value
            .toString(2)
            .padStart(Math.ceil(Math.log2(value + 1) / 8) * 8, '0');
          data.type = 'number';
          data.comment = 'Number';
        } else if (typeof value === 'string') {
          data.binary = strToBin(value) + '0000000000000000';
          data.display = value
            .split('')
            .map(value => ({
              value,
              bin: (value.charCodeAt(0).toString(2) as any).padStart(8, 0)
            }))
            .concat({ value: 'Separator', bin: '000000000000000000' });
          data.type = 'string';
          data.comment = 'String!';
        }
        data.value = value;

        return data;
      })
    );

    this.schema = [
      {
        value: 'message {',
        className: ''
      }
    ]
      .concat(
        this.binaries.slice(1).map((b, i) => ({
          value: `    ${b.type} ${b.key} = ${i};`,
          className: 'highlight-' + i
        }))
      )
      .concat({
        value: '}',
        className: ''
      });

    this.schemaLength = this.schema.map(s => s.value).join('').length;
    this.match = code
      .split('\n')
      .map((a, i) => ({ match: a.trim(), className: `highlight-${i}` }));
    this.index = lineNumber - 1;
    this.codeLength = code.replace(/\s/g, '').length;
    this.binariesLength = Math.ceil(
      this.binaries
        .map(a => a.binary.toString().length)
        .reduce((a, b) => a + b, 0) / 8
    );
  }

  ngOnInit() {}
}
