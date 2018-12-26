import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { createSystemJsSandbox } from '../../../../../../../libs/exercise/src/lib/runners/utils/sandbox';
import { compileTemplates } from '../../../../../../../libs/code-demos/src/lib/runner/prepare-templates';
import { ScriptLoaderService } from '../../../../../../../libs/exercise/src/lib/services/script-loader.service';
import { addMetaInformation } from '../angular-test-runner/angular-test-runner.component';

interface CodeFiles {
  [key: string]: string;
}

@Component({
  selector: 'new-smart-runner',
  templateUrl: './new-smart-runner.component.html',
  styleUrls: ['./new-smart-runner.component.css']
})
export class NewSmartRunnerComponent implements OnDestroy, OnInit, OnChanges {
  @Input() code: CodeFiles = {};
  @Input() jsFiles: CodeFiles = {};
  @Input() bootstrap: string;
  @Input() url = 'about:blank';
  changedFilesSubject = new BehaviorSubject<Record<string, string>>({});
  @ViewChild('runner') runnerElement: ElementRef;

  private subscription: SubscriptionLike;

  constructor(public scriptLoaderService: ScriptLoaderService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code) {
      this.changedFilesSubject.next(changes.code.currentValue);
    }
  }

  async ngOnInit() {
    console.log(this.url);
    const sandbox = await createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': this.url
    });

    sandbox.setHtml(this.code['index.html'] || '<app-root></app-root><my-app></my-app><div class="error"></div>');
    sandbox.evalJs(this.scriptLoaderService.getScript('shim'));
    sandbox.evalJs(this.scriptLoaderService.getScript('zone'));
    sandbox.evalJs(this.scriptLoaderService.getScript('system-config'));
    sandbox.evalJs(this.scriptLoaderService.getScript('ng-bundle'));
    sandbox.addDep('reflect-metadata', Reflect);


    Object.entries(this.code).filter(([moduleName]) => moduleName.match(/\.css/))
      .forEach(([moduleName, code]) => {
        sandbox.addCss(code);
      });

    compileTemplates(this.code, sandbox);

    this.subscription = this.changedFilesSubject.subscribe(files => {
      addMetaInformation(sandbox, files);

      Object.entries(files).filter(([path]) => path.match(/\.js$/)).forEach(([path, code]) => {
        sandbox.evalJs(`System.registry.delete(System.normalizeSync('./${path.replace('.js', '')}'));`);
        sandbox.evalJs(code);
      });


      if (!this.bootstrap) {
        debugger;
      }
      sandbox.evalJs(`System.import('${this.bootstrap}')`);
    });

    this.trackIframeUrl(sandbox.iframe);
  }

  trackIframeUrl(iframe) {
    const interval = window.setInterval(() => {
      if (iframe.contentWindow) {
        const url = iframe.contentWindow.location.href.replace('assets/runner/', ''); // .replace(this.urlBase, '')
        if (this.url !== url) {
          this.url = url;
        }
      } else {
        window.clearInterval(interval);
      }
    }, 200);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
