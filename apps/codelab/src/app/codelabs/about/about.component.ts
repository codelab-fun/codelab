import { Component } from '@angular/core';
import { ng2tsConfig } from '../../../../../../ng2ts/ng2ts';

declare const require;

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  code = {
    slides: {
      initial: require('!!raw-loader!./samples/slides/initial.html'),
      template: require('!!raw-loader!./samples/slides/ng-template.html'),
      component: require('!!raw-loader!./samples/slides/slide-component.html'),
      directive: require('!!raw-loader!./samples/slides/structural-directive.html'),
      directiveId: require('!!raw-loader!./samples/slides/structural-directive-ids.html'),
      directiveIdMilestone: require('!!raw-loader!./samples/slides/structural-directive-ids-milestone.html'),
      final: require('!!raw-loader!./samples/slides/structural-directive-final.html')
    },
    storingCode: {
      plain: require('!!raw-loader!./samples/storing-code/plain.html'),
      backticks: require('!!raw-loader!./samples/storing-code/backticks.html'),
      backticksMatch: [/{{`/, /`}}/],
      ngTemplate: require('!!raw-loader!./samples/storing-code/ng-template.html'),
      ngNonBindable: require('!!raw-loader!./samples/storing-code/ng-non-bindable.html'),
      script: require('!!raw-loader!./samples/storing-code/script.html'),
      comment: require('!!raw-loader!./samples/storing-code/comment.html'),
      textarea: require('!!raw-loader!./samples/storing-code/textarea.html'),
      textareaNonBindable: require('!!raw-loader!./samples/storing-code/textarea-non-bindable.html'),
      rawLoader: require('!!raw-loader!./about.component.ts'),
      inComponent: require('!!raw-loader!./samples/storing-code/in-component.ts'),
      interpolation: {
        'bootstrap.ts': require('!!raw-loader!./samples/storing-code/interpolations.ts')
      }
    },
    gettingId: {
      code: require('!!raw-loader!@codelab/slides/src/lib/slide/slide.directive.ts')
    },

    stages: {
      differ: require('!!raw-loader!@codelab/utils/src/lib/differ/differ'),
      builders: require('!!raw-loader!./samples/versions/builders'),
      component: require('!!raw-loader!../../../../../../ng2ts/app.component'),
      firstStage: "import { Component } from '@angular/core';"
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
    preview: [
      ng2tsConfig.milestones[1].exercises[1],
      ng2tsConfig.milestones[2].exercises[1],
      ng2tsConfig.milestones[3].exercises[1],
      ng2tsConfig.milestones[4].exercises[1],
      ng2tsConfig.milestones[5].exercises[0],
      ng2tsConfig.milestones[6].exercises[0],
      ng2tsConfig.milestones[7].exercises[0]
    ],
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
      find: require('!!raw-loader!@codelab/code-demos/src/lib/code-demo-editor/utils/utils'),
      directive: require('!!raw-loader!@codelab/code-demos/src/lib/code-demo-editor/directives/code-demo-editor.highlight.directive')
    },
    types: {
      realtypes: require('!!raw-loader!./samples/types/realtypes.ts'),
      fakeTypes: require('!!raw-loader!./samples/fake-types.d.ts.not-really'),
      coreTypes: require('!!raw-loader!@angular/core/core.d.ts'),
      rxjsTypes: require('!!raw-loader!rxjs/index.d.ts'),
      bundler: require('!!raw-loader!@codelab/code-demos/assets/runner/ng-dts/bundler.ts')
    },
    i18n: {
      template: require('!!raw-loader!../angular/typescript/typescript/typescript.component.html'),
      ts: require('!!raw-loader!../angular/typescript/typescript/typescript.component.ts')
    }
  };
}
