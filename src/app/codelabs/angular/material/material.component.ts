import { Component, ViewEncapsulation } from '@angular/core';

import { CodelabFile } from '../../../exercise/helpers/codelabFile';

declare const require;



@Component({
  selector: 'slides-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialComponent {
  code = {
    material: {

      examples: {files: [
        CodelabFile.Html('app').setCode(require('!!raw-loader!./samples/basic/app.html')),
        CodelabFile.TypeScriptFile('app.component').setCode(require('!!raw-loader!./samples/basic/app.component.ts')),
        CodelabFile.TypeScriptFile('app.module').setCode(require('!!raw-loader!./samples/basic/app.module.ts')),
        CodelabFile.TypeScriptFile('bootstrap').setCode(require('!!raw-loader!./samples/basic/main.ts')).makeBootstrappable(),
        CodelabFile.Css('styles.css').setCode(require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'))
      ]}
    },

    samples: {
      button: `<button md-button md-raised-button>
   I'm a button
</button>`,
      card:
        `<md-card>I'm material card</md-card>`,
      input:
        `<md-form-field>
  <input mdInput placeholder="All your secrets">
</md-form-field>`

    }
  }
  ;

  debugme() {
    debugger;
  }
}
