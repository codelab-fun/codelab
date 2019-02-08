import { FileConfig } from '../../../../../apps/codelab/src/app/shared/interfaces/file-config';

export function hidden(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, { hidden: true }));
}

export function readOnly(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, { readonly: true }));
}

export function justForReference(...files: FileConfig[]): FileConfig[] {
  return collapsed(...readOnly(...files));
}

export function collapsed(...files: FileConfig[]): FileConfig[] {
  return files.map(file => Object.assign({}, file, { collapsed: true }));
}

export function test(...files: FileConfig[]): FileConfig[] {
  return files.map(file =>
    Object.assign({}, file, {
      excludeFromTesting: false,
      test: true,
      bootstrap: true,
      before: 'mochaBefore();',
      after: 'mochaAfter();',
      hidden: true
    })
  );
}

export function evaled(file) {
  return Object.assign(file, {
    after: `export function evalJs( js ){ return eval(js);}`
  });
}
