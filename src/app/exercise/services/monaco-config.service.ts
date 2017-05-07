import { Injectable } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
declare const require;
const win = window as any;
declare const monaco;

@Injectable()
export class MonacoConfigService {

  /**
   * Bootstraps Monaco code editor.
   *
   * This depends on monaco loader script tag in index.html having the same version as line 17.
   * <script type="text/javascript" src="https://unpkg.com/monaco-editor@0.8.3/min/vs/loader.js"></script>
   */
  public static monacoReady = new Promise((resolve) => {
    win.require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs' }});

    win.require(['vs/editor/editor.main'], () => {
      MonacoConfigService.configureMonaco();
      resolve(monaco);
    });
  });

  public monaco: any;

  static configureMonaco() {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      experimentalDecorators: true,
      allowNonTsExtensions: true,
      noImplicitAny: true,
    });


    // Some fake angular deps, good for catching silly errors.
    // I'd still prefer to have the full version.
    const core = `
        declare module '@angular/core' {
          export class EventEmitter<T> {
            emit: function(param: T);
          }

          export interface ComponentConfig {
            selector: string;
            template?: string;
            templateUrl?: string;
          }

          export interface PipeConfig {
            name: string;
          }

          export function Component(config: ComponentConfig);

          export interface NgModuleConfig {
            imports?: any[];
            declarations?: any[];
            providers?: any[];
            bootstrap?: any[];
          }
          export function NgModule(config: NgModuleConfig);
          export function Injectable();
          export function Output();
          export function Input();
          export function Pipe(config: PipeConfig);
          export interface PipeTransform {
            transform(value: string);
          }

        }

        declare var x = 1;

        declare module '@angular/platform-browser' {
          export class BrowserModule {}
        }

        declare module '@angular/platform-browser-dynamic' {
          export class Platform {
            bootstrapModule: function();
          }
          export function platformBrowserDynamic(): Platform;
        }

        declare module '@angular/compiler' {
          export class ResourceLoader {
          }
        }


        `;

    monaco.languages.typescript.typescriptDefaults.addExtraLib(core, 'node_modules/@angular/core.d.ts');
  }

  constructor() {
    this.monaco = monaco;
  }

  createFileModels(files: FileConfig[]) {
    const models = monaco.editor.getModels();

    if (models.length) {
      models.forEach(model => model.dispose());
    }

    files.map(file => {
      monaco.editor.createModel(file.code, file.type, file.path);
    });
  }
}
