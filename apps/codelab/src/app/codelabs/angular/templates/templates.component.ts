import { Component, OnInit, ViewChild } from '@angular/core';
import { ng2tsConfig } from '../../../../../../../ng2ts/ng2ts';
import {
  displayAngularComponent,
  displayAngularComponentWithHtml
} from '../../../../../../../libs/exercise/src/lib/helpers/helpers';
import { extractMessages } from '../../../../../../../libs/presentation/src/lib/i18n-tools';

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

  @ViewChild('translations') translation;
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
        dataBindingExtra: `<!-- ${this.t.thisIsValidHTML} -->
<input [value]="person.emailAddress">
<!-- ${this.t.worksOnAttributeSyntax} -->
<button [attr.aria-label]="help">help</button>
<!-- ${this.t.allowsToConditionallyBindClass}-->
<div [class.special]="isSpecial">Special</div>
<!-- ${this.t.orStyleProps} -->
<button [style.color]="isSpecial ? 'red' : 'green'">
<!-- ${this.t.worksWithCustomComponents} -->
<birthday-card [date]="person.birthday"> `
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
      bindingProp: `<!-- Bind [property] to the template express property. -->
<img [src]="person.photoUrl">
<!-- Yes, this is valid HTML syntax. -->
<input [value]="person.emailAddress">
<!-- Yes, it works on attribute syntax. -->
<button [attr.aria-label]="help">help</button>
<!-- Yes, it works on class binding. -->
<div [class.special]="isSpecial">Special</div>
<!-- Yes, it works on style attributes. -->
<button [style.color]="isSpecial ? 'red' : 'green'">
<!-- This also works on your own components! -->
<birthday-card [date]="person.birthday"> `,
      bindingPropMatch: /person.photoUrl/,
      bindingPropExercise: displayAngularComponentWithHtml(
        baseCode,
        `<h1 [innerText]="user.fullName()"></h1>`
      ),
      bindingPropExerciseMatch: /user.pic/,
      bindingRef: `<div>
  <input #userName>

  <!-- ${this.t.userNameHasRefToInput} -->
  <button (click)="isTaken(userName.value)">
    Check if taken
  </button>
</div>`,
      bindingRefMatch: /#userName/,
      bindingRef2Match: /userName.value/,
      bindingRefExercise: displayAngularComponentWithHtml(
        baseCode,
        `<!--Type your template here -->`
      ),
      bindingRefExerciseMatch: /#userinput/,
      eventBinding: `<!-- ${this.t.whenUserClicksItCallsSaveUser} -->
<button (click)="saveUser($event)">

<!-- ${this.t.youCanAlsoCreateEventsForCustomComponents}  -->
<coffee-maker (depleted)="soundAlarm('loud')">

<!-- ${this.t.thereAreShortcutEventBindings} -->
<textarea (keydown.control.enter)="submit()"></textarea>
`,
      eventBindingMatch: /\(click\)/,
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
