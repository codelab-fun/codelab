import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { assert } from './utils';
declare var require;

@Injectable()
export class ScriptLoaderService {

  scripts = {
    SystemJS: require('!!raw-loader!systemjs/dist/system.src'),
    mocha: require('!!raw-loader!../../../assets/runner/js/mocha'),
    chai: require('!!raw-loader!../../../assets/runner/js/chai.min'),
    'test-bootstrap': require('!!raw-loader!../../../assets/runner/js/test-bootstrap'),
    shim: require('!!raw-loader!../../../assets/runner/node_modules/core-js/client/shim.min.js'),
    zone: require('!!raw-loader!../../../assets/runner/node_modules/zone.js/dist/zone.js'),
    reflect: require('!!raw-loader!reflect-metadata/Reflect'),
    'system-config': require('!!raw-loader!../../../assets/runner/js/system-config'),
    'ng-bundle': require('!!raw-loader!../../../assets/runner/ng2/ng-bundle')
  };

  getScript(url) {
    assert(this.scripts[url]);
    return this.scripts[url];
  }

  constructor(private http: Http) {
  }
}
