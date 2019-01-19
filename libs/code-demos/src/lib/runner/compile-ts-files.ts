import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { exhaustMap, finalize } from 'rxjs/operators';
import * as ts from 'typescript';

const compilerOptions = {
  module: ts.ModuleKind.System,
  target: ts.ScriptTarget.ES5,
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  noImplicitAny: true,
  declaration: true
};

interface AdapterHost {
  files: Observable<Record<string, string>>;
  dispose: Function;
}

type ObservableFiles = Observable<Record<string, string>>;

function watch(
  inputFiles$: ObservableFiles,
  options: ts.CompilerOptions
): AdapterHost {
  const outputFiles: BehaviorSubject<
    Record<string, string>
  > = new BehaviorSubject<Record<string, string>>({});
  // const rootFileNames = [];
  const files: ts.MapLike<{ version: number; file: string }> = {};

  const getCurrentFileNames = () => {
    return Object.keys(files);
  };

  // Create the language service host to allow the LS to communicate with the host
  const servicesHost: ts.LanguageServiceHost = {
    getScriptFileNames: () => getCurrentFileNames(),
    getScriptVersion: fileName =>
      files[fileName] && files[fileName].version.toString(),
    getScriptSnapshot: fileName => {
      const file = files[fileName];
      if (!file) {
        return undefined;
      }

      return ts.ScriptSnapshot.fromString(
        `/// <amd-module name="${fileName.replace('.ts', '')}" />\n` + file.file
      );
    },
    getCurrentDirectory: () => '/',
    getCompilationSettings: () => options,
    getDefaultLibFileName: () => 'lib.d.ts',
    fileExists: a => !!files[a],
    readFile: a => files[a] && files[a].file,
    readDirectory: () => getCurrentFileNames()
  };

  // Create the language service files
  const services = ts.createLanguageService(
    servicesHost,
    ts.createDocumentRegistry()
  );

  const subscription = inputFiles$.subscribe(newFiles => {
    const filteredFiles = Object.entries(newFiles).filter(([fileName, _]) =>
      fileName.match(/\.ts$/)
    );

    filteredFiles.forEach(([fileName, file]) => {
      if (!files[fileName]) {
        files[fileName] = { version: 0, file };
      }
      files[fileName].version++;
      files[fileName].file = file;
    });

    const fileNames = filteredFiles.map(([fileName]) => fileName);
    emitFiles(fileNames);
  });

  return {
    files: outputFiles.asObservable(),
    dispose: () => {
      services.dispose();
      outputFiles.complete();
      subscription.unsubscribe();
    }
  };

  function emitFiles(fileNames: string[]) {
    const updated = fileNames
      .map(emitFile)
      .map(output => output.outputFiles)
      ['flat']()
      .reduce((acc, outputFile) => {
        if (outputFile.name.match(/\.js$/)) {
          return {
            ...acc,
            [outputFile.name]: outputFile.text
          };
        }
        return acc;
      }, {});

    outputFiles.next({
      ...outputFiles.getValue(),
      ...updated
    });
  }

  function emitFile(fileName: string) {
    const output = services.getEmitOutput(fileName);

    if (!output.emitSkipped) {
    } else {
      console.log(`Emitting ${fileName} failed`);
      logErrors(fileName);
    }

    return output;
  }

  function logErrors(fileName: string) {
    const allDiagnostics = services
      .getCompilerOptionsDiagnostics()
      .concat(services.getSyntacticDiagnostics(fileName))
      .concat(services.getSemanticDiagnostics(fileName));

    allDiagnostics.forEach(diagnostic => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      );
      if (diagnostic.file) {
        const {
          line,
          character
        } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
        console.log(
          `  Error ${diagnostic.file.fileName} (${line + 1},${character +
            1}): ${message}`
        );
      } else {
        console.log(`  Error: ${message}`);
      }
    });
  }
}

export function compileTsFilesWatch(): MonoTypeOperatorFunction<
  Record<string, string>
> {
  let host: AdapterHost;
  return (source: Observable<Record<string, string>>) => {
    return source.pipe(
      exhaustMap(
        (): Observable<Record<string, string>> => {
          if (host) {
            host.dispose();
            host = null;
          }

          host = watch(source, compilerOptions);
          return host.files;
        }
      ),
      finalize(() => {
        if (host) {
          // TODO(kirjs): Dispose the host?
          // host.dispose();
        }
        host = null;
      })
    );
  };
}

export function compileTsFiles(files: Record<string, string>) {
  return Object.entries(files)
    .filter(([moduleName]) => moduleName.match(/\.ts$/))
    .map(([moduleName, code]) => {
      // TODO(kirjs): Add source maps.

      return ts.transpileModule(code, {
        compilerOptions: compilerOptions,
        fileName: moduleName,
        moduleName: moduleName.replace('.ts', ''),
        reportDiagnostics: true
      });
    });
}
