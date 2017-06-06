import { Injectable } from '@angular/core';
import { FileConfig } from '../interfaces/file-config';

import * as ts from 'typescript';
import { simpleVisitor } from './visitor';


@Injectable()
export class DepsService {

  static normalizePathRelativeToFile(path, file) {
    let fullPath = '/' + path.substr(0, path.lastIndexOf('/')) + '/' + file;
    while (fullPath.match(/\/[^/]*\/\.\./)) {
      fullPath = fullPath.replace(/\/[^/]*\/\.\./, '');
    }
    return fullPath.replace(/^\/.\//, '');
  }

  static isLocalDep(string) {
    return !!string.match(/^\./);
  }

  order(files: Array<FileConfig>) {

    let deps = files.reduce((result, file) => {
      result[file.path] = {file, deps: []};
      const source = ts.createSourceFile(file.path, file.code, ts.ScriptTarget.ES5);
      simpleVisitor(source, node => node.kind === ts.SyntaxKind.ImportDeclaration, (node) => {
        if (DepsService.isLocalDep(node.moduleSpecifier.text)) {
          result[file.path].deps.push(DepsService.normalizePathRelativeToFile(file.path, node.moduleSpecifier.text));
        }

      });
      return result;
    }, {});


    let orderedFiles = [];

    while (Object.keys(deps).length > 0) {
      const keys = Object.keys(deps);
      const depLen = keys.length;

      // Iterate over deps, grab each file with no dependencies, and
      [deps, orderedFiles] = keys.reduce(([result, orderedFiles_]: any, key): [any, Array<FileConfig>] => {
        console.log(key);
        if (result[key].deps.length === 0) {
          orderedFiles_.push(result[key].file);

          Object.keys(result).forEach((key_) => {
            result[key_].deps = result[key_].deps.filter(dep => dep !== key);
          });

          delete deps[key];
        }

        return [result, orderedFiles_];
      }, [deps, orderedFiles]);

      if (depLen === Object.keys(deps).length) {

        throw new Error('cyclic dependencies found, or missing dependencies');
      }
    }

    return orderedFiles;
  }

  constructor() {
  }

}
