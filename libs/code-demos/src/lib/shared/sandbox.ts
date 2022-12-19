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

    (sandbox.iframe.contentWindow as any).System.addImportMap({
      "imports": {
        "@angular/animations": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/animations/animations.js",
        "@angular/animations/browser": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/animations/browser/browser.js",
        "@angular/animations/browser/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/animations/browser/testing/testing.js",
        "@angular/common": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/common/common.js",
        "@angular/common/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/common/testing/testing.js",
        "@angular/common/http": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/common/http/http.js",
        "@angular/common/http/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/common/http/testing/testing.js",
        "@angular/compiler": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/compiler/compiler.js",
        "@angular/compiler/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/compiler/testing/testing.js",
        "@angular/core": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/core/core.js",
        "@angular/core/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/core/testing/testing.js",
        "@angular/forms": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/forms/forms.js",
        "@angular/platform-browser": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/platform-browser/platform-browser.js",
        "@angular/platform-browser/animations": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/platform-browser/animations/animations.js",
        "@angular/platform-browser/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/platform-browser/testing/testing.js",
        "@angular/platform-browser-dynamic": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/platform-browser-dynamic/platform-browser-dynamic.js",
        "@angular/platform-browser-dynamic/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/platform-browser-dynamic/testing/testing.js",
        "@angular/router": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/router/router.js",
        "@angular/router/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/router/testing/testing.js",
        "rxjs": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/rxjs/rxjs.js",
        "rxjs/operators": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/rxjs/operators.js",
        "tslib": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/tslib.js",
        "@angular/material/autocomplete": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/autocomplete/autocomplete.js",
        "@angular/material/badge": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/badge/badge.js",
        "@angular/material/bottom-sheet": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/bottom-sheet/bottom-sheet.js",
        "@angular/material/button": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/button/button.js",
        "@angular/material/button-toggle": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/button-toggle/button-toggle.js",
        "@angular/material/card": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/card/card.js",
        "@angular/material/checkbox": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/checkbox/checkbox.js",
        "@angular/material/chips": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/chips/chips.js",
        "@angular/material/core": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/core/core.js",
        "@angular/material/datepicker": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/datepicker/datepicker.js",
        "@angular/material/dialog": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/dialog/dialog.js",
        "@angular/material/divider": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/divider/divider.js",
        "@angular/material/expansion": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/expansion/expansion.js",
        "@angular/material/form-field": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/form-field/form-field.js",
        "@angular/material/grid-list": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/grid-list/grid-list.js",
        "@angular/material/icon": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/icon/icon.js",
        "@angular/material/input": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/input/input.js",
        "@angular/material/list": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/list/list.js",
        "@angular/material/menu": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/menu/menu.js",
        "@angular/material/paginator": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/paginator/paginator.js",
        "@angular/material/progress-bar": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/progress-bar/progress-bar.js",
        "@angular/material/progress-spinner": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/progress-spinner/progress-spinner.js",
        "@angular/material/radio": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/radio/radio.js",
        "@angular/material/select": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/select/select.js",
        "@angular/material/sidenav": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/sidenav/sidenav.js",
        "@angular/material/slide-toggle": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/slide-toggle/slide-toggle.js",
        "@angular/material/slider": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/slider/slider.js",
        "@angular/material/snack-bar": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/snack-bar/snack-bar.js",
        "@angular/material/sort": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/sort/sort.js",
        "@angular/material/stepper": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/stepper/stepper.js",
        "@angular/material/table": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/table/table.js",
        "@angular/material/tabs": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/tabs/tabs.js",
        "@angular/material/toolbar": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/toolbar/toolbar.js",
        "@angular/material/tooltip": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/tooltip/tooltip.js",
        "@angular/material/tree": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/material/tree/tree.js",
        "@angular/cdk/a11y": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/a11y/a11y.js",
        "@angular/cdk/accordion": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/accordion/accordion.js",
        "@angular/cdk/bidi": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/bidi/bidi.js",
        "@angular/cdk": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/cdk.js",
        "@angular/cdk/clipboard": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/clipboard/clipboard.js",
        "@angular/cdk/coercion": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/coercion/coercion.js",
        "@angular/cdk/collections": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/collections/collections.js",
        "@angular/cdk/dialog": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/dialog/dialog.js",
        "@angular/cdk/drag-drop": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/drag-drop/drag-drop.js",
        "@angular/cdk/keycodes": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/keycodes/keycodes.js",
        "@angular/cdk/layout": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/layout/layout.js",
        "@angular/cdk/listbox": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/listbox/listbox.js",
        "@angular/cdk/menu": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/menu/menu.js",
        "@angular/cdk/observers": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/observers/observers.js",
        "@angular/cdk/overlay": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/overlay/overlay.js",
        "@angular/cdk/platform": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/platform/platform.js",
        "@angular/cdk/portal": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/portal/portal.js",
        "@angular/cdk/scrolling": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/scrolling/scrolling.js",
        "@angular/cdk/stepper": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/stepper/stepper.js",
        "@angular/cdk/table": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/table/table.js",
        "@angular/cdk/testing": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/testing/testing.js",
        "@angular/cdk/text-field": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/text-field/text-field.js",
        "@angular/cdk/tree": "http://localhost:4200/assets/runner/ng2/build-umd-bundles/bundles/@angular/cdk/tree/tree.js",
        "@material/dialog": "https://unpkg.com/@material/dialog@15.0.0-canary.7971d6ad5.0/dist/mdc.dialog.min.js"
     }
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
