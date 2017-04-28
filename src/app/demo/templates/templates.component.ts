import {Component, OnInit} from '@angular/core';
import {displayAngularComponentWithHtml} from '../../exercise/helpers/helpers';


const baseCode = `
import {Component} from '@angular/core';

@Component({
  selector: 'my-app', 
  templateUrl: './app/app.html'
})
export class AppComponent {
  firstName = 'John'
  lastName = 'Smith'
}
`;


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  code = {
    bindingExercise: displayAngularComponentWithHtml(baseCode, '<h1>{{firstName}} </h1>'),
    bindingExerciseMatch: / /,
    bindingPropMatch: /name/,
    //bindingPropMatch: /pic/,
    bindingProp: `<h1>Hello, {{name}}</h1>
<img src="{{pic}}" alt="Picture">
    `,
    bindingPropSquareMatch: /name/,
    bindingPropSquare: `<h1>Hello, {{name}}</h1>
<img [src]="pic" alt="Picture">
    `,
    bindingToInput: `<h1>Hello, {{name}}</h1>
<img [src]="pic" alt="Picture">



    `,


  };

  constructor() {
  }

  ngOnInit() {
  }

}
