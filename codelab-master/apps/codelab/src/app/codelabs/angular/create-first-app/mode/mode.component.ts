import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-slides-ng-module-mode',
  templateUrl: './mode.component.html',
  styleUrls: ['./mode.component.css']
})
export class ModeComponent implements OnInit {
  modes = ['web', 'mobile', 'vr'];
  mode = this.modes[0];
  code = {
    moduleAnatomy: {
      // Module Anatomy - Milestone #1
      code: `/* Imports */

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HelloWorldComponent ],
  bootstrap: [ HelloWorldComponent ],
})
export class AppModule {}`,
      codeMobile: `/* Imports */

@NgModule({
  imports: [ NativeScriptModule ],
  declarations: [ HelloWorldComponent ],
  bootstrap: [ HelloWorldComponent ],
})
export class AppModule {}`,
      codeVR: `/* Imports */

@NgModule({
  imports: [ SomeMagicVRModule ],
  declarations: [ HelloWorldComponent ],
  bootstrap: [ HelloWorldComponent ],
})
export class AppModule {}`,
      matches: {
        exportClass: /export.*/,
        ngModule: /@N[^]*?\)[^]/,
        importsArr: /imports.*/
      },
      readonly: true,
      path: 'module.anatomy.ts',
      type: 'typescript'
    }
  };

  constructor() {}

  ngOnInit() {}
}
