declare const require;

export function getTypeScript() {
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
