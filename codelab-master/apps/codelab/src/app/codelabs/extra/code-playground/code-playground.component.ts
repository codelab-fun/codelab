import { Component } from '@angular/core';

@Component({
  selector: 'codelab-code-playground',
  templateUrl: './code-playground.component.html',
  styleUrls: ['./code-playground.component.css']
})
export class CodePlaygroundComponent {}

//
//
// // 1. code- components
// // <code-group [(code)]="code" [solution]="solution" deps="rxjs"></code-group>
// // <code-ts-review>
// //
// // <code-editor bootstrap="app.component.ts"></code-editor>
// // <code-editor [(code)]="code" deps="mocha"></code-editor>
// // <code-editor [(code)]="code" [solution]="solution" deps="mocha"></code-editor>
// //
// // <code-preview [code]="code" ui="browser"></code-preview>
// // <code-preview bootstrap="main.ts" ui="browser"></code-preview>
// // <code-preview bootstrap="console.ts" ui="console"></code-preview>
// // <code-preview bootstrap="test.ts" ui="tests"></code-preview>
//
//
// /// <code-group><code-preview> TypeScript
// /// <code-group><code-preview> Javasdcript
//
// @Component({
//   selector: 'codelab-exercise',
//   template: '<code-group><ng-content></ng-content></code-group>',
//   providers: [CodeSource]
// })
// class CodelabExercise {
//   constructor(cs: CodeSource) {
//     cs.addBeforeStep((cide) => {
//       code.before = 1
//     })
//   }
//
//   getRoot(){
//     return this.parent || this;
//   }
//
//   addCode(code: Record) {
//     this.code = code;
//   }
//
//   getCode() {
//     if (this.code) {
//       return this.code;
//     }
//     return this.parent.getCode();
//   }
//
//   getDeps() {
//     return this.parent && this.parent.getDeps() + this.deps;
//   }
//
// }
//
//
// @Component({
//   selector: 'code-group',
//   template: '<ng-content></ng-content>',
//   providers: [CodeSource]
// })
// class CodeGroup {
//   // { "main.ts": "console.log('')" }
//   @Input() code: Record<string, string>;
//   // { "main.ts": "console.log('Hello')" }
//   @Input() solution: Record<string, string>;
//   // // "main.ts"
//   // @Input() bootstrap: string;
//   // "angular, react"
//   @Input() deps: string;
//   @Input() compile: (code: Record<string, string>) => Record<string, string>;
//   // "browser, tests"
//   @Input() ui: string;
// }
//
// @Component({
//   selector: 'code-preview',
//   template: '',
//   providers: [CodeSource]
// })
// class CodePreview {
//   constructor(private source: CodeSource) {
//   }
// }
