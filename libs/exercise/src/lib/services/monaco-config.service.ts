import { Injectable } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
import { DepsService } from './deps-order.service';

declare const require;
const monacoLoaderCode = require('!raw-loader!../../../assets/monaco/dev/vs/loader');

const win = window as any;
declare const monaco;

@Injectable()
export class MonacoConfigService {
  public static monacoReady = new Promise(resolve => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = monacoLoaderCode;
    document.head.appendChild(script);

    win.require.config({paths: {vs: 'assets/monaco/dev/vs'}});

    win.require(['vs/editor/editor.main'], () => {
      MonacoConfigService.configureMonaco();
      resolve(monaco);
    });
  });
  static initialized: boolean = false;
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
      experimentalDecorators: true,
      allowNonTsExtensions: true,
      noImplicitAny: true
    });

    // Some fake Angular deps, good for catching silly errors.
    // I'd still prefer to have the full version.

    // const core = require('!!raw-loader!../../../assets/runner/ng-dts/bundles/@angular/core.d.ts');
    // monaco.languages.typescript.typescriptDefaults.addExtraLib(core, 'node_modules/@angular/core.d.ts');

    const dependencies = [
      '@angular/core',
      '@angular/common',
      '@angular/forms',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      'rxjs/operators',
      'rxjs'
    ];
    dependencies.forEach(dependency => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        require(`!!raw-loader!../../../assets/runner/ng-dts/bundles/${dependency}.d.ts`), dependency);
      // monaco.languages.typescript.typescriptDefaults._extraLibs[`${dependency}.d.ts`] =
      //   require(`!!raw-loader!../../../assets/runner/ng-dts/bundles/${dependency}.d.ts`);
    });

    // monaco.languages.typescript.typescriptDefaults.updateExtraLibs();

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
