import { CodelabFile } from '../../../shared/helpers/codelabFile';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  ExerciseConfigTemplate,
  Ng2TsExercises
} from '../../../../../../../ng2ts/ng2ts';
import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';
import { CodeDemos } from '../../../shared/models';

declare const require;

@Component({
  selector: 'codelab-slides-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements AfterViewInit {
  @ViewChild('translations', { static: false }) translations;
  exercise: ExerciseConfigTemplate = this.exercises.getExercises(7, 0);
  code: CodeDemos = {
    simpleForm: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/simple-form/app.component.html'),
        'app.module.ts': require('!!raw-loader!./samples/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./samples/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./samples/bootstrap.ts'),
        'material-theme.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
        'styles.css': require('!!raw-loader!./samples/basic/styles.css')
      },
      files: ['app.component.html']
    },
    formsModule: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/simple-form/app.component.html'),
        'app.module.ts': require('!!raw-loader!./samples/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./samples/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./samples/bootstrap.ts'),
        'material-theme.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
        'styles.css': require('!!raw-loader!./samples/basic/styles.css')
      },
      files: ['app.module.ts'],
      highlights: { 'app.module.ts': /, FormsModule/ }
    },
    ngModel: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/ng-model/app.component.html'),
        'app.module.ts': require('!!raw-loader!./samples/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./samples/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./samples/bootstrap.ts'),
        'material-theme.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
        'styles.css': require('!!raw-loader!./samples/basic/styles.css')
      },
      files: ['app.component.html', 'app.component.ts'],
      highlights: {
        'app.component.html': ['"username"', '"email"'],
        'app.component.ts': ['username', 'email']
      }
    },
    addValidation: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/add-validation/app.component.html'),
        'app.module.ts': require('!!raw-loader!./samples/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./samples/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./samples/bootstrap.ts'),
        'material-theme.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
        'styles.css': require('!!raw-loader!./samples/basic/styles.css')
      },
      files: ['app.component.html'],
      highlights: {
        'app.component.html': ['required']
      }
    },
    addError: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/add-error/app.component.html'),
        'app.module.ts': require('!!raw-loader!./samples/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./samples/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./samples/bootstrap.ts'),
        'material-theme.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
        'styles.css': require('!!raw-loader!./samples/basic/styles.css')
      },
      files: ['app.component.html'],
      highlights: {
        'app.component.html': [
          '#usernameModel="ngModel"',
          '*ngIf="usernameModel.invalid"',
          'Username is required'
        ]
      }
    },
    alwaysRequired: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/add-error/app.component.html'),
        'app.module.ts': require('!!raw-loader!./samples/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./samples/always-required/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./samples/bootstrap.ts'),
        'material-theme.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
        'styles.css': require('!!raw-loader!./samples/basic/styles.css')
      },
      files: ['app.component.html']
    },
    dirty: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/dirty/app.component.html'),
        'app.module.ts': require('!!raw-loader!./samples/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./samples/always-required/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./samples/bootstrap.ts'),
        'material-theme.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
        'styles.css': require('!!raw-loader!./samples/basic/styles.css')
      },
      files: ['app.component.html'],
      highlights: {
        'app.component.html': ['usernameModel.dirty']
      }
    },
    material: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/material/app.component.html'),
        'app.module.ts': require('!!raw-loader!./samples/material/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./samples/always-required/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./samples/bootstrap.ts'),
        'material-theme.css': require('!!raw-loader!@angular/material/prebuilt-themes/indigo-pink.css'),
        'styles.css': 'mat-form-field { display: block }'
      },
      files: ['app.component.html'],
      highlights: {
        'app.component.html': [
          'matInput',
          'mat-form-field',
          'mat-error',
          'mat-label'
        ]
      }
    }
  };

  private t: Record<string, string>;

  constructor(private readonly exercises: Ng2TsExercises) {}

  ngAfterViewInit() {
    this.t = extractMessages(this.translations);
  }
}
