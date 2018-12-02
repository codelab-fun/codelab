import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { createSystemJsSandbox } from '../../../../exercise/src/lib/runners/utils/sandbox';
import { ScriptLoaderService } from '../../../../exercise/src/lib/services/script-loader.service';
import { compileTsFiles } from '../runner/compile-ts-files';
import { compileTemplates } from '../runner/prepare-templates';

declare const require;


@Component({
  selector: 'slides-simple-angular-runner',
  templateUrl: './simple-angular-runner.component.html',
  styleUrls: ['./simple-angular-runner.component.css']
})
export class SimpleAngularRunnerComponent implements OnChanges {
  @ViewChild('runner') runnerElement: ElementRef;
  @Input() code: Record<string, string> = {};
  @Input() run: string;
  @Input() url = '/assets/runner/';
  @Input() urlBase = location.origin;
  @Input() hiddenUrlPart = '/assets/runner';

  constructor(public scriptLoaderService: ScriptLoaderService) {
  }

  fullUrl() {
    return (this.urlBase + this.url).replace(this.hiddenUrlPart, '');
  }

  runCode() {
    createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': 'about:blank'
    }).then((sandbox) => {
      this.runAngular(sandbox, this.code);
    });
  }

  ngOnChanges() {
    this.runCode();
  }

  runAngular(sandbox, code) {
    sandbox.setHtml(this.code['index.html'] || '<app-root></app-root><my-app></my-app>');
    sandbox.evalJs(this.scriptLoaderService.getScript('shim'));
    sandbox.evalJs(this.scriptLoaderService.getScript('zone'));
    sandbox.evalJs(this.scriptLoaderService.getScript('system-config'));
    sandbox.evalJs(this.scriptLoaderService.getScript('ng-bundle'));
    sandbox.addDep('reflect-metadata', Reflect);
    compileTsFiles(this.code).map(file => sandbox.evalJs(file.outputText));
    compileTemplates(this.code, sandbox);


    Object.entries(this.code).filter(([moduleName]) => moduleName.match(/\.css/))
      .forEach(([moduleName, code]) => {
        sandbox.addCss(code);
      });

    sandbox.evalJs(`System.import('bootstrap')`);
  }

  trackIframeUrl(iframe) {
    const interval = window.setInterval(() => {
      if (iframe.contentWindow) {
        const url = iframe.contentWindow.location.href.replace(this.urlBase, '');
        if (this.url !== url) {
          this.url = url;
        }
      } else {
        window.clearInterval(interval);
      }
    }, 200);
  }

}
