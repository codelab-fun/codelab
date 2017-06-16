import { Component } from '@angular/core';
import { displayAngularComponentWithHtml } from '../../../exercise/helpers/helpers';


const baseCode = `
import {Component} from '@angular/core';
class Person {
  constructor(public firstName: string, public lastName: string, public pic: string) { }
  fullName() { return this.firstName + " " + this.lastName; }
}
@Component({
  selector: 'my-app',
  templateUrl: './app/app.html'
})
export class AppComponent {
  user=new Person('John','Smith','https://www.gravatar.com/avatar');
  displayUser=true;
  heros=["Celeritas","Magneta","Dynama"];
  onButtonClick(input){
    alert('You typed:'+input);
  }
}`;

@Component({
  selector: 'slides-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent {
  code = {
    templateInterpolationExercise: displayAngularComponentWithHtml(baseCode, `<h1>Hello, {{user.firstName}}</h1>`),

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
  template: '<p *ngFor="let result of date">{{result}}</p>'
})
export class Child {
  @Input() data: Result[];
}`,
      path: 'child.component.ts',
      type: 'typescript',
    },
  };

  title = 'Experiments';
  description = '';
  prereqs = '';

}
