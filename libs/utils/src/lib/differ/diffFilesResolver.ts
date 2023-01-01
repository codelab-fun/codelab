import { differ } from './differ';
import { evaled, hidden, justForReference, test } from './fileHelpers';

// TODO(sancheez): duplication
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

interface Override {
  [key: string]: {
    [key: string]: string;
  };
}

interface Overrides {
  file: Override;
  stage: Override;
}

export class DiffFilesResolver {
  constructor(
    private files: { [key: string]: string },
    private stages: Array<string>,
    private overrides: Overrides
  ) {}

  resolve(stage: string, files) {
    const result = [];
    const bootstrap = (files.bootstrap || []) as Array<string>;
    if (files.exercise) {
      files.exercise.forEach((file) => {
        result.push(
          evaled(
            this.getFileCodeForStage(file, stage, bootstrap.indexOf(file) >= 0)
          )
        );
      });
    }

    if (files.reference) {
      files.reference.forEach((file) => {
        result.push(
          ...justForReference(
            this.getFileCodeForStage(file, stage, bootstrap.indexOf(file) >= 0)
          )
        );
      });
    }
    if (files.hidden) {
      files.hidden.forEach((file) => {
        result.push(
          ...hidden(
            this.getFileCodeForStage(file, stage, bootstrap.indexOf(file) >= 0)
          )
        );
      });
    }

    if (files.test) {
      files.test.forEach((file) => {
        result.push(
          ...test(
            this.getFileCodeForStage(file, stage, bootstrap.indexOf(file) >= 0)
          )
        );
      });
    }
    return result;
  }

  getFileByPath(path: string) {
    if (!this.files[path]) {
      // tslint:disable-next-line
      debugger;
      throw new Error('Incorrect path:' + path);
    }

    return this.files[path];
  }

  getFileCodeForStage(
    path: string,
    stage: string,
    bootstrap: boolean
  ): FileConfig {
    const type = path.substr(path.lastIndexOf('.') + 1);
    stage =
      (this.overrides.stage[path] && this.overrides.stage[path][stage]) ||
      stage;

    // Using overrides path, but keeping the original path for display purposes.
    // TODO: This get broken if files are ind different folders
    const diffs = differ(
      this.getFileByPath(
        (this.overrides.file[path] && this.overrides.file[path][stage]) || path
      ),
      this.stages
    );

    if (type === 'ts') {
      return {
        bootstrap: bootstrap,
        excludeFromTesting: bootstrap,
        type: 'typescript',
        path,
        template: diffs[stage],
        moduleName: path.replace('.ts', ''),
        code: diffs[stage],
        solution: diffs[stage + 'Solved'],
      };
    } else {
      return {
        type,
        path,
        code: diffs[stage],
        template: diffs[stage],
        solution: diffs[stage + 'Solved'],
      };
    }
  }
}
