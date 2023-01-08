import { Component, OnInit } from '@angular/core';

declare const require;

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  code = {
    fakeTypes: require('!!raw-loader!./samples/fake-types.d.ts.not-really')
      .default,
    slides: {
      template: require('!!raw-loader!./samples/slides/ng-template.html')
        .default,
      component: require('!!raw-loader!./samples/slides/slide-component.html')
        .default,
      directive:
        require('!!raw-loader!./samples/slides/structural-directive.html')
          .default,
    },
    storingCode: {
      plain: require('!!raw-loader!./samples/storing-code/plain.html').default,
      backticks: require('!!raw-loader!./samples/storing-code/backticks.html')
        .default,
      backticksMatch: [/{{`/, /`}}/],
      interpolation: {
        'bootstrap.ts':
          require('!!raw-loader!./samples/storing-code/interpolations.ts')
            .default,
      },
    },
    highlights: {
      find: require('!!raw-loader!./samples/find-position.ts.file')
        .default,
    },
  };

  constructor() {
  }

  ngOnInit() {}
}
