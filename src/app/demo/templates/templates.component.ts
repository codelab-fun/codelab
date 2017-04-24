import {Component, OnInit} from '@angular/core';
import {displayAngularComponent} from '../../exercise/helpers/helpers';


const baseCode = `
import {Component} from '@angular/core';

@Component({
  selector: 'my-app', 
  template: \`<h1>Hello</h1>\`
})
export class AppComponent {
  name = 'Angularjs'
}
`;


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  code = {
    bindingExercise: displayAngularComponent(baseCode),
    bindingMatch: /name/,
    binding: `<h1>Hello, {{name}}</h1>`,
    bindingPropMatch: /pic/,
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

  getCode(code: string) {
    return baseCode.replace('{{template}}', code);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
