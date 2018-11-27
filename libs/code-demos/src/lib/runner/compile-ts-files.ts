import * as ts from 'typescript';

export function compileTsFiles(files: Record<string, string>) {
  return Object.entries(files).filter(([moduleName]) => moduleName.match(/\.ts$/)).map(([moduleName, code]) => {
    // TODO(kirjs): Add source maps.
    return ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.System,
        target: ts.ScriptTarget.ES5,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        noImplicitAny: true,
        declaration: true,
      },
      fileName: moduleName,
      moduleName: moduleName.replace('.ts', ''),
      reportDiagnostics: true
    });
  });
}
