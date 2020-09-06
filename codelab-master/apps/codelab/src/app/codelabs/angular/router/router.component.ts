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
    files: {
      'app.module.ts': require('!!raw-loader!./samples/simple-router/app.module.ts'),
      'app.component.html': require('!!raw-loader!./samples/simple-router/app.component.html'),
      'app.component.ts': require('!!raw-loader!./samples/simple-router/app.component.ts'),
      'components/kitten.ts': require('!!raw-loader!./samples/simple-router/components/kitten.ts'),
      'components/puppy.ts': require('!!raw-loader!./samples/simple-router/components/puppy.ts'),
      'bootstrap.ts': require('!!raw-loader!./samples/simple-router/main.ts'),
      'index.html': require('!!raw-loader!./samples/simple-router/index.html'),
      'components/.html': require('!!raw-loader!./samples/simple-router/index.html')
    },
    config: {
      files: ['app.module.ts'],
      highlights: { 'app.module.ts': /const routes[\s\S]*?];[\s\S]/ }
    },
    configPass: {
      files: ['app.module.ts'],
      highlights: { 'app.module.ts': /RouterModule.forRoot\(routes\)/ }
    },
    routerOutlet: {
      files: ['app.component.html'],
      highlights: { 'app.component.html': /<router-outlet><\/router-outlet>/ }
    },
    menu: {
      files: ['app.component.html'],
      highlights: { 'app.component.html': /<a[\s\S]*\/a>/ }
    }
  };

  constructor(private exercises: Ng2TsExercises) {
    this.exercise = exercises.getExercises(5, 0);
  }

  ngAfterViewInit() {
    this.t = extractMessages(this.translations);
  }
}
