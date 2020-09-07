import { Component, OnInit } from '@angular/core';

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
    highlights: {
      find: require('!!raw-loader!@codelab/code-demos/src/lib/code-demo-editor/utils/utils')
    }
  };

  constructor() {}

  ngOnInit() {}
}
