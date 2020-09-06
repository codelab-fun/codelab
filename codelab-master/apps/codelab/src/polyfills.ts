import 'fullscreen-api-polyfill';
import 'zone.js/dist/zone'; // Included with Angular CLI.
import '@angular/localize/init';

// Needed for babel :(
(window as any).Buffer = {};

(window as any).process = {
  env: { DEBUG: undefined },
  argv: {
    indexOf() {
      return 0;
    }
  },
  getuid() {
    return 0;
  }
};
