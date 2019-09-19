import { Component } from '@angular/core';
import { wasmParser } from './wasm-parser';
import { strToBin } from '../../binary/parser/utils';

declare const require;
// if the extention is .wasm, webpack is being stupid.
const wasm = require('!binary-loader!./test._wasm');

@Component({
  selector: 'kirjs-wasm-binary',
  templateUrl: './wasm-binary.component.html',
  styleUrls: ['./wasm-binary.component.css']
})
export class WasmBinaryComponent {
  readonly binary = strToBin(wasm);
  readonly parser = wasmParser();
}
