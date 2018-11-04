import { transform } from '@babel/standalone';

declare const require;

export function runReact(sandbox, files, runner) {
  sandbox.runCss(require('../inner.css'));
  sandbox.setHtml('<div id="app"></div>');
  sandbox.runSingleFile(runner.scriptLoaderService.getScript('react'));
  sandbox.runSingleFile(runner.scriptLoaderService.getScript('react-dom'));
  const code = transform(files[0].code, {presets: ['react']}).code;
  sandbox.runSingleFile(code);
}



