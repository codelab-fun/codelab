// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Firebase
  firebaseConfig: {
    apiKey: 'AIzaSyBiY1Lg2RIcKtbgqzfE6Vrg28Zjal6ZWHs',
    authDomain: 'angular-presentation.firebaseapp.com',
    databaseURL: 'https://angular-presentation.firebaseio.com',
    projectId: 'angular-presentation',
    storageBucket: 'angular-presentation.appspot.com',
    messagingSenderId: '1087862173437',
    appId: '1:1087862173437:web:0bb7fe324b62580bb31894'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
