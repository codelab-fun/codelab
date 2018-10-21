import { Component, OnInit } from '@angular/core';
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

  binary = '10101010101101010101011010101010110101010101101010101011010101010110101010101101010101011010101010110101010101'.match(/.{8}/g).join(' ');
  result = '';

  constructor() {
  }

  ngOnInit() {
    this.generateCode();
  }

  generateCode() {
    const parser = new Function('Parser', 'const parser = ' + this.code + '; return parser;')(Parser);
    this.result = JSON.stringify(parser.parse(Buffer.from(bin2hex(this.binary.replace(/ /g, '')), 'hex')), null, '  ');
  }
}
