import {FileConfig} from '../interfaces/file-config';


function exercise_with_display(moduleName: string, code: any, code2: any) {
  return {
    ...exercise(moduleName, code, code2), before: `
  
    export const value = {};
    function display( newValue ){
      value.value = newValue; 
    }
    
  `
  };
}


export function exercise(moduleName: string, template: string, solution: string): FileConfig {
  return {
    bootstrap: false,
    excludeFromTesting: false,
    type: 'typescript',
    path: moduleName + '/' + moduleName + '.ts',
    template,
    code: template,
    moduleName: moduleName,
    solution,
    after: `export export function evalJs( js ){ return eval(js);}`
  };
}
export function test(moduleName: string, template: string): FileConfig {
  return {
    path: moduleName + '/' + moduleName + '/test.ts',
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
    path: moduleName + '/' + moduleName + '.ts',
    template,
    code: template,
    moduleName: moduleName,
    solution
  };
}

export function displayAngularComponent(componentCode: string) {
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
      exercise_with_display('app.ts', code, code),
      bootstrap('main.ts', bootstrapCode, bootstrapCode),
      test('test.ts', testCode)
    ]
  }
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
