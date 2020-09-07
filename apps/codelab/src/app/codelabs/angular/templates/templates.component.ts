import { Component, OnInit, ViewChild } from '@angular/core';
import { ng2tsConfig } from '../../../../../../../ng2ts/ng2ts';
import {
  displayAngularComponent,
  displayAngularComponentWithHtml
} from '../../../shared/helpers/helpers';
import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';

declare const require;

const baseCode = 'TODO';

@Component({
  selector: 'codelab-slides-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  t: { [key: string]: string };
  exercises = [
    ng2tsConfig.milestones[2].exercises[1],
    ng2tsConfig.milestones[2].exercises[2],
    ng2tsConfig.milestones[2].exercises[3]
  ];
  curlies = '{{ property }}';

  // TODO(kirjs): we can't access tanslation in OnInit hook iwht static set to false
  // need to consider changing how we set code
  @ViewChild('translations', { static: true }) translation;
  code: any = {};

  constructor() {}

  ngOnInit() {
    this.t = extractMessages(this.translation);

    this.code = {
      template: {
        intro: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hello World!</h1>'
})
export class AppComponent {
}`),

        matches: {
          curlies: { 'app.component.ts': [/{{.*}}/, /firstName = .*/] },
          curliesFullName: { 'app.component.ts': [/{{.*}}/, /fullName\(\){/] },
          curliesAttribute: { 'app.component.ts': [/"{{.*}}"/, /avatar = .*/] },
          template: { 'app.component.ts': /<h1>.*<\/h1>/ },
          squares: { 'app.component.ts': /\[.*]/ }
        },
        interpolation: displayAngularComponent(
          `import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>
    Hello {{firstName}}!
    </h1>\`
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  lastName = 'Renoir';
}`,
          ''
        ),
        interpolationMethod: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Hello {{fullName()}}!</h1>\`
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  lastName = 'Renoir';
  fullName(){
     return this.firstName + " " + this.lastName
  }
}`),
        dataBindingPre: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Hello {{fullName()}}!</h1>
    <img src="{{avatar}}">
  \`
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  lastName = 'Renoir';
  avatar = 'assets/images/renoir.jpg';
  fullName(){  return this.firstName + " " + this.lastName }
}`),
        dataBinding: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Hello {{fullName()}}!</h1>
    <img [src]="avatar">
  \`
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  lastName = 'Renoir';
  avatar = 'assets/images/renoir.jpg';
  fullName(){  return this.firstName + " " + this.lastName }
}`),
        dataBindingExtra: {
          code: {
            'app.component.html': require('!!raw-loader!./samples/data-binding-extra/app.component.html'),
            'app.component.ts': require('!!raw-loader!./samples/data-binding-extra/app.component.ts'),
            'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
            'app.module.ts': require('!!raw-loader!./samples/data-binding-extra/app.module.ts'),
            'number-praiser.ts': require('!!raw-loader!./samples/data-binding-extra/number-praiser.ts'),
            'index.html': require('!!raw-loader!./samples/data-binding-extra/index.html')
          },
          files: ['app.component.html', 'app.component.ts']
        }
      },
      ngIfDirective: {
        template: displayAngularComponent(`import {Component} from '@angular/core';
@Component({
  selector: 'my-app',
  template: \`<h1>Hello {{firstName}}!</h1>
    <img src="{{avatar}}" *ngIf="onDisplay()">
  \`
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  avatar = 'assets/images/renoir.jpg';
  onDisplay(){  return false } // ${this.t.tryChangingToTrue}
}`),
        matches: {
          ngIf: { 'app.component.ts': /\*ngIf/ }
        }
      },
      ngForDirectivePre: {
        template: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Puppies names:</h1>
    ??? <!-- ${this.t.needToRepeatPuppiesHere} -->
  \`
})
export class AppComponent {
  puppies = ['Schumann', 'Mendelssohn', 'Bach'];
}`),
        matches: { 'app.component.ts': ['???', /puppies.*;/] }
      },
      ngForDirective: {
        template: displayAngularComponent(
          `import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Puppies names:</h1>
  <ul>
    <li *ngFor="let puppy of puppies">
      {{puppy}}
    </li>
  </ul>
  \`
})
export class AppComponent {
  puppies = ['Schumann', 'Mendelssohn', 'Bach'];
}`,
          `
import {AppComponent} from './app.component';

describe('AppComponent', ()=>{
  it('Add one more puppy to the list', ()=>{
    const app = new AppComponent();
    chai.expect(app.puppies.length).equals(4);
  })
})

`
        ),
        matches: {
          ngFor: { 'app.component.ts': '*ngFor' }
        }
      },

      templateInterpolation: `
      <!-- Use property value from person object from component instance. -->
      <h2>Profile for {{person.name}}</h2>

      <!-- Use method on person object from component instance. -->
      <h2>Profile for {{person.getBiography()}}</h2>

      <!-- Use property on person object from component instance. -->
      <img src="{{person.pic}}" alt="Photo of {{person.name}}">
    `,
      templateInterpolationMatch: /{{person.name}}/,
      templateInterpolationExercise: displayAngularComponentWithHtml(
        baseCode,
        `<h1>Hello, {{user.firstName}}</h1>`
      ),
      templateInterpolationExerciseMatch: /user.firstName/,
      bindingPropMatch: /person.photoUrl/,
      bindingPropExercise: displayAngularComponentWithHtml(
        baseCode,
        `<h1 [innerText]="user.fullName()"></h1>`
      ),
      bindingPropExerciseMatch: /user.pic/,
      eventBinding: {
        code: {
          'app.component.html': require('!!raw-loader!./samples/event-binding/app.component.html'),
          'app.component.ts': require('!!raw-loader!./samples/event-binding/app.component.ts'),
          'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
          'app.module.ts': require('!!raw-loader!./../../../shared/angular-code/app.module.ts'),
          'index.html': require('!!raw-loader!./../../../shared/angular-code/index.html')
        },
        files: ['app.component.html'],
        highlights: { 'app.component.html': '(click)' }
      },
      referenceBinding: {
        code: {
          'app.component.html': require('!!raw-loader!./samples/reference-binding/app.component.html'),
          'app.component.ts': require('!!raw-loader!./samples/reference-binding/app.component.ts'),
          'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
          'app.module.ts': require('!!raw-loader!./../../../shared/angular-code/app.module.ts'),
          'index.html': require('!!raw-loader!./../../../shared/angular-code/index.html')
        },
        files: ['app.component.html'],
        highlights: { 'app.component.html': ['#input', 'input.value'] }
      },
      eventBindingShortcuts: {
        code: {
          'app.component.html': require('!!raw-loader!./samples/event-binding-shortcuts/app.component.html'),
          'app.component.ts': require('!!raw-loader!./samples/reference-binding/app.component.ts'),
          'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
          'app.module.ts': require('!!raw-loader!./../../../shared/angular-code/app.module.ts'),
          'index.html': require('!!raw-loader!./../../../shared/angular-code/index.html')
        },
        files: ['app.component.html'],
        highlights: { 'app.component.html': '(keydown.control.enter)' }
      },

      eventBindingExercise: displayAngularComponentWithHtml(
        baseCode,
        `<!--Type your template here onButtonClick -->`
      ),
      conditionalDisplay: `<!-- ngIf conditionally toggles the visibility of a section of the UI. -->
<section *ngIf="showSection">Howdy!</section>
<!-- The '*' means this directive alters the component tree's structure. -->
<!-- Note also that *ngIf is case-sensitive! -->
`,
      conditionalDisplayMatch: /ngIf/,
      conditionalDisplayExercise: displayAngularComponentWithHtml(
        baseCode,
        `<!--Type your template here displayUser -->`
      ),
      conditionalDisplayFor: `<ul>
  <li *ngFor="let puppy of puppies">
    {{puppy.name}}
  </li>
</ul>`,
      conditionalDisplayForMatch: /ngFor/,
      conditionalDisplayForExercise: displayAngularComponentWithHtml(
        baseCode,
        `<!--Type your template here heros -->`
      )
    };
  }
}
