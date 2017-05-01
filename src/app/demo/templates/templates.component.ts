import {Component, OnInit} from '@angular/core';
import {displayAngularComponent, displayAngularComponentWithHtml} from '../../exercise/helpers/helpers';

class Person {
  constructor(public firstName: string, public lastName: string, public photoUrl: string) {
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const x = {
  a: 1, b: 2
};

const baseCode = 'TODO';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  title = 'Templates';
  description = 'Learn more about Angular templates!';
  prereqs = '';

  code = {
    template: {
      intro: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app', 
  template: '<h1>Hello World!</h1>'
})
export class AppComponent {
}`),
      interpolation: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app', 
  template: \`<h1>
    Hello {{firstName}}!
    </h1>\`
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  lastName = 'Renoir';
}`),
      interpolationMethod: displayAngularComponent(`import {Component} from '@angular/core';

@Component({
  selector: 'my-app', 
  template: \`<h1>Hello {{fullName()}}!</h1>\`
})
export class AppComponent {
  firstName = 'Pierre-Auguste';
  lastName = 'Renoir';
  fullName(){ 
     return this.firstName + this.lastName
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
  fullName(){  return this.firstName + this.lastName }
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
  fullName(){  return this.firstName + this.lastName }
}`),
      dataBindingExtra: `
<!-- This is valid HTML syntax. -->
<input [value]="person.emailAddress">
<!-- It works on attribute syntax. -->
<button [attr.aria-label]="help">help</button>
<!-- It allows to conditionally bind a class-->
<div [class.special]="isSpecial">Special</div>
<!-- Or style properties -->
<button [style.color]="isSpecial ? 'red' : 'green'">
<!-- And work with custom components! -->
<birthday-card [date]="person.birthday"> `,
    },

    templateInterpolation: `
      <!-- Use property value from person object from component instance. -->
      <h2>Profile for {{person.name}}</h2>

      <!-- Use method on person object from component instance. -->
      <h2>Profile for {{person.getBiography()}}</h2>

      <!-- Use property on person object from component instance. -->
      <img src="{{person.pic}}" alt="Photo of {{person.name}}" ...>
    `,
    templateInterpolationMatch: /{{person.name}}/,
    templateInterpolationExercise: displayAngularComponentWithHtml(baseCode, `<h1>Hello, {{user.firstName}}</h1>`),
    templateInterpolationExerciseMatch: /user.firstName/,
    bindingProp: `<!-- Bind [property] to the template express property. -->
<img [src]="person.photoUrl" ...>
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
    bindingPropExercise: displayAngularComponentWithHtml(baseCode, `<h1 [innerText]="user.fullName()"></h1>`),
    bindingPropExerciseMatch: /user.pic/,
    bindingRef: `<!-- You can define a variable that points to an element or 
     Component instance by using a hash. -->
    <div>
      <!-- userName variable is available globally in this template. -->
      <input #userName>
      <!-- Remember, input elements have a value property. -->
      <button (click)="isTaken(userName.value)>
        Check if taken
      </button>
    </div>`,
    bindingRefMatch: /#userName/,
    bindingRefExercise: displayAngularComponentWithHtml(baseCode, `<!--Type your template here -->`),
    bindingRefExerciseMatch: /#userinput/,
    eventBinding: `<!-- When user clicks the button, call the "saveUser" function on the 
     component instance and pass the the underlying event. -->
<button (click)="saveUser($event)">

<!-- You can also create events for custom components. Here we have a 
     depleted event, and it's going to call the "soundAlarm" function 
     on the component instance when it fires.  -->
<coffee-maker (depleted)="soundAlarm('loud')">

<!-- There are also shortcut event bindings! The submit function on the 
     component instance will be called when the user presses control 
     and enter. -->
<textarea (keydown.control.enter)="submit()"></textarea>
`,
    eventBindingMatch: /(click)/,
    eventBindingExercise: displayAngularComponentWithHtml(baseCode, `<!--Type your template here onButtonClick -->`),
    conditionalDisplay: `<!-- Some directives change the structure of the component tree. 
     ngIf conditionally shows/hides a section of the UI. -->
<section *ngIf="isSectionVisible">Howdy!</section>
<!-- Note the * and that it is case-sensitive! -->
`,
    conditionalDisplayMatch: /ngIf/,
    conditionalDisplayExercise: displayAngularComponentWithHtml(baseCode, `<!--Type your template here displayUser -->`),
    conditionalDisplayFor: `<!-- ngFor dynamically changes the structure too! 
     Note again the * and case-sensitivity of the directive. -->
    <ul>
      <li *ngFor="let player of team.roster">
        {{player.name}}
      </li>
    </ul>`,
    conditionalDisplayForMatch: /ngFor/,
    conditionalDisplayForExercise: displayAngularComponentWithHtml(baseCode, `<!--Type your template here heros -->`),

  };

  constructor() {
  }

  ngOnInit() {
  }

}
