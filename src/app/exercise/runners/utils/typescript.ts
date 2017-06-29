import { FileConfig } from '../../interfaces/file-config';
import { SandBoxWithLoader } from './sandbox';
import * as ts from 'typescript';
import * as babylon from 'babylon';
import * as babel_types from 'babel-types';
import babel_traverse from 'babel-traverse';


export function runTypeScriptFiles(files: Array<FileConfig>, {setHtml, addCss, evalJs, iframe}: SandBoxWithLoader) {
  (iframe.contentWindow as any).System.register('code', [], function (exports) {
    return {
      setters: [],
      execute: function () {
        exports('ts', ts);
        exports('babylon', babylon);
        exports('babel_traverse', babel_traverse);
        exports('babel_types', babel_types);
        files.forEach((file) => {
          exports(file.path.replace(/[\/\.-]/gi, '_'), file.code);
          exports(file.path.replace(/[\/\.-]/gi, '_') + '_AST', ts.createSourceFile(file.path, file.code, ts.ScriptTarget.ES5));
        });
      }
    };
  });


  files.map(file => {
    if (!file.path) {
      // tslint:disable-next-line:no-debugger
      debugger;
    }
  });

  files.filter(file => file.path.indexOf('index.html') >= 0).map((file => {
    setHtml(file.code);
  }));

  files.filter(file => file.type === 'css').map((file) => {
    addCss(file.code);
  });

  const compiled = files.filter(file => file.type === 'typescript').map((file) => {
    // Update module names
    let code = file.code;

    // TODO: Loop protection service
    if (file.before) {
      code = file.before + ';\n' + code;
    }

    if (file.after) {
      code = ';\n' + code + file.after;
    }


    const moduleName = file.moduleName;

    // TODO(kirjs): Add source maps.
    return ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.System,
        target: ts.ScriptTarget.ES5,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        noImplicitAny: true,
        declaration: true,
        // TODO: figure out why this doesn't work
        inlineSourceMap: true,
        inlineSources: true
      },
      fileName: moduleName,
      moduleName: moduleName,
      reportDiagnostics: true
    });
  });


  const diagnostics = compiled.reduce((result, file) => {
    return result.concat(file.diagnostics);
  }, []);

  if (diagnostics.length) {
    addCss(`
              body {
                font-family: Roboto, sans-serif;               
              }
              h2 {
                font-size: 50px;
                background-color: red;
                color: white;
                margin-bottom: 0;
              }
              b {
                color: #c04e22;
                font-weight: 300;
                background-color: #ffe;
              }
            `);
    const diagnosticsHtml = diagnostics.map(diagnostic => `<li>Error in file <b>${diagnostic.file.fileName}</b>: 
            ` + diagnostic.messageText + '</li>').join('');
    setHtml(`
<h2>Errors when compiling</h2>
 <div>Look in the editor for hints to fix it.</div>
 <ul>
  ${diagnosticsHtml}
 </ul>`);
  } else {
    compiled.map((result) => {
      evalJs(result.outputText);
    });

    files.filter((file) => file.bootstrap).map((file) => {

      evalJs(`System.import('${file.moduleName}')`);

    });
  }
}
