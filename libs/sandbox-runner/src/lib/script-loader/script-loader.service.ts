import { Injectable } from '@angular/core';
import { assert } from '@codelab/utils';

declare const require;

const scripts = {
  mocha: require('!!raw-loader!./assets/js/mocha').default,
  chai: require('!!raw-loader!chai/chai').default,
  'test-bootstrap': require('!!raw-loader!./assets/js/test-bootstrap').default,
  zone: require('!!raw-loader!./assets/js/zone.js').default,
  reflectMetadata: require('!!raw-loader!reflect-metadata/Reflect.js').default,
  'mock-console': require('!!raw-loader!./assets/js/mock-console').default,
  // TODO(kirjs): not sure we still need vue and react libs
  // vue: require('!!raw-loader!vue/dist/vue.js').default,
  // react: require('!!raw-loader!react/umd/react.development.js').default,
  // 'react-dom': require('!!raw-loader!react-dom/umd/react-dom.development.js').default
};

type ScriptName = keyof typeof scripts;

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  getScript(url: ScriptName) {
    assert(scripts[url]);
    return scripts[url];
  }
}
