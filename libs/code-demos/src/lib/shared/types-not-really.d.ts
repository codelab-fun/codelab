// interface RouteConfig {
//   path: string;
//   component: any;
// }

// declare module '@angular/core' {
//   export class EventEmitter<T> {
//     emit: (param: T) => void;
//   }

//   export interface DirectiveConfig {
//     selector: string;
//   }

//   export interface ComponentConfig {
//     selector: string;
//     template?: string;
//     templateUrl?: string;
//   }

//   export interface PipeConfig {
//     name: string;
//   }

//   export function enableProdMode();

//   export function Component(config: ComponentConfig);

//   export function Directive(config: DirectiveConfig);

//   export class TemplateRef<T> {}

//   export class ViewContainerRef {
//     clear: () => void;
//     createEmbeddedView: (ref: TemplateRef<any>, context: any) => void;
//   }

//   export interface AfterViewInit {
//     ngAfterViewInit: () => void;
//   }

//   export interface OnInit {
//     ngOnInit: () => void;
//   }

//   export interface NgModuleConfig {
//     imports?: any[];
//     declarations?: any[];
//     providers?: any[];
//     bootstrap?: any[];
//     exports?: any[];
//   }

//   export function NgModule(config: NgModuleConfig);

//   export function Injectable();

//   export function Output();

//   export function Input();

//   export interface OnChanges {
//     ngOnChanges: (simpleChanges: SimpleChange[]) => void;
//   }

//   export interface SimpleChange {
//     [key: string]: any;
//   }

//   export function Pipe(config: PipeConfig);

//   export interface PipeTransform {
//     transform(value: string);
//   }
// }

// declare module '@angular/forms' {
//   export class FormsModule {}
// }
// declare module '@angular/platform-browser' {
//   export class BrowserModule {}
// }

// declare module '@angular/platform-browser/animations' {
//   export class NoopAnimationsModule {}
// }
// declare module '@angular/platform-browser-dynamic' {
//   export class Platform {
//     bootstrapModule: (module: any, config?: any) => void;
//   }

//   export function platformBrowserDynamic(): Platform;
// }

// declare module '@angular/compiler' {
//   export class ResourceLoader {}
// }

// declare class Observable<T> {
//   subscribe: (T) => void;
// }

// declare module '@angular/router' {
//   export type Routes = Array<RouteConfig>;

//   export class RouterModule {
//     static forRoot: (routes: Routes) => any;
//   }
// }

// declare module '@angular/common' {
//   export class NgIf {
//     constructor(v: any, t: any);
//   }
// }

// declare module '@angular/material' {
//   export class MatTab {
//     position: number;
//   }

//   export class MatTabGroup {
//     selectedIndex: number;
//     selectChange: Observable<any>;
//   }

//   export class MatInputModule {}

//   export class MatTabsModule {}

//   export class MatToolbarModule {}

//   export class MatCardModule {}

//   export class MatButtonModule {}
// }

// declare class Babylon {
//   parse: (code: string) => any;
// }

// // Object.keys(t.vendors).filter(function(t) {
// //   return t.endsWith(".d.ts") || t.endsWith("package.json") || t.endsWith(".metadata.json")
// // }).map(function(e) {
// //   var n = e.replace("https://unpkg.com/", "");
// //   return {
// //     path: "node_modules/" + n.substr(0, n.lastIndexOf("@")) + n.substr(n.indexOf("/", n.lastIndexOf("@"))),
// //     content: t.vendors[e].contents
// //   }
// // }).concat(Object.keys(t.dependencies).map(function(e) {
// //   var n = t.dependencies[e];
// //   return {
// //     path: "node_modules/" + e + "/package.json",
// //     content: '{"name":"' + e + '","version":"' + n.version + '"' + (n.hasOwnProperty("types") ? ',"types":"' + n.types + '"' : "")
// //       + (n.hasOwnProperty("typings") ? ',"typings":"' + n.typings + '"' : "") + "}"
// //   }
// // })).forEach(function(t) {
// //   monaco.languages.typescript.typescriptDefaults._extraLibs[t.path] = t.content
// // }),
// //   Object.keys(this.store.getState().project.dependencies).concat(Nl).forEach(function(t) {
// //     monaco.languages.typescript.typescriptDefaults._extraLibs["zuz_/" + t] = function(t) {
// //       return 'import {  } from "' + t + '"'
// //     }(t)
// //   }),
// //   monaco.languages.typescript.typescriptDefaults.updateExtraLibs(),
// //   monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
// //     noSemanticValidation: !1,
// //     noSyntaxValidation: !1
// //   }),
