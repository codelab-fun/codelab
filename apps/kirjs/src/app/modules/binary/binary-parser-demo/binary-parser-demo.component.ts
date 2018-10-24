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
  @Input() helpers;
  code = '';

  @Input() filterClassName = /./;
  result = '';
  @Input() binary = '';

  constructor() {
  }

  ngOnInit() {
    this.code = this.helpers[0];
    this.generateCode();
  }

  generateCode() {
    const parser = new Function('Parser', 'const parser = ' + this.code + '; return parser;')(Parser);
    this.result = JSON.stringify(parser.parse(Buffer.from(bin2hex(this.binary), 'hex')), null, '  ');
  }
}
