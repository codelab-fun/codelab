import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { createSystemJsSandbox } from '../utils/sandbox';
import { ScriptLoaderService } from '../../services/script-loader.service';
//import { transform } from '@babel/standalone';
// TODO(kirjs);
const transform = (a, b) => {
  return {
    code: 'alert("FIx babel transform")'
  }
};
declare const require;


@Component({
  selector: 'slides-react-preview-runner',
  templateUrl: './react-runner.component.html',
  styleUrls: ['./react-runner.component.css']
})
export class ReactRunnerComponent implements OnChanges {
  @ViewChild('runner') runnerElement: ElementRef;
  @Input() code = '';
  @Input() url = '/assets/runner/';
  @Input() urlBase = location.origin;
  @Input() hiddenUrlPart = '/assets/runner';

  constructor(public scriptLoaderService: ScriptLoaderService) {
  }

  fullUrl() {
    return (this.urlBase + this.url).replace(this.hiddenUrlPart, '');
  }

  run() {
    createSystemJsSandbox(this.runnerElement.nativeElement, {
      id: 'testing', 'url': 'about:blank'
    }).then((sandbox) => {
      this.runReact(sandbox, this.code);
    });
  }

  ngOnChanges() {
    this.run();
  }

  runReact(sandbox, code) {
    sandbox.addCss(require('../inner.css'));
    sandbox.setHtml('<div id="app"></div>');
    sandbox.evalJs(this.scriptLoaderService.getScript('react'));
    sandbox.evalJs(this.scriptLoaderService.getScript('react-dom'));
    sandbox.evalJs(transform(code, {presets: ['react']}).code);
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
