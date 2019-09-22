import {
  webAssemblyModuleContentHandler,
  webAssemblyTestHandler
} from '../runners/wasm-test-runner/wasm-test-runner.component';

export interface BaseBlock {
  code: string;
  before?: string;
  after?: string;
}

export interface CodeHelperBlock extends BaseBlock {
  type: string;
  name?: string;
  meta: any;
}

export interface CodePath {
  type: 'ts' | 'wat';
  blocks: CodeHelperBlock[];
}

export function getCodeBlockHandler(lang, type) {
  if (!codeBlockHandlers[lang] || !codeBlockHandlers[lang][type]) {
    return;
  }
  return codeBlockHandlers[lang][type];
}

const displayPreview = () => {
  return { mode: 'default' };
};
export const codeBlockHandlers = {
  ts: {
    FunctionDeclaration: displayPreview,
    SourceFile: displayPreview
  },
  wat: {
    elem: displayPreview,
    func: webAssemblyTestHandler,
    module: webAssemblyModuleContentHandler
  }
};
