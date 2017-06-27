import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as ts from 'typescript';
import { FileConfig } from '../interfaces/file-config';
import { LoopProtectionService } from '../services/loop-protection.service';
import { ScriptLoaderService } from '../services/script-loader.service';
import * as babylon from 'babylon';
import * as babel_types from 'babel-types';
import babel_traverse from 'babel-traverse';
declare const require;

function jsScriptInjector(iframe) {
  return function (code) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = code;
    iframe.contentWindow.document.head.appendChild(script);
  };
}


function cssInjector(iframe) {
  return function (css) {
    const s = iframe.contentDocument.createElement('style');
    s.innerHTML = css;
    iframe.contentDocument.getElementsByTagName('head')[0].appendChild(s);
  };
}

interface IframeConfig {
  id: string;
  url: string;
  restart?: boolean;
  hidden?: boolean;
}

function createIframe(config: IframeConfig) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', 'allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts');
  iframe.setAttribute('frameBorder', '0');
  iframe.setAttribute('src', config.url);
  iframe.setAttribute('class', config.id);
  return iframe;
}

function injectIframe(element: any, config: IframeConfig, runner: RunnerComponent): Promise<{
  setHtml: Function,
  runCss: Function,
  register: Function,
  runMultipleFiles: Function,
  runSingleFile: Function,
  runSingleScriptFile: Function,
  loadSystemJS: Function,
  injectSystemJs: Function
}> {
  if (runner.cachedIframes[config.id]) {
    runner.cachedIframes[config.id].iframe.remove();
    delete runner.cachedIframes[config.id];
  }

  const iframe = createIframe(config);
  runner.cachedIframes[config.id] = {
    iframe: iframe
  };
  element.appendChild(iframe);
  const runJs = jsScriptInjector(iframe);
  const runCss = cssInjector(iframe);
  let index = 0;

  return new Promise((resolve, reject) => {
    if (!iframe.contentWindow) {
      return reject('iframe is gone');
    }
    iframe.contentWindow.onload = () => {
      iframe.contentWindow.console.log = function () {
        console.log.apply(console, arguments);
      };


      const setHtml = (html) => {
        iframe.contentDocument.body.innerHTML = html;
      };
      const displayError = (error, info) => {
        /*if (!runner.appConfig.config.noerrors) {
         console.log(info, error);
         }
         */
        const escaped = (document.createElement('a').appendChild(
          document.createTextNode(error)).parentNode as any).innerHTML;
        setHtml(`
            <div style = "border-top: 1px #888 dotted; padding-top: 4px; margin-top: 4px">
              Check out your browser console to see the full error!
            </div>
            <pre>${escaped}</pre>`);
      };

      iframe.contentWindow.console.error = function (error, message) {
        // handle Angular error 1/3
        displayError(error, 'Angular Error');
      };

      function register(name, code) {
        (iframe.contentWindow as any).System.register(name, [], function (exports) {
          return {
            setters: [],
            execute: function () {
              exports(code);
            }
          };
        });
      }

      resolve({
        register: register,
        injectSystemJs: () => {
          const systemCode = runner.scriptLoaderService.getScript('SystemJS');
          // SystemJS expects document.baseURI to be set on the document.
          // Since it's a readonly property, I'm faking whole document property.
          const wrappedSystemCode = `
          (function(document){
              ${systemCode}
            }({
              getElementsByTagName: document.getElementsByTagName.bind(document),
              head:document.head,
              body: document.body,
              documentElement: document.documentElement,
              createElement: document.createElement.bind(document),
              baseURI: '${document.baseURI}'
            }));
          `;
          jsScriptInjector(iframe)(wrappedSystemCode);
        },
        runSingleScriptFile: jsScriptInjector(iframe),
        runSingleFile: runJs,
        runSingleCssFile: runCss,
        setHtml: setHtml,
        loadSystemJS: (name) => {
          (iframe.contentWindow as any).loadSystemModule(name, runner.scriptLoaderService.getScript(name));
        },
        runCss: runCss,
        runMultipleFiles: (files: Array<FileConfig>) => {
          index++;

          (iframe.contentWindow as any).System.register('code', [], function (exports) {
            return {
              setters: [],
              execute: function () {
                exports('ts', ts);
                exports('babylon', babylon);
                exports('babel_traverse', babel_traverse);
                exports('babel_types', babel_types);
                files.forEach((file) => {
                  exports(file.path.replace(/[\/\.-]/gi, '_'), file.code);
                  exports(file.path.replace(/[\/\.-]/gi, '_') + '_AST', ts.createSourceFile(file.path, file.code, ts.ScriptTarget.ES5));
                });
              }
            };
          });


          files.map(file => {
            if (!file.path) {
              // tslint:disable-next-line:no-debugger
              debugger;
            }
          });

          files.filter(file => file.path.indexOf('index.html') >= 0).map((file => {
            setHtml(file.code);
          }));

          files.filter(file => file.type === 'css').map((file) => {
            runCss(file.code);
          });

          const compiled = files.filter(file => file.type === 'typescript').map((file) => {
            // Update module names
            let code = file.code;

            code = runner.loopProtectionService.protect(file.path, code);

            if (file.before) {
              code = file.before + ';\n' + code;
            }

            if (file.after) {
              code = ';\n' + code + file.after;
            }


            const moduleName = file.moduleName;

            // TODO(kirjs): Add source maps.
            return ts.transpileModule(code, {
              compilerOptions: {
                module: ts.ModuleKind.System,
                target: ts.ScriptTarget.ES5,
                experimentalDecorators: true,
                emitDecoratorMetadata: true,
                noImplicitAny: true,
                declaration: true,
                // TODO: figure out why this doesn't work
                inlineSourceMap: true,
                inlineSources: true
              },
              fileName: moduleName,
              moduleName: moduleName,
              reportDiagnostics: true
            });
          });


          const diagnostics = compiled.reduce((result, file) => {
            return result.concat(file.diagnostics);
          }, []);

          if (diagnostics.length) {
            runCss(`
              body {
                font-family: Roboto, sans-serif;               
              }
              h2 {
                font-size: 50px;
                background-color: red;
                color: white;
                margin-bottom: 0;
              }
              b {
                color: #c04e22;
                font-weight: 300;
                background-color: #ffe;
              }
            `);
            const diagnosticsHtml = diagnostics.map(diagnostic => `<li>Error in file <b>${diagnostic.file.fileName}</b>: 
            ` + diagnostic.messageText + '</li>').join('');
            setHtml(`
<h2>Errors when compiling</h2>
 <div>Look in the editor for hints to fix it.</div>
 <ul>
  ${diagnosticsHtml}
 </ul>`);
          } else {
            compiled.map((result) => {
              runJs(result.outputText);
            });

            files.filter((file) => file.bootstrap).map((file) => {
              runJs(`System.import('${file.moduleName}')`);
            });
          }

        }
      });
    };

    if (config.url === 'about:blank') {
      iframe.contentWindow.onload({} as any);
    }
  });
}


@Component({
  selector: 'slides-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css']
})
export class RunnerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() browserUseConsole: boolean;
  @Input() browserWidth: string;
  @Input() browserHeight: string;
  @Input() files: Array<FileConfig>;
  @Input() runnerType: string;
  @Output() onTestUpdate = new EventEmitter<any>();
  cachedIframes = {};
  html = `<my-app id="app"></my-app>`;
  @ViewChild('runner') runnerElement: ElementRef;
  @ViewChild('runnerConsole') runnerConsoleElement: ElementRef;
  private handleMessageBound: any;
  public System: any;

  constructor(public loopProtectionService: LoopProtectionService,
              public scriptLoaderService: ScriptLoaderService) {
    this.handleMessageBound = this.handleMessage.bind(this);
    window.addEventListener('message', this.handleMessageBound, false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.runnerElement != null || this.runnerConsoleElement != null) {
      this.runCode(changes.files.currentValue, this.runnerType);
    }
  }

  handleMessage(event): void {
    this.onTestUpdate.emit(event);
  }

  runCode(files: Array<FileConfig>, runner: string): void {
    const time = (new Date()).getTime();

    if (runner === 'Angular') {
      injectIframe(this.runnerElement.nativeElement, {
        id: 'preview', 'url': 'about:blank'
      }, this).then((sandbox) => {
        sandbox.injectSystemJs();
        sandbox.runCss(require('./inner.css'));
        sandbox.setHtml(this.html);
        sandbox.runSingleFile(this.scriptLoaderService.getScript('shim'));
        sandbox.runSingleFile(this.scriptLoaderService.getScript('zone'));
        sandbox.runSingleScriptFile(this.scriptLoaderService.getScript('system-config'));
        sandbox.loadSystemJS('ng-bundle');
        sandbox.register('reflect-metadata', Reflect);
        sandbox.runMultipleFiles(files.filter(file => !file.test));
      });

      injectIframe(this.runnerElement.nativeElement, {
        id: 'testing', 'url': 'about:blank'
      }, this).then((sandbox) => {
        sandbox.injectSystemJs();
        sandbox.runCss(require('./inner.css'));
        sandbox.setHtml(this.html);
        sandbox.runSingleFile(this.scriptLoaderService.getScript('shim'));
        sandbox.runSingleFile(this.scriptLoaderService.getScript('zone'));
        sandbox.runSingleScriptFile(this.scriptLoaderService.getScript('chai'));
        sandbox.runSingleScriptFile(this.scriptLoaderService.getScript('system-config'));
        sandbox.runSingleScriptFile(this.scriptLoaderService.getScript('mocha'));
        sandbox.runSingleFile(this.scriptLoaderService.getScript('test-bootstrap'));
        sandbox.loadSystemJS('ng-bundle');
        sandbox.register('reflect-metadata', Reflect);


        const testFiles = files
          .filter(file => !file.excludeFromTesting);
        sandbox.runMultipleFiles(testFiles);
      });
    } else if (runner === 'TypeScript') {
      injectIframe(this.runnerElement.nativeElement, {
        id: 'preview', 'url': 'about:blank'
      }, this).then((sandbox) => {
        sandbox.runCss(require('./inner.css'));
        sandbox.injectSystemJs();
        sandbox.runMultipleFiles(files.filter(file => !file.test));
      });

      injectIframe(this.runnerElement.nativeElement, {
        id: 'testing', 'url': 'about:blank'
      }, this).then((sandbox) => {
        sandbox.runCss(require('./inner.css'));
        console.log('FRAME CREATED', (new Date()).getTime() - time);
        sandbox.injectSystemJs();
        sandbox.runSingleScriptFile(this.scriptLoaderService.getScript('mocha'));
        sandbox.runSingleScriptFile(this.scriptLoaderService.getScript('chai'));
        sandbox.runSingleScriptFile(this.scriptLoaderService.getScript('test-bootstrap'));
        const testFiles = files
          .filter(file => !file.excludeFromTesting);
        sandbox.runMultipleFiles(testFiles);
      });
    } else if (runner === 'Vue') {
      injectIframe(this.runnerElement.nativeElement, {
        id: 'preview', 'url': 'about:blank'
      }, this).then((sandbox) => {
        sandbox.runCss(require('./inner.css'));
        sandbox.setHtml('<div id="app"></div>');
        sandbox.runSingleFile(this.scriptLoaderService.getScript('vue'));
        sandbox.runSingleFile(files[0].code);
      });
    } else if (runner === 'React') {
      injectIframe(this.runnerElement.nativeElement, {
        id: 'preview', 'url': 'about:blank'
      }, this).then((sandbox) => {
        sandbox.runCss(require('./inner.css'));
        sandbox.setHtml('<div id="app"></div>');
        sandbox.runSingleFile(this.scriptLoaderService.getScript('react'));
        sandbox.runSingleFile(this.scriptLoaderService.getScript('react-dom'));
        sandbox.runSingleFile(files[0].code);
      });
    } else {
      throw new Error('No runner specified');
    }
  }

  ngOnDestroy(): void {
    Object.keys(this.cachedIframes).map(key => {
      if (this.cachedIframes[key].canBeDeleted) {
        delete this.cachedIframes[key];
      }
    });
    window.removeEventListener('message', this.handleMessageBound, false);
  }

  ngAfterViewInit() {
    if (this.runnerElement == null && this.runnerConsoleElement != null) {
      this.runnerElement = this.runnerConsoleElement;
    }
    if (this.runnerElement != null) {
      this.runCode(this.files, this.runnerType);
    }

  }
}

