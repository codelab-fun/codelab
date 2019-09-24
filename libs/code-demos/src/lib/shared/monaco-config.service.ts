import { Injectable } from '@angular/core';

declare const require;
const monacoLoaderCode = require('!raw-loader!monaco-editor/dev/vs/loader');

const win = window as any;
declare const monaco;

@Injectable({
  providedIn: 'root'
})
export class MonacoConfigService {
  public static monacoReady = new Promise(resolve => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = monacoLoaderCode;
    document.head.appendChild(script);

    win.require.config({ paths: { vs: 'assets/monaco/dev/vs' } });

    win.require(['vs/editor/editor.main'], () => {
      MonacoConfigService.configureMonaco();
      resolve(monaco);
    });
  });
  static initialized = false;
  public monaco: any;

  constructor() {
    this.monaco = monaco;
  }

  static configureMonaco() {
    if (MonacoConfigService.initialized) {
      return;
    }
    MonacoConfigService.initialized = true;
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      experimentalDecorators: true,
      allowNonTsExtensions: true,
      noImplicitAny: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ['node_modules/@types']
    });

    monaco.languages.registerFoldingRangeProvider('typescript', {
      provideFoldingRanges: function(model, context, token) {
        const code = model.getValue();

        const numberOfImports = code
          .substr(0, code.lastIndexOf('import {'))
          .split('\n').length;
        if (numberOfImports > 1) {
          return [
            {
              start: 1,
              end: numberOfImports,
              kind: monaco.languages.FoldingRangeKind.Imports
            }
          ];
        }
      }
    });

    // Some fake Angular deps, good for catching silly errors.
    // I'd still prefer to have the full version.

    // const core = require('!!raw-loader!../../../assets/runner/ng-dts/bundles/@angular/core.d.ts');
    // monaco.languages.typescript.typescriptDefaults.addExtraLib(core, 'node_modules/@angular/core.d.ts');

    // this.addExtraLibs();
    this.addExtraLibsTest();

    // monaco.languages.typescript.typescriptDefaults.updateExtraLibs();
  }

  private static addExtraLibsTest() {
    let files = require('!!!raw-loader!../../../assets/runner/ng-dts/files.txt');
    files = JSON.parse(files);

    files.forEach(file => {
      // monaco.languages.typescript.typescriptDefaults._extraLibs[file.path] = file.content;
      // console.log(file.path);
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        file.content,
        'file:///' + file.path
      );
    });
  }
}

export function monacoReady() {
  return MonacoConfigService.monacoReady;
}
