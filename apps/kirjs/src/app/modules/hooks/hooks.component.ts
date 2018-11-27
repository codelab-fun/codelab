import { Component } from '@angular/core';

declare const require;
const useStateComponent = require('!!raw-loader!./use-state/use-state.component.ts');
const bootstrap = require('!!raw-loader!./use-state/bootstrap.ts');
const useStateTemplate = require('!!raw-loader!./use-state/use-state.component.html');
const useStateDirective = require('!!raw-loader!./use-state/use-state.directive.ts');
const hooksTestModule = require('!!raw-loader!./use-state/fake-use-state.module.ts');


@Component({
  selector: 'slides-hooks',
  templateUrl: './hooks.component.html',
  styleUrls: ['./hooks.component.scss']
})
export class HooksComponent {
  code = {
    'use-state.component.ts': useStateComponent,
    'use-state.component.html': useStateTemplate,
    'use-state.directive.ts': useStateDirective,
    'bootstrap.ts': bootstrap,
    'use-state.module.ts': hooksTestModule,
    'index.html': '<use-state-test></use-state-test>'

  };

  fontSize = 30;

}
