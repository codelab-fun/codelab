import {FileConfig} from '../interfaces/file-config';


function exerciseWithDisplay(moduleName: string, code: any, code2: any) {
  return {
    ...exercise(moduleName, code, code2), before: `
    export const value = {};
    function display( newValue ){
      value.value = newValue;
    }
  `
  };
}

export function withDeps(config: { files: Array<FileConfig> }, moduleName: string, depName: string) {
  return {
    files: config.files.map((file) => {
      if (file.moduleName === moduleName) {
        file.deps = file.deps || [];
        file.deps.push(depName);
      }
      return file;
    })
  };
}

function exerciseWithConsoleLog(moduleName: string, code: any, code2: any) {
  return {
    ...exercise(moduleName, code, code2), before: `

    export const value = {};

    function wrap(context, prop, callback){
      const originalMethod = context[prop];

       context[prop] = function(...args){
        callback(...args);
        return originalMethod.apply(context, args);
       }
    }

    wrap(console, 'log', (v)=>{
      value.value = v;
      document.write('<h3>&gt; ' + JSON.stringify(v) + '<h3><hr>')
    })
  `
  };
}


export function exercise(moduleName: string, template: string, solution: string): FileConfig {
  return {
    bootstrap: false,
    excludeFromTesting: false,
    type: 'typescript',
    path: moduleName + '.ts',
    template,
    code: template,
    moduleName: moduleName,
    solution,
    after: `export export function evalJs( js ){ return eval(js);}`
  };
}
export function test(moduleName: string, template: string): FileConfig {
  return {
    path: moduleName + 'Test.ts',
    type: 'typescript',
    template,
    code: template,
    moduleName: moduleName + 'Test',
    excludeFromTesting: false,
    test: true,
    bootstrap: true,
    before: 'mochaBefore();',
    after: 'mochaAfter();',
    hidden: true,
  };
}


export function bootstrap(moduleName: string, template: string, solution: string) {
  return {
    bootstrap: true,
    excludeFromTesting: true,
    type: 'typescript',
    path: moduleName + '.ts',
    template,
    code: template,
    moduleName: moduleName,
    solution
  };
}


export function circleAndBox() {
  const result = boxAndCircle();
  const temp = result.files[0];
  result.files[0] = result.files[1];
  result.files[1] = temp;
  return result;
}
// That's me being plain lazy, we need
export function boxAndCircle() {
  const moduleCode = `import {BrowserModule} from \'@angular/platform-browser\';
  import {NgModule} from '@angular/core';
  import {BoxComponent} from './box.component';
  import {CircleComponent} from './circle.component';

  @NgModule({
    imports: [BrowserModule],
    declarations: [CircleComponent, BoxComponent],
    bootstrap: [BoxComponent]
  })
  export class AppModule {}`;
  const circleCode = `import { Component, Input } from '@angular/core';

  @Component({
    selector: 'slides-circle',
    template: '<div class="circle" [style.width]="size" [style.height]="size" [style.background]="color"></div>'
  })
  export class CircleComponent {
    @Input() size: number;
    @Input() color: string;
  }`;

  const boxCode = `import { Component } from '@angular/core';

  @Component({
    selector: 'my-app',
    template: \`<div><slides-circle
      [size]="5"
      [color]="circleColor"></slides-circle></div>\`
  })
  export class BoxComponent {
    circleColor="green"
  }`;

  const bootstrapCode = `import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule)
`;

  return {
    other: {
      boxNoParams: `import { Component } from '@angular/core';

  @Component({
    selector: 'slides-box',
    template: \`<div><slides-circle></slides-circle></div>\`
  })
  export class BoxComponent {
    circleColor="green"
  }`
    },
    files: [
      exercise('box.component', boxCode, boxCode),
      exercise('circle.component', circleCode, circleCode),
      exercise('app.module', moduleCode, moduleCode),
      bootstrap('main', bootstrapCode, bootstrapCode),
      {
        type: 'css',
        path: 'styles.css',
        code: `
         my-app > div {
           width: 300px;
           height: 200px;
           border: 1px #ddd solid;
         }
         .circle {
           margin-left: 100px;
           margin-top: 50px;
           border-radius: 50%;
         }
        `
      }
    ]
  };


}

export function displayAngularComponent(componentCode: string) {
  // tslint:disable-next-line:max-line-length TODO: Clean up next line and remove this comment.
  const moduleCode = 'import {BrowserModule} from \'@angular/platform-browser\';\nimport {NgModule} from \'@angular/core\';\nimport {AppComponent} from \'./app.component\';\n\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n';
  const bootstrapCode = `import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
import {ResourceLoader} from '@angular/compiler';
import * as code from './code';

// The code below is used to match the Components with the appropriate templates.
//
class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    const templateId = Object.keys(code).find(key => key.includes(url.replace(/[\/\.-]/gi, '_')));
    let template = code[templateId];
    if (!template) {
      console.log(template);
      debugger;
    }
    return Promise.resolve(template);
  };
}

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule, {
  providers: [
    {provide: ResourceLoader, useClass: MyResourceLoader}
  ]
});

`;
  return {
    files: [
      exercise('app.component', componentCode, componentCode),
      exercise('app.module', moduleCode, moduleCode),
      bootstrap('main', bootstrapCode, bootstrapCode),
      {
        type: 'css',
        path: 'styles.css',
        code: `
          body, html {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
          }

          h1, h2 {
            margin: 0;
            padding: 0;
          }

          h1 {font-size: 20px;}
          h2 {font-size: 16px;}
        `
      }
    ]
  };
}

export function pureJavascript(code, bootstrapCode, testCode) {
  return {
    files: [
      exerciseWithDisplay('app', code, code),
      bootstrap('main', bootstrapCode, bootstrapCode),
      test('test', testCode)
    ]
  };
}

export function typeScriptWithConsoleLog(code: string, bootstrapCode = 'import "./app";', testCode = '', otherCode = '') {
  const files = [
    exerciseWithConsoleLog('app', code, code),
    bootstrap('main', bootstrapCode, bootstrapCode),
    test('test', testCode)
  ];
  if (otherCode !== '') {
    files.push(exercise('puppy', otherCode, otherCode));
  }
  return {
    files
  };
}


export function displayAngularComponentWithHtml(componentCode: string, html: string) {
  return {
    files: [
      {
        code: html,
        path: 'app/app.html',
        solution: '',
        type: 'html'
      },
      ...
        displayAngularComponent(componentCode).files
    ]
  };
}
