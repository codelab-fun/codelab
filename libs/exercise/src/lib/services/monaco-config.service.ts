import { Injectable } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
import { DepsService } from './deps-order.service';

declare const require;
const monacoLoaderCode = require('!raw-loader!monaco-editor/dev/vs/loader');

const win = window as any;
declare const monaco;

@Injectable()
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

  constructor(private depsService: DepsService) {
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

    // monaco.languages.typescript.typescriptDefaults._onDidChange.fire(monaco.languages.typescript.typescriptDefaults);

    // monaco.languages.typescript.typescriptDefaults.addExtraLib(``, 'asdafsdfdasdad');
    // debugger;
    // console.log(monaco.languages.typescript.typescriptDefaults._extraLibs);

    //       .forEach(function(t) {
    //   monaco.languages.typescript.typescriptDefaults._extraLibs[t.path] = t.content
    // }),
    //   Object.keys(this.store.getState().project.dependencies).concat(Nl).forEach(function(t) {
    //     monaco.languages.typescript.typescriptDefaults._extraLibs["zuz_/" + t] = function(t) {
    //       return 'import {  } from "' + t + '"'
    //     }(t)
    //   }),
    //   monaco.languages.typescript.typescriptDefaults.updateExtraLibs(),
    //   monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    //     noSemanticValidation: !1,
    //     noSyntaxValidation: !1
    //   }),
    //
  }

  sortFiles(files: FileConfig[]) {
    // TODO(kirjs): Find a better way to handle this.
    try {
      return this.depsService.order(files);
    } catch (e) {
      return files;
    }
  }

  createFileModels(files: FileConfig[]) {
    const models = monaco.editor.getModels();

    if (models.length) {
      models.forEach(model => model.dispose());
    }

    this.sortFiles([...files]).map(file => {
      monaco.editor.createModel(
        file.code,
        file.editorType || file.type,
        /** Math.random() + */ file.path
      );
    });
  }
}

export function monacoReady() {
  return MonacoConfigService.monacoReady;
}
