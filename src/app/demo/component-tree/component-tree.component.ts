import {Component} from '@angular/core';

import {ExerciseConfigTemplate, Ng2TsExercises, SlideTemplate} from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: ['./component-tree.component.css']
})
export class ComponentTreeComponent {
  exercise: ExerciseConfigTemplate | SlideTemplate;
  //exercise2: ExerciseConfigTemplate | SlideTemplate;
  title = 'Component Tree';
  description = '';
  prereqs = '';

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(4, 1);
  }

  code = {
    parentComponentSkeleton: {
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'parent',
  template: '<child>...</child>'
})
export class ParentComponent {}
`,
      path: 'parent.component.ts',
      type: 'typescript',
    },
    childComponentSkeleton: {
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'child',
  template: '<p>I'm a child!</p>'
})
export class ChildComponent {}
`,
      path: 'child.component.ts',
      type: 'typescript',
    },
    appModule: {
      code: `import { NgModule } from '@angular/core';
import { ChildComponent } from './child.component';
import { ParentComponent } from './parent.component';

@NgModule({
  declarations: [ ChildComponent, ParentComponent ]
})
export class AppModule {}`,
      path: 'app.module.ts',
      type: 'typescript',
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
      type: 'typescript',
    },
    childComponent: {
      code: `import { Component, Input } from '@angular/core';
import { Result }from './result.model';

@Component({
  selector: 'child',
  template: '<p *ngFor=”let result of data”>{{result}}</p>'
})
export class Child {
  @Input() data: Result[];
}`,
      path: 'child.component.ts',
      type: 'typescript',
    },
  };
}
