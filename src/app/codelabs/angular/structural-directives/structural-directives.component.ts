import { Component } from '@angular/core';
import { bootstrap, builder, exercise } from '../../../exercise/helpers/helpers';
declare const require;

@Component({
  selector: 'slides-structural-directives',
  templateUrl: './structural-directives.component.html',
  styleUrls: ['./structural-directives.component.css']
})
export class StructuralDirectivesComponent {
  code = {
    ngIf: {
      files: [
        exercise('app.component', require('!!raw-loader!./samples/ng-if/app.component.ts')),
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
    }
  };

  constructor() {
  }
}
