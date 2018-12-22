import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { createSystemJsSandbox } from '../../../../exercise/src/lib/runners/utils/sandbox';
import { ScriptLoaderService } from '../../../../exercise/src/lib/services/script-loader.service';
import { compileTsFiles } from '../runner/compile-ts-files';
import { compileTemplates } from '../runner/prepare-templates';
import { PreviewWindowType } from '../../../../browser/src/lib/preview-window/preview-window.component';
import { addMetaInformation } from '../../../../../apps/angular-presentation/src/app/codelabs/components/angular-test-runner/angular-test-runner.component';

declare const require;

function experimentRequestAnimationFrame() {
  return new Promise((resolve) => {
      requestAnimationFrame(resolve);
    }
  )
}

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
  @Input() bootstrap = 'bootstrap';
  @Input() ui: PreviewWindowType = 'browser';

  constructor(public scriptLoaderService: ScriptLoaderService) {
  }

  fullUrl() {
    return (this.urlBase + this.url).replace(this.hiddenUrlPart, '');
  }

  async runCode() {

    const sandbox = await createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': 'about:blank'
    });

    this.runAngular(sandbox);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.runCode();
  }

  async runAngular(sandbox) {
    console.log(this.code);

    await (experimentRequestAnimationFrame);
    sandbox.setHtml(this.code['index.html'] || '<app-root></app-root><my-app></my-app>');

    sandbox.evalJs(this.scriptLoaderService.getScript('shim'));
    sandbox.evalJs(this.scriptLoaderService.getScript('zone'));
    sandbox.evalJs(this.scriptLoaderService.getScript('system-config'));
    sandbox.evalJs(this.scriptLoaderService.getScript('ng-bundle'));
    sandbox.addDep('reflect-metadata', Reflect);
    const transpileOutputs = compileTsFiles(this.code);

    transpileOutputs.map(file => sandbox.evalJs(file.outputText));
    compileTemplates(this.code, sandbox);

    Object.entries(this.code).filter(([moduleName]) => moduleName.match(/\.css/))
      .forEach(([moduleName, code]) => {
        sandbox.addCss(code);
      });
    addMetaInformation(sandbox, this.code);

    debugger;
    sandbox.evalJs(`System.import('${this.bootstrap}')`);
  }


  // TODO(kirjs): Actually track
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
