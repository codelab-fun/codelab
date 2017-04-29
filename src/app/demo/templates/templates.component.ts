import { Component, OnInit } from '@angular/core';
import { displayAngularComponentWithHtml } from '../../exercise/helpers/helpers';

class Person {
  constructor(public firstName: string, public lastName: string, public photoUrl: string) { }
  fullName() { return this.firstName + " " + this.lastName; }
}

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
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  title = 'Templates';
  description = 'Human give me attention meow ask to go outside and ask to come inside and ask to go outside and ask to come inside so playing with balls of wool.';
  prereqs = 'Components, Dependency Injection';

  code = {
    appComponent: baseCode,
    appComponentMatch: /AppComponent/,
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
    conditionalDisplayForExercise:displayAngularComponentWithHtml(baseCode, `<!--Type your template here heros -->`),

  };

  constructor() {
  }

  ngOnInit() {
  }

}
