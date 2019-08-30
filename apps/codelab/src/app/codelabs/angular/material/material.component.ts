import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  ExerciseConfigTemplate,
  Ng2TsExercises
} from '../../../../../../../ng2ts/ng2ts';
import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';
import { CodelabFile } from '../../../shared/helpers/codelabFile';

declare const require;

interface FileHighlights {
  appModule?: RegExp;
  appHtml?: RegExp;
}

function matExercise(
  modules,
  html,
  highlights: FileHighlights = {},
  theme = 'purple'
) {
  const moduleCode = require('!!raw-loader!./samples/basic/app.module.ts').replace(
    /MatCardModule, MatToolbarModule/g,
    modules
  );

  return {
    files: [
      CodelabFile.TypeScriptFile('app.module')
        .setCode(moduleCode)
        .withHighlight(highlights.appModule),
      CodelabFile.Html('app')
        .setCode(html)
        .withHighlight(highlights.appHtml),
      CodelabFile.TypeScriptFile('app.component').setCode(
        require('!!raw-loader!./samples/basic/app.component.ts')
      ),
      CodelabFile.TypeScriptFile('bootstrap')
        .setCode(require('!!raw-loader!./samples/basic/main.ts'))
        .makeBootstrappable(),
      CodelabFile.Css('styles').setCode(
        require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css')
      ),
      CodelabFile.Css('extra').setCode('body {padding: 0; margin: 0;}')
    ]
  };
}

@Component({
  selector: 'codelab-slides-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MaterialComponent implements AfterViewInit {
  exercise: ExerciseConfigTemplate;
  @ViewChild('themePlayground', { static: false }) themePlayground;
  @ViewChild('translations', { static: false }) translations;

  themes = {
    indigo: require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
    deeppurple: require('!!raw-loader!@angular/material/prebuilt-themes/deeppurple-amber.css'),
    pink: require('!!raw-loader!@angular/material/prebuilt-themes/pink-bluegrey.css'),
    purple: require('!!raw-loader!@angular/material/prebuilt-themes/purple-green.css')
  };

  code = {
    material: {
      step1: matExercise(
        `MatCardModule, MatToolbarModule`,
        require('!!raw-loader!./samples/basic/app.1.html'),
        {
          appModule: /MatToolbarModule/,
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
          appHtml: /<mat-card-header[\s\S]*?Photo of a Shiba Inu[\s\S]*?>/
        }
      ),
      step4: matExercise(
        `MatToolbarModule,\n    MatCardModule,\n    MatButtonModule`,
        require('!!raw-loader!./samples/basic/app.4.html'),
        {
          appModule: /MatButtonModule/,
          appHtml: /<mat-card-actions[\s\S]*<\/mat-card-actions>/
        }
      ),
      theme: matExercise(
        `MatToolbarModule,\n    MatCardModule,\n    MatButtonModule`,
        require('!!raw-loader!./samples/basic/app.4.html')
      )
    },
    samples: {
      button: `<button md-button md-raised-button>
   I'm a button
</button>`,
      card: `<md-card>I'm material card</md-card>`,
      input: `<md-form-field>
  <input mdInput placeholder="All your secrets">
</md-form-field>`
    }
  };
  private theme = 'indigo';
  private t: Record<string, string>;

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(6, 0);
  }

  ngAfterViewInit() {
    this.t = extractMessages(this.translations);
  }

  setTheme(theme) {
    this.theme = theme;
    const cssFile = this.code.material.theme.files.find(a => a.type === 'css');
    cssFile.template = this.themes[theme];
    this.code.material.theme = { ...this.code.material.theme };
  }
}
