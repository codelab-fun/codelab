import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { ApplicationRef, enableProdMode, NgModuleRef } from '@angular/core';
/*d:templatePageSetup/trimLeading*/
import { ResourceLoader } from '@angular/compiler';
import * as code from './code';

/* dark magic, please ignore */ try {enableProdMode();} catch (e) {} /* The code below is used to match the Components with the appropriate templates. */class MyResourceLoader extends ResourceLoader {get(url: string): Promise<string> {const templateId = Object.keys(code).find(key => key.includes(url.replace(/[\/\.-]/gi, '_')));let template = code[templateId];if (!template) {console.log(template);debugger;}return Promise.resolve(template);};}function createNewHosts(cmps) {const components = Array.prototype.map.call(cmps, function (componentNode) {const newNode = document.createElement(componentNode.tagName);if (!componentNode.parentNode) {document.body.append(componentNode);}const parentNode = componentNode.parentNode;const currentDisplay = newNode.style.display;newNode.style.display = 'none';parentNode.insertBefore(newNode, componentNode);function removeOldHost() {newNode.style.display = currentDisplay;try {parentNode.removeChild(componentNode);} catch (e) {}}return removeOldHost;});return function removeOldHosts() {components.forEach(function (removeOldHost) {return removeOldHost();});};}export const hmrBootstrap = (ngModule: NgModuleRef<any>) => {const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);const elements = appRef.components.map((c) => c.location.nativeElement);const makeVisible = createNewHosts(elements);ngModule.destroy();makeVisible();};if (window['ref']) {hmrBootstrap(window['ref']);window['ref'] = null;}

/*/d*//*d:bootstrapSolved/trimTrailing*/
const platform = platformBrowserDynamic();
/*/d*//*d:bootstrapSolved:bootstrapSolved/trimTrailing*/


platform.bootstrapModule(AppModule);
/*/d*//*d:templatePageSetup/trimTrailing*/
platform.bootstrapModule(AppModule, {
  providers: [
    {provide: ResourceLoader, useClass: MyResourceLoader, deps: []}
  ]
}).then((ngModuleRef: NgModuleRef<any>) => {
  window['ref'] = ngModuleRef;
}).catch(err => console.error(err));
/*/d*/
