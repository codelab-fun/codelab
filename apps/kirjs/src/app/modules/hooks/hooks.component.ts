import { Component } from '@angular/core';

declare const require;
const hooksComponent = require('!!raw-loader!./hooks-test/hooks-test.component.ts');
const hooksTemplate = require('!!raw-loader!./hooks-test/hooks-test.component.html');
const hooksDirective = require('!!raw-loader!./hooks-directive/hooks.directive.ts');

@Component({
  selector: 'slides-hooks',
  templateUrl: './hooks.component.html',
  styleUrls: ['./hooks.component.scss']
})
export class HooksComponent {
  code = {
    hooksComponent,
    hooksTemplate,
    hooksDirective
  };

  fontSize = 30;

}
