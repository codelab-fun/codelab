import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { getTypeScript } from '@codelab/utils/src/lib/loaders/loaders';
import * as TsTypes from 'typescript';

const ts = getTypeScript();

export interface Files {
  [key: string]: string;
}

function toObject(acc, outputFile) {
  if (outputFile) {
    return {
      ...acc,
      [outputFile.name]: outputFile.text
    };
  }
  return acc;
}

interface Diagnostic extends TsTypes.Diagnostic {
  name: string;
}

interface Output {
  diagnostics: Diagnostic[];
  files: Files;
}

const compilerOptions: TsTypes.CompilerOptions = {
  module: ts.ModuleKind.System,
  target: ts.ScriptTarget.ES2017,
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  noImplicitAny: true,
  declaration: true,
  lib: ['dom', 'es6']
};

type ObservableFiles = Observable<Files>;

function watch(
  source$: ObservableFiles,
  options: TsTypes.CompilerOptions
): Observable<Output> {
  const outputFiles: BehaviorSubject<Output> = new BehaviorSubject<Output>({
    diagnostics: [],
    files: {}
  });

  const files: TsTypes.MapLike<{ version: number; file: string }> = {};

  const getCurrentFileNames = () => {
    return Object.keys(files);
  };

  // Create the language service host to allow the LS to communicate with the host
  const servicesHost: TsTypes.LanguageServiceHost = {
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

  const subscription = source$.subscribe(
    newFiles => {
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
    },
    () => {},
    () => {
      try {
        services.dispose();
      } catch (e) {
        // TODO(kirjs): There's some funny error happening. Need to investigate.
        // Ignore
      }

      outputFiles.complete();
      subscription.unsubscribe();
    }
  );

  return outputFiles.asObservable();

  function extractDiagnostics(file) {
    return services
      .getSemanticDiagnostics(file)
      .map(d => ({ ...d, name: d.file.fileName }));
  }

  function emitFiles(fileNames: string[]) {
    const updated = fileNames.map(emitFile).reduce(toObject, {});
    const diagnostics = fileNames.map(extractDiagnostics).flat();

    outputFiles.next({
      diagnostics,
      files: {
        ...outputFiles.getValue().files,
        ...updated
      }
    });
  }

  function emitFile(fileName: string) {
    try {
      const output = services.getEmitOutput(fileName);

      if (output.emitSkipped) {
        logErrors(fileName);
      }

      const file = output.outputFiles.find(file => /\.js$/.test(file.name));

      if (file) {
        file.name = file.name.replace(/^\//, '');
      }

      return file;
    } catch (e) {
      console.log(`Error when compiling file '${fileName}': ` + e.message);
    }
  }

  function logErrors(fileName: string) {
    console.groupCollapsed(`Emitting ${fileName} failed`);
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
        } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        console.log(
          `Error ${diagnostic.file.fileName} (${line + 1},${character +
            1}): ${message}`
        );
      } else {
        console.log(`Error: ${message}`);
      }
    });
    console.groupEnd();
  }
}

export function compileTsFilesWatch(
  options = compilerOptions
): OperatorFunction<Record<string, string>, Output> {
  return (source: Observable<Record<string, string>>) => {
    return watch(source, options);
  };
}
