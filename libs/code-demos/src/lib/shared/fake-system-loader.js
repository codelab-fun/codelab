(function () {

  const defaultFetcher = ((url) => fetch(url).then(r => r.text()));

  class System {
    constructor(fetch = defaultFetcher) {
      this.fetch = fetch;
      this.importsMap = {
        imports: {},
      };
      this.resolvedExports = {};
      this.executedDeps = {};
      this.modules = {};
      this.asyncModules = {};
    }

    addImportMap(map) {
      if (!('imports' in map)) {
        throw new Error('Missing imports in imports map');
      }
      this.importsMap = map;
    }

    register(id, deps, func) {
      delete this.executedDeps[id];
      delete this.resolvedExports[id];
      return this.modules[id] = Promise.resolve([deps, func]);
    }

    async getModule(id) {
      const module = await this.modules[id];
      if (module) {
        return module;
      }
      if (this.importsMap.imports[id]) {
        if (this.asyncModules[id]) {
          return this.asyncModules[id];
        }
        return this.asyncModules[id] = await this.fetchModule(id);
      }
      throw new Error(`no module: "${id}"`);
    }

    async resolveExports(...ids) {
      return Promise.all(ids.map(async (id) => {
        if (this.resolvedExports[id]) {
          return await this.resolvedExports[id];
        }
        const exports = {};
        if (id === 'exports') {
          return exports;
        }

        const mod = await this.getModule(id);
        return this.resolvedExports[id] = new Promise(async (resolve, reject) => {
          if (!mod) {
            throw new Error("can't fetch module: " + id);
          }
          const [deps, func] = mod;

          function $__export(key, value) {
            return exports[key] = value;
          }

          const $__moduleContext = {id};
          try {
            const {setters, execute} = await func($__export, $__moduleContext);

            const resolvedDeps = (await this.resolveExports(...deps)).map(d => d.exports);
            for (let i = 0; i < resolvedDeps.length; i++) {
              setters[i](resolvedDeps[i]);
            }
            resolve({setters, execute, exports});
          } catch (e) {
            throw e;
          }
        });
      }));
    }

    async executeDeps(...ids) {
      return Promise.all(ids.map(async (id) => {
        if (this.executedDeps[id]) {
          return this.executedDeps[id];
        }
        if (!this.resolvedExports[id]) {
          throw new Error('No resolvedImports for: ' + id);
        }
        return this.executedDeps[id] = new Promise(async (resolve, reject) => {
          const [deps] = await this.getModule(id);
          const executedDeps = await this.executeDeps(...deps);
          const {execute, exports, setters} = await this.resolvedExports[id];
          for (let i = 0; i < executedDeps.length; i++) {
            setters[i](executedDeps[i]);
          }
          try {
            await execute();
          } catch (e) {
            return reject(e);
          }
          resolve(exports);
        });
      }));
    }

    async import(id) {
        await this.resolveExports(id);
        return (await this.executeDeps(id))[0];
    }

    async fetchModule(id) {
      const module = await this.fetch(this.importsMap.imports[id]);
      const define = (allDeps, func) => {
        const deps = allDeps.slice(1);
        this.register(id, deps, function ($__export) {
          const resolvedDeps = [];
          return {
            setters: deps.map((a, i) => (r) => resolvedDeps[i] = r),
            execute: () => {
              const exports = {};
              const result = func(exports, ...resolvedDeps);
              for (const [key, value] of Object.entries(exports)) {
                $__export(key, value);
              }
              return result;
            }
          };
        });
      };
      define.amd = true;
      if (!('document' in globalThis)) {
        const exports = undefined;
        await eval(module);
      } else {
        const head = document.getElementsByTagName('head')[0];
        globalThis.define = define;
        const tag = document.createElement("script");
        tag.type = 'text/javascript';
        tag.textContent = module;
        head.appendChild(tag);
      }
      return this.modules[id];
    }
  }

  const AMDLoader = globalThis.AMDLoader = function (global = {}, fetcher) {
    global.System = new System(fetcher);
    return global;
  };

  const hasSelf = typeof self !== 'undefined';
  const envGlobal = hasSelf ? self : global;

  AMDLoader(envGlobal);

})();
