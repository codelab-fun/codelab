import {Component} from '@angular/core';
import {BaseRouteableComponent} from '../BaseRouteableComponent';
import {ng2tsConfig} from '../../../../ng2ts/ng2ts';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent extends BaseRouteableComponent {

  code = {
    componentAnatomy: {   // Component Anatomy - Milestone #1
      code:`import { Component } from '@angular/core';
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
      code: `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HelloWorldComponent } from './hello-world.component';

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
    moduleBootstrapping: {
      code: {
        mainTs: `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
  import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);`,
        indexHTML: `<body>
  <!-- Typically our “root” component has the selector 
       <app-root></app-root>. We're using <hello-world></hello-word>
       as tradition dictates. -->
  <hello-world>Loading...</hello-world>
  <script>...</script>
</body>`
      },
      matches: {
        bootstrap: /platformBrowserDynamic().*/
      },
      readonly: true,
      path: 'main.ts',
      type: 'typescript'
    }
  };

  //  Exercises
  exercises = [
    ng2tsConfig.milestones[0].exercises[1],
    ng2tsConfig.milestones[1].exercises[1],
    ng2tsConfig.milestones[1].exercises[2],
    {
      "name": "Create a component",
      "description": "<p>Create first Angular component!</p>",
      "files": [
        {
          "bootstrap": false,
          "excludeFromTesting": false,
          "type": "typescript",
          "path": "app.component.ts",
          "template": "import {Component} from '@angular/core';\n\n",
          "moduleName": "app.component",
          "code": `import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hello CatTube!</h1>',
})
export class AppComponent {
}
`,
          "solution": "import {Component} from '@angular/core';\n\n@Component({\n  selector: 'my-app',\n  template: '<h1>Hello CatTube!</h1>',\n})\nexport class AppComponent {\n}\n",
          "after": "export export function evalJs( js ){ return eval(js);}"
        },
        {
          "bootstrap": false,
          "excludeFromTesting": false,
          "type": "typescript",
          "path": "app.module.ts",
          "template": "import {BrowserModule} from '@angular/platform-browser';\nimport {NgModule} from '@angular/core';\nimport {AppComponent} from './app.component';\n\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n",
          "moduleName": "app.module",
          "code": "import {BrowserModule} from '@angular/platform-browser';\nimport {NgModule} from '@angular/core';\nimport {AppComponent} from './app.component';\n\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n",
          "readonly": true,
          "collapsed": true
        },
        {
          "bootstrap": true,
          "excludeFromTesting": true,
          "type": "typescript",
          "path": "main.ts",
          "template": "import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';\nimport {AppModule} from './app.module';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n",
          "moduleName": "main",
          "code": "import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';\nimport {AppModule} from './app.module';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n",
          "readonly": true,
          "collapsed": true
        },
        {
          "bootstrap": true,
          "excludeFromTesting": false,
          "type": "typescript",
          "path": "tests/test.ts",
          "template": "\nimport {TestBed} from '@angular/core/testing';\n// Solution prefix will be stripped-out by the app\nimport {AppComponent, evalJs} from '../app.component';\nimport 'reflect-metadata';\n\nlet metadata;\nbeforeEach(() => {\n  try {\n    TestBed.resetTestingModule();\n    TestBed.configureTestingModule({declarations: [AppComponent]});\n    metadata = Reflect.getMetadata('annotations', AppComponent);\n  } catch (e) {\n    // Do nothing, we have assertions below for this case\n  }\n});\n\ndescribe('Component', () => {\n  it(`Create a class called AppComponent`, () => {\n    chai.expect(typeof evalJs('AppComponent')).equals('function');\n  });\n\n  it(`Export the created class`, () => {\n    chai.expect(typeof AppComponent).equals('function');\n  });\n\n  it(`Add a Component decorator for the class`, () => {\n    chai.expect(metadata).is.not.undefined\n  });\n\n  it(`Add a selector to the component decorator`, () => {\n    chai.expect(metadata[0].selector).equals('my-app');\n  });\n\n  it(`Add a template that contains: '<h1>Hello CatTube!</h1>'`, () => {\n    chai.expect(metadata[0].template).equals('<h1>Hello CatTube!</h1>');\n  });\n});\n\n",
          "moduleName": "tests/test",
          "code": "\nimport {TestBed} from '@angular/core/testing';\n// Solution prefix will be stripped-out by the app\nimport {AppComponent, evalJs} from '../app.component';\nimport 'reflect-metadata';\n\nlet metadata;\nbeforeEach(() => {\n  try {\n    TestBed.resetTestingModule();\n    TestBed.configureTestingModule({declarations: [AppComponent]});\n    metadata = Reflect.getMetadata('annotations', AppComponent);\n  } catch (e) {\n    // Do nothing, we have assertions below for this case\n  }\n});\n\ndescribe('Component', () => {\n  it(`Create a class called AppComponent`, () => {\n    chai.expect(typeof evalJs('AppComponent')).equals('function');\n  });\n\n  it(`Export the created class`, () => {\n    chai.expect(typeof AppComponent).equals('function');\n  });\n\n  it(`Add a Component decorator for the class`, () => {\n    chai.expect(metadata).is.not.undefined\n  });\n\n  it(`Add a selector to the component decorator`, () => {\n    chai.expect(metadata[0].selector).equals('my-app');\n  });\n\n  it(`Add a template that contains: '<h1>Hello CatTube!</h1>'`, () => {\n    chai.expect(metadata[0].template).equals('<h1>Hello CatTube!</h1>');\n  });\n});\n\n",
          "solution": "\nimport {TestBed} from '@angular/core/testing';\n// Solution prefix will be stripped-out by the app\nimport {AppComponent, evalJs} from '../app.component';\nimport 'reflect-metadata';\n\nlet metadata;\nbeforeEach(() => {\n  try {\n    TestBed.resetTestingModule();\n    TestBed.configureTestingModule({declarations: [AppComponent]});\n    metadata = Reflect.getMetadata('annotations', AppComponent);\n  } catch (e) {\n    // Do nothing, we have assertions below for this case\n  }\n});\n\ndescribe('Component', () => {\n  it(`Create a class called AppComponent`, () => {\n    chai.expect(typeof evalJs('AppComponent')).equals('function');\n  });\n\n  it(`Export the created class`, () => {\n    chai.expect(typeof AppComponent).equals('function');\n  });\n\n  it(`Add a Component decorator for the class`, () => {\n    chai.expect(metadata).is.not.undefined\n  });\n\n  it(`Add a selector to the component decorator`, () => {\n    chai.expect(metadata[0].selector).equals('my-app');\n  });\n\n  it(`Add a template that contains: '<h1>Hello CatTube!</h1>'`, () => {\n    chai.expect(metadata[0].template).equals('<h1>Hello CatTube!</h1>');\n  });\n});\n\n",
          "test": true,
          "before": "mochaBefore();",
          "after": "mochaAfter();",
          "hidden": true
        }
      ]
    }
  ];
}
