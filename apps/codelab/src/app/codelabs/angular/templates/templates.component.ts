import { Component, OnInit, ViewChild } from '@angular/core';
import { ng2tsConfig } from '../../../../../../../ng2ts/ng2ts';
import { displayAngularComponent } from '../../../shared/helpers/helpers';
import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';
import { CodeDemos, MilestoneWithDemos } from '../../../shared/models';

declare const require;

@Component({
  selector: 'codelab-slides-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit, MilestoneWithDemos {
  t: { [key: string]: string };
  exercises = [
    ng2tsConfig.milestones[2].exercises[1],
    ng2tsConfig.milestones[2].exercises[2],
    ng2tsConfig.milestones[2].exercises[3]
  ];

  // TODO(kirjs): we can't access tanslation in OnInit hook iwht static set to false
  // need to consider changing how we set code
  @ViewChild('translations', { static: true }) translation;
  code: CodeDemos = {
    intro: {
      code: {
        'bootstrap.ts': require('!!raw-loader!./samples/intro/bootstrap.ts'),
        'app.component.ts': require('!!raw-loader!./samples/intro/app.component.ts')
      },
      files: ['app.component.ts'],
      highlights: {
        'app.component.ts': [/<h1>.*<\/h1>/]
      }
    },

    interpolation: {
      code: {
        'bootstrap.ts': require('!!raw-loader!./samples/intro/bootstrap.ts'),
        'app.component.ts': require('!!raw-loader!./samples/interpolation/app.component.ts')
      },
      files: ['app.component.ts'],
      highlights: {
        'app.component.ts': [/{{.*}}/, /firstName = .*/]
      }
    },

    expressions: {
      code: {
        'bootstrap.ts': require('!!raw-loader!./samples/intro/bootstrap.ts'),
        'app.component.ts': require('!!raw-loader!./samples/expressions/app.component.ts')
      },
      files: ['app.component.ts'],
      highlights: {
        'app.component.ts': [/{{.*}}/, /fullName\(\){/]
      }
    },

    dataBindingPre: {
      code: {
        'bootstrap.ts': require('!!raw-loader!./samples/intro/bootstrap.ts'),
        'app.component.ts': require('!!raw-loader!./samples/data-binding-pre/app.component.ts')
      },
      files: ['app.component.ts'],
      highlights: {
        'app.component.ts': [/"{{.*}}"/, /avatar = .*/]
      }
    },

    dataBinding: {
      code: {
        'bootstrap.ts': require('!!raw-loader!./samples/intro/bootstrap.ts'),
        'app.component.ts': require('!!raw-loader!./samples/data-binding/app.component.ts')
      },
      files: ['app.component.ts'],
      highlights: {
        'app.component.ts': /\[.*]/
      }
    },

    dataBindingExtra: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/data-binding-extra/app.component.html'),
        'app.component.ts': require('!!raw-loader!./samples/data-binding-extra/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
        'app.module.ts': require('!!raw-loader!./samples/data-binding-extra/app.module.ts'),
        'number-praiser.ts': require('!!raw-loader!./samples/data-binding-extra/number-praiser.ts'),
        'index.html': require('!!raw-loader!./samples/data-binding-extra/index.html')
      },
      files: ['app.component.html', 'app.component.ts']
    },

    ngIf: {
      code: {
        'bootstrap.ts': require('!!raw-loader!./samples/intro/bootstrap.ts'),
        'app.component.ts': require('!!raw-loader!./samples/ng-if/app.component.ts')
      },
      files: ['app.component.ts'],
      highlights: {
        'app.component.ts': /\*ngIf/
      }
    },
    repeating: {
      code: {
        'bootstrap.ts': require('!!raw-loader!./samples/intro/bootstrap.ts'),
        'app.component.ts': require('!!raw-loader!./samples/repeating/app.component.ts')
      },
      files: ['app.component.ts'],
      highlights: {
        'app.component.ts': ['???', /puppies.*;/]
      }
    },
    eventBinding: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/event-binding/app.component.html'),
        'app.component.ts': require('!!raw-loader!./samples/event-binding/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
        'app.module.ts': require('!!raw-loader!./../../../shared/angular-code/app.module.ts'),
        'index.html': require('!!raw-loader!./../../../shared/angular-code/index.html')
      },
      files: ['app.component.html'],
      highlights: { 'app.component.html': '(click)' }
    },
    referenceBinding: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/reference-binding/app.component.html'),
        'app.component.ts': require('!!raw-loader!./samples/reference-binding/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
        'app.module.ts': require('!!raw-loader!./../../../shared/angular-code/app.module.ts'),
        'index.html': require('!!raw-loader!./../../../shared/angular-code/index.html')
      },
      files: ['app.component.html'],
      highlights: { 'app.component.html': ['#input', 'input.value'] }
    },
    eventBindingShortcuts: {
      code: {
        'app.component.html': require('!!raw-loader!./samples/event-binding-shortcuts/app.component.html'),
        'app.component.ts': require('!!raw-loader!./samples/reference-binding/app.component.ts'),
        'bootstrap.ts': require('!!raw-loader!./../../../shared/angular-code/bootstrap.ts'),
        'app.module.ts': require('!!raw-loader!./../../../shared/angular-code/app.module.ts'),
        'index.html': require('!!raw-loader!./../../../shared/angular-code/index.html')
      },
      files: ['app.component.html'],
      highlights: { 'app.component.html': '(keydown.control.enter)' }
    }
  };

  legacyCode = {
    ngForDirective: {
      template: displayAngularComponent(
        `import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Puppies names:</h1>
  <ul>
    <li *ngFor="let puppy of puppies">
      {{puppy}}
    </li>
  </ul>
  \`
})
export class AppComponent {
  puppies = ['Schumann', 'Mendelssohn', 'Bach'];
}`,
        `
import {AppComponent} from './app.component';

describe('AppComponent', ()=>{
  it('Add one more puppy to the list', ()=>{
    const app = new AppComponent();
    chai.expect(app.puppies.length).equals(4);
  })
})

`
      ),
      matches: {
        ngFor: { 'app.component.ts': '*ngFor' }
      }
    }
  };

  ngOnInit() {
    this.t = extractMessages(this.translation);
  }
}
