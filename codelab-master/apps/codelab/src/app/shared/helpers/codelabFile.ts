import { FileConfig } from '../interfaces/file-config';

export enum FileType {
  TypeScript = 'typescript',
  Html = 'html',
  Css = 'css'
}

const fileConfig = {
  [FileType.TypeScript]: {
    extension: '.ts'
  },
  [FileType.Html]: {
    extension: '.html'
  },
  [FileType.Css]: {
    extension: '.css'
  }
};

export class CodelabFile implements FileConfig {
  highlight?: RegExp | RegExp[];
  after: string;
  public code: string;
  public template: string;
  public solution: string;
  public bootstrap = false;
  public path: string;
  public excludeFromTesting = false;
  public test = false;
  public before: string;
  public hidden = false;

  static TypeScriptFile(name: string): CodelabFile {
    return new CodelabFile(FileType.TypeScript, name).setAfter(
      'export function evalJs( js ){ return eval(js);}'
    );
  }

  static TypeScriptTest(name: string): CodelabFile {
    return new CodelabFile(FileType.TypeScript, name + 'Test').makeTest();
  }

  static Html(name: string): CodelabFile {
    return new CodelabFile(FileType.Html, name);
  }

  static Css(name: string): CodelabFile {
    return new CodelabFile(FileType.Css, name);
  }

  constructor(
    public readonly type: FileType,
    public readonly moduleName: string
  ) {
    this.path = moduleName + fileConfig[type].extension;
  }

  public setAfter(after: string): CodelabFile {
    this.after = after;
    return this;
  }

  public clone(): CodelabFile {
    return Object.assign(Object.create(CodelabFile), this);
  }

  public makeBootstrappable(): CodelabFile {
    this.bootstrap = true;
    this.excludeFromTesting = true;
    return this;
  }

  public makeHidden(): CodelabFile {
    this.hidden = true;
    return this;
  }

  public makeTest(): CodelabFile {
    this.test = true;
    this.before = 'mochaBefore();';
    this.after = 'mochaAfter();';
    this.excludeFromTesting = false;
    this.makeHidden();
    this.makeBootstrappable();
    return this;
  }

  public setSolution(solution: string): CodelabFile {
    this.solution = solution;
    return this;
  }

  public withHighlight(highlight: RegExp | RegExp[]) {
    this.highlight = highlight;
    return this;
  }

  public setCode(code: string): CodelabFile {
    this.code = code;
    this.template = code;
    if (!this.solution) {
      this.solution = code;
    }

    return this;
  }
}
