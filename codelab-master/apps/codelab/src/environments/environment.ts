// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

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
