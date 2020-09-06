import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  ExerciseConfigTemplate,
  Ng2TsExercises,
  SlideTemplate
} from '../../../../../../../ng2ts/ng2ts';

import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';
import { boxAndCircle, circleAndBox } from '../../../shared/helpers/helpers';

const circleAndBoxCode = circleAndBox();
declare const require;

@Component({
  selector: 'codelab-slides-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: [
    '../../../components/css/codelab-styles.scss',
    './component-tree.component.css'
  ]
})
export class ComponentTreeComponent implements AfterViewInit {
  t: { [key: string]: string };

  @ViewChild('translations', { static: false }) translation;

  exercise: ExerciseConfigTemplate | SlideTemplate;
  exercise2: ExerciseConfigTemplate | SlideTemplate;
  title = 'Component Tree';
  description = '';
  prereqs = '';

  code = {
    parentComponentSkeleton: {
      match: /slides-circle/,
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'slides-hello',
  template: \`<h1>Hello</h1><slides-world></slides-world>\`
})
export class HelloComponent {}
`,
      path: 'parent.component.ts',
      type: 'typescript'
    },
    childComponentSkeleton: {
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'slides-world',
  template: '<h1>World</h1>'
})
export class WorldComponent {}
`,
      path: 'child.component.ts',
      type: 'typescript'
    },
    appModule: {
      code: {
        'app.module.ts': require('!!raw-loader!./samples/module/app.module.ts'),
        'circle.component.ts': require('!!raw-loader!./samples/module/circle.component.ts'),
        'box.component.ts': require('!!raw-loader!./samples/module/box.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
        'index.html': require('!!raw-loader!./samples/module/index.html')
      },
      files: ['app.module.ts'],
      highlights: { 'app.module.ts': /declarations.*/ }
    },
    parentComponent: {
      code: `import { Component } from '@angular/core';
import { Result } from './result.model';

@Component({
  selector: 'parent',
  template: '<child [data]=”results()”>
             </child>'
})
export class Parent {
  results(): Result[] {...}
}`,
      path: 'parent.component.ts',
      type: 'typescript'
    },
    childComponent: {
      code: `import { Component, Input } from '@angular/core';
import { Result } from './result.model';

@Component({
  selector: 'child',
  template: '<p *ngFor="let result of data">{{result}}</p>'
})
export class Child {
  @Input() data: Result[];
}`,
      path: 'child.component.ts',
      type: 'typescript'
    },

    boxAndCircle: boxAndCircle(),
    circleAndBox: circleAndBoxCode,
    passingDataToChildHighlights: {
      'circle.component.ts': [/@Input\(\) size/, /@Input\(\) color/]
    }
  };

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(4, 1);
    this.exercise2 = exercises.getExercises(4, 2);
  }

  ngAfterViewInit() {
    this.t = extractMessages(this.translation);
  }
}
