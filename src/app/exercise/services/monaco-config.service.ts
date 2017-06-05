import { Injectable } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';
declare const require;
const monacoLoaderCode = require('!raw-loader!../../../assets/monaco/dev/vs/loader');

const win = window as any;
declare const monaco;


@Injectable()
export class MonacoConfigService {

  public static monacoReady = new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = monacoLoaderCode;
    document.head.appendChild(script);

    win.require.config({paths: {'vs': 'assets/monaco/dev/vs'}});

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


    // Some fake Angular deps, good for catching silly errors.
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

  sortFiles(files: FileConfig[]) {



    // Build a set of all files that are declared as deps.
    const deps = files.filter(file => file.deps)
      .reduce((set, file) => file.deps.reduce((result, dep) => result.add(dep), set), new Set());

    // Put files that are in deps first, and others in the end.
    // TODO: Write a better implementation to allow multi-level deps.
    return files.filter(file => deps.has(file.moduleName)).concat(files.filter(file => !deps.has(file.moduleName)));
  }

  createFileModels(files: FileConfig[]) {
    const models = monaco.editor.getModels();

    if (models.length) {
      models.forEach(model => model.dispose());
    }

    this.sortFiles([...files]).map(file => {
      monaco.editor.createModel(file.code, file.editorType || file.type, file.path);
    });
  }
}
