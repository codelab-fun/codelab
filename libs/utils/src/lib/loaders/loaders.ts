declare const require;

import * as ts from 'typescript';

/**
 *  Unfortunately when doing:
 *  'require * as ts from 'typescript'; for the actual code,
 *  webpack tries to ull source-maps and other node deps whichare not needed.
 *
 *  It requires extra configuration and pollutes the terminal.
 *
 *  To avoid it we just require and eval raw code.
 *  This is ugly, but as TS is used in very few places, better than polluting the console.
 *
 */
export function getTypeScript(): typeof ts {
  const w = window as any;
  if (w.ts) {
    return w.ts;
  }

  // Used inside of eval. Typescript will think it's a real module and populate exports.
  const module = {
    exports: {}
  };

  eval(require('!!raw-loader!typescript'));
  w.ts = module.exports;

  return w.ts;
}
