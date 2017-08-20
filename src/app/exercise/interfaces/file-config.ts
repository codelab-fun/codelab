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
