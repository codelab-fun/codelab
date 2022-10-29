import { Component } from '@angular/core';

import {
  bootstrap,
  builder,
  exercise,
  html,
  stylesheet,
} from '../../../shared/helpers/helpers';

declare const require;

@Component({
  selector: 'codelab-slides-structural-directives',
  templateUrl: './structural-directives.component.html',
  styleUrls: ['./structural-directives.component.css', './bsod.css'],
})
export class StructuralDirectivesComponent {
  fontSize = 18;

  code = {
    materialTabs: {
      files: [
        html(
          'app',
          require('!!raw-loader!./samples/material-tabs/app.html').default,
          require('!!raw-loader!./samples/material-tabs/app.solved.html')
            .default
        ),
        exercise(
          'app.component',
          require('!!raw-loader!./samples/material-tabs/app.component.ts')
            .default
        ),
        exercise(
          'alert.component',
          require('!!raw-loader!./samples/material-tabs/alert.component.ts')
            .default
        ),
        exercise(
          'taet-led.component',
          require('!!raw-loader!./samples/material-tabs/taet-led.component.ts')
            .default
        ),
        exercise(
          'app.module',
          require('!!raw-loader!./samples/material-tabs/app.module.ts').default
        ),
        exercise(
          'break-my-computer.component',
          require('!!raw-loader!./samples/material-tabs/break-my-computer.component.ts')
            .default
        ),
        stylesheet(
          require('!!raw-loader!./samples/material-tabs/style.css').default
        ),
        bootstrap('main', builder.bootstrap()),
      ],
    },
    materialTabsStructuralDirective: [
      html(
        'app',
        require('!!raw-loader!./samples/material-tabs-structural-directive/app.html')
          .default,
        require('!!raw-loader!./samples/material-tabs-structural-directive/app.solved.html')
          .default
      ),
      exercise(
        'app.component',
        require('!!raw-loader!./samples/material-tabs-structural-directive/app.component.ts')
          .default
      ),
      exercise(
        'hideme.directive',
        require('!!raw-loader!./samples/material-tabs-structural-directive/hideme.directive.ts')
          .default,
        require('!!raw-loader!./samples/material-tabs-structural-directive/hideme.directive.solved.ts')
          .default
      ),
      exercise(
        'alert.component',
        require('!!raw-loader!./samples/material-tabs-structural-directive/alert.component.ts')
          .default
      ),
      exercise(
        'app.module',
        require('!!raw-loader!./samples/material-tabs-structural-directive/app.module.ts')
          .default
      ),
      stylesheet(
        require('!!raw-loader!./samples/material-tabs/style.css').default
      ),
      bootstrap('main', builder.bootstrap()),
    ],
    microSyntax: [
      html('app', `<div *ngFor="let x of 122"></div>`),
      bootstrap(
        'main',
        require('!!raw-loader!./samples/micro-syntax/ms.ts').default
      ),
    ],

    mdTabNavBar: [
      exercise(
        'app.component',
        require('!!raw-loader!./samples/mat-tab-nav-bar/app.component.ts')
          .default
      ),
      exercise(
        'alert.component',
        require('!!raw-loader!./samples/mat-tab-nav-bar/alert.component.ts')
          .default
      ),
      exercise(
        'tab.component',
        require('!!raw-loader!./samples/mat-tab-nav-bar/tab.component.ts')
          .default
      ),
      stylesheet(
        require('!!raw-loader!./samples/material-tabs/style.css').default
      ),
      exercise(
        'app.module',
        require('!!raw-loader!./samples/mat-tab-nav-bar/app.module.ts').default
      ),
      bootstrap('main', builder.bootstrap()),
    ],

    structuralDirectives: {
      ngIfBefore:
        require('!!raw-loader!./samples/structural-directives/ng-if-before.html')
          .default,
      ngIfAfter:
        require('!!raw-loader!./samples/structural-directives/ng-if-after.html')
          .default,
      ngForBefore:
        require('!!raw-loader!./samples/structural-directives/ng-for-before.html')
          .default,
      ngForAfter:
        require('!!raw-loader!./samples/structural-directives/ng-for-after.html')
          .default,
      microSyntax:
        require('!!raw-loader!./samples/structural-directives/microsyntax.html')
          .default,
    },
  };

  constructor() {}

  updateFontSize(diff) {
    this.fontSize += diff;
  }
}
