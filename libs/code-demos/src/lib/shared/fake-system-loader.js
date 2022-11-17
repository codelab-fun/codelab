const modules = {};
let importsMap = {};
global.System = {
  addImportMap(map) {
    importsMap = map;
  },
  register(id, ...rest) {
    console.log(id, rest);
    modules[id] = rest;
  },
  import(id) {
    const module = modules[id];
    const [deps, func] = module;
    const context = { id };

    const map = {};

    function prepare([id, deps]) {
      const exports = {};
      const callback = function (key, value) {
        exports[key] = value;
      };

      const r = func(callback, { id });
      return exports;
    }

    function resolve(module) {
      debugger;
      if (map[module]) {
        return map[module];
      }

      if (!modules[module]) {
        throw new Error('Module not found: ' + module);
      }

      const [deps, func] = modules[module];

      if (deps.length === 0) {
        return (map[id] = prepare([[], func]));
      }

      return (map[id] = prepare([deps.map(resolve), func]));
    }

    const m = resolve(id);
    debugger;
  },
};
global.define = function (name, ...stuff) {
  console.log(name, stuff);
};

global.define.amd = true;
