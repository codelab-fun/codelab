import { Injectable } from '@angular/core';
import { simpleVisitor } from './visitor';
import { getTypeScript } from '@codelab/utils';

const ts = getTypeScript();

// TODO(sancheez): Duplication
//  { FileConfig } from '../../../../../apps/codelab/src/app/shared/interfaces/file-config';
export interface FileConfig {
  opened?: boolean;
  /**
   * typescript or html.
   */
  type?: string;

  /**
   * Source code of the file.
   */
  code?: string;

  template: string;
  /**
   * Source code of the file.
   */
  solution?: string;

  /**
   * TS code to run before running the file.
   */
  before?: string;

  /**
   * TS code to run after running the file.
   */
  after?: string;

  /**
   * Usually the same as fileName without .ts postfix.
   * Currently gets inferred from filename.
   */
  moduleName?: string;

  /**
   * Actual filename.
   */
  path: string;

  /**
   * If this is true; the file will be included in the preview iframe.
   */
  ui?: boolean;

  /**
   * If this is true
   */
  bootstrap?: boolean;

  excludeFromTesting?: boolean;

  /**
   * if this is true; the file will be displayed in read only mode.
   */
  readonly?: boolean;

  /**
   * If this is true the file will be included in the test iframe.
   */
  test?: boolean;

  /**
   * If this is true; the file will be hidden.
   */
  hidden?: boolean;

  /**
   * File dependencies, need for proper highlighting in monaco.
   */

  editorType?: string;

  // If this is set, this will be executed as a test.
  // This is a hack and will be removed.
  execute?: any;
}

@Injectable({
  providedIn: 'root',
})
export class DepsService {
  constructor() {}

  // TODO(kirjs): Retire this
  /**
   * Takes a file path, and another path relative to the first one.
   * Returns the fulle
   */
  static normalizePathRelativeToFile(path: string, file: string) {
    // TODO: Simplify
    let fullPath = '/' + path.substr(0, path.lastIndexOf('/')) + '/' + file;
    while (fullPath.match(/\/[^/]*\/\.\./)) {
      fullPath = fullPath.replace(/\/[^/]*\/\.\./, '');
    }
    fullPath = fullPath.replace(/\/.\//, '/');
    return fullPath.replace(/^\//, '').replace(/^\//, '');
  }

  static isLocalDep(string) {
    return !string.match(/\/code\b/) && !!string.match(/^\./);
  }

  order(files: Array<FileConfig>) {
    let deps: { [key: string]: string } = files.reduce((result, file) => {
      result[file.path] = { file, deps: [] };
      const source = ts.createSourceFile(
        file.path,
        file.code,
        ts.ScriptTarget.ES5
      );
      simpleVisitor(
        source,
        (node) => node.kind === ts.SyntaxKind.ImportDeclaration,
        (node: any) => {
          if (DepsService.isLocalDep(node.moduleSpecifier.text)) {
            result[file.path].deps.push(
              DepsService.normalizePathRelativeToFile(
                file.path,
                node.moduleSpecifier.text + '.ts'
              )
            );
          }
        }
      );
      return result;
    }, {});

    let orderedFiles = [];

    while (Object.keys(deps).length > 0) {
      const keys = Object.keys(deps);
      const depLen = keys.length;

      // Iterate over deps, grab each file with no dependencies, and add it to the list. Repeat.
      [deps, orderedFiles] = keys.reduce(
        (
          [result, orderedFiles_]: any,
          key
        ): [{ [key: string]: string }, Array<FileConfig>] => {
          if (result[key].deps.length === 0) {
            orderedFiles_.push(result[key].file);

            Object.keys(result).forEach((key_) => {
              result[key_].deps = result[key_].deps.filter(
                (dep) => dep !== key
              );
            });

            delete deps[key];
          }

          return [result, orderedFiles_];
        },
        [deps, orderedFiles]
      );

      if (depLen === Object.keys(deps).length) {
        throw new Error('cyclic dependencies found, or missing dependencies');
      }
    }

    return orderedFiles;
  }
}
