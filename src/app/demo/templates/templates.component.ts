import {Component, OnInit} from '@angular/core';


const baseCode = `
@Component({
  selector: 'my-app', 
  template: \`{{template}}\`
})
class AppComponent {
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
