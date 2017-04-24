import {FileConfig} from '../interfaces/file-config';
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
    type: "typescript",
    template,
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
  const moduleCode = "import {BrowserModule} from '@angular/platform-browser';\nimport {NgModule} from '@angular/core';\nimport {AppComponent} from './app.component';\n\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {\n}\n";
  const bootstrapCode = "import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';\nimport {AppModule} from './app.module';\n\nconst platform = platformBrowserDynamic();\nplatform.bootstrapModule(AppModule);\n";
  return {
    files: [
      exercise('app.component', componentCode, componentCode),
      exercise('app.module', moduleCode, moduleCode),
      bootstrap('main', bootstrapCode, bootstrapCode)
    ]
  };
}
