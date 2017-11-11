import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { CodelabFile } from '../../../exercise/helpers/codelabFile';
import { concatStatic } from 'rxjs/operator/concat';
import { ExerciseConfigTemplate, Ng2TsExercises } from '../../../../../ng2ts/ng2ts';

declare const require;

interface FileHighlights {
  appModule?: RegExp;
  appHtml?: RegExp;
}

function matExercise(modules, html, highlights: FileHighlights = {}, theme = 'purple') {
  const moduleCode = require('!!raw-loader!./samples/basic/app.module.ts').replace(/MatToolbarModule/g, modules);

  return {
    files: [
      CodelabFile.TypeScriptFile('app.module').setCode(moduleCode).withHighlight(highlights.appModule),
      CodelabFile.Html('app').setCode(html).withHighlight(highlights.appHtml),
      CodelabFile.TypeScriptFile('app.component').setCode(require('!!raw-loader!./samples/basic/app.component.ts')),
      CodelabFile.TypeScriptFile('bootstrap').setCode(require('!!raw-loader!./samples/basic/main.ts')).makeBootstrappable(),
      CodelabFile.Css('styles.css').setCode(require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css')),
      CodelabFile.Css('extra.css').setCode('body {padding: 0; margin: 0;}')
    ]
  };
}

@Component({
  selector: 'slides-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialComponent {
  exercise: ExerciseConfigTemplate;
  @ViewChild('themePlayground') themePlayground;

  themes = {
    indigo: require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
    deeppurple: require('!!raw-loader!@angular/material/prebuilt-themes/deeppurple-amber.css'),
    pink: require('!!raw-loader!@angular/material/prebuilt-themes/pink-bluegrey.css'),
    purple: require('!!raw-loader!@angular/material/prebuilt-themes/purple-green.css'),
  };


  code = {
    material: {
      step1: matExercise(
        `MatToolbarModule`,
        require('!!raw-loader!./samples/basic/app.1.html'),
        {
          appModule: /MatToolbarModule(?:\n)/,
          appHtml: /<mat-toolbar[\s\S]*<\/mat-toolbar>/
        }
      ),
      step2: matExercise(
        `MatToolbarModule,\n    MatCardModule`,
        require('!!raw-loader!./samples/basic/app.2.html'),
        {
          appModule: /MatCardModule(?:\n)/,
          appHtml: /<mat-card[\s\S]*<\/mat-card>/
        }
      ),
      step3: matExercise(
        `MatToolbarModule,\n    MatCardModule`,
        require('!!raw-loader!./samples/basic/app.3.html'),
        {
          appHtml: /<mat-card-header[\s\S]*Shiba Inu">\n/
        }
      ),
      step4: matExercise(
        `MatToolbarModule,\n    MatCardModule,\n    MatButtonModule`,
        require('!!raw-loader!./samples/basic/app.4.html'),
        {
          appModule: /MatButtonModule(?:\n)/,
          appHtml: /<mat-card-actions[\s\S]*<\/mat-card-actions>/
        }
      ),
      theme: matExercise(
        `MatToolbarModule,\n    MatCardModule,\n    MatButtonModule`,
        require('!!raw-loader!./samples/basic/app.4.html')
      ),

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
  };
  private theme = 'indigo';


  setTheme(theme) {
    this.theme = theme;
    const cssFile = this.code.material.theme.files.find(a => a.type === 'css');
    this.themePlayground.onCodeChange(this.themes[theme], cssFile);
  }

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(6, 0);
  }
}
