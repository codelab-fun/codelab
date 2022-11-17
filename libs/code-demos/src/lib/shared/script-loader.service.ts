import { Injectable } from '@angular/core';
import { assert } from './utils';

declare const require;

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  private readonly scripts = {
    mocha: require('!!raw-loader!../../../assets/runner/js/mocha').default,
    chai: require('!!raw-loader!chai/chai').default,
    'test-bootstrap':
      require('!!raw-loader!../../../assets/runner/js/test-bootstrap').default,
    shim: require('!!raw-loader!core-js/client/shim.min.js').default,
    zone: require('!!raw-loader!zone.js/dist/zone.js').default,
    // 'system-config':
    //   require('!!raw-loader!../../../assets/runner/js/system-config').default,
    'mock-console':
      require('!!raw-loader!../../../assets/runner/js/mock-console').default,
    // TODO(kirjs): not sure we still need vue and react libs
    // vue: require('!!raw-loader!vue/dist/vue.js').default,
    // react: require('!!raw-loader!react/umd/react.development.js').default,
    // 'react-dom': require('!!raw-loader!react-dom/umd/react-dom.development.js').default
  };

  getScript(url) {
    assert(this.scripts[url]);
    return this.scripts[url];
  }
}
