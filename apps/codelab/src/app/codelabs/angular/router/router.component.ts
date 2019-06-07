import { CodelabFile } from '../../../shared/helpers/codelabFile';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  ExerciseConfigTemplate,
  Ng2TsExercises
} from '../../../../../../../ng2ts/ng2ts';
import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';

declare const require;

interface FileHighlights {
  appModule?: RegExp | RegExp[];
  appHtml?: RegExp | RegExp[];
}

function routeExercise(highlights: FileHighlights) {
  return {
    files: [
      CodelabFile.TypeScriptFile('app.module')
        .setCode(require('!!raw-loader!./samples/simple-router/app.module.ts'))
        .withHighlight(highlights.appModule),
      CodelabFile.Html('app.component')
        .setCode(
          require('!!raw-loader!./samples/simple-router/app.component.html')
        )
        .withHighlight(highlights.appHtml),
      CodelabFile.TypeScriptFile('app.component').setCode(
        require('!!raw-loader!./samples/simple-router/app.component.ts')
      ),
      CodelabFile.TypeScriptFile('components/kitten').setCode(
        require('!!raw-loader!./samples/simple-router/components/kitten.ts')
      ),
      CodelabFile.TypeScriptFile('components/puppy').setCode(
        require('!!raw-loader!./samples/simple-router/components/puppy.ts')
      ),
      CodelabFile.TypeScriptFile('bootstrap')
        .setCode(require('!!raw-loader!./samples/simple-router/main.ts'))
        .makeBootstrappable(),
      CodelabFile.Html('index').setCode(
        require('!!raw-loader!./samples/simple-router/index.html')
      )
    ]
  };
}

@Component({
  selector: 'codelab-slides-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css']
})
export class RouterComponent implements AfterViewInit {
  @ViewChild('translations', { static: false }) translations;
  private t: Record<string, string>;
  exercise: ExerciseConfigTemplate;

  code = {
    routerConfig: routeExercise({
      appModule: /const routes[\s\S]*?];[\s\S]/
    }),
    routerConfigPass: routeExercise({
      appModule: /RouterModule.forRoot\(routes\)/
    }),
    routerOutlet: routeExercise({
      appHtml: /<router-outlet><\/router-outlet>/
    }),
    menu: routeExercise({
      appHtml: /<a[\s\S]*\/a>/
    }),
    kittens: {
      runner: 'html',
      files: [CodelabFile.Html('index').setCode(`<h1>Kittens</h1>`)]
    },
    puppies: {
      runner: 'html',
      files: [CodelabFile.Html('index').setCode(`<h1>Puppies</h1>`)]
    }
  };

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(5, 0);
  }

  ngAfterViewInit() {
    this.t = extractMessages(this.translations);
  }
}
