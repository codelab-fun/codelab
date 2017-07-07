import { Component } from '@angular/core';

declare const require;


const helloWorld = JSON.parse(require('!!raw-loader!./samples/hello-world.json'));


@Component({
  selector: 'slides-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent {
  fontSize = 18;

  code = {
    matches: {loc: /"loc": \{[\s\S]*?\{[\s\S]*?\}[\s\S]*?\{[\s\S]*?\}[\s\S]*?\},/},
    astExample: JSON.stringify(helloWorld.program, null, '  ')
  };

  updateFontSize(diff) {
    this.fontSize += diff;
  }

  constructor() {

  }
}
