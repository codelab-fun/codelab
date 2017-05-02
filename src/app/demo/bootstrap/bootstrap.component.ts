import { Component } from '@angular/core';

import { ng2tsConfig } from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent {

  code = {
    componentAnatomy: {   // Component Anatomy - Milestone #1
      code: `import { Component } from '@angular/core';
@Component({
  selector: 'hello-world',
  template: '<h1>Hello World!</h1>',
})
export class HelloWorldComponent {}`,
      matches: {
        exportClass: /export.*/,
        decorator: /@C[^]*?\)[^]/,
        selector: /selector.*'.*'/,
        template: /template.*'.*'/
      },
      readonly: true,
      path: 'component.anatomy.ts',
      type: 'typescript'
    },
    moduleAnatomy: {  // Module Anatomy - Milestone #1
      code: `/* Imports */

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HelloWorldComponent ],
  bootstrap: [ HelloWorldComponent ],
})
export class AppModule {}`,
      matches: {
        exportClass: /export.*/,
        ngModule: /@N[^]*?\)[^]/,
        importsArr: /imports.*/,
        declarationsArr: /declarations.*/,
        bootstrapArr: /bootstrap.*/
      },
      readonly: true,
      path: 'module.anatomy.ts',
      type: 'typescript'
    },
    moduleBootstrapping: {  // Module Bootstrapping - Milestone #1
      code: {
        mainTs: `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);`,
        indexHTML: `<body>
  <hello-world>
    Loading...
  </hello-world>
</body>`
      },
      matches: {
        index: /<hello-[^]*world>/,
        bootstrap: /platformBrowserDynamic\(\).*/
      },
      readonly: true,
      path: 'main.ts',
      type: 'typescript'
    }
  };

  // tslint:disable:max-line-length TODO: Clean up exercises and remove this comment.
  //  Exercises
  exercises = [
    ng2tsConfig.milestones[1].exercises[1],
    ng2tsConfig.milestones[1].exercises[2],
    ng2tsConfig.milestones[1].exercises[3],
    {
      'name': 'Create a component',
      'description': '<p>Create first Angular component!</p>',
      'files': [
        {
          'bootstrap': false,
          'excludeFromTesting': false,
          'type': 'typescript',
          'path': 'app.component.ts',
          'template': 'import {Component} from \'@angular/core\';\n\n',
          'moduleName': 'app.component',
          'code': `import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hello CatTube!</h1>',
})
export class AppComponent {
}
`,
          'solution': 'import { Component } from \'@angular/core\';\n\n@Component({\n  selector: \'my-app\',\n  template: \'<h1>Hello CatTube!</h1>\',\n})\nexport class AppComponent {\n}\n',
          'after': 'export export function evalJs( js ){ return eval(js);}'
        },
        {
          'bootstrap': false,
          'excludeFromTesting': false,
          'type': 'typescript',
          'path': 'app.module.ts',
          'template': 'import { BrowserModule } from \'@angular/platform-browser\';\nimport { NgModule } from \'@angular/core\';\nimport { AppComponent } from \'./app.component\';\n\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n',
          'moduleName': 'app.module',
          'code': 'import { BrowserModule } from \'@angular/platform-browser\';\nimport {NgModule} from \'@angular/core\';\nimport { AppComponent } from \'./app.component\';\n\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n',
          'readonly': true,
          'collapsed': true
        },
        {
          'bootstrap': true,
          'excludeFromTesting': true,
          'type': 'typescript',
          'path': 'main.ts',
          'template': 'import { platformBrowserDynamic } from \'@angular/platform-browser-dynamic\';\nimport {AppModule} from \'./app.module\';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n',
          'moduleName': 'main',
          'code': 'import { platformBrowserDynamic } from \'@angular/platform-browser-dynamic\';\nimport {AppModule} from \'./app.module\';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n',
          'readonly': true,
          'collapsed': true
        }
      ]
    }
  ];
  // tslint:enable:max-line-length
}
