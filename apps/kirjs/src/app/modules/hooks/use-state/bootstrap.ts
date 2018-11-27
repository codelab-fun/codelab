import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ResourceLoader } from '@angular/compiler';
import { UseStateModule } from './use-state.module';


import { default as template } from './use-state.component.html';

debugger;
// The code below is used to match the Components with the appropriate templates.
//
class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {

    return Promise.resolve(template);
  };
}

const platform = platformBrowserDynamic();

platform.bootstrapModule(UseStateModule, {
  providers: [
    {provide: ResourceLoader, useClass: MyResourceLoader}
  ]
});
