import { Component, OnInit, ViewChild } from '@angular/core';

import { ng2tsConfig } from '@mycurrentapp/ng2ts/src/ng2ts';
import { extractMessages } from '@mycurrentapp/presentation/src/i18n-tools';

@Component({
  selector: 'slides-create-first-app',
  templateUrl: './create-first-app.component.html',
  styleUrls: ['./create-first-app.component.css']
})
export class CreateFirstAppComponent implements OnInit {
  t: { [key: string]: string };

  @ViewChild('translations') translation;
  currentMode = 'web';
  private code: any = {};

  // tslint:disable:max-line-length TODO: Clean up exercises and remove this comment.
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
          template: "import {Component} from '@angular/core';\n\n",
          moduleName: 'app.component',
          code: `import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hello MewTube!</h1>',
})
export class AppComponent {
}
`,
          solution:
            "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'my-modules',\n  template: '<h1>Hello MewTube!</h1>',\n})\nexport class AppComponent {\n}\n",
          after: 'export export function evalJs( js ){ return eval(js);}'
        },
        {
          bootstrap: false,
          excludeFromTesting: false,
          type: 'typescript',
          path: 'app.module.ts',
          template:
            "import { BrowserWindowModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\nimport { AppComponent } from './modules.component';\n\n@NgModule({\n  imports: [BrowserWindowModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n",
          moduleName: 'app.module',
          code:
            "import { BrowserWindowModule } from '@angular/platform-browser';\nimport {NgModule} from '@angular/core';\nimport { AppComponent } from './modules.component';\n\n@NgModule({\n  imports: [BrowserWindowModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n",
          readonly: true,
          collapsed: true
        },
        {
          bootstrap: true,
          excludeFromTesting: true,
          type: 'typescript',
          path: 'main.ts',
          template:
            "import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\nimport {AppModule} from './modules.module';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n",
          moduleName: 'main',
          code:
            "import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\nimport {AppModule} from './modules.module';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n",
          readonly: true,
          collapsed: true
        }
      ]
    }
  ];
  // tslint:enable:max-line-length

  ngOnInit() {
    this.t = extractMessages(this.translation);

    this.code = {
      decorators: {
        code: `// ${this.t.componentIsDecorator}
@Component({
  metadata
}) // ${this.t.noSemicolon}
export class AppComponent {
  // ${this.t.decoratorGoesAboveEntity}
  // ${this.t.componentNameIsClassName}
}`
      },
      componentAnatomy: {
        // Component Anatomy - Milestone #1
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
      moduleAnatomy: {
        // Module Anatomy - Milestone #1
        code: `/* Imports */

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ HelloWorldComponent ],
  bootstrap: [ HelloWorldComponent ],
})
export class AppModule {}`,
        codeMobile: `/* Imports */
@NgModule({
  imports: [ NativeScriptModule ],
  declarations: [ HelloWorldComponent ],
  bootstrap: [ HelloWorldComponent ],
})
export class AppModule {}`,
        codeVR: `/* Imports */
export class VRComponent implements OnInit {
    aframe: any;
    ngOnInit() {
        this.aframe = this.elem
            .querySelector('a-scene');
    }
}`,
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
        // Module Bootstrapping - Milestone #1
        code: {
          mainTs: `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);`,
          indexHTML: `<!DOCTYPE><body>
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
  }

  selectMode(event, mode) {
    event.preventDefault();
    this.currentMode = mode;
  }

  getModeClass(mode) {
    return mode === this.currentMode ? '' : 'mode-hide';
  }
}
