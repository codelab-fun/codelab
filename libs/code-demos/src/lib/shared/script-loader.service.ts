import { Injectable } from '@angular/core';
import { assert } from './utils';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private readonly scripts = {
    SystemJS: require('!!raw-loader!systemjs/dist/system'),
    mocha: require('!!raw-loader!../../../assets/runner/js/mocha'),
    chai: require('!!raw-loader!chai/chai'),
    'test-bootstrap': require('!!raw-loader!../../../assets/runner/js/test-bootstrap'),
    shim: require('!!raw-loader!core-js/client/shim.min.js'),
    zone: require('!!raw-loader!zone.js/dist/zone.js'),
    'system-config': require('!!raw-loader!../../../assets/runner/js/system-config'),
    'ng-bundle': require('!!raw-loader!../../../assets/runner/ng2/ng-bundle')
    // TODO(kirjs): not sure we still need vue and react libs
    // vue: require('!!raw-loader!vue/dist/vue.js'),
    // react: require('!!raw-loader!react/umd/react.development.js'),
    // 'react-dom': require('!!raw-loader!react-dom/umd/react-dom.development.js')
  };

  getScript(url) {
    assert(this.scripts[url]);
    return this.scripts[url];
  }
}
