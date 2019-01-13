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

const presets = {
  angular(sandbox, scriptLoaderService) {
    sandbox.evalJs(scriptLoaderService.getScript('shim'));
    sandbox.evalJs(scriptLoaderService.getScript('zone'));
    sandbox.evalJs(scriptLoaderService.getScript('system-config'));
    sandbox.evalJs(scriptLoaderService.getScript('ng-bundle'));
  },
  react(sandbox, scriptLoaderService) {
    // TODO(kirjs): Make it work
    // sandbox.addCss(require('../inner.css'));
    sandbox.setHtml('<div id="app"></div>');
    sandbox.evalJs(scriptLoaderService.getScript('react'));
    sandbox.evalJs(scriptLoaderService.getScript('react-dom'));
    // sandbox.evalJs(transform(code, {presets: ['react']}).code);
  }
};

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
  @Input() ui = 'browser';
  changedFilesSubject = new BehaviorSubject<Record<string, string>>({});
  @ViewChild('runner') runnerElement: ElementRef;
  presets = ['angular'];
  private subscription: SubscriptionLike;

  constructor(public scriptLoaderService: ScriptLoaderService) {
  }

  @Input('presets')
  public set setPresets(presets: any) {
    if (typeof presets === 'string') {
      presets = presets.split(',');
    }
    this.presets = presets.filter(a => a);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.code) {
      this.changedFilesSubject.next(changes.code.currentValue);
    }
  }

  async ngOnInit() {
    const sandbox = await createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': this.url
    });

    sandbox.setHtml(this.code['index.html'] || '<app-root></app-root><my-app></my-app><div class="error"></div>');

    this.presets.forEach(preset => presets[preset](sandbox, this.scriptLoaderService));

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

      Object.entries(files).filter(([path]) => path.match(/\.css$/)).forEach(([path, code]) => {
        // TODO(kirjs): Consider deleting old CSS.
        sandbox.addCss(code);
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
