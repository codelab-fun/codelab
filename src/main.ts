import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { DemoModule } from './app/demo/demo.module';

declare const require;

require('style-loader!../node_modules/intro.js/minified/introjs.min.css');
require('style-loader!../node_modules/intro.js/themes/introjs-nassim.css');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(DemoModule);
