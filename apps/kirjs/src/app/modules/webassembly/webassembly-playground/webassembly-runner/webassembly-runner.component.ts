import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

declare const require;

// TODO(kirjs): Find a better way.
const wabt = (function() {
  // Needed to make umd properly export stuff.
  const exports = {};
  const module = {};
  const code = require('!raw-loader!wabt');
  return eval(code)();
})();

function wat2wasm(wat) {
  const module = wabt.parseWat('main.wasm', wat);
  const binary = module.toBinary({
    log: false,
    canonicalize_lebs: false,
    relocatable: false,
    write_debug_names: false
  });
  return binary.buffer;
}

interface Result {
  type: 'error' | 'result';
  value: string;
}

@Component({
  selector: 'kirjs-webassembly-runner',
  templateUrl: './webassembly-runner.component.html',
  styleUrls: ['./webassembly-runner.component.css']
})
export class WebassemblyRunnerComponent implements OnChanges {
  @Input() webAssemblyCode: string;
  @Input() jsCode: string;

  @ViewChild('canvas', { static: true }) canvas;

  readonly result$ = new Subject<Result>();

  saveWasmFile() {
    function saveByteArray(name, byte) {
      const blob = new Blob([byte], { type: 'application/wasm' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = name;
      link.click();
    }

    saveByteArray('result.wasm', wat2wasm(this.webAssemblyCode));
  }

  async ngOnChanges(changes) {
    const canvas = this.canvas.nativeElement;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    try {
      const wasm = wat2wasm(this.webAssemblyCode);

      const setResult = (result: string) => {
        this.result$.next({
          type: 'result',
          value: result
        });
      };

      const setError = (error: string) => {
        this.result$.next({
          type: 'error',
          value: error
        });
      };

      eval(`
      (async function(){
      try {
        const code = new Uint8Array([${wasm.toString()}]).buffer;
        ${this.jsCode}
          setResult(await run(code, canvas));
        } catch(e){
          setError(e.message);
        }
      }())
    `);
    } catch (e) {
      this.result$.next({
        type: 'error',
        value: e.message
      });
    }
  }
}
