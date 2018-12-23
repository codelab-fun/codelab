const vendors = require('./vendors.json');
import { writeFileSync } from 'fs';

const t = { vendors, dependencies: {} };

const files = Object.keys(t.vendors)
  .filter(function(path) {
    return (
      path.endsWith('.d.ts') ||
      path.endsWith('package.json') ||
      path.endsWith('.metadata.json')
    );
  })
  .map(function(path) {
    const n = path.replace('https://unpkg.com/', '');
    return {
      path:
        'node_modules/' +
        n.substr(0, n.lastIndexOf('@')) +
        n.substr(n.indexOf('/', n.lastIndexOf('@'))),
      content: t.vendors[path].contents
    };
  })
  .concat(
    Object.keys(t.dependencies).map(function(name) {
      const dependency = t.dependencies[name];
      const content: any = {
        name: `'${name}'`,
        version: `'${dependency.version}'`
      };
      if (dependency.hasOwnProperty('types')) {
        content.types = `'${dependency.types}'`;
      }
      if (dependency.hasOwnProperty('typings')) {
        content.typings = `'${dependency.typings}'`;
      }

      return {
        path: 'node_modules/' + name + '/package.json',
        content: content
      };
    })
  );

writeFileSync('./files.txt', JSON.stringify(files, null, 2), 'utf-8');
console.info('Done!');

//       .forEach(function(t) {
//   monaco.languages.typescript.typescriptDefaults._extraLibs[t.path] = t.content
// }),
//   Object.keys(this.store.getState().project.dependencies).concat(Nl).forEach(function(t) {
//     monaco.languages.typescript.typescriptDefaults._extraLibs["zuz_/" + t] = function(t) {
//       return 'import {  } from "' + t + '"'
//     }(t)
//   }),
//   monaco.languages.typescript.typescriptDefaults.updateExtraLibs(),
//   monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
//     noSemanticValidation: !1,
//     noSyntaxValidation: !1
//   }),
//
