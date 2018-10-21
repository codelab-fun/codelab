import { Component, Input, OnInit } from '@angular/core';
import { Parser } from 'binary-parser';
import { Buffer } from 'buffer';
import { bin2hex } from '../shared';

(window as any).Buffer = Buffer;

@Component({
  selector: 'kirjs-binary-parser-demo',
  templateUrl: './binary-parser-demo.component.html',
  styleUrls: ['./binary-parser-demo.component.css']
})
export class BinaryParserDemoComponent implements OnInit {
  helpers = [
    `new Parser();`,
    `new Parser()
      .bit()
    `,

  ];
  code = `
 new Parser()
  
    `;
  binaryValue = '';
  result = '';

  constructor() {
  }

  @Input() set binary(value) {
    this.binaryValue = value.match(/.{8}/g).join(' ');
  }

  ngOnInit() {
    this.generateCode();
  }

  generateCode() {
    const parser = new Function('Parser', 'const parser = ' + this.code + '; return parser;')(Parser);
    this.result = JSON.stringify(parser.parse(Buffer.from(bin2hex(this.binaryValue.replace(/ /g, '')), 'hex')), null, '  ');
  }
}
