import { Component, OnInit } from '@angular/core';
import { ng2tsConfig } from '../../../../../../ng2ts/ng2ts';

declare const require;

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  code = {
    fakeTypes: require('!!raw-loader!./samples/fake-types.d.ts.not-really'),
    slides: {
      template: require('!!raw-loader!./samples/slides/ng-template.html'),
      component: require('!!raw-loader!./samples/slides/slide-component.html'),
      directive: require('!!raw-loader!./samples/slides/structural-directive.html')
    },
    storingCode: {
      plain: require('!!raw-loader!./samples/storing-code/plain.html'),
      backticks: require('!!raw-loader!./samples/storing-code/backticks.html'),
      backticksMatch: [/{{`/, /`}}/],
      interpolation: {
        'bootstrap.ts': require('!!raw-loader!./samples/storing-code/interpolations.ts')
      }
    },
    gettingId: {
      code: require('!!raw-loader!@codelab/slides/src/lib/slide/slide.directive.ts')
    },
    exercise: {
      translations: {
        createClassAppComponent: "Create a class called 'AppComponent'",
        exportClass: 'Export the class',
        addComponentDecorator: 'Add a Component decorator for the class',
        addSelectorMyApp:
          "Add a selector to the component decorator and set it to 'my-app'",
        addTemplateHelloMewTube:
          'Add a template that contains: h1 with a text "Hello MewTube!"'
      },
      config: ng2tsConfig.milestones[1].exercises[1]
    },
    simpleAngular: {
      code: {
        'bootstrap.ts': require('!!raw-loader!./../../shared/angular-code/bootstrap.ts'),
        'app.module.ts': require('!!raw-loader!./../../shared/angular-code/app.module.ts'),
        'app.component.ts': require('!!raw-loader!./../../shared/angular-code/app.component.ts'),
        'index.html': require('!!raw-loader!./../../shared/angular-code/index.html'),
        'styles.css': `
          h1:first-child {
            font-size: 100px !important;
          }
        `
      },
      files: ['app.component.ts']
    },

    highlights: {
      appComponent: { 'app.component.ts': 'AppComponent' },
      find: require('!!raw-loader!@codelab/code-demos/src/lib/code-demo-editor/utils/utils')
    }
  };

  constructor() {}

  ngOnInit() {}
}
