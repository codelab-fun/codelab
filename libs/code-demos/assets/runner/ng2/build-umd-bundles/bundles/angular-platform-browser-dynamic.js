(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(
        exports,
        require('@angular/compiler'),
        require('@angular/core'),
        require('@angular/common'),
        require('@angular/platform-browser')
      )
    : typeof define === 'function' && define.amd
    ? define(
        [
          'exports',
          '@angular/compiler',
          '@angular/core',
          '@angular/common',
          '@angular/platform-browser',
        ],
        factory
      )
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory(
        (global.ngPlatformBrowserDynamic = {}),
        global.ngCompiler,
        global.ng,
        global.ngCommon,
        global.ngPlatformBrowser
      ));
})(this, function (exports, compiler, i0, common, platformBrowser) {
  'use strict';

  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(
            n,
            k,
            d.get
              ? d
              : {
                  enumerable: true,
                  get: function () {
                    return e[k];
                  },
                }
          );
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var i0__namespace = /*#__PURE__*/ _interopNamespaceDefault(i0);

  /**
   * @license Angular v15.0.1
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   */

  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  new i0.InjectionToken('ErrorCollector');
  const COMPILER_PROVIDERS = [
    { provide: i0.Compiler, useFactory: () => new i0.Compiler() },
  ];
  /**
   * @publicApi
   *
   * @deprecated
   * Ivy JIT mode doesn't require accessing this symbol.
   * See [JIT API changes due to ViewEngine deprecation](guide/deprecations#jit-api-changes) for
   * additional context.
   */
  class JitCompilerFactory {
    /* @internal */
    constructor(defaultOptions) {
      const compilerOptions = {
        useJit: true,
        defaultEncapsulation: i0.ViewEncapsulation.Emulated,
        missingTranslation: i0.MissingTranslationStrategy.Warning,
      };
      this._defaultOptions = [compilerOptions, ...defaultOptions];
    }
    createCompiler(options = []) {
      const opts = _mergeOptions(this._defaultOptions.concat(options));
      const injector = i0.Injector.create([
        COMPILER_PROVIDERS,
        {
          provide: compiler.CompilerConfig,
          useFactory: () => {
            return new compiler.CompilerConfig({
              // let explicit values from the compiler options overwrite options
              // from the app providers
              useJit: opts.useJit,
              // let explicit values from the compiler options overwrite options
              // from the app providers
              defaultEncapsulation: opts.defaultEncapsulation,
              missingTranslation: opts.missingTranslation,
              preserveWhitespaces: opts.preserveWhitespaces,
            });
          },
          deps: [],
        },
        opts.providers,
      ]);
      return injector.get(i0.Compiler);
    }
  }
  function _mergeOptions(optionsArr) {
    return {
      useJit: _lastDefined(optionsArr.map((options) => options.useJit)),
      defaultEncapsulation: _lastDefined(
        optionsArr.map((options) => options.defaultEncapsulation)
      ),
      providers: _mergeArrays(optionsArr.map((options) => options.providers)),
      missingTranslation: _lastDefined(
        optionsArr.map((options) => options.missingTranslation)
      ),
      preserveWhitespaces: _lastDefined(
        optionsArr.map((options) => options.preserveWhitespaces)
      ),
    };
  }
  function _lastDefined(args) {
    for (let i = args.length - 1; i >= 0; i--) {
      if (args[i] !== undefined) {
        return args[i];
      }
    }
    return undefined;
  }
  function _mergeArrays(parts) {
    const result = [];
    parts.forEach((part) => part && result.push(...part));
    return result;
  }

  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  /**
   * A platform that included corePlatform and the compiler.
   *
   * @publicApi
   */
  const platformCoreDynamic = i0.createPlatformFactory(
    i0.platformCore,
    'coreDynamic',
    [
      { provide: i0.COMPILER_OPTIONS, useValue: {}, multi: true },
      {
        provide: i0.CompilerFactory,
        useClass: JitCompilerFactory,
        deps: [i0.COMPILER_OPTIONS],
      },
    ]
  );

  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  class ResourceLoaderImpl extends compiler.ResourceLoader {
    get(url) {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'text';
      xhr.onload = function () {
        // responseText is the old-school way of retrieving response (supported by IE8 & 9)
        // response/responseType properties were introduced in ResourceLoader Level2 spec (supported
        // by IE10)
        const response = xhr.response || xhr.responseText;
        // normalize IE9 bug (https://bugs.jquery.com/ticket/1450)
        let status = xhr.status === 1223 ? 204 : xhr.status;
        // fix status code when it is 0 (0 status is undocumented).
        // Occurs when accessing file resources or on Android 4.1 stock browser
        // while retrieving files from application cache.
        if (status === 0) {
          status = response ? 200 : 0;
        }
        if (200 <= status && status <= 300) {
          resolve(response);
        } else {
          reject(`Failed to load ${url}`);
        }
      };
      xhr.onerror = function () {
        reject(`Failed to load ${url}`);
      };
      xhr.send();
      return promise;
    }
  }
  ResourceLoaderImpl.ɵfac = i0__namespace.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '15.0.1',
    ngImport: i0__namespace,
    type: ResourceLoaderImpl,
    deps: null,
    target: i0__namespace.ɵɵFactoryTarget.Injectable,
  });
  ResourceLoaderImpl.ɵprov = i0__namespace.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '15.0.1',
    ngImport: i0__namespace,
    type: ResourceLoaderImpl,
  });
  i0__namespace.ɵɵngDeclareClassMetadata({
    minVersion: '12.0.0',
    version: '15.0.1',
    ngImport: i0__namespace,
    type: ResourceLoaderImpl,
    decorators: [
      {
        type: i0.Injectable,
      },
    ],
  });

  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  /**
   * @publicApi
   */
  const INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
    platformBrowser['ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS'],
    {
      provide: i0.COMPILER_OPTIONS,
      useValue: {
        providers: [
          {
            provide: compiler.ResourceLoader,
            useClass: ResourceLoaderImpl,
            deps: [],
          },
        ],
      },
      multi: true,
    },
    { provide: i0.PLATFORM_ID, useValue: common['ɵPLATFORM_BROWSER_ID'] },
  ];

  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  /**
   * An implementation of ResourceLoader that uses a template cache to avoid doing an actual
   * ResourceLoader.
   *
   * The template cache needs to be built and loaded into window.$templateCache
   * via a separate mechanism.
   *
   * @publicApi
   *
   * @deprecated This was previously necessary in some cases to test AOT-compiled components with View
   *     Engine, but is no longer since Ivy.
   */
  class CachedResourceLoader extends compiler.ResourceLoader {
    constructor() {
      super();
      this._cache = i0['ɵglobal'].$templateCache;
      if (this._cache == null) {
        throw new Error(
          'CachedResourceLoader: Template cache was not found in $templateCache.'
        );
      }
    }
    get(url) {
      if (this._cache.hasOwnProperty(url)) {
        return Promise.resolve(this._cache[url]);
      } else {
        return Promise.reject(
          'CachedResourceLoader: Did not find cached template for ' + url
        );
      }
    }
  }

  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */

  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  /**
   * @publicApi
   */
  const VERSION = new i0.Version('15.0.1');

  /**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   */
  /**
     * @publicApi
     *
     * @deprecated This was previously necessary in some cases to test AOT-compiled components with View
     *     Engine, but is no longer since Ivy.

     */
  const RESOURCE_CACHE_PROVIDER = [
    {
      provide: compiler.ResourceLoader,
      useClass: CachedResourceLoader,
      deps: [],
    },
  ];
  /**
   * @publicApi
   */
  const platformBrowserDynamic = i0.createPlatformFactory(
    platformCoreDynamic,
    'browserDynamic',
    INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS
  );

  exports.JitCompilerFactory = JitCompilerFactory;
  exports.RESOURCE_CACHE_PROVIDER = RESOURCE_CACHE_PROVIDER;
  exports.VERSION = VERSION;
  exports.platformBrowserDynamic = platformBrowserDynamic;
  exports['ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS'] =
    INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS;
  exports['ɵplatformCoreDynamic'] = platformCoreDynamic;
});