import { getTypeScript } from '@codelab/utils/src/lib/loaders/loaders';

const ts = getTypeScript();
import babel_traverse from '@babel/traverse';
import * as babylon from 'babylon';
import * as babel_types from 'babel-types';

export function addMetaInformation(sandbox, files: { [key: string]: string }) {
  sandbox.evalJs(`System.registry.delete(System.normalizeSync('./code'));`);
  (sandbox.iframe.contentWindow as any).System.register('code', [], function(
    exports
  ) {
    return {
      setters: [],
      execute: function() {
        exports('ts', ts);
        exports('babylon', babylon);
        exports('babel_traverse', babel_traverse);
        exports('babel_types', babel_types);
        Object.entries(files)
          .filter(([moduleName]) => moduleName.match(/\.ts$/))
          .forEach(([path, code]) => {
            exports(path.replace(/[\/.-]/gi, '_'), code);
            exports(
              path.replace(/[\/.-]/gi, '_') + '_AST',
              ts.createSourceFile(path, code, ts.ScriptTarget.ES5)
            );
          });
        Object.entries(files)
          .filter(([moduleName]) => moduleName.match(/\.html/))
          .forEach(([path, code]) => {
            const templatePath = path.replace(/[\/.-]/gi, '_');
            exports(templatePath, code);
          });
      }
    };
  });
}
