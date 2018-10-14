import { Component } from '@angular/core';
import * as babylon from 'babylon';

@Component({
  selector: 'ast-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ast = [];
  code = `console.log();`;

  ngOnInit() {
    this.generateAst(this.code);
  }

  selectNode(node) {
    console.log(node);
  }

  generateAst(value: string) {
    this.ast = babylon.parse(value).program.body;
    console.log(this.ast);
  }
}
