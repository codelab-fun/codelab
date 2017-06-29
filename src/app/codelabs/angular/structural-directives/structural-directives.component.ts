import { Component } from '@angular/core';
import { bootstrap, builder, exercise, html } from '../../../exercise/helpers/helpers';

declare const require;

@Component({
  selector: 'slides-structural-directives',
  templateUrl: './structural-directives.component.html',
  styleUrls: ['./structural-directives.component.css', './bsod.css']
})
export class StructuralDirectivesComponent {
  code = {
    ngIf: {
      files: [
        exercise('app.component', require('!!raw-loader!./samples/ng-if/app.component.ts')),
        exercise('alert.component', require('!!raw-loader!./samples/ng-if/alert.component.ts')),
        exercise('my-ng-if.directive', require('!!raw-loader!./samples/ng-if/my-ng-if.directive.ts')),
        exercise('app.module', require('!!raw-loader!./samples/ng-if/app.module.ts')),
        bootstrap('main', builder.bootstrap()),
      ]
    },
    ngIfSolved: {
      files: [
        exercise('app.component', require('!!raw-loader!./samples/ng-if-solved/app.component.ts')),
        exercise('my-ng-if.directive', require('!!raw-loader!./samples/ng-if-solved/my-ng-if.directive.ts')),
        exercise('app.module', require('!!raw-loader!./samples/ng-if-solved/app.module.ts')),
        bootstrap('main', builder.bootstrap()),
      ]
    },
    materialTabs: {
      files: [
        html(require('!!raw-loader!./samples/material-tabs/app.html'), require('!!raw-loader!./samples/material-tabs/app.solved.html')),
        exercise('app.component', require('!!raw-loader!./samples/material-tabs/app.component.ts')),
        exercise('alert.component', require('!!raw-loader!./samples/material-tabs/alert.component.ts')),
        exercise('app.module', require('!!raw-loader!./samples/material-tabs/app.module.ts')),
        exercise('break-my-computer.component', require('!!raw-loader!./samples/material-tabs/break-my-computer.component.ts')),
        bootstrap('main', builder.bootstrap()),
      ]
    },
    materialTabsStructuralDirective: {
      files: [
        html(require('!!raw-loader!./samples/material-tabs-structural-directive/app.html'),
          require('!!raw-loader!./samples/material-tabs-structural-directive/app.solved.html')),
        exercise('app.component', require('!!raw-loader!./samples/material-tabs-structural-directive/app.component.ts')),
        exercise('hideme.directive', require('!!raw-loader!./samples/material-tabs-structural-directive/hideme.directive.ts'),
          require('!!raw-loader!./samples/material-tabs-structural-directive/hideme.directive.solved.ts')),
        exercise('alert.component', require('!!raw-loader!./samples/material-tabs-structural-directive/alert.component.ts')),
        exercise('app.module', require('!!raw-loader!./samples/material-tabs-structural-directive/app.module.ts')),
        bootstrap('main', builder.bootstrap()),
      ]
    },
    microSyntax: {
      files: [
        html(`<div *ngFor="let x of 122"></div>`),
        bootstrap('main', require('!!raw-loader!./samples/micro-syntax/ms.ts'))
      ]
    },
    mdTabNavBar: {
      files: [
        exercise('app.component', require('!!raw-loader!./samples/md-tab-nav-bar/app.component.ts')),
        exercise('alert.component', require('!!raw-loader!./samples/md-tab-nav-bar/alert.component.ts')),
        exercise('tab.component', require('!!raw-loader!./samples/md-tab-nav-bar/tab.component.ts')),
        exercise('app.module', require('!!raw-loader!./samples/md-tab-nav-bar/app.module.ts')),
        bootstrap('main', builder.bootstrap()),
      ]
    },
  };

  constructor() {

  }
}
