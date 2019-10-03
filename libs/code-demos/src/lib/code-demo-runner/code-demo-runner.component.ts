import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { SubscriptionLike } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { createSystemJsSandbox } from '@codelab/code-demos/src/lib/shared/sandbox';
import { compileTemplates } from '../runner/prepare-templates';
import { ScriptLoaderService } from '@codelab/code-demos/src/lib/shared/script-loader.service';
import { addMetaInformation } from '../shared/helpers';

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
  selector: 'code-demo-runner',
  templateUrl: './code-demo-runner.component.html',
  styleUrls: ['./code-demo-runner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeDemoRunnerComponent
  implements OnDestroy, AfterViewInit, OnChanges {
  @Input() code: CodeFiles = {};
  @Input() jsFiles: CodeFiles = {};
  @Input() bootstrap: string;
  @Input() url = 'about:blank';
  @Input() ui = 'browser';
  changedFilesSubject = new BehaviorSubject<Record<string, string>>({});
  @ViewChild('runner', { static: false }) runnerElement: ElementRef;
  presets = ['angular'];
  private subscription: SubscriptionLike;

  constructor(
    public scriptLoaderService: ScriptLoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  get displayUrl() {
    if (this.url === '/assets/runner') {
      return 'http://localhost:4200';
    }
    return this.url.replace('assets/runner', '');
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

  async ngAfterViewInit() {
    const sandbox = await createSystemJsSandbox(
      this.runnerElement.nativeElement,
      {
        id: 'testing',
        url: this.url
      }
    );

    sandbox.setHtml(
      this.code['index.html'] ||
        '<app-root></app-root><my-app></my-app><div class="error"></div>'
    );

    this.presets.forEach(preset =>
      presets[preset](sandbox, this.scriptLoaderService)
    );

    Object.entries(this.code)
      .filter(([moduleName]) => moduleName.match(/\.css/))
      .forEach(([moduleName, code]) => {
        sandbox.addCss(code);
      });

    compileTemplates(this.code, sandbox);

    this.subscription = this.changedFilesSubject.subscribe(files => {
      addMetaInformation(sandbox, files);

      if (files['index.html']) {
        sandbox.setHtml(files['index.html']);
      }

      const jsFiles = Object.entries(files).filter(([path]) =>
        path.match(/\.js$/)
      );
      const hasErrors = jsFiles.some(([path, code]) => {
        sandbox.evalJs(
          `System.registry.delete(System.normalizeSync('./${path.replace(
            '.js',
            ''
          )}'));`
        );

        try {
          sandbox.evalJs(code);
        } catch (e) {
          const [errorLabel] = e.toString().split('\r\n');
          console.groupCollapsed(errorLabel);
          console.log(e);
          console.groupEnd();
          return true;
        }
        return false;
      });

      Object.entries(files)
        .filter(([path]) => path.match(/\.css$/))
        .forEach(([path, code]) => {
          // TODO(kirjs): Consider deleting old CSS.
          sandbox.addCss(code);
        });

      if (jsFiles.length) {
        if (!this.bootstrap) {
          console.error('Bootstrap missing');
        }

        if (!hasErrors) {
          sandbox.evalJs(`System.import('${this.bootstrap}')`);
        }
      }
    });

    this.trackIframeUrl(sandbox.iframe);
  }

  trackIframeUrl(iframe) {
    const interval = window.setInterval(() => {
      if (iframe.contentWindow) {
        const url = iframe.contentWindow.location.href.replace(
          'assets/runner/',
          ''
        ); // .replace(this.urlBase, '')
        if (this.url !== url) {
          this.url = url;
          this.cdr.markForCheck();
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
