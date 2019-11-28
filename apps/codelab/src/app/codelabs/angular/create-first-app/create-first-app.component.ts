import { Component, OnInit, ViewChild } from '@angular/core';

import { ng2tsConfig } from '../../../../../../../ng2ts/ng2ts';
import { extractMessages } from '@codelab/utils/src/lib/i18n/i18n-tools';

declare const require;

@Component({
  selector: 'codelab-slides-create-first-app',
  templateUrl: './create-first-app.component.html',
  styleUrls: [
    '../../../components/css/codelab-styles.scss',
    './create-first-app.component.css'
  ]
})
export class CreateFirstAppComponent implements OnInit {
  t: { [key: string]: string };

  // TODO(kirjs): we can't access tanslation in OnInit hook iwht static set to false
  // need to consider changing how we set code
  @ViewChild('translations', { static: true }) translation;
  //  Exercises
  exercises = [
    ng2tsConfig.milestones[1].exercises[1],
    ng2tsConfig.milestones[1].exercises[2],
    ng2tsConfig.milestones[1].exercises[3],
    {
      name: 'Create a component',
      description: '<p>Create first Angular component!</p>',
      files: [
        {
          bootstrap: false,
          excludeFromTesting: false,
          type: 'typescript',
          path: 'app.component.ts',
          template: `import {Component} from '@angular/core';\n\n`,
          moduleName: 'app.component',
          code: `import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hello MewTube!</h1>',
})
export class AppComponent {
}
`,
          solution: `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'my-app',\n
              template: '<h1>Hello MewTube!</h1>',\n})\nexport class AppComponent {\n}\n`,
          after: 'export function evalJs( js ){ return eval(js);}'
        },
        {
          bootstrap: false,
          excludeFromTesting: false,
          type: 'typescript',
          path: 'app.module.ts',
          template: `import { BrowserWindowModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\n
            import { AppComponent } from './app.component';\n\n@NgModule({\n  imports: [BrowserWindowModule],\n  declarations: [AppComponent],
            \n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n`,
          moduleName: 'app.module',
          code: `import { BrowserWindowModule } from '@angular/platform-browser';\nimport {NgModule} from '@angular/core';\n
            import { AppComponent } from './app.component';\n\n@NgModule({\n  imports: [BrowserWindowModule],\n  declarations: [AppComponent],
            \n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n`,
          readonly: true,
          collapsed: true
        },
        {
          bootstrap: true,
          excludeFromTesting: true,
          type: 'typescript',
          path: 'main.ts',
          template: `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\nimport {AppModule} from './app.module';\n\n
            const platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n`,
          moduleName: 'main',
          code: `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\nimport {AppModule} from './app.module';\n\n
            const platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n`,
          readonly: true,
          collapsed: true
        }
      ]
    }
  ];

  // tslint:disable:max-line-length TODO: Clean up exercises and remove this comment.
  private code: any = {};

  // tslint:enable:max-line-length

  ngOnInit() {
    this.t = extractMessages(this.translation);

    this.code = {
      indexHtml: {
        'index.html': require('!!raw-loader!./samples/index-html/index.html'),
        'bootstrap.ts': require('!!raw-loader!./samples/index-html/bootstrap.ts')
      },
      angularApp: {
        'index.html': require('!!raw-loader!./samples/app-component/index.html'),
        'bootstrap.ts': require('!!raw-loader!./samples/app-component/bootstrap.ts'),
        'app.component.ts': require('!!raw-loader!./samples/app-component/app.component.ts'),
        'app.module.ts': require('!!raw-loader!./samples/app-component/app.module.ts')
      },
      indexHtmlMatches: { 'index.html': /<hello-[^]*world>/ },
      helloMatches: { 'app.component.ts': /hello-world/ },
      componentMatches: { 'app.component.ts': /export.*/ },
      decoratorsMatches: { 'app.component.ts': /@C[^]*?\)[^]/ },
      selectorMatches: { 'app.component.ts': /selector.*'.*'/ },
      templateMatches: { 'app.component.ts': /template: `[^]*?`[^]/ },
      exportMatches: { 'app.module.ts': /export.*/ },
      ngModuleMatches: { 'app.module.ts': /@N[^]*?\)[^]/ },
      declarationsMatches: { 'app.module.ts': /declarations.*/ },
      bootstrapMatches: { 'app.module.ts': /bootstrap.*/ },
      bootstrapPlatformMatches: {
        'bootstrap.ts': /platformBrowserDynamic\(\).*/
      },
      decorators: {
        code: `import {Component} from '@angular/core';
// ${this.t.componentIsDecorator}
@Component({
  // metadata
}) // ${this.t.noSemicolon}
export class AppComponent {
  // ${this.t.decoratorGoesAboveEntity}
  // ${this.t.componentNameIsClassName}
}`
      }
    };
  }
}
