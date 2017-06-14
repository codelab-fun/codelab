import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { CodelabsModule } from './app/codelabs/codelabs.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(CodelabsModule);
