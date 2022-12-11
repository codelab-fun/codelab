declare const require;

export function jsScriptInjector(iframe) {
  return function (code) {
      iframe.contentWindow.eval(code);
  };
}

export function cssInjector(iframe) {
  return function (css) {
    const s = iframe.contentDocument.createElement('style');
    s.innerHTML = css;
    iframe.contentDocument.getElementsByTagName('head')[0].appendChild(s);
  };
}

export interface SandboxConfig {
  id: string;
  url: string;
  restart?: boolean;
  hidden?: boolean;
}

export function createIframe(config: SandboxConfig) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute(
    'sandbox',
    'allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts'
  );
  iframe.setAttribute('frameBorder', '0');
  iframe.setAttribute('src', config.url);
  iframe.setAttribute('class', config.id);
  return iframe;
}

export interface SandBox {
  setHtml: (html: string) => void;
  addCss: (css: string) => void;
  evalJs: (js: string) => void;
  iframe?: any;
}

export interface SandBoxWithLoader extends SandBox {
  addDep: (name: string, dep: any) => void;
  loadSystemJsDep?: (name: string, dep: any) => void;
  todoFindABetterName?: (name: string, dep: any) => void;
}

const iframes = new WeakMap();

function injectSystemJs({ evalJs }) {
  console.log('inject systemJS')
  evalJs(require('!!raw-loader!./fake-system-loader.js').default);
}

export function createSystemJsSandbox(
  element: any,
  config: SandboxConfig,
  before?: Function
): Promise<SandBoxWithLoader> {
  return injectIframe(element, config).then((sandbox) => {
    before?.(sandbox);
    injectSystemJs(sandbox);

    function addDep(name, code) {
      (sandbox.iframe.contentWindow as any).System.register(
        name,
        [],
        function (exports) {
          return {
            setters: [],
            execute: function () {
              exports(code);
            },
          };
        }
      );
    }

    // TODO: Simplify
    function loadSystemJsDep(name, code) {
      (sandbox.iframe.contentWindow as any).loadSystemModule(name, code);
    }

    console.log("import MAP");

    // TODO(sancheez): Add material, cdk bundles
    (sandbox.iframe.contentWindow as any).System.addImportMap({
      imports: {
        '@angular/core':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-core.js',
        '@angular/core/testing':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-core-testing.js',
        '@angular/platform-browser':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-platform-browser.js',
        '@angular/platform-browser/testing':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-platform-browser-testing.js',
        '@angular/platform-browser-dynamic':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-platform-browser-dynamic.js',
        '@angular/platform-browser-dynamic/testing':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-platform-browser-dynamic-testing.js',
        '@angular/forms':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-forms.js',
        '@angular/common':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-common.js',
        '@angular/router':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-router.js',
        '@angular/compiler':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/angular-compiler.js',
        '@angular/material/button':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/material/angular-material-button.js',
        rxjs: 'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/rxjs.js',
        tslib:
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/tslib.js',
        'rxjs/operators':
          'http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/rxjs.js',
      },
    });

    return { ...sandbox, addDep, loadSystemJsDep };
  });
}

function logError(error, message) {
  console.groupCollapsed(
    'ERROR in your app:  ' + ((error && error.message) || '').split('\n')[0]
  );
  console.error(error, message);
  console.groupEnd();
}

export function injectIframe(
  element: any,
  config: SandboxConfig
): Promise<SandBox> {
  if (iframes.has(element)) {
    iframes.get(element).remove();
    iframes.delete(element);
  }

  const iframe = createIframe(config);
  iframes.set(element, iframe);

  element.appendChild(iframe);
  const evalJs = jsScriptInjector(iframe);
  const addCss = cssInjector(iframe);

  return new Promise((resolve, reject) => {
    if (!iframe.contentWindow) {
      return reject('iframe is gone');
    }
    iframe.contentWindow.onload = () => {
      function setHtml(html) {
        iframe.contentDocument.body.innerHTML = html;
      }

      function setError(html) {
        const error = iframe.contentDocument.querySelector('.error');
        if (error) {
          // TODO(kirjs): Uncommit
          // error.innerHTML = html;
        }
      }

      // TODO(kirjs): add types later
      (iframe.contentWindow as any).console.log = function () {
        console.log.apply(console, arguments);
      };

      iframe.contentWindow.onerror = function (error, message) {

        debugger

        logError(error, message);
      };
      (iframe.contentWindow as any).console.error = function (error, message) {
        debugger
        // handle Angular error 1/3
        logError(error, message);

        setError(`<pre style = "font-size: 3vw;padding: 20px;">${error}
${message}
</pre>`);
      };

      resolve({
        evalJs,
        setHtml,
        addCss,
        iframe,
      });
    };

    if (config.url === 'about:blank') {
      // Chrome and FF behave differently here.
      if (!navigator.userAgent.includes('Firefox')) {
        iframe.contentWindow.onload({} as any);
      }
    }
  });
}
