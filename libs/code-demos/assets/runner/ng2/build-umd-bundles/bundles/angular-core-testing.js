(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('tslib'), require('@angular/compiler'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'tslib', '@angular/compiler', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@angular/core/testing"] = {}, global.ng, global.tslib, global.ngCompiler));
})(this, (function (exports, core, tslib, compiler) { 'use strict';

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
    /**
     * Wraps a test function in an asynchronous test zone. The test will automatically
     * complete when all asynchronous calls within this zone are done. Can be used
     * to wrap an {@link inject} call.
     *
     * Example:
     *
     * ```
     * it('...', waitForAsync(inject([AClass], (object) => {
     *   object.doSomething.then(() => {
     *     expect(...);
     *   })
     * });
     * ```
     *
     * @publicApi
     */
    function waitForAsync(fn) {
        const _Zone = typeof Zone !== 'undefined' ? Zone : null;
        if (!_Zone) {
            return function () {
                return Promise.reject('Zone is needed for the waitForAsync() test helper but could not be found. ' +
                    'Please make sure that your environment includes zone.js');
            };
        }
        const asyncTest = _Zone && _Zone[_Zone.__symbol__('asyncTest')];
        if (typeof asyncTest === 'function') {
            return asyncTest(fn);
        }
        return function () {
            return Promise.reject('zone-testing.js is needed for the async() test helper but could not be found. ' +
                'Please make sure that your environment includes zone.js/testing');
        };
    }
    /**
     * @deprecated use `waitForAsync()`, (expected removal in v12)
     * @see {@link waitForAsync}
     * @publicApi
     * */
    function async(fn) {
        return waitForAsync(fn);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Fixture for debugging and testing a component.
     *
     * @publicApi
     */
    class ComponentFixture {
        constructor(componentRef, ngZone, _autoDetect) {
            this.componentRef = componentRef;
            this.ngZone = ngZone;
            this._autoDetect = _autoDetect;
            this._isStable = true;
            this._isDestroyed = false;
            this._resolve = null;
            this._promise = null;
            this._onUnstableSubscription = null;
            this._onStableSubscription = null;
            this._onMicrotaskEmptySubscription = null;
            this._onErrorSubscription = null;
            this.changeDetectorRef = componentRef.changeDetectorRef;
            this.elementRef = componentRef.location;
            this.debugElement = core.getDebugNode(this.elementRef.nativeElement);
            this.componentInstance = componentRef.instance;
            this.nativeElement = this.elementRef.nativeElement;
            this.componentRef = componentRef;
            this.ngZone = ngZone;
            if (ngZone) {
                // Create subscriptions outside the NgZone so that the callbacks run oustide
                // of NgZone.
                ngZone.runOutsideAngular(() => {
                    this._onUnstableSubscription = ngZone.onUnstable.subscribe({
                        next: () => {
                            this._isStable = false;
                        }
                    });
                    this._onMicrotaskEmptySubscription = ngZone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            if (this._autoDetect) {
                                // Do a change detection run with checkNoChanges set to true to check
                                // there are no changes on the second run.
                                this.detectChanges(true);
                            }
                        }
                    });
                    this._onStableSubscription = ngZone.onStable.subscribe({
                        next: () => {
                            this._isStable = true;
                            // Check whether there is a pending whenStable() completer to resolve.
                            if (this._promise !== null) {
                                // If so check whether there are no pending macrotasks before resolving.
                                // Do this check in the next tick so that ngZone gets a chance to update the state of
                                // pending macrotasks.
                                scheduleMicroTask(() => {
                                    if (!ngZone.hasPendingMacrotasks) {
                                        if (this._promise !== null) {
                                            this._resolve(true);
                                            this._resolve = null;
                                            this._promise = null;
                                        }
                                    }
                                });
                            }
                        }
                    });
                    this._onErrorSubscription = ngZone.onError.subscribe({
                        next: (error) => {
                            throw error;
                        }
                    });
                });
            }
        }
        _tick(checkNoChanges) {
            this.changeDetectorRef.detectChanges();
            if (checkNoChanges) {
                this.checkNoChanges();
            }
        }
        /**
         * Trigger a change detection cycle for the component.
         */
        detectChanges(checkNoChanges = true) {
            if (this.ngZone != null) {
                // Run the change detection inside the NgZone so that any async tasks as part of the change
                // detection are captured by the zone and can be waited for in isStable.
                this.ngZone.run(() => {
                    this._tick(checkNoChanges);
                });
            }
            else {
                // Running without zone. Just do the change detection.
                this._tick(checkNoChanges);
            }
        }
        /**
         * Do a change detection run to make sure there were no changes.
         */
        checkNoChanges() {
            this.changeDetectorRef.checkNoChanges();
        }
        /**
         * Set whether the fixture should autodetect changes.
         *
         * Also runs detectChanges once so that any existing change is detected.
         */
        autoDetectChanges(autoDetect = true) {
            if (this.ngZone == null) {
                throw new Error('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set');
            }
            this._autoDetect = autoDetect;
            this.detectChanges();
        }
        /**
         * Return whether the fixture is currently stable or has async tasks that have not been completed
         * yet.
         */
        isStable() {
            return this._isStable && !this.ngZone.hasPendingMacrotasks;
        }
        /**
         * Get a promise that resolves when the fixture is stable.
         *
         * This can be used to resume testing after events have triggered asynchronous activity or
         * asynchronous change detection.
         */
        whenStable() {
            if (this.isStable()) {
                return Promise.resolve(false);
            }
            else if (this._promise !== null) {
                return this._promise;
            }
            else {
                this._promise = new Promise(res => {
                    this._resolve = res;
                });
                return this._promise;
            }
        }
        _getRenderer() {
            if (this._renderer === undefined) {
                this._renderer = this.componentRef.injector.get(core.RendererFactory2, null);
            }
            return this._renderer;
        }
        /**
         * Get a promise that resolves when the ui state is stable following animations.
         */
        whenRenderingDone() {
            const renderer = this._getRenderer();
            if (renderer && renderer.whenRenderingDone) {
                return renderer.whenRenderingDone();
            }
            return this.whenStable();
        }
        /**
         * Trigger component destruction.
         */
        destroy() {
            if (!this._isDestroyed) {
                this.componentRef.destroy();
                if (this._onUnstableSubscription != null) {
                    this._onUnstableSubscription.unsubscribe();
                    this._onUnstableSubscription = null;
                }
                if (this._onStableSubscription != null) {
                    this._onStableSubscription.unsubscribe();
                    this._onStableSubscription = null;
                }
                if (this._onMicrotaskEmptySubscription != null) {
                    this._onMicrotaskEmptySubscription.unsubscribe();
                    this._onMicrotaskEmptySubscription = null;
                }
                if (this._onErrorSubscription != null) {
                    this._onErrorSubscription.unsubscribe();
                    this._onErrorSubscription = null;
                }
                this._isDestroyed = true;
            }
        }
    }
    function scheduleMicroTask(fn) {
        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const _Zone = typeof Zone !== 'undefined' ? Zone : null;
    const fakeAsyncTestModule = _Zone && _Zone[_Zone.__symbol__('fakeAsyncTest')];
    const fakeAsyncTestModuleNotLoadedErrorMessage = `zone-testing.js is needed for the fakeAsync() test helper but could not be found.
        Please make sure that your environment includes zone.js/testing`;
    /**
     * Clears out the shared fake async zone for a test.
     * To be called in a global `beforeEach`.
     *
     * @publicApi
     */
    function resetFakeAsyncZone() {
        if (fakeAsyncTestModule) {
            return fakeAsyncTestModule.resetFakeAsyncZone();
        }
        throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
    }
    /**
     * Wraps a function to be executed in the `fakeAsync` zone:
     * - Microtasks are manually executed by calling `flushMicrotasks()`.
     * - Timers are synchronous; `tick()` simulates the asynchronous passage of time.
     *
     * If there are any pending timers at the end of the function, an exception is thrown.
     *
     * Can be used to wrap `inject()` calls.
     *
     * @param fn The function that you want to wrap in the `fakeAysnc` zone.
     *
     * @usageNotes
     * ### Example
     *
     * {@example core/testing/ts/fake_async.ts region='basic'}
     *
     *
     * @returns The function wrapped to be executed in the `fakeAsync` zone.
     * Any arguments passed when calling this returned function will be passed through to the `fn`
     * function in the parameters when it is called.
     *
     * @publicApi
     */
    function fakeAsync(fn) {
        if (fakeAsyncTestModule) {
            return fakeAsyncTestModule.fakeAsync(fn);
        }
        throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
    }
    /**
     * Simulates the asynchronous passage of time for the timers in the `fakeAsync` zone.
     *
     * The microtasks queue is drained at the very start of this function and after any timer callback
     * has been executed.
     *
     * @param millis The number of milliseconds to advance the virtual timer.
     * @param tickOptions The options to pass to the `tick()` function.
     *
     * @usageNotes
     *
     * The `tick()` option is a flag called `processNewMacroTasksSynchronously`,
     * which determines whether or not to invoke new macroTasks.
     *
     * If you provide a `tickOptions` object, but do not specify a
     * `processNewMacroTasksSynchronously` property (`tick(100, {})`),
     * then `processNewMacroTasksSynchronously` defaults to true.
     *
     * If you omit the `tickOptions` parameter (`tick(100))`), then
     * `tickOptions` defaults to `{processNewMacroTasksSynchronously: true}`.
     *
     * ### Example
     *
     * {@example core/testing/ts/fake_async.ts region='basic'}
     *
     * The following example includes a nested timeout (new macroTask), and
     * the `tickOptions` parameter is allowed to default. In this case,
     * `processNewMacroTasksSynchronously` defaults to true, and the nested
     * function is executed on each tick.
     *
     * ```
     * it ('test with nested setTimeout', fakeAsync(() => {
     *   let nestedTimeoutInvoked = false;
     *   function funcWithNestedTimeout() {
     *     setTimeout(() => {
     *       nestedTimeoutInvoked = true;
     *     });
     *   };
     *   setTimeout(funcWithNestedTimeout);
     *   tick();
     *   expect(nestedTimeoutInvoked).toBe(true);
     * }));
     * ```
     *
     * In the following case, `processNewMacroTasksSynchronously` is explicitly
     * set to false, so the nested timeout function is not invoked.
     *
     * ```
     * it ('test with nested setTimeout', fakeAsync(() => {
     *   let nestedTimeoutInvoked = false;
     *   function funcWithNestedTimeout() {
     *     setTimeout(() => {
     *       nestedTimeoutInvoked = true;
     *     });
     *   };
     *   setTimeout(funcWithNestedTimeout);
     *   tick(0, {processNewMacroTasksSynchronously: false});
     *   expect(nestedTimeoutInvoked).toBe(false);
     * }));
     * ```
     *
     *
     * @publicApi
     */
    function tick(millis = 0, tickOptions = {
        processNewMacroTasksSynchronously: true
    }) {
        if (fakeAsyncTestModule) {
            return fakeAsyncTestModule.tick(millis, tickOptions);
        }
        throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
    }
    /**
     * Flushes any pending microtasks and simulates the asynchronous passage of time for the timers in
     * the `fakeAsync` zone by
     * draining the macrotask queue until it is empty.
     *
     * @param maxTurns The maximum number of times the scheduler attempts to clear its queue before
     *     throwing an error.
     * @returns The simulated time elapsed, in milliseconds.
     *
     * @publicApi
     */
    function flush(maxTurns) {
        if (fakeAsyncTestModule) {
            return fakeAsyncTestModule.flush(maxTurns);
        }
        throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
    }
    /**
     * Discard all remaining periodic tasks.
     *
     * @publicApi
     */
    function discardPeriodicTasks() {
        if (fakeAsyncTestModule) {
            return fakeAsyncTestModule.discardPeriodicTasks();
        }
        throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
    }
    /**
     * Flush any pending microtasks.
     *
     * @publicApi
     */
    function flushMicrotasks() {
        if (fakeAsyncTestModule) {
            return fakeAsyncTestModule.flushMicrotasks();
        }
        throw new Error(fakeAsyncTestModuleNotLoadedErrorMessage);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Whether test modules should be torn down by default. */
    const TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT = true;
    /** Whether unknown elements in templates should throw by default. */
    const THROW_ON_UNKNOWN_ELEMENTS_DEFAULT = false;
    /** Whether unknown properties in templates should throw by default. */
    const THROW_ON_UNKNOWN_PROPERTIES_DEFAULT = false;
    /**
     * An abstract class for inserting the root test component element in a platform independent way.
     *
     * @publicApi
     */
    class TestComponentRenderer {
        insertRootElement(rootElementId) { }
        removeAllRootElements() { }
    }
    /**
     * @publicApi
     */
    const ComponentFixtureAutoDetect = new core.InjectionToken('ComponentFixtureAutoDetect');
    /**
     * @publicApi
     */
    const ComponentFixtureNoNgZone = new core.InjectionToken('ComponentFixtureNoNgZone');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Used to resolve resource URLs on `@Component` when used with JIT compilation.
     *
     * Example:
     * ```
     * @Component({
     *   selector: 'my-comp',
     *   templateUrl: 'my-comp.html', // This requires asynchronous resolution
     * })
     * class MyComponent{
     * }
     *
     * // Calling `renderComponent` will fail because `renderComponent` is a synchronous process
     * // and `MyComponent`'s `@Component.templateUrl` needs to be resolved asynchronously.
     *
     * // Calling `resolveComponentResources()` will resolve `@Component.templateUrl` into
     * // `@Component.template`, which allows `renderComponent` to proceed in a synchronous manner.
     *
     * // Use browser's `fetch()` function as the default resource resolution strategy.
     * resolveComponentResources(fetch).then(() => {
     *   // After resolution all URLs have been converted into `template` strings.
     *   renderComponent(MyComponent);
     * });
     *
     * ```
     *
     * NOTE: In AOT the resolution happens during compilation, and so there should be no need
     * to call this method outside JIT mode.
     *
     * @param resourceResolver a function which is responsible for returning a `Promise` to the
     * contents of the resolved URL. Browser's `fetch()` method is a good default implementation.
     */
    function resolveComponentResources(resourceResolver) {
        // Store all promises which are fetching the resources.
        const componentResolved = [];
        // Cache so that we don't fetch the same resource more than once.
        const urlMap = new Map();
        function cachedResourceResolve(url) {
            let promise = urlMap.get(url);
            if (!promise) {
                const resp = resourceResolver(url);
                urlMap.set(url, promise = resp.then(unwrapResponse));
            }
            return promise;
        }
        componentResourceResolutionQueue.forEach((component, type) => {
            const promises = [];
            if (component.templateUrl) {
                promises.push(cachedResourceResolve(component.templateUrl).then((template) => {
                    component.template = template;
                }));
            }
            const styleUrls = component.styleUrls;
            const styles = component.styles || (component.styles = []);
            const styleOffset = component.styles.length;
            styleUrls && styleUrls.forEach((styleUrl, index) => {
                styles.push(''); // pre-allocate array.
                promises.push(cachedResourceResolve(styleUrl).then((style) => {
                    styles[styleOffset + index] = style;
                    styleUrls.splice(styleUrls.indexOf(styleUrl), 1);
                    if (styleUrls.length == 0) {
                        component.styleUrls = undefined;
                    }
                }));
            });
            const fullyResolved = Promise.all(promises).then(() => componentDefResolved(type));
            componentResolved.push(fullyResolved);
        });
        clearResolutionOfComponentResourcesQueue();
        return Promise.all(componentResolved).then(() => undefined);
    }
    let componentResourceResolutionQueue = new Map();
    // Track when existing ɵcmp for a Type is waiting on resources.
    const componentDefPendingResolution = new Set();
    function isComponentDefPendingResolution(type) {
        return componentDefPendingResolution.has(type);
    }
    function clearResolutionOfComponentResourcesQueue() {
        const old = componentResourceResolutionQueue;
        componentResourceResolutionQueue = new Map();
        return old;
    }
    function restoreComponentResolutionQueue(queue) {
        componentDefPendingResolution.clear();
        queue.forEach((_, type) => componentDefPendingResolution.add(type));
        componentResourceResolutionQueue = queue;
    }
    function unwrapResponse(response) {
        return typeof response == 'string' ? response : response.text();
    }
    function componentDefResolved(type) {
        componentDefPendingResolution.delete(type);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Always use __globalThis if available, which is the spec-defined global variable across all
    // environments, then fallback to __global first, because in Node tests both __global and
    // __window may be defined and _global should be __global in that case. Note: Typeof/Instanceof
    // checks are considered side-effects in Terser. We explicitly mark this as side-effect free:
    // https://github.com/terser/terser/issues/250.
    const _global$1 = ( /* @__PURE__ */(() => (typeof globalThis !== 'undefined' && globalThis) ||
        (typeof global !== 'undefined' && global) || (typeof window !== 'undefined' && window) ||
        (typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
            self instanceof WorkerGlobalScope && self))());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var FactoryTarget;
    (function (FactoryTarget) {
        FactoryTarget[FactoryTarget["Directive"] = 0] = "Directive";
        FactoryTarget[FactoryTarget["Component"] = 1] = "Component";
        FactoryTarget[FactoryTarget["Injectable"] = 2] = "Injectable";
        FactoryTarget[FactoryTarget["Pipe"] = 3] = "Pipe";
        FactoryTarget[FactoryTarget["NgModule"] = 4] = "NgModule";
    })(FactoryTarget || (FactoryTarget = {}));
    var R3TemplateDependencyKind;
    (function (R3TemplateDependencyKind) {
        R3TemplateDependencyKind[R3TemplateDependencyKind["Directive"] = 0] = "Directive";
        R3TemplateDependencyKind[R3TemplateDependencyKind["Pipe"] = 1] = "Pipe";
        R3TemplateDependencyKind[R3TemplateDependencyKind["NgModule"] = 2] = "NgModule";
    })(R3TemplateDependencyKind || (R3TemplateDependencyKind = {}));
    var ViewEncapsulation$1;
    (function (ViewEncapsulation) {
        ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
        // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.
        ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
        ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
    })(ViewEncapsulation$1 || (ViewEncapsulation$1 = {}));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function getCompilerFacade(request) {
        const globalNg = _global$1['ng'];
        if (globalNg && globalNg.ɵcompilerFacade) {
            return globalNg.ɵcompilerFacade;
        }
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            // Log the type as an error so that a developer can easily navigate to the type from the
            // console.
            console.error(`JIT compilation failed for ${request.kind}`, request.type);
            let message = `The ${request.kind} '${request
            .type.name}' needs to be compiled using the JIT compiler, but '@angular/compiler' is not available.\n\n`;
            if (request.usage === 1 /* JitCompilerUsage.PartialDeclaration */) {
                message += `The ${request.kind} is part of a library that has been partially compiled.\n`;
                message +=
                    `However, the Angular Linker has not processed the library such that JIT compilation is used as fallback.\n`;
                message += '\n';
                message +=
                    `Ideally, the library is processed using the Angular Linker to become fully AOT compiled.\n`;
            }
            else {
                message +=
                    `JIT compilation is discouraged for production use-cases! Consider using AOT mode instead.\n`;
            }
            message +=
                `Alternatively, the JIT compiler should be loaded by bootstrapping using '@angular/platform-browser-dynamic' or '@angular/platform-server',\n`;
            message +=
                `or manually provide the compiler with 'import "@angular/compiler";' before bootstrapping.`;
            throw new Error(message);
        }
        else {
            throw new Error('JIT compiler unavailable');
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function getClosureSafeProperty(objWithPropertyToExtract) {
        for (let key in objWithPropertyToExtract) {
            if (objWithPropertyToExtract[key] === getClosureSafeProperty) {
                return key;
            }
        }
        throw Error('Could not find renamed property on target object.');
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function stringify(token) {
        if (typeof token === 'string') {
            return token;
        }
        if (Array.isArray(token)) {
            return '[' + token.map(stringify).join(', ') + ']';
        }
        if (token == null) {
            return '' + token;
        }
        if (token.overriddenName) {
            return `${token.overriddenName}`;
        }
        if (token.name) {
            return `${token.name}`;
        }
        const res = token.toString();
        if (res == null) {
            return '' + res;
        }
        const newLineIndex = res.indexOf('\n');
        return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }
    /**
     * Concatenates two strings with separator, allocating new strings only when necessary.
     *
     * @param before before string.
     * @param separator separator string.
     * @param after after string.
     * @returns concatenated string.
     */
    function concatStringsWithSpace(before, after) {
        return (before == null || before === '') ?
            (after === null ? '' : after) :
            ((after == null || after === '') ? before : before + ' ' + after);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const __forward_ref__ = getClosureSafeProperty({ __forward_ref__: getClosureSafeProperty });
    /**
     * Allows to refer to references which are not yet defined.
     *
     * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
     * DI is declared, but not yet defined. It is also used when the `token` which we use when creating
     * a query is not yet defined.
     *
     * @usageNotes
     * ### Example
     * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
     * @publicApi
     */
    function forwardRef(forwardRefFn) {
        forwardRefFn.__forward_ref__ = forwardRef;
        forwardRefFn.toString = function () {
            return stringify(this());
        };
        return forwardRefFn;
    }
    /**
     * Lazily retrieves the reference value from a forwardRef.
     *
     * Acts as the identity function when given a non-forward-ref value.
     *
     * @usageNotes
     * ### Example
     *
     * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
     *
     * @see `forwardRef`
     * @publicApi
     */
    function resolveForwardRef(type) {
        return isForwardRef(type) ? type() : type;
    }
    /** Checks whether a function is wrapped by a `forwardRef`. */
    function isForwardRef(fn) {
        return typeof fn === 'function' && fn.hasOwnProperty(__forward_ref__) &&
            fn.__forward_ref__ === forwardRef;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Construct an injectable definition which defines how a token will be constructed by the DI
     * system, and in which injectors (if any) it will be available.
     *
     * This should be assigned to a static `ɵprov` field on a type, which will then be an
     * `InjectableType`.
     *
     * Options:
     * * `providedIn` determines which injectors will include the injectable, by either associating it
     *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
     *   provided in the `'root'` injector, which will be the application-level injector in most apps.
     * * `factory` gives the zero argument function which will create an instance of the injectable.
     *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
     *
     * @codeGenApi
     * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
     */
    function ɵɵdefineInjectable(opts) {
        return {
            token: opts.token,
            providedIn: opts.providedIn || null,
            factory: opts.factory,
            value: undefined,
        };
    }
    /**
     * Construct an `InjectorDef` which configures an injector.
     *
     * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
     * `InjectorType`.
     *
     * Options:
     *
     * * `providers`: an optional array of providers to add to the injector. Each provider must
     *   either have a factory or point to a type which has a `ɵprov` static property (the
     *   type must be an `InjectableType`).
     * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
     *   whose providers will also be added to the injector. Locally provided types will override
     *   providers from imports.
     *
     * @codeGenApi
     */
    function ɵɵdefineInjector(options) {
        return { providers: options.providers || [], imports: options.imports || [] };
    }
    /**
     * Read the injectable def (`ɵprov`) for `type` in a way which is immune to accidentally reading
     * inherited value.
     *
     * @param type A type which may have its own (non-inherited) `ɵprov`.
     */
    function getInjectableDef(type) {
        return getOwnDefinition(type, NG_PROV_DEF) || getOwnDefinition(type, NG_INJECTABLE_DEF);
    }
    /**
     * Return definition only if it is defined directly on `type` and is not inherited from a base
     * class of `type`.
     */
    function getOwnDefinition(type, field) {
        return type.hasOwnProperty(field) ? type[field] : null;
    }
    /**
     * Read the injectable def (`ɵprov`) for `type` or read the `ɵprov` from one of its ancestors.
     *
     * @param type A type which may have `ɵprov`, via inheritance.
     *
     * @deprecated Will be removed in a future version of Angular, where an error will occur in the
     *     scenario if we find the `ɵprov` on an ancestor only.
     */
    function getInheritedInjectableDef(type) {
        const def = type && (type[NG_PROV_DEF] || type[NG_INJECTABLE_DEF]);
        if (def) {
            const typeName = getTypeName(type);
            // TODO(FW-1307): Re-add ngDevMode when closure can handle it
            // ngDevMode &&
            console.warn(`DEPRECATED: DI is instantiating a token "${typeName}" that inherits its @Injectable decorator but does not provide one itself.\n` +
                `This will become an error in a future version of Angular. Please add @Injectable() to the "${typeName}" class.`);
            return def;
        }
        else {
            return null;
        }
    }
    /** Gets the name of a type, accounting for some cross-browser differences. */
    function getTypeName(type) {
        // `Function.prototype.name` behaves differently between IE and other browsers. In most browsers
        // it'll always return the name of the function itself, no matter how many other functions it
        // inherits from. On IE the function doesn't have its own `name` property, but it takes it from
        // the lowest level in the prototype chain. E.g. if we have `class Foo extends Parent` most
        // browsers will evaluate `Foo.name` to `Foo` while IE will return `Parent`. We work around
        // the issue by converting the function to a string and parsing its name out that way via a regex.
        if (type.hasOwnProperty('name')) {
            return type.name;
        }
        const match = ('' + type).match(/^function\s*([^\s(]+)/);
        return match === null ? '' : match[1];
    }
    /**
     * Read the injector def type in a way which is immune to accidentally reading inherited value.
     *
     * @param type type which may have an injector def (`ɵinj`)
     */
    function getInjectorDef(type) {
        return type && (type.hasOwnProperty(NG_INJ_DEF) || type.hasOwnProperty(NG_INJECTOR_DEF)) ?
            type[NG_INJ_DEF] :
            null;
    }
    const NG_PROV_DEF = getClosureSafeProperty({ ɵprov: getClosureSafeProperty });
    const NG_INJ_DEF = getClosureSafeProperty({ ɵinj: getClosureSafeProperty });
    // We need to keep these around so we can read off old defs if new defs are unavailable
    const NG_INJECTABLE_DEF = getClosureSafeProperty({ ngInjectableDef: getClosureSafeProperty });
    const NG_INJECTOR_DEF = getClosureSafeProperty({ ngInjectorDef: getClosureSafeProperty });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Base URL for the error details page.
     *
     * Keep this constant in sync across:
     *  - packages/compiler-cli/src/ngtsc/diagnostics/src/error_details_base_url.ts
     *  - packages/core/src/error_details_base_url.ts
     */
    const ERROR_DETAILS_PAGE_BASE_URL = 'https://angular.io/errors';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Class that represents a runtime error.
     * Formats and outputs the error message in a consistent way.
     *
     * Example:
     * ```
     *  throw new RuntimeError(
     *    RuntimeErrorCode.INJECTOR_ALREADY_DESTROYED,
     *    ngDevMode && 'Injector has already been destroyed.');
     * ```
     *
     * Note: the `message` argument contains a descriptive error message as a string in development
     * mode (when the `ngDevMode` is defined). In production mode (after tree-shaking pass), the
     * `message` argument becomes `false`, thus we account for it in the typings and the runtime logic.
     */
    class RuntimeError extends Error {
        constructor(code, message) {
            super(formatRuntimeError(code, message));
            this.code = code;
        }
    }
    /**
     * Called to format a runtime error.
     * See additional info on the `message` argument type in the `RuntimeError` class description.
     */
    function formatRuntimeError(code, message) {
        // Error code might be a negative number, which is a special marker that instructs the logic to
        // generate a link to the error details page on angular.io.
        // We also prepend `0` to non-compile-time errors.
        const fullCode = `NG0${Math.abs(code)}`;
        let errorMessage = `${fullCode}${message ? ': ' + message.trim() : ''}`;
        if (ngDevMode && code < 0) {
            const addPeriodSeparator = !errorMessage.match(/[.,;!?]$/);
            const separator = addPeriodSeparator ? '.' : '';
            errorMessage =
                `${errorMessage}${separator} Find more at ${ERROR_DETAILS_PAGE_BASE_URL}/${fullCode}`;
        }
        return errorMessage;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description
     *
     * Represents a type that a Component or other object is instances of.
     *
     * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is represented by
     * the `MyCustomComponent` constructor function.
     *
     * @publicApi
     */
    const Type = Function;
    function isType(v) {
        return typeof v === 'function';
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function assertNumber(actual, msg) {
        if (!(typeof actual === 'number')) {
            throwError(msg, typeof actual, 'number', '===');
        }
    }
    function assertString(actual, msg) {
        if (!(typeof actual === 'string')) {
            throwError(msg, actual === null ? 'null' : typeof actual, 'string', '===');
        }
    }
    function assertFunction(actual, msg) {
        if (!(typeof actual === 'function')) {
            throwError(msg, actual === null ? 'null' : typeof actual, 'function', '===');
        }
    }
    function assertEqual(actual, expected, msg) {
        if (!(actual == expected)) {
            throwError(msg, actual, expected, '==');
        }
    }
    function assertNotEqual(actual, expected, msg) {
        if (!(actual != expected)) {
            throwError(msg, actual, expected, '!=');
        }
    }
    function assertSame(actual, expected, msg) {
        if (!(actual === expected)) {
            throwError(msg, actual, expected, '===');
        }
    }
    function assertNotSame(actual, expected, msg) {
        if (!(actual !== expected)) {
            throwError(msg, actual, expected, '!==');
        }
    }
    function assertLessThan(actual, expected, msg) {
        if (!(actual < expected)) {
            throwError(msg, actual, expected, '<');
        }
    }
    function assertGreaterThan(actual, expected, msg) {
        if (!(actual > expected)) {
            throwError(msg, actual, expected, '>');
        }
    }
    function assertGreaterThanOrEqual(actual, expected, msg) {
        if (!(actual >= expected)) {
            throwError(msg, actual, expected, '>=');
        }
    }
    function assertDefined(actual, msg) {
        if (actual == null) {
            throwError(msg, actual, null, '!=');
        }
    }
    function throwError(msg, actual, expected, comparison) {
        throw new Error(`ASSERTION ERROR: ${msg}` +
            (comparison == null ? '' : ` [Expected=> ${expected} ${comparison} ${actual} <=Actual]`));
    }
    function assertIndexInRange(arr, index) {
        assertDefined(arr, 'Array must be defined.');
        const maxLen = arr.length;
        if (index < 0 || index >= maxLen) {
            throwError(`Index expected to be less than ${maxLen} but got ${index}`);
        }
    }
    function deepForEach(input, fn) {
        input.forEach(value => Array.isArray(value) ? deepForEach(value, fn) : fn(value));
    }
    function removeFromArray(arr, index) {
        // perf: array.pop is faster than array.splice!
        if (index >= arr.length - 1) {
            return arr.pop();
        }
        else {
            return arr.splice(index, 1)[0];
        }
    }
    function newArray(size, value) {
        const list = [];
        for (let i = 0; i < size; i++) {
            list.push(value);
        }
        return list;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Convince closure compiler that the wrapped function has no side-effects.
     *
     * Closure compiler always assumes that `toString` has no side-effects. We use this quirk to
     * allow us to execute a function but have closure compiler mark the call as no-side-effects.
     * It is important that the return value for the `noSideEffects` function be assigned
     * to something which is retained otherwise the call to `noSideEffects` will be removed by closure
     * compiler.
     */
    function noSideEffects(fn) {
        return { toString: fn }.toString();
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const ANNOTATIONS = '__annotations__';
    const PARAMETERS = '__parameters__';
    const PROP_METADATA = '__prop__metadata__';
    /**
     * @suppress {globalThis}
     */
    function makeDecorator(name, props, parentClass, additionalProcessing, typeFn) {
        return noSideEffects(() => {
            const metaCtor = makeMetadataCtor(props);
            function DecoratorFactory(...args) {
                if (this instanceof DecoratorFactory) {
                    metaCtor.call(this, ...args);
                    return this;
                }
                const annotationInstance = new DecoratorFactory(...args);
                return function TypeDecorator(cls) {
                    if (typeFn)
                        typeFn(cls, ...args);
                    // Use of Object.defineProperty is important since it creates non-enumerable property which
                    // prevents the property is copied during subclassing.
                    const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
                        cls[ANNOTATIONS] :
                        Object.defineProperty(cls, ANNOTATIONS, { value: [] })[ANNOTATIONS];
                    annotations.push(annotationInstance);
                    if (additionalProcessing)
                        additionalProcessing(cls);
                    return cls;
                };
            }
            if (parentClass) {
                DecoratorFactory.prototype = Object.create(parentClass.prototype);
            }
            DecoratorFactory.prototype.ngMetadataName = name;
            DecoratorFactory.annotationCls = DecoratorFactory;
            return DecoratorFactory;
        });
    }
    function makeMetadataCtor(props) {
        return function ctor(...args) {
            if (props) {
                const values = props(...args);
                for (const propName in values) {
                    this[propName] = values[propName];
                }
            }
        };
    }
    function makeParamDecorator(name, props, parentClass) {
        return noSideEffects(() => {
            const metaCtor = makeMetadataCtor(props);
            function ParamDecoratorFactory(...args) {
                if (this instanceof ParamDecoratorFactory) {
                    metaCtor.apply(this, args);
                    return this;
                }
                const annotationInstance = new ParamDecoratorFactory(...args);
                ParamDecorator.annotation = annotationInstance;
                return ParamDecorator;
                function ParamDecorator(cls, unusedKey, index) {
                    // Use of Object.defineProperty is important since it creates non-enumerable property which
                    // prevents the property is copied during subclassing.
                    const parameters = cls.hasOwnProperty(PARAMETERS) ?
                        cls[PARAMETERS] :
                        Object.defineProperty(cls, PARAMETERS, { value: [] })[PARAMETERS];
                    // there might be gaps if some in between parameters do not have annotations.
                    // we pad with nulls.
                    while (parameters.length <= index) {
                        parameters.push(null);
                    }
                    (parameters[index] = parameters[index] || []).push(annotationInstance);
                    return cls;
                }
            }
            if (parentClass) {
                ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
            }
            ParamDecoratorFactory.prototype.ngMetadataName = name;
            ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
            return ParamDecoratorFactory;
        });
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /*
     * #########################
     * Attention: These Regular expressions have to hold even if the code is minified!
     * ##########################
     */
    /**
     * Regular expression that detects pass-through constructors for ES5 output. This Regex
     * intends to capture the common delegation pattern emitted by TypeScript and Babel. Also
     * it intends to capture the pattern where existing constructors have been downleveled from
     * ES2015 to ES5 using TypeScript w/ downlevel iteration. e.g.
     *
     * ```
     *   function MyClass() {
     *     var _this = _super.apply(this, arguments) || this;
     * ```
     *
     * downleveled to ES5 with `downlevelIteration` for TypeScript < 4.2:
     * ```
     *   function MyClass() {
     *     var _this = _super.apply(this, __spread(arguments)) || this;
     * ```
     *
     * or downleveled to ES5 with `downlevelIteration` for TypeScript >= 4.2:
     * ```
     *   function MyClass() {
     *     var _this = _super.apply(this, __spreadArray([], __read(arguments), false)) || this;
     * ```
     *
     * More details can be found in: https://github.com/angular/angular/issues/38453.
     */
    const ES5_DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*(arguments|(?:[^()]+\(\[\],)?[^()]+\(arguments\).*)\)/;
    /** Regular expression that detects ES2015 classes which extend from other classes. */
    const ES2015_INHERITED_CLASS = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/;
    /**
     * Regular expression that detects ES2015 classes which extend from other classes and
     * have an explicit constructor defined.
     */
    const ES2015_INHERITED_CLASS_WITH_CTOR = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/;
    /**
     * Regular expression that detects ES2015 classes which extend from other classes
     * and inherit a constructor.
     */
    const ES2015_INHERITED_CLASS_WITH_DELEGATE_CTOR = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(\)\s*{[^}]*super\(\.\.\.arguments\)/;
    /**
     * Determine whether a stringified type is a class which delegates its constructor
     * to its parent.
     *
     * This is not trivial since compiled code can actually contain a constructor function
     * even if the original source code did not. For instance, when the child class contains
     * an initialized instance property.
     */
    function isDelegateCtor(typeStr) {
        return ES5_DELEGATE_CTOR.test(typeStr) ||
            ES2015_INHERITED_CLASS_WITH_DELEGATE_CTOR.test(typeStr) ||
            (ES2015_INHERITED_CLASS.test(typeStr) && !ES2015_INHERITED_CLASS_WITH_CTOR.test(typeStr));
    }
    class ReflectionCapabilities {
        constructor(reflect) {
            this._reflect = reflect || _global$1['Reflect'];
        }
        factory(t) {
            return (...args) => new t(...args);
        }
        /** @internal */
        _zipTypesAndAnnotations(paramTypes, paramAnnotations) {
            let result;
            if (typeof paramTypes === 'undefined') {
                result = newArray(paramAnnotations.length);
            }
            else {
                result = newArray(paramTypes.length);
            }
            for (let i = 0; i < result.length; i++) {
                // TS outputs Object for parameters without types, while Traceur omits
                // the annotations. For now we preserve the Traceur behavior to aid
                // migration, but this can be revisited.
                if (typeof paramTypes === 'undefined') {
                    result[i] = [];
                }
                else if (paramTypes[i] && paramTypes[i] != Object) {
                    result[i] = [paramTypes[i]];
                }
                else {
                    result[i] = [];
                }
                if (paramAnnotations && paramAnnotations[i] != null) {
                    result[i] = result[i].concat(paramAnnotations[i]);
                }
            }
            return result;
        }
        _ownParameters(type, parentCtor) {
            const typeStr = type.toString();
            // If we have no decorators, we only have function.length as metadata.
            // In that case, to detect whether a child class declared an own constructor or not,
            // we need to look inside of that constructor to check whether it is
            // just calling the parent.
            // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
            // that sets 'design:paramtypes' to []
            // if a class inherits from another class but has no ctor declared itself.
            if (isDelegateCtor(typeStr)) {
                return null;
            }
            // Prefer the direct API.
            if (type.parameters && type.parameters !== parentCtor.parameters) {
                return type.parameters;
            }
            // API of tsickle for lowering decorators to properties on the class.
            const tsickleCtorParams = type.ctorParameters;
            if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
                // Newer tsickle uses a function closure
                // Retain the non-function case for compatibility with older tsickle
                const ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
                const paramTypes = ctorParameters.map((ctorParam) => ctorParam && ctorParam.type);
                const paramAnnotations = ctorParameters.map((ctorParam) => ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
            // API for metadata created by invoking the decorators.
            const paramAnnotations = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS];
            const paramTypes = this._reflect && this._reflect.getOwnMetadata &&
                this._reflect.getOwnMetadata('design:paramtypes', type);
            if (paramTypes || paramAnnotations) {
                return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
            }
            // If a class has no decorators, at least create metadata
            // based on function.length.
            // Note: We know that this is a real constructor as we checked
            // the content of the constructor above.
            return newArray(type.length);
        }
        parameters(type) {
            // Note: only report metadata if we have at least one class decorator
            // to stay in sync with the static reflector.
            if (!isType(type)) {
                return [];
            }
            const parentCtor = getParentCtor(type);
            let parameters = this._ownParameters(type, parentCtor);
            if (!parameters && parentCtor !== Object) {
                parameters = this.parameters(parentCtor);
            }
            return parameters || [];
        }
        _ownAnnotations(typeOrFunc, parentCtor) {
            // Prefer the direct API.
            if (typeOrFunc.annotations && typeOrFunc.annotations !== parentCtor.annotations) {
                let annotations = typeOrFunc.annotations;
                if (typeof annotations === 'function' && annotations.annotations) {
                    annotations = annotations.annotations;
                }
                return annotations;
            }
            // API of tsickle for lowering decorators to properties on the class.
            if (typeOrFunc.decorators && typeOrFunc.decorators !== parentCtor.decorators) {
                return convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators);
            }
            // API for metadata created by invoking the decorators.
            if (typeOrFunc.hasOwnProperty(ANNOTATIONS)) {
                return typeOrFunc[ANNOTATIONS];
            }
            return null;
        }
        annotations(typeOrFunc) {
            if (!isType(typeOrFunc)) {
                return [];
            }
            const parentCtor = getParentCtor(typeOrFunc);
            const ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
            const parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
            return parentAnnotations.concat(ownAnnotations);
        }
        _ownPropMetadata(typeOrFunc, parentCtor) {
            // Prefer the direct API.
            if (typeOrFunc.propMetadata &&
                typeOrFunc.propMetadata !== parentCtor.propMetadata) {
                let propMetadata = typeOrFunc.propMetadata;
                if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
                    propMetadata = propMetadata.propMetadata;
                }
                return propMetadata;
            }
            // API of tsickle for lowering decorators to properties on the class.
            if (typeOrFunc.propDecorators &&
                typeOrFunc.propDecorators !== parentCtor.propDecorators) {
                const propDecorators = typeOrFunc.propDecorators;
                const propMetadata = {};
                Object.keys(propDecorators).forEach(prop => {
                    propMetadata[prop] = convertTsickleDecoratorIntoMetadata(propDecorators[prop]);
                });
                return propMetadata;
            }
            // API for metadata created by invoking the decorators.
            if (typeOrFunc.hasOwnProperty(PROP_METADATA)) {
                return typeOrFunc[PROP_METADATA];
            }
            return null;
        }
        propMetadata(typeOrFunc) {
            if (!isType(typeOrFunc)) {
                return {};
            }
            const parentCtor = getParentCtor(typeOrFunc);
            const propMetadata = {};
            if (parentCtor !== Object) {
                const parentPropMetadata = this.propMetadata(parentCtor);
                Object.keys(parentPropMetadata).forEach((propName) => {
                    propMetadata[propName] = parentPropMetadata[propName];
                });
            }
            const ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
            if (ownPropMetadata) {
                Object.keys(ownPropMetadata).forEach((propName) => {
                    const decorators = [];
                    if (propMetadata.hasOwnProperty(propName)) {
                        decorators.push(...propMetadata[propName]);
                    }
                    decorators.push(...ownPropMetadata[propName]);
                    propMetadata[propName] = decorators;
                });
            }
            return propMetadata;
        }
        ownPropMetadata(typeOrFunc) {
            if (!isType(typeOrFunc)) {
                return {};
            }
            return this._ownPropMetadata(typeOrFunc, getParentCtor(typeOrFunc)) || {};
        }
        hasLifecycleHook(type, lcProperty) {
            return type instanceof Type && lcProperty in type.prototype;
        }
    }
    function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
        if (!decoratorInvocations) {
            return [];
        }
        return decoratorInvocations.map(decoratorInvocation => {
            const decoratorType = decoratorInvocation.type;
            const annotationCls = decoratorType.annotationCls;
            const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
            return new annotationCls(...annotationArgs);
        });
    }
    function getParentCtor(ctor) {
        const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
        const parentCtor = parentProto ? parentProto.constructor : null;
        // Note: We always use `Object` as the null value
        // to simplify checking later on.
        return parentCtor || Object;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function ngDevModeResetPerfCounters() {
        const locationString = typeof location !== 'undefined' ? location.toString() : '';
        const newCounters = {
            namedConstructors: locationString.indexOf('ngDevMode=namedConstructors') != -1,
            firstCreatePass: 0,
            tNode: 0,
            tView: 0,
            rendererCreateTextNode: 0,
            rendererSetText: 0,
            rendererCreateElement: 0,
            rendererAddEventListener: 0,
            rendererSetAttribute: 0,
            rendererRemoveAttribute: 0,
            rendererSetProperty: 0,
            rendererSetClassName: 0,
            rendererAddClass: 0,
            rendererRemoveClass: 0,
            rendererSetStyle: 0,
            rendererRemoveStyle: 0,
            rendererDestroy: 0,
            rendererDestroyNode: 0,
            rendererMoveNode: 0,
            rendererRemoveNode: 0,
            rendererAppendChild: 0,
            rendererInsertBefore: 0,
            rendererCreateComment: 0,
        };
        // Make sure to refer to ngDevMode as ['ngDevMode'] for closure.
        const allowNgDevModeTrue = locationString.indexOf('ngDevMode=false') === -1;
        _global$1['ngDevMode'] = allowNgDevModeTrue && newCounters;
        return newCounters;
    }
    /**
     * This function checks to see if the `ngDevMode` has been set. If yes,
     * then we honor it, otherwise we default to dev mode with additional checks.
     *
     * The idea is that unless we are doing production build where we explicitly
     * set `ngDevMode == false` we should be helping the developer by providing
     * as much early warning and errors as possible.
     *
     * `ɵɵdefineComponent` is guaranteed to have been called before any component template functions
     * (and thus Ivy instructions), so a single initialization there is sufficient to ensure ngDevMode
     * is defined for the entire instruction set.
     *
     * When checking `ngDevMode` on toplevel, always init it before referencing it
     * (e.g. `((typeof ngDevMode === 'undefined' || ngDevMode) && initNgDevMode())`), otherwise you can
     *  get a `ReferenceError` like in https://github.com/angular/angular/issues/31595.
     *
     * Details on possible values for `ngDevMode` can be found on its docstring.
     *
     * NOTE:
     * - changes to the `ngDevMode` name must be synced with `compiler-cli/src/tooling.ts`.
     */
    function initNgDevMode() {
        // The below checks are to ensure that calling `initNgDevMode` multiple times does not
        // reset the counters.
        // If the `ngDevMode` is not an object, then it means we have not created the perf counters
        // yet.
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (typeof ngDevMode !== 'object') {
                ngDevModeResetPerfCounters();
            }
            return typeof ngDevMode !== 'undefined' && !!ngDevMode;
        }
        return false;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function isEnvironmentProviders(value) {
        return value && !!value.ɵproviders;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Used for stringify render output in Ivy.
     * Important! This function is very performance-sensitive and we should
     * be extra careful not to introduce megamorphic reads in it.
     * Check `core/test/render3/perf/render_stringify` for benchmarks and alternate implementations.
     */
    function renderStringify(value) {
        if (typeof value === 'string')
            return value;
        if (value == null)
            return '';
        // Use `String` so that it invokes the `toString` method of the value. Note that this
        // appears to be faster than calling `value.toString` (see `render_stringify` benchmark).
        return String(value);
    }
    /**
     * Used to stringify a value so that it can be displayed in an error message.
     * Important! This function contains a megamorphic read and should only be
     * used for error messages.
     */
    function stringifyForError(value) {
        if (typeof value === 'function')
            return value.name || value.toString();
        if (typeof value === 'object' && value != null && typeof value.type === 'function') {
            return value.type.name || value.type.toString();
        }
        return renderStringify(value);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Called when directives inject each other (creating a circular dependency) */
    function throwCyclicDependencyError(token, path) {
        const depPath = path ? `. Dependency path: ${path.join(' > ')} > ${token}` : '';
        throw new RuntimeError(-200 /* RuntimeErrorCode.CYCLIC_DI_DEPENDENCY */, `Circular dependency in DI detected for ${token}${depPath}`);
    }
    function throwMixedMultiProviderError() {
        throw new Error(`Cannot mix multi providers and regular providers`);
    }
    function throwInvalidProviderError(ngModuleType, providers, provider) {
        if (ngModuleType && providers) {
            const providerDetail = providers.map(v => v == provider ? '?' + provider + '?' : '...');
            throw new Error(`Invalid provider for the NgModule '${stringify(ngModuleType)}' - only instances of Provider and Type are allowed, got: [${providerDetail.join(', ')}]`);
        }
        else if (isEnvironmentProviders(provider)) {
            if (provider.ɵfromNgModule) {
                throw new RuntimeError(207 /* RuntimeErrorCode.PROVIDER_IN_WRONG_CONTEXT */, `Invalid providers from 'importProvidersFrom' present in a non-environment injector. 'importProvidersFrom' can't be used for component providers.`);
            }
            else {
                throw new RuntimeError(207 /* RuntimeErrorCode.PROVIDER_IN_WRONG_CONTEXT */, `Invalid providers present in a non-environment injector. 'EnvironmentProviders' can't be used for component providers.`);
            }
        }
        else {
            throw new Error('Invalid provider');
        }
    }
    /** Throws an error when a token is not found in DI. */
    function throwProviderNotFoundError(token, injectorName) {
        const injectorDetails = injectorName ? ` in ${injectorName}` : '';
        throw new RuntimeError(-201 /* RuntimeErrorCode.PROVIDER_NOT_FOUND */, ngDevMode && `No provider for ${stringifyForError(token)} found${injectorDetails}`);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Injection flags for DI.
     *
     * @publicApi
     * @deprecated use an options object for `inject` instead.
     */
    var InjectFlags;
    (function (InjectFlags) {
        // TODO(alxhub): make this 'const' (and remove `InternalInjectFlags` enum) when ngc no longer
        // writes exports of it into ngfactory files.
        /** Check self and check parent injector if needed */
        InjectFlags[InjectFlags["Default"] = 0] = "Default";
        /**
         * Specifies that an injector should retrieve a dependency from any injector until reaching the
         * host element of the current component. (Only used with Element Injector)
         */
        InjectFlags[InjectFlags["Host"] = 1] = "Host";
        /** Don't ascend to ancestors of the node requesting injection. */
        InjectFlags[InjectFlags["Self"] = 2] = "Self";
        /** Skip the node that is requesting injection. */
        InjectFlags[InjectFlags["SkipSelf"] = 4] = "SkipSelf";
        /** Inject `defaultValue` instead if token not found. */
        InjectFlags[InjectFlags["Optional"] = 8] = "Optional";
    })(InjectFlags || (InjectFlags = {}));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Current implementation of inject.
     *
     * By default, it is `injectInjectorOnly`, which makes it `Injector`-only aware. It can be changed
     * to `directiveInject`, which brings in the `NodeInjector` system of ivy. It is designed this
     * way for two reasons:
     *  1. `Injector` should not depend on ivy logic.
     *  2. To maintain tree shake-ability we don't want to bring in unnecessary code.
     */
    let _injectImplementation;
    function getInjectImplementation() {
        return _injectImplementation;
    }
    /**
     * Sets the current inject implementation.
     */
    function setInjectImplementation(impl) {
        const previous = _injectImplementation;
        _injectImplementation = impl;
        return previous;
    }
    /**
     * Injects `root` tokens in limp mode.
     *
     * If no injector exists, we can still inject tree-shakable providers which have `providedIn` set to
     * `"root"`. This is known as the limp mode injection. In such case the value is stored in the
     * injectable definition.
     */
    function injectRootLimpMode(token, notFoundValue, flags) {
        const injectableDef = getInjectableDef(token);
        if (injectableDef && injectableDef.providedIn == 'root') {
            return injectableDef.value === undefined ? injectableDef.value = injectableDef.factory() :
                injectableDef.value;
        }
        if (flags & InjectFlags.Optional)
            return null;
        if (notFoundValue !== undefined)
            return notFoundValue;
        throwProviderNotFoundError(stringify(token), 'Injector');
    }
    /**
     * Assert that `_injectImplementation` is not `fn`.
     *
     * This is useful, to prevent infinite recursion.
     *
     * @param fn Function which it should not equal to
     */
    function assertInjectImplementationNotEqual(fn) {
        ngDevMode &&
            assertNotEqual(_injectImplementation, fn, 'Calling ɵɵinject would cause infinite recursion');
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const _THROW_IF_NOT_FOUND = {};
    const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
    /*
     * Name of a property (that we patch onto DI decorator), which is used as an annotation of which
     * InjectFlag this decorator represents. This allows to avoid direct references to the DI decorators
     * in the code, thus making them tree-shakable.
     */
    const DI_DECORATOR_FLAG = '__NG_DI_FLAG__';
    const NG_TEMP_TOKEN_PATH = 'ngTempTokenPath';
    const NG_TOKEN_PATH = 'ngTokenPath';
    const NEW_LINE = /\n/gm;
    const NO_NEW_LINE = 'ɵ';
    const SOURCE = '__source';
    /**
     * Current injector value used by `inject`.
     * - `undefined`: it is an error to call `inject`
     * - `null`: `inject` can be called but there is no injector (limp-mode).
     * - Injector instance: Use the injector for resolution.
     */
    let _currentInjector = undefined;
    function setCurrentInjector(injector) {
        const former = _currentInjector;
        _currentInjector = injector;
        return former;
    }
    function injectInjectorOnly(token, flags = InjectFlags.Default) {
        if (_currentInjector === undefined) {
            throw new RuntimeError(-203 /* RuntimeErrorCode.MISSING_INJECTION_CONTEXT */, ngDevMode &&
                `inject() must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with \`EnvironmentInjector#runInContext\`.`);
        }
        else if (_currentInjector === null) {
            return injectRootLimpMode(token, undefined, flags);
        }
        else {
            return _currentInjector.get(token, flags & InjectFlags.Optional ? null : undefined, flags);
        }
    }
    function ɵɵinject(token, flags = InjectFlags.Default) {
        return (getInjectImplementation() || injectInjectorOnly)(resolveForwardRef(token), flags);
    }
    /**
     * Throws an error indicating that a factory function could not be generated by the compiler for a
     * particular class.
     *
     * The name of the class is not mentioned here, but will be in the generated factory function name
     * and thus in the stack trace.
     *
     * @codeGenApi
     */
    function ɵɵinvalidFactoryDep(index) {
        throw new RuntimeError(202 /* RuntimeErrorCode.INVALID_FACTORY_DEPENDENCY */, ngDevMode &&
            `This constructor is not compatible with Angular Dependency Injection because its dependency at index ${index} of the parameter list is invalid.
This can happen if the dependency type is a primitive like a string or if an ancestor of this class is missing an Angular decorator.

Please check that 1) the type for the parameter at index ${index} is correct and 2) the correct Angular decorators are defined for this class and its ancestors.`);
    }
    // Converts object-based DI flags (`InjectOptions`) to bit flags (`InjectFlags`).
    function convertToBitFlags(flags) {
        if (typeof flags === 'undefined' || typeof flags === 'number') {
            return flags;
        }
        // While TypeScript doesn't accept it without a cast, bitwise OR with false-y values in
        // JavaScript is a no-op. We can use that for a very codesize-efficient conversion from
        // `InjectOptions` to `InjectFlags`.
        return (0 /* InternalInjectFlags.Default */ | // comment to force a line break in the formatter
            (flags.optional && 8 /* InternalInjectFlags.Optional */) |
            (flags.host && 1 /* InternalInjectFlags.Host */) |
            (flags.self && 2 /* InternalInjectFlags.Self */) |
            (flags.skipSelf && 4 /* InternalInjectFlags.SkipSelf */));
    }
    function injectArgs(types) {
        const args = [];
        for (let i = 0; i < types.length; i++) {
            const arg = resolveForwardRef(types[i]);
            if (Array.isArray(arg)) {
                if (arg.length === 0) {
                    throw new RuntimeError(900 /* RuntimeErrorCode.INVALID_DIFFER_INPUT */, ngDevMode && 'Arguments array must have arguments.');
                }
                let type = undefined;
                let flags = InjectFlags.Default;
                for (let j = 0; j < arg.length; j++) {
                    const meta = arg[j];
                    const flag = getInjectFlag(meta);
                    if (typeof flag === 'number') {
                        // Special case when we handle @Inject decorator.
                        if (flag === -1 /* DecoratorFlags.Inject */) {
                            type = meta.token;
                        }
                        else {
                            flags |= flag;
                        }
                    }
                    else {
                        type = meta;
                    }
                }
                args.push(ɵɵinject(type, flags));
            }
            else {
                args.push(ɵɵinject(arg));
            }
        }
        return args;
    }
    /**
     * Attaches a given InjectFlag to a given decorator using monkey-patching.
     * Since DI decorators can be used in providers `deps` array (when provider is configured using
     * `useFactory`) without initialization (e.g. `Host`) and as an instance (e.g. `new Host()`), we
     * attach the flag to make it available both as a static property and as a field on decorator
     * instance.
     *
     * @param decorator Provided DI decorator.
     * @param flag InjectFlag that should be applied.
     */
    function attachInjectFlag(decorator, flag) {
        decorator[DI_DECORATOR_FLAG] = flag;
        decorator.prototype[DI_DECORATOR_FLAG] = flag;
        return decorator;
    }
    /**
     * Reads monkey-patched property that contains InjectFlag attached to a decorator.
     *
     * @param token Token that may contain monkey-patched DI flags property.
     */
    function getInjectFlag(token) {
        return token[DI_DECORATOR_FLAG];
    }
    function catchInjectorError(e, token, injectorErrorName, source) {
        const tokenPath = e[NG_TEMP_TOKEN_PATH];
        if (token[SOURCE]) {
            tokenPath.unshift(token[SOURCE]);
        }
        e.message = formatError('\n' + e.message, tokenPath, injectorErrorName, source);
        e[NG_TOKEN_PATH] = tokenPath;
        e[NG_TEMP_TOKEN_PATH] = null;
        throw e;
    }
    function formatError(text, obj, injectorErrorName, source = null) {
        text = text && text.charAt(0) === '\n' && text.charAt(1) == NO_NEW_LINE ? text.slice(2) : text;
        let context = stringify(obj);
        if (Array.isArray(obj)) {
            context = obj.map(stringify).join(' -> ');
        }
        else if (typeof obj === 'object') {
            let parts = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let value = obj[key];
                    parts.push(key + ':' + (typeof value === 'string' ? JSON.stringify(value) : stringify(value)));
                }
            }
            context = `{${parts.join(', ')}}`;
        }
        return `${injectorErrorName}${source ? '(' + source + ')' : ''}[${context}]: ${text.replace(NEW_LINE, '\n  ')}`;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Inject decorator and metadata.
     *
     * @Annotation
     * @publicApi
     */
    const Inject = attachInjectFlag(
    // Disable tslint because `DecoratorFlags` is a const enum which gets inlined.
    // tslint:disable-next-line: no-toplevel-property-access
    makeParamDecorator('Inject', (token) => ({ token })), -1 /* DecoratorFlags.Inject */);
    /**
     * Optional decorator and metadata.
     *
     * @Annotation
     * @publicApi
     */
    const Optional =
    // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
    // tslint:disable-next-line: no-toplevel-property-access
    attachInjectFlag(makeParamDecorator('Optional'), 8 /* InternalInjectFlags.Optional */);
    /**
     * Self decorator and metadata.
     *
     * @Annotation
     * @publicApi
     */
    const Self =
    // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
    // tslint:disable-next-line: no-toplevel-property-access
    attachInjectFlag(makeParamDecorator('Self'), 2 /* InternalInjectFlags.Self */);
    /**
     * `SkipSelf` decorator and metadata.
     *
     * @Annotation
     * @publicApi
     */
    const SkipSelf =
    // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
    // tslint:disable-next-line: no-toplevel-property-access
    attachInjectFlag(makeParamDecorator('SkipSelf'), 4 /* InternalInjectFlags.SkipSelf */);
    /**
     * Host decorator and metadata.
     *
     * @Annotation
     * @publicApi
     */
    const Host =
    // Disable tslint because `InternalInjectFlags` is a const enum which gets inlined.
    // tslint:disable-next-line: no-toplevel-property-access
    attachInjectFlag(makeParamDecorator('Host'), 1 /* InternalInjectFlags.Host */);

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * The strategy that the default change detector uses to detect changes.
     * When set, takes effect the next time change detection is triggered.
     *
     * @see {@link ChangeDetectorRef#usage-notes Change detection usage}
     *
     * @publicApi
     */
    var ChangeDetectionStrategy;
    (function (ChangeDetectionStrategy) {
        /**
         * Use the `CheckOnce` strategy, meaning that automatic change detection is deactivated
         * until reactivated by setting the strategy to `Default` (`CheckAlways`).
         * Change detection can still be explicitly invoked.
         * This strategy applies to all child directives and cannot be overridden.
         */
        ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
        /**
         * Use the default `CheckAlways` strategy, in which change detection is automatic until
         * explicitly deactivated.
         */
        ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
    })(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
    /**
     * Defines the possible states of the default change detector.
     * @see `ChangeDetectorRef`
     */
    var ChangeDetectorStatus;
    (function (ChangeDetectorStatus) {
        /**
         * A state in which, after calling `detectChanges()`, the change detector
         * state becomes `Checked`, and must be explicitly invoked or reactivated.
         */
        ChangeDetectorStatus[ChangeDetectorStatus["CheckOnce"] = 0] = "CheckOnce";
        /**
         * A state in which change detection is skipped until the change detector mode
         * becomes `CheckOnce`.
         */
        ChangeDetectorStatus[ChangeDetectorStatus["Checked"] = 1] = "Checked";
        /**
         * A state in which change detection continues automatically until explicitly
         * deactivated.
         */
        ChangeDetectorStatus[ChangeDetectorStatus["CheckAlways"] = 2] = "CheckAlways";
        /**
         * A state in which a change detector sub tree is not a part of the main tree and
         * should be skipped.
         */
        ChangeDetectorStatus[ChangeDetectorStatus["Detached"] = 3] = "Detached";
        /**
         * Indicates that the change detector encountered an error checking a binding
         * or calling a directive lifecycle method and is now in an inconsistent state. Change
         * detectors in this state do not detect changes.
         */
        ChangeDetectorStatus[ChangeDetectorStatus["Errored"] = 4] = "Errored";
        /**
         * Indicates that the change detector has been destroyed.
         */
        ChangeDetectorStatus[ChangeDetectorStatus["Destroyed"] = 5] = "Destroyed";
    })(ChangeDetectorStatus || (ChangeDetectorStatus = {}));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Defines the CSS styles encapsulation policies for the {@link Component} decorator's
     * `encapsulation` option.
     *
     * See {@link Component#encapsulation encapsulation}.
     *
     * @usageNotes
     * ### Example
     *
     * {@example core/ts/metadata/encapsulation.ts region='longform'}
     *
     * @publicApi
     */
    var ViewEncapsulation;
    (function (ViewEncapsulation) {
        // TODO: consider making `ViewEncapsulation` a `const enum` instead. See
        // https://github.com/angular/angular/issues/44119 for additional information.
        /**
         * Emulates a native Shadow DOM encapsulation behavior by adding a specific attribute to the
         * component's host element and applying the same attribute to all the CSS selectors provided
         * via {@link Component#styles styles} or {@link Component#styleUrls styleUrls}.
         *
         * This is the default option.
         */
        ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
        // Historically the 1 value was for `Native` encapsulation which has been removed as of v11.
        /**
         * Doesn't provide any sort of CSS style encapsulation, meaning that all the styles provided
         * via {@link Component#styles styles} or {@link Component#styleUrls styleUrls} are applicable
         * to any HTML element of the application regardless of their host Component.
         */
        ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
        /**
         * Uses the browser's native Shadow DOM API to encapsulate CSS styles, meaning that it creates
         * a ShadowRoot for the component's host element which is then used to encapsulate
         * all the Component's styling.
         */
        ViewEncapsulation[ViewEncapsulation["ShadowDom"] = 3] = "ShadowDom";
    })(ViewEncapsulation || (ViewEncapsulation = {}));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * This file contains reuseable "empty" symbols that can be used as default return values
     * in different parts of the rendering code. Because the same symbols are returned, this
     * allows for identity checks against these values to be consistently used by the framework
     * code.
     */
    const EMPTY_OBJ = {};
    const EMPTY_ARRAY = [];
    // freezing the values prevents any code from accidentally inserting new values in
    if ((typeof ngDevMode === 'undefined' || ngDevMode) && initNgDevMode()) {
        // These property accesses can be ignored because ngDevMode will be set to false
        // when optimizing code and the whole if statement will be dropped.
        // tslint:disable-next-line:no-toplevel-property-access
        Object.freeze(EMPTY_OBJ);
        // tslint:disable-next-line:no-toplevel-property-access
        Object.freeze(EMPTY_ARRAY);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const NG_COMP_DEF = getClosureSafeProperty({ ɵcmp: getClosureSafeProperty });
    getClosureSafeProperty({ ɵdir: getClosureSafeProperty });
    getClosureSafeProperty({ ɵpipe: getClosureSafeProperty });
    getClosureSafeProperty({ ɵmod: getClosureSafeProperty });
    const NG_FACTORY_DEF = getClosureSafeProperty({ ɵfac: getClosureSafeProperty });
    /**
     * If a directive is diPublic, bloomAdd sets a property on the type with this constant as
     * the key and the directive's unique ID as the value. This allows us to map directives to their
     * bloom filter bit for DI.
     */
    // TODO(misko): This is wrong. The NG_ELEMENT_ID should never be minified.
    const NG_ELEMENT_ID = getClosureSafeProperty({ __NG_ELEMENT_ID__: getClosureSafeProperty });
    /**
     * The following getter methods retrieve the definition from the type. Currently the retrieval
     * honors inheritance, but in the future we may change the rule to require that definitions are
     * explicit. This would require some sort of migration strategy.
     */
    function getComponentDef$1(type) {
        return type[NG_COMP_DEF] || null;
    }

    /**
     * Special location which allows easy identification of type. If we have an array which was
     * retrieved from the `LView` and that array has `true` at `TYPE` location, we know it is
     * `LContainer`.
     */
    const TYPE = 1;
    /**
     * Below are constants for LContainer indices to help us look up LContainer members
     * without having to remember the specific indices.
     * Uglify will inline these when minifying so there shouldn't be a cost.
     */
    /**
     * Flag to signify that this `LContainer` may have transplanted views which need to be change
     * detected. (see: `LView[DECLARATION_COMPONENT_VIEW])`.
     *
     * This flag, once set, is never unset for the `LContainer`. This means that when unset we can skip
     * a lot of work in `refreshEmbeddedViews`. But when set we still need to verify
     * that the `MOVED_VIEWS` are transplanted and on-push.
     */
    const HAS_TRANSPLANTED_VIEWS = 2;
    // PARENT, NEXT, TRANSPLANTED_VIEWS_TO_REFRESH are indices 3, 4, and 5
    // As we already have these constants in LView, we don't need to re-create them.
    // T_HOST is index 6
    // We already have this constants in LView, we don't need to re-create it.
    const NATIVE = 7;
    const VIEW_REFS = 8;
    const MOVED_VIEWS = 9;
    /**
     * Size of LContainer's header. Represents the index after which all views in the
     * container will be inserted. We need to keep a record of current views so we know
     * which views are already in the DOM (and don't need to be re-added) and so we can
     * remove views from the DOM when they are no longer required.
     */
    const CONTAINER_HEADER_OFFSET = 10;

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Below are constants for LView indices to help us look up LView members
    // without having to remember the specific indices.
    // Uglify will inline these when minifying so there shouldn't be a cost.
    const HOST = 0;
    const TVIEW = 1;
    const FLAGS = 2;
    const PARENT = 3;
    const NEXT = 4;
    const TRANSPLANTED_VIEWS_TO_REFRESH = 5;
    const T_HOST = 6;
    const CLEANUP = 7;
    const CONTEXT = 8;
    const INJECTOR$1 = 9;
    const RENDERER_FACTORY = 10;
    const RENDERER = 11;
    const SANITIZER = 12;
    const CHILD_HEAD = 13;
    const CHILD_TAIL = 14;
    // FIXME(misko): Investigate if the three declarations aren't all same thing.
    const DECLARATION_VIEW = 15;
    const DECLARATION_COMPONENT_VIEW = 16;
    const DECLARATION_LCONTAINER = 17;
    const PREORDER_HOOK_FLAGS = 18;
    const QUERIES = 19;
    const ID = 20;
    const EMBEDDED_VIEW_INJECTOR = 21;
    /**
     * Size of LView's header. Necessary to adjust for it when setting slots.
     *
     * IMPORTANT: `HEADER_OFFSET` should only be referred to the in the `ɵɵ*` instructions to translate
     * instruction index into `LView` index. All other indexes should be in the `LView` index space and
     * there should be no need to refer to `HEADER_OFFSET` anywhere else.
     */
    const HEADER_OFFSET = 22;
    /**
     * Converts `TViewType` into human readable text.
     * Make sure this matches with `TViewType`
     */
    const TViewTypeAsString = [
        'Root',
        'Component',
        'Embedded', // 2
    ];

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * True if `value` is `LView`.
     * @param value wrapped value of `RNode`, `LView`, `LContainer`
     */
    function isLView(value) {
        return Array.isArray(value) && typeof value[TYPE] === 'object';
    }
    /**
     * True if `value` is `LContainer`.
     * @param value wrapped value of `RNode`, `LView`, `LContainer`
     */
    function isLContainer(value) {
        return Array.isArray(value) && value[TYPE] === true;
    }
    function isContentQueryHost(tNode) {
        return (tNode.flags & 4 /* TNodeFlags.hasContentQuery */) !== 0;
    }
    function isComponentHost(tNode) {
        return tNode.componentOffset > -1;
    }
    function isComponentDef(def) {
        return def.template !== null;
    }
    function isRootView(target) {
        return (target[FLAGS] & 256 /* LViewFlags.IsRoot */) !== 0;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // [Assert functions do not constraint type when they are guarded by a truthy
    // expression.](https://github.com/microsoft/TypeScript/issues/37295)
    function assertTNodeForLView(tNode, lView) {
        assertTNodeForTView(tNode, lView[TVIEW]);
    }
    function assertTNodeForTView(tNode, tView) {
        assertTNode(tNode);
        tNode.hasOwnProperty('tView_') &&
            assertEqual(tNode.tView_, tView, 'This TNode does not belong to this TView.');
    }
    function assertTNode(tNode) {
        assertDefined(tNode, 'TNode must be defined');
        if (!(tNode && typeof tNode === 'object' && tNode.hasOwnProperty('directiveStylingLast'))) {
            throwError('Not of type TNode, got: ' + tNode);
        }
    }
    function assertComponentType(actual, msg = 'Type passed in is not ComponentType, it does not have \'ɵcmp\' property.') {
        if (!getComponentDef$1(actual)) {
            throwError(msg);
        }
    }
    function assertLContainer(value) {
        assertDefined(value, 'LContainer must be defined');
        assertEqual(isLContainer(value), true, 'Expecting LContainer');
    }
    function assertLViewOrUndefined(value) {
        value && assertEqual(isLView(value), true, 'Expecting LView or undefined or null');
    }
    function assertLView(value) {
        assertDefined(value, 'LView must be defined');
        assertEqual(isLView(value), true, 'Expecting LView');
    }
    function assertFirstCreatePass(tView, errMessage) {
        assertEqual(tView.firstCreatePass, true, errMessage || 'Should only be called in first create pass.');
    }
    function assertFirstUpdatePass(tView, errMessage) {
        assertEqual(tView.firstUpdatePass, true, errMessage || 'Should only be called in first update pass.');
    }
    /**
     * This is a basic sanity check that an object is probably a directive def. DirectiveDef is
     * an interface, so we can't do a direct instanceof check.
     */
    function assertDirectiveDef(obj) {
        if (obj.type === undefined || obj.selectors == undefined || obj.inputs === undefined) {
            throwError(`Expected a DirectiveDef/ComponentDef and this object does not seem to have the expected shape.`);
        }
    }
    function assertIndexInDeclRange(lView, index) {
        const tView = lView[1];
        assertBetween(HEADER_OFFSET, tView.bindingStartIndex, index);
    }
    function assertIndexInExpandoRange(lView, index) {
        const tView = lView[1];
        assertBetween(tView.expandoStartIndex, lView.length, index);
    }
    function assertBetween(lower, upper, index) {
        if (!(lower <= index && index < upper)) {
            throwError(`Index out of range (expecting ${lower} <= ${index} < ${upper})`);
        }
    }
    function assertProjectionSlots(lView, errMessage) {
        assertDefined(lView[DECLARATION_COMPONENT_VIEW], 'Component views should exist.');
        assertDefined(lView[DECLARATION_COMPONENT_VIEW][T_HOST].projection, errMessage ||
            'Components with projection nodes (<ng-content>) must have projection slots defined.');
    }
    function assertParentView(lView, errMessage) {
        assertDefined(lView, errMessage || 'Component views should always have a parent view (component\'s host view)');
    }
    /**
     * This is a basic sanity check that the `injectorIndex` seems to point to what looks like a
     * NodeInjector data structure.
     *
     * @param lView `LView` which should be checked.
     * @param injectorIndex index into the `LView` where the `NodeInjector` is expected.
     */
    function assertNodeInjector(lView, injectorIndex) {
        assertIndexInExpandoRange(lView, injectorIndex);
        assertIndexInExpandoRange(lView, injectorIndex + 8 /* NodeInjectorOffset.PARENT */);
        assertNumber(lView[injectorIndex + 0], 'injectorIndex should point to a bloom filter');
        assertNumber(lView[injectorIndex + 1], 'injectorIndex should point to a bloom filter');
        assertNumber(lView[injectorIndex + 2], 'injectorIndex should point to a bloom filter');
        assertNumber(lView[injectorIndex + 3], 'injectorIndex should point to a bloom filter');
        assertNumber(lView[injectorIndex + 4], 'injectorIndex should point to a bloom filter');
        assertNumber(lView[injectorIndex + 5], 'injectorIndex should point to a bloom filter');
        assertNumber(lView[injectorIndex + 6], 'injectorIndex should point to a bloom filter');
        assertNumber(lView[injectorIndex + 7], 'injectorIndex should point to a bloom filter');
        assertNumber(lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */], 'injectorIndex should point to parent injector');
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function getFactoryDef(type, throwNotFound) {
        const hasFactoryDef = type.hasOwnProperty(NG_FACTORY_DEF);
        if (!hasFactoryDef && throwNotFound === true && ngDevMode) {
            throw new Error(`Type ${stringify(type)} does not have 'ɵfac' property.`);
        }
        return hasFactoryDef ? type[NG_FACTORY_DEF] : null;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Represents a basic change from a previous to a new value for a single
     * property on a directive instance. Passed as a value in a
     * {@link SimpleChanges} object to the `ngOnChanges` hook.
     *
     * @see `OnChanges`
     *
     * @publicApi
     */
    class SimpleChange {
        constructor(previousValue, currentValue, firstChange) {
            this.previousValue = previousValue;
            this.currentValue = currentValue;
            this.firstChange = firstChange;
        }
        /**
         * Check whether the new value is the first value assigned.
         */
        isFirstChange() {
            return this.firstChange;
        }
    }
    function NgOnChangesFeatureImpl(definition) {
        if (definition.type.prototype.ngOnChanges) {
            definition.setInput = ngOnChangesSetInput;
        }
        return rememberChangeHistoryAndInvokeOnChangesHook;
    }
    /**
     * This is a synthetic lifecycle hook which gets inserted into `TView.preOrderHooks` to simulate
     * `ngOnChanges`.
     *
     * The hook reads the `NgSimpleChangesStore` data from the component instance and if changes are
     * found it invokes `ngOnChanges` on the component instance.
     *
     * @param this Component instance. Because this function gets inserted into `TView.preOrderHooks`,
     *     it is guaranteed to be called with component instance.
     */
    function rememberChangeHistoryAndInvokeOnChangesHook() {
        const simpleChangesStore = getSimpleChangesStore(this);
        const current = simpleChangesStore === null || simpleChangesStore === void 0 ? void 0 : simpleChangesStore.current;
        if (current) {
            const previous = simpleChangesStore.previous;
            if (previous === EMPTY_OBJ) {
                simpleChangesStore.previous = current;
            }
            else {
                // New changes are copied to the previous store, so that we don't lose history for inputs
                // which were not changed this time
                for (let key in current) {
                    previous[key] = current[key];
                }
            }
            simpleChangesStore.current = null;
            this.ngOnChanges(current);
        }
    }
    function ngOnChangesSetInput(instance, value, publicName, privateName) {
        const declaredName = this.declaredInputs[publicName];
        ngDevMode && assertString(declaredName, 'Name of input in ngOnChanges has to be a string');
        const simpleChangesStore = getSimpleChangesStore(instance) ||
            setSimpleChangesStore(instance, { previous: EMPTY_OBJ, current: null });
        const current = simpleChangesStore.current || (simpleChangesStore.current = {});
        const previous = simpleChangesStore.previous;
        const previousChange = previous[declaredName];
        current[declaredName] = new SimpleChange(previousChange && previousChange.currentValue, value, previous === EMPTY_OBJ);
        instance[privateName] = value;
    }
    const SIMPLE_CHANGES_STORE = '__ngSimpleChanges__';
    function getSimpleChangesStore(instance) {
        return instance[SIMPLE_CHANGES_STORE] || null;
    }
    function setSimpleChangesStore(instance, store) {
        return instance[SIMPLE_CHANGES_STORE] = store;
    }
    /**
     * Profiler function which wraps user code executed by the runtime.
     *
     * @param event ProfilerEvent corresponding to the execution context
     * @param instance component instance
     * @param hookOrListener lifecycle hook function or output listener. The value depends on the
     *  execution context
     * @returns
     */
    const profiler = function (event, instance, hookOrListener) {
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const SVG_NAMESPACE = 'svg';
    const MATH_ML_NAMESPACE = 'math';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * For efficiency reasons we often put several different data types (`RNode`, `LView`, `LContainer`)
     * in same location in `LView`. This is because we don't want to pre-allocate space for it
     * because the storage is sparse. This file contains utilities for dealing with such data types.
     *
     * How do we know what is stored at a given location in `LView`.
     * - `Array.isArray(value) === false` => `RNode` (The normal storage value)
     * - `Array.isArray(value) === true` => then the `value[0]` represents the wrapped value.
     *   - `typeof value[TYPE] === 'object'` => `LView`
     *      - This happens when we have a component at a given location
     *   - `typeof value[TYPE] === true` => `LContainer`
     *      - This happens when we have `LContainer` binding at a given location.
     *
     *
     * NOTE: it is assumed that `Array.isArray` and `typeof` operations are very efficient.
     */
    /**
     * Returns `RNode`.
     * @param value wrapped value of `RNode`, `LView`, `LContainer`
     */
    function unwrapRNode(value) {
        while (Array.isArray(value)) {
            value = value[HOST];
        }
        return value;
    }
    /**
     * Retrieve an `RNode` for a given `TNode` and `LView`.
     *
     * This function guarantees in dev mode to retrieve a non-null `RNode`.
     *
     * @param tNode
     * @param lView
     */
    function getNativeByTNode(tNode, lView) {
        ngDevMode && assertTNodeForLView(tNode, lView);
        ngDevMode && assertIndexInRange(lView, tNode.index);
        const node = unwrapRNode(lView[tNode.index]);
        return node;
    }
    // fixme(misko): The return Type should be `TNode|null`
    function getTNode(tView, index) {
        ngDevMode && assertGreaterThan(index, -1, 'wrong index for TNode');
        ngDevMode && assertLessThan(index, tView.data.length, 'wrong index for TNode');
        const tNode = tView.data[index];
        ngDevMode && tNode !== null && assertTNode(tNode);
        return tNode;
    }
    function getComponentLViewByIndex(nodeIndex, hostView) {
        // Could be an LView or an LContainer. If LContainer, unwrap to find LView.
        ngDevMode && assertIndexInRange(hostView, nodeIndex);
        const slotValue = hostView[nodeIndex];
        const lView = isLView(slotValue) ? slotValue : slotValue[HOST];
        return lView;
    }
    /** Checks whether a given view is in creation mode */
    function isCreationMode(view) {
        return (view[FLAGS] & 4 /* LViewFlags.CreationMode */) === 4 /* LViewFlags.CreationMode */;
    }
    /**
     * Returns a boolean for whether the view is attached to the change detection tree.
     *
     * Note: This determines whether a view should be checked, not whether it's inserted
     * into a container. For that, you'll want `viewAttachedToContainer` below.
     */
    function viewAttachedToChangeDetector(view) {
        return (view[FLAGS] & 64 /* LViewFlags.Attached */) === 64 /* LViewFlags.Attached */;
    }
    /**
     * Resets the pre-order hook flags of the view.
     * @param lView the LView on which the flags are reset
     */
    function resetPreOrderHookFlags(lView) {
        lView[PREORDER_HOOK_FLAGS] = 0;
    }
    /**
     * Updates the `TRANSPLANTED_VIEWS_TO_REFRESH` counter on the `LContainer` as well as the parents
     * whose
     *  1. counter goes from 0 to 1, indicating that there is a new child that has a view to refresh
     *  or
     *  2. counter goes from 1 to 0, indicating there are no more descendant views to refresh
     */
    function updateTransplantedViewCount(lContainer, amount) {
        lContainer[TRANSPLANTED_VIEWS_TO_REFRESH] += amount;
        let viewOrContainer = lContainer;
        let parent = lContainer[PARENT];
        while (parent !== null &&
            ((amount === 1 && viewOrContainer[TRANSPLANTED_VIEWS_TO_REFRESH] === 1) ||
                (amount === -1 && viewOrContainer[TRANSPLANTED_VIEWS_TO_REFRESH] === 0))) {
            parent[TRANSPLANTED_VIEWS_TO_REFRESH] += amount;
            viewOrContainer = parent;
            parent = parent[PARENT];
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const instructionState = {
        lFrame: createLFrame(null),
        bindingsEnabled: true,
    };
    /**
     * In this mode, any changes in bindings will throw an ExpressionChangedAfterChecked error.
     *
     * Necessary to support ChangeDetectorRef.checkNoChanges().
     *
     * The `checkNoChanges` function is invoked only in ngDevMode=true and verifies that no unintended
     * changes exist in the change detector or its children.
     */
    let _isInCheckNoChangesMode = false;
    /**
     * Return the current `LView`.
     */
    function getLView() {
        return instructionState.lFrame.lView;
    }
    /**
     * Return the current `TView`.
     */
    function getTView() {
        return instructionState.lFrame.tView;
    }
    function getCurrentTNode() {
        let currentTNode = getCurrentTNodePlaceholderOk();
        while (currentTNode !== null && currentTNode.type === 64 /* TNodeType.Placeholder */) {
            currentTNode = currentTNode.parent;
        }
        return currentTNode;
    }
    function getCurrentTNodePlaceholderOk() {
        return instructionState.lFrame.currentTNode;
    }
    function getCurrentParentTNode() {
        const lFrame = instructionState.lFrame;
        const currentTNode = lFrame.currentTNode;
        return lFrame.isParent ? currentTNode : currentTNode.parent;
    }
    function setCurrentTNode(tNode, isParent) {
        ngDevMode && tNode && assertTNodeForTView(tNode, instructionState.lFrame.tView);
        const lFrame = instructionState.lFrame;
        lFrame.currentTNode = tNode;
        lFrame.isParent = isParent;
    }
    function isCurrentTNodeParent() {
        return instructionState.lFrame.isParent;
    }
    function isInCheckNoChangesMode() {
        !ngDevMode && throwError('Must never be called in production mode');
        return _isInCheckNoChangesMode;
    }
    function setIsInCheckNoChangesMode(mode) {
        !ngDevMode && throwError('Must never be called in production mode');
        _isInCheckNoChangesMode = mode;
    }
    function setBindingIndex(value) {
        return instructionState.lFrame.bindingIndex = value;
    }
    function isInI18nBlock() {
        return instructionState.lFrame.inI18n;
    }
    /**
     * Set a new binding root index so that host template functions can execute.
     *
     * Bindings inside the host template are 0 index. But because we don't know ahead of time
     * how many host bindings we have we can't pre-compute them. For this reason they are all
     * 0 index and we just shift the root so that they match next available location in the LView.
     *
     * @param bindingRootIndex Root index for `hostBindings`
     * @param currentDirectiveIndex `TData[currentDirectiveIndex]` will point to the current directive
     *        whose `hostBindings` are being processed.
     */
    function setBindingRootForHostBindings(bindingRootIndex, currentDirectiveIndex) {
        const lFrame = instructionState.lFrame;
        lFrame.bindingIndex = lFrame.bindingRootIndex = bindingRootIndex;
        setCurrentDirectiveIndex(currentDirectiveIndex);
    }
    /**
     * When host binding is executing this points to the directive index.
     * `TView.data[getCurrentDirectiveIndex()]` is `DirectiveDef`
     * `LView[getCurrentDirectiveIndex()]` is directive instance.
     */
    function getCurrentDirectiveIndex() {
        return instructionState.lFrame.currentDirectiveIndex;
    }
    /**
     * Sets an index of a directive whose `hostBindings` are being processed.
     *
     * @param currentDirectiveIndex `TData` index where current directive instance can be found.
     */
    function setCurrentDirectiveIndex(currentDirectiveIndex) {
        instructionState.lFrame.currentDirectiveIndex = currentDirectiveIndex;
    }
    function setCurrentQueryIndex(value) {
        instructionState.lFrame.currentQueryIndex = value;
    }
    /**
     * Returns a `TNode` of the location where the current `LView` is declared at.
     *
     * @param lView an `LView` that we want to find parent `TNode` for.
     */
    function getDeclarationTNode(lView) {
        const tView = lView[TVIEW];
        // Return the declaration parent for embedded views
        if (tView.type === 2 /* TViewType.Embedded */) {
            ngDevMode && assertDefined(tView.declTNode, 'Embedded TNodes should have declaration parents.');
            return tView.declTNode;
        }
        // Components don't have `TView.declTNode` because each instance of component could be
        // inserted in different location, hence `TView.declTNode` is meaningless.
        // Falling back to `T_HOST` in case we cross component boundary.
        if (tView.type === 1 /* TViewType.Component */) {
            return lView[T_HOST];
        }
        // Remaining TNode type is `TViewType.Root` which doesn't have a parent TNode.
        return null;
    }
    /**
     * This is a light weight version of the `enterView` which is needed by the DI system.
     *
     * @param lView `LView` location of the DI context.
     * @param tNode `TNode` for DI context
     * @param flags DI context flags. if `SkipSelf` flag is set than we walk up the declaration
     *     tree from `tNode`  until we find parent declared `TElementNode`.
     * @returns `true` if we have successfully entered DI associated with `tNode` (or with declared
     *     `TNode` if `flags` has  `SkipSelf`). Failing to enter DI implies that no associated
     *     `NodeInjector` can be found and we should instead use `ModuleInjector`.
     *     - If `true` than this call must be fallowed by `leaveDI`
     *     - If `false` than this call failed and we should NOT call `leaveDI`
     */
    function enterDI(lView, tNode, flags) {
        ngDevMode && assertLViewOrUndefined(lView);
        if (flags & InjectFlags.SkipSelf) {
            ngDevMode && assertTNodeForTView(tNode, lView[TVIEW]);
            let parentTNode = tNode;
            let parentLView = lView;
            while (true) {
                ngDevMode && assertDefined(parentTNode, 'Parent TNode should be defined');
                parentTNode = parentTNode.parent;
                if (parentTNode === null && !(flags & InjectFlags.Host)) {
                    parentTNode = getDeclarationTNode(parentLView);
                    if (parentTNode === null)
                        break;
                    // In this case, a parent exists and is definitely an element. So it will definitely
                    // have an existing lView as the declaration view, which is why we can assume it's defined.
                    ngDevMode && assertDefined(parentLView, 'Parent LView should be defined');
                    parentLView = parentLView[DECLARATION_VIEW];
                    // In Ivy there are Comment nodes that correspond to ngIf and NgFor embedded directives
                    // We want to skip those and look only at Elements and ElementContainers to ensure
                    // we're looking at true parent nodes, and not content or other types.
                    if (parentTNode.type & (2 /* TNodeType.Element */ | 8 /* TNodeType.ElementContainer */)) {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            if (parentTNode === null) {
                // If we failed to find a parent TNode this means that we should use module injector.
                return false;
            }
            else {
                tNode = parentTNode;
                lView = parentLView;
            }
        }
        ngDevMode && assertTNodeForLView(tNode, lView);
        const lFrame = instructionState.lFrame = allocLFrame();
        lFrame.currentTNode = tNode;
        lFrame.lView = lView;
        return true;
    }
    /**
     * Swap the current lView with a new lView.
     *
     * For performance reasons we store the lView in the top level of the module.
     * This way we minimize the number of properties to read. Whenever a new view
     * is entered we have to store the lView for later, and when the view is
     * exited the state has to be restored
     *
     * @param newView New lView to become active
     * @returns the previously active lView;
     */
    function enterView(newView) {
        ngDevMode && assertNotEqual(newView[0], newView[1], '????');
        ngDevMode && assertLViewOrUndefined(newView);
        const newLFrame = allocLFrame();
        if (ngDevMode) {
            assertEqual(newLFrame.isParent, true, 'Expected clean LFrame');
            assertEqual(newLFrame.lView, null, 'Expected clean LFrame');
            assertEqual(newLFrame.tView, null, 'Expected clean LFrame');
            assertEqual(newLFrame.selectedIndex, -1, 'Expected clean LFrame');
            assertEqual(newLFrame.elementDepthCount, 0, 'Expected clean LFrame');
            assertEqual(newLFrame.currentDirectiveIndex, -1, 'Expected clean LFrame');
            assertEqual(newLFrame.currentNamespace, null, 'Expected clean LFrame');
            assertEqual(newLFrame.bindingRootIndex, -1, 'Expected clean LFrame');
            assertEqual(newLFrame.currentQueryIndex, 0, 'Expected clean LFrame');
        }
        const tView = newView[TVIEW];
        instructionState.lFrame = newLFrame;
        ngDevMode && tView.firstChild && assertTNodeForTView(tView.firstChild, tView);
        newLFrame.currentTNode = tView.firstChild;
        newLFrame.lView = newView;
        newLFrame.tView = tView;
        newLFrame.contextLView = newView;
        newLFrame.bindingIndex = tView.bindingStartIndex;
        newLFrame.inI18n = false;
    }
    /**
     * Allocates next free LFrame. This function tries to reuse the `LFrame`s to lower memory pressure.
     */
    function allocLFrame() {
        const currentLFrame = instructionState.lFrame;
        const childLFrame = currentLFrame === null ? null : currentLFrame.child;
        const newLFrame = childLFrame === null ? createLFrame(currentLFrame) : childLFrame;
        return newLFrame;
    }
    function createLFrame(parent) {
        const lFrame = {
            currentTNode: null,
            isParent: true,
            lView: null,
            tView: null,
            selectedIndex: -1,
            contextLView: null,
            elementDepthCount: 0,
            currentNamespace: null,
            currentDirectiveIndex: -1,
            bindingRootIndex: -1,
            bindingIndex: -1,
            currentQueryIndex: 0,
            parent: parent,
            child: null,
            inI18n: false,
        };
        parent !== null && (parent.child = lFrame); // link the new LFrame for reuse.
        return lFrame;
    }
    /**
     * A lightweight version of leave which is used with DI.
     *
     * This function only resets `currentTNode` and `LView` as those are the only properties
     * used with DI (`enterDI()`).
     *
     * NOTE: This function is reexported as `leaveDI`. However `leaveDI` has return type of `void` where
     * as `leaveViewLight` has `LFrame`. This is so that `leaveViewLight` can be used in `leaveView`.
     */
    function leaveViewLight() {
        const oldLFrame = instructionState.lFrame;
        instructionState.lFrame = oldLFrame.parent;
        oldLFrame.currentTNode = null;
        oldLFrame.lView = null;
        return oldLFrame;
    }
    /**
     * This is a lightweight version of the `leaveView` which is needed by the DI system.
     *
     * NOTE: this function is an alias so that we can change the type of the function to have `void`
     * return type.
     */
    const leaveDI = leaveViewLight;
    /**
     * Leave the current `LView`
     *
     * This pops the `LFrame` with the associated `LView` from the stack.
     *
     * IMPORTANT: We must zero out the `LFrame` values here otherwise they will be retained. This is
     * because for performance reasons we don't release `LFrame` but rather keep it for next use.
     */
    function leaveView() {
        const oldLFrame = leaveViewLight();
        oldLFrame.isParent = true;
        oldLFrame.tView = null;
        oldLFrame.selectedIndex = -1;
        oldLFrame.contextLView = null;
        oldLFrame.elementDepthCount = 0;
        oldLFrame.currentDirectiveIndex = -1;
        oldLFrame.currentNamespace = null;
        oldLFrame.bindingRootIndex = -1;
        oldLFrame.bindingIndex = -1;
        oldLFrame.currentQueryIndex = 0;
    }
    /**
     * Gets the currently selected element index.
     *
     * Used with {@link property} instruction (and more in the future) to identify the index in the
     * current `LView` to act on.
     */
    function getSelectedIndex() {
        return instructionState.lFrame.selectedIndex;
    }
    /**
     * Sets the most recent index passed to {@link select}
     *
     * Used with {@link property} instruction (and more in the future) to identify the index in the
     * current `LView` to act on.
     *
     * (Note that if an "exit function" was set earlier (via `setElementExitFn()`) then that will be
     * run if and when the provided `index` value is different from the current selected index value.)
     */
    function setSelectedIndex(index) {
        ngDevMode && index !== -1 &&
            assertGreaterThanOrEqual(index, HEADER_OFFSET, 'Index must be past HEADER_OFFSET (or -1).');
        ngDevMode &&
            assertLessThan(index, instructionState.lFrame.lView.length, 'Can\'t set index passed end of LView');
        instructionState.lFrame.selectedIndex = index;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Adds all directive lifecycle hooks from the given `DirectiveDef` to the given `TView`.
     *
     * Must be run *only* on the first template pass.
     *
     * Sets up the pre-order hooks on the provided `tView`,
     * see {@link HookData} for details about the data structure.
     *
     * @param directiveIndex The index of the directive in LView
     * @param directiveDef The definition containing the hooks to setup in tView
     * @param tView The current TView
     */
    function registerPreOrderHooks(directiveIndex, directiveDef, tView) {
        ngDevMode && assertFirstCreatePass(tView);
        const { ngOnChanges, ngOnInit, ngDoCheck } = directiveDef.type.prototype;
        if (ngOnChanges) {
            const wrappedOnChanges = NgOnChangesFeatureImpl(directiveDef);
            (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, wrappedOnChanges);
            (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = []))
                .push(directiveIndex, wrappedOnChanges);
        }
        if (ngOnInit) {
            (tView.preOrderHooks || (tView.preOrderHooks = [])).push(0 - directiveIndex, ngOnInit);
        }
        if (ngDoCheck) {
            (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, ngDoCheck);
            (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, ngDoCheck);
        }
    }
    /**
     *
     * Loops through the directives on the provided `tNode` and queues hooks to be
     * run that are not initialization hooks.
     *
     * Should be executed during `elementEnd()` and similar to
     * preserve hook execution order. Content, view, and destroy hooks for projected
     * components and directives must be called *before* their hosts.
     *
     * Sets up the content, view, and destroy hooks on the provided `tView`,
     * see {@link HookData} for details about the data structure.
     *
     * NOTE: This does not set up `onChanges`, `onInit` or `doCheck`, those are set up
     * separately at `elementStart`.
     *
     * @param tView The current TView
     * @param tNode The TNode whose directives are to be searched for hooks to queue
     */
    function registerPostOrderHooks(tView, tNode) {
        ngDevMode && assertFirstCreatePass(tView);
        // It's necessary to loop through the directives at elementEnd() (rather than processing in
        // directiveCreate) so we can preserve the current hook order. Content, view, and destroy
        // hooks for projected components and directives must be called *before* their hosts.
        for (let i = tNode.directiveStart, end = tNode.directiveEnd; i < end; i++) {
            const directiveDef = tView.data[i];
            ngDevMode && assertDefined(directiveDef, 'Expecting DirectiveDef');
            const lifecycleHooks = directiveDef.type.prototype;
            const { ngAfterContentInit, ngAfterContentChecked, ngAfterViewInit, ngAfterViewChecked, ngOnDestroy } = lifecycleHooks;
            if (ngAfterContentInit) {
                (tView.contentHooks || (tView.contentHooks = [])).push(-i, ngAfterContentInit);
            }
            if (ngAfterContentChecked) {
                (tView.contentHooks || (tView.contentHooks = [])).push(i, ngAfterContentChecked);
                (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, ngAfterContentChecked);
            }
            if (ngAfterViewInit) {
                (tView.viewHooks || (tView.viewHooks = [])).push(-i, ngAfterViewInit);
            }
            if (ngAfterViewChecked) {
                (tView.viewHooks || (tView.viewHooks = [])).push(i, ngAfterViewChecked);
                (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, ngAfterViewChecked);
            }
            if (ngOnDestroy != null) {
                (tView.destroyHooks || (tView.destroyHooks = [])).push(i, ngOnDestroy);
            }
        }
    }
    /**
     * Executing hooks requires complex logic as we need to deal with 2 constraints.
     *
     * 1. Init hooks (ngOnInit, ngAfterContentInit, ngAfterViewInit) must all be executed once and only
     * once, across many change detection cycles. This must be true even if some hooks throw, or if
     * some recursively trigger a change detection cycle.
     * To solve that, it is required to track the state of the execution of these init hooks.
     * This is done by storing and maintaining flags in the view: the {@link InitPhaseState},
     * and the index within that phase. They can be seen as a cursor in the following structure:
     * [[onInit1, onInit2], [afterContentInit1], [afterViewInit1, afterViewInit2, afterViewInit3]]
     * They are are stored as flags in LView[FLAGS].
     *
     * 2. Pre-order hooks can be executed in batches, because of the select instruction.
     * To be able to pause and resume their execution, we also need some state about the hook's array
     * that is being processed:
     * - the index of the next hook to be executed
     * - the number of init hooks already found in the processed part of the  array
     * They are are stored as flags in LView[PREORDER_HOOK_FLAGS].
     */
    /**
     * Executes pre-order check hooks ( OnChanges, DoChanges) given a view where all the init hooks were
     * executed once. This is a light version of executeInitAndCheckPreOrderHooks where we can skip read
     * / write of the init-hooks related flags.
     * @param lView The LView where hooks are defined
     * @param hooks Hooks to be run
     * @param nodeIndex 3 cases depending on the value:
     * - undefined: all hooks from the array should be executed (post-order case)
     * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
     * flushing the remaining hooks)
     * - number: execute hooks only from the saved index until that node index exclusive (pre-order
     * case, when executing select(number))
     */
    function executeCheckHooks(lView, hooks, nodeIndex) {
        callHooks(lView, hooks, 3 /* InitPhaseState.InitPhaseCompleted */, nodeIndex);
    }
    /**
     * Executes post-order init and check hooks (one of AfterContentInit, AfterContentChecked,
     * AfterViewInit, AfterViewChecked) given a view where there are pending init hooks to be executed.
     * @param lView The LView where hooks are defined
     * @param hooks Hooks to be run
     * @param initPhase A phase for which hooks should be run
     * @param nodeIndex 3 cases depending on the value:
     * - undefined: all hooks from the array should be executed (post-order case)
     * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
     * flushing the remaining hooks)
     * - number: execute hooks only from the saved index until that node index exclusive (pre-order
     * case, when executing select(number))
     */
    function executeInitAndCheckHooks(lView, hooks, initPhase, nodeIndex) {
        ngDevMode &&
            assertNotEqual(initPhase, 3 /* InitPhaseState.InitPhaseCompleted */, 'Init pre-order hooks should not be called more than once');
        if ((lView[FLAGS] & 3 /* LViewFlags.InitPhaseStateMask */) === initPhase) {
            callHooks(lView, hooks, initPhase, nodeIndex);
        }
    }
    function incrementInitPhaseFlags(lView, initPhase) {
        ngDevMode &&
            assertNotEqual(initPhase, 3 /* InitPhaseState.InitPhaseCompleted */, 'Init hooks phase should not be incremented after all init hooks have been run.');
        let flags = lView[FLAGS];
        if ((flags & 3 /* LViewFlags.InitPhaseStateMask */) === initPhase) {
            flags &= 2047 /* LViewFlags.IndexWithinInitPhaseReset */;
            flags += 1 /* LViewFlags.InitPhaseStateIncrementer */;
            lView[FLAGS] = flags;
        }
    }
    /**
     * Calls lifecycle hooks with their contexts, skipping init hooks if it's not
     * the first LView pass
     *
     * @param currentView The current view
     * @param arr The array in which the hooks are found
     * @param initPhaseState the current state of the init phase
     * @param currentNodeIndex 3 cases depending on the value:
     * - undefined: all hooks from the array should be executed (post-order case)
     * - null: execute hooks only from the saved index until the end of the array (pre-order case, when
     * flushing the remaining hooks)
     * - number: execute hooks only from the saved index until that node index exclusive (pre-order
     * case, when executing select(number))
     */
    function callHooks(currentView, arr, initPhase, currentNodeIndex) {
        ngDevMode &&
            assertEqual(isInCheckNoChangesMode(), false, 'Hooks should never be run when in check no changes mode.');
        const startIndex = currentNodeIndex !== undefined ?
            (currentView[PREORDER_HOOK_FLAGS] & 65535 /* PreOrderHookFlags.IndexOfTheNextPreOrderHookMaskMask */) :
            0;
        const nodeIndexLimit = currentNodeIndex != null ? currentNodeIndex : -1;
        const max = arr.length - 1; // Stop the loop at length - 1, because we look for the hook at i + 1
        let lastNodeIndexFound = 0;
        for (let i = startIndex; i < max; i++) {
            const hook = arr[i + 1];
            if (typeof hook === 'number') {
                lastNodeIndexFound = arr[i];
                if (currentNodeIndex != null && lastNodeIndexFound >= currentNodeIndex) {
                    break;
                }
            }
            else {
                const isInitHook = arr[i] < 0;
                if (isInitHook)
                    currentView[PREORDER_HOOK_FLAGS] += 65536 /* PreOrderHookFlags.NumberOfInitHooksCalledIncrementer */;
                if (lastNodeIndexFound < nodeIndexLimit || nodeIndexLimit == -1) {
                    callHook(currentView, initPhase, arr, i);
                    currentView[PREORDER_HOOK_FLAGS] =
                        (currentView[PREORDER_HOOK_FLAGS] & 4294901760 /* PreOrderHookFlags.NumberOfInitHooksCalledMask */) + i +
                            2;
                }
                i++;
            }
        }
    }
    /**
     * Execute one hook against the current `LView`.
     *
     * @param currentView The current view
     * @param initPhaseState the current state of the init phase
     * @param arr The array in which the hooks are found
     * @param i The current index within the hook data array
     */
    function callHook(currentView, initPhase, arr, i) {
        const isInitHook = arr[i] < 0;
        const hook = arr[i + 1];
        const directiveIndex = isInitHook ? -arr[i] : arr[i];
        const directive = currentView[directiveIndex];
        if (isInitHook) {
            const indexWithintInitPhase = currentView[FLAGS] >> 11 /* LViewFlags.IndexWithinInitPhaseShift */;
            // The init phase state must be always checked here as it may have been recursively updated.
            if (indexWithintInitPhase <
                (currentView[PREORDER_HOOK_FLAGS] >> 16 /* PreOrderHookFlags.NumberOfInitHooksCalledShift */) &&
                (currentView[FLAGS] & 3 /* LViewFlags.InitPhaseStateMask */) === initPhase) {
                currentView[FLAGS] += 2048 /* LViewFlags.IndexWithinInitPhaseIncrementer */;
                try {
                    hook.call(directive);
                }
                finally {
                }
            }
        }
        else {
            try {
                hook.call(directive);
            }
            finally {
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
    const NO_PARENT_INJECTOR = -1;
    /**
     * Each injector is saved in 9 contiguous slots in `LView` and 9 contiguous slots in
     * `TView.data`. This allows us to store information about the current node's tokens (which
     * can be shared in `TView`) as well as the tokens of its ancestor nodes (which cannot be
     * shared, so they live in `LView`).
     *
     * Each of these slots (aside from the last slot) contains a bloom filter. This bloom filter
     * determines whether a directive is available on the associated node or not. This prevents us
     * from searching the directives array at this level unless it's probable the directive is in it.
     *
     * See: https://en.wikipedia.org/wiki/Bloom_filter for more about bloom filters.
     *
     * Because all injectors have been flattened into `LView` and `TViewData`, they cannot typed
     * using interfaces as they were previously. The start index of each `LInjector` and `TInjector`
     * will differ based on where it is flattened into the main array, so it's not possible to know
     * the indices ahead of time and save their types here. The interfaces are still included here
     * for documentation purposes.
     *
     * export interface LInjector extends Array<any> {
     *
     *    // Cumulative bloom for directive IDs 0-31  (IDs are % BLOOM_SIZE)
     *    [0]: number;
     *
     *    // Cumulative bloom for directive IDs 32-63
     *    [1]: number;
     *
     *    // Cumulative bloom for directive IDs 64-95
     *    [2]: number;
     *
     *    // Cumulative bloom for directive IDs 96-127
     *    [3]: number;
     *
     *    // Cumulative bloom for directive IDs 128-159
     *    [4]: number;
     *
     *    // Cumulative bloom for directive IDs 160 - 191
     *    [5]: number;
     *
     *    // Cumulative bloom for directive IDs 192 - 223
     *    [6]: number;
     *
     *    // Cumulative bloom for directive IDs 224 - 255
     *    [7]: number;
     *
     *    // We need to store a reference to the injector's parent so DI can keep looking up
     *    // the injector tree until it finds the dependency it's looking for.
     *    [PARENT_INJECTOR]: number;
     * }
     *
     * export interface TInjector extends Array<any> {
     *
     *    // Shared node bloom for directive IDs 0-31  (IDs are % BLOOM_SIZE)
     *    [0]: number;
     *
     *    // Shared node bloom for directive IDs 32-63
     *    [1]: number;
     *
     *    // Shared node bloom for directive IDs 64-95
     *    [2]: number;
     *
     *    // Shared node bloom for directive IDs 96-127
     *    [3]: number;
     *
     *    // Shared node bloom for directive IDs 128-159
     *    [4]: number;
     *
     *    // Shared node bloom for directive IDs 160 - 191
     *    [5]: number;
     *
     *    // Shared node bloom for directive IDs 192 - 223
     *    [6]: number;
     *
     *    // Shared node bloom for directive IDs 224 - 255
     *    [7]: number;
     *
     *    // Necessary to find directive indices for a particular node.
     *    [TNODE]: TElementNode|TElementContainerNode|TContainerNode;
     *  }
     */
    /**
     * Factory for creating instances of injectors in the NodeInjector.
     *
     * This factory is complicated by the fact that it can resolve `multi` factories as well.
     *
     * NOTE: Some of the fields are optional which means that this class has two hidden classes.
     * - One without `multi` support (most common)
     * - One with `multi` values, (rare).
     *
     * Since VMs can cache up to 4 inline hidden classes this is OK.
     *
     * - Single factory: Only `resolving` and `factory` is defined.
     * - `providers` factory: `componentProviders` is a number and `index = -1`.
     * - `viewProviders` factory: `componentProviders` is a number and `index` points to `providers`.
     */
    class NodeInjectorFactory {
        constructor(
        /**
         * Factory to invoke in order to create a new instance.
         */
        factory,
        /**
         * Set to `true` if the token is declared in `viewProviders` (or if it is component).
         */
        isViewProvider, injectImplementation) {
            this.factory = factory;
            /**
             * Marker set to true during factory invocation to see if we get into recursive loop.
             * Recursive loop causes an error to be displayed.
             */
            this.resolving = false;
            ngDevMode && assertDefined(factory, 'Factory not specified');
            ngDevMode && assertEqual(typeof factory, 'function', 'Expected factory function.');
            this.canSeeViewProviders = isViewProvider;
            this.injectImpl = injectImplementation;
        }
    }
    function isFactory(obj) {
        return obj instanceof NodeInjectorFactory;
    }

    /**
     * Converts `TNodeType` into human readable text.
     * Make sure this matches with `TNodeType`
     */
    function toTNodeTypeAsString(tNodeType) {
        let text = '';
        (tNodeType & 1 /* TNodeType.Text */) && (text += '|Text');
        (tNodeType & 2 /* TNodeType.Element */) && (text += '|Element');
        (tNodeType & 4 /* TNodeType.Container */) && (text += '|Container');
        (tNodeType & 8 /* TNodeType.ElementContainer */) && (text += '|ElementContainer');
        (tNodeType & 16 /* TNodeType.Projection */) && (text += '|Projection');
        (tNodeType & 32 /* TNodeType.Icu */) && (text += '|IcuContainer');
        (tNodeType & 64 /* TNodeType.Placeholder */) && (text += '|Placeholder');
        return text.length > 0 ? text.substring(1) : text;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function assertTNodeType(tNode, expectedTypes, message) {
        assertDefined(tNode, 'should be called with a TNode');
        if ((tNode.type & expectedTypes) === 0) {
            throwError(message ||
                `Expected [${toTNodeTypeAsString(expectedTypes)}] but got ${toTNodeTypeAsString(tNode.type)}.`);
        }
    }
    function assertPureTNodeType(type) {
        if (!(type === 2 /* TNodeType.Element */ || //
            type === 1 /* TNodeType.Text */ || //
            type === 4 /* TNodeType.Container */ || //
            type === 8 /* TNodeType.ElementContainer */ || //
            type === 32 /* TNodeType.Icu */ || //
            type === 16 /* TNodeType.Projection */ || //
            type === 64 /* TNodeType.Placeholder */)) {
            throwError(`Expected TNodeType to have only a single type selected, but got ${toTNodeTypeAsString(type)}.`);
        }
    }

    /**
     * Assigns all attribute values to the provided element via the inferred renderer.
     *
     * This function accepts two forms of attribute entries:
     *
     * default: (key, value):
     *  attrs = [key1, value1, key2, value2]
     *
     * namespaced: (NAMESPACE_MARKER, uri, name, value)
     *  attrs = [NAMESPACE_MARKER, uri, name, value, NAMESPACE_MARKER, uri, name, value]
     *
     * The `attrs` array can contain a mix of both the default and namespaced entries.
     * The "default" values are set without a marker, but if the function comes across
     * a marker value then it will attempt to set a namespaced value. If the marker is
     * not of a namespaced value then the function will quit and return the index value
     * where it stopped during the iteration of the attrs array.
     *
     * See [AttributeMarker] to understand what the namespace marker value is.
     *
     * Note that this instruction does not support assigning style and class values to
     * an element. See `elementStart` and `elementHostAttrs` to learn how styling values
     * are applied to an element.
     * @param renderer The renderer to be used
     * @param native The element that the attributes will be assigned to
     * @param attrs The attribute array of values that will be assigned to the element
     * @returns the index value that was last accessed in the attributes array
     */
    function setUpAttributes(renderer, native, attrs) {
        let i = 0;
        while (i < attrs.length) {
            const value = attrs[i];
            if (typeof value === 'number') {
                // only namespaces are supported. Other value types (such as style/class
                // entries) are not supported in this function.
                if (value !== 0 /* AttributeMarker.NamespaceURI */) {
                    break;
                }
                // we just landed on the marker value ... therefore
                // we should skip to the next entry
                i++;
                const namespaceURI = attrs[i++];
                const attrName = attrs[i++];
                const attrVal = attrs[i++];
                ngDevMode && ngDevMode.rendererSetAttribute++;
                renderer.setAttribute(native, attrName, attrVal, namespaceURI);
            }
            else {
                // attrName is string;
                const attrName = value;
                const attrVal = attrs[++i];
                // Standard attributes
                ngDevMode && ngDevMode.rendererSetAttribute++;
                if (isAnimationProp(attrName)) {
                    renderer.setProperty(native, attrName, attrVal);
                }
                else {
                    renderer.setAttribute(native, attrName, attrVal);
                }
                i++;
            }
        }
        // another piece of code may iterate over the same attributes array. Therefore
        // it may be helpful to return the exact spot where the attributes array exited
        // whether by running into an unsupported marker or if all the static values were
        // iterated over.
        return i;
    }
    /**
     * Test whether the given value is a marker that indicates that the following
     * attribute values in a `TAttributes` array are only the names of attributes,
     * and not name-value pairs.
     * @param marker The attribute marker to test.
     * @returns true if the marker is a "name-only" marker (e.g. `Bindings`, `Template` or `I18n`).
     */
    function isNameOnlyAttributeMarker(marker) {
        return marker === 3 /* AttributeMarker.Bindings */ || marker === 4 /* AttributeMarker.Template */ ||
            marker === 6 /* AttributeMarker.I18n */;
    }
    function isAnimationProp(name) {
        // Perf note: accessing charCodeAt to check for the first character of a string is faster as
        // compared to accessing a character at index 0 (ex. name[0]). The main reason for this is that
        // charCodeAt doesn't allocate memory to return a substring.
        return name.charCodeAt(0) === 64 /* CharCode.AT_SIGN */;
    }
    /**
     * Merges `src` `TAttributes` into `dst` `TAttributes` removing any duplicates in the process.
     *
     * This merge function keeps the order of attrs same.
     *
     * @param dst Location of where the merged `TAttributes` should end up.
     * @param src `TAttributes` which should be appended to `dst`
     */
    function mergeHostAttrs(dst, src) {
        if (src === null || src.length === 0) ;
        else if (dst === null || dst.length === 0) {
            // We have source, but dst is empty, just make a copy.
            dst = src.slice();
        }
        else {
            let srcMarker = -1 /* AttributeMarker.ImplicitAttributes */;
            for (let i = 0; i < src.length; i++) {
                const item = src[i];
                if (typeof item === 'number') {
                    srcMarker = item;
                }
                else {
                    if (srcMarker === 0 /* AttributeMarker.NamespaceURI */) ;
                    else if (srcMarker === -1 /* AttributeMarker.ImplicitAttributes */ ||
                        srcMarker === 2 /* AttributeMarker.Styles */) {
                        // Case where we have to consume `key1` and `value` only.
                        mergeHostAttribute(dst, srcMarker, item, null, src[++i]);
                    }
                    else {
                        // Case where we have to consume `key1` only.
                        mergeHostAttribute(dst, srcMarker, item, null, null);
                    }
                }
            }
        }
        return dst;
    }
    /**
     * Append `key`/`value` to existing `TAttributes` taking region marker and duplicates into account.
     *
     * @param dst `TAttributes` to append to.
     * @param marker Region where the `key`/`value` should be added.
     * @param key1 Key to add to `TAttributes`
     * @param key2 Key to add to `TAttributes` (in case of `AttributeMarker.NamespaceURI`)
     * @param value Value to add or to overwrite to `TAttributes` Only used if `marker` is not Class.
     */
    function mergeHostAttribute(dst, marker, key1, key2, value) {
        let i = 0;
        // Assume that new markers will be inserted at the end.
        let markerInsertPosition = dst.length;
        // scan until correct type.
        if (marker === -1 /* AttributeMarker.ImplicitAttributes */) {
            markerInsertPosition = -1;
        }
        else {
            while (i < dst.length) {
                const dstValue = dst[i++];
                if (typeof dstValue === 'number') {
                    if (dstValue === marker) {
                        markerInsertPosition = -1;
                        break;
                    }
                    else if (dstValue > marker) {
                        // We need to save this as we want the markers to be inserted in specific order.
                        markerInsertPosition = i - 1;
                        break;
                    }
                }
            }
        }
        // search until you find place of insertion
        while (i < dst.length) {
            const item = dst[i];
            if (typeof item === 'number') {
                // since `i` started as the index after the marker, we did not find it if we are at the next
                // marker
                break;
            }
            else if (item === key1) {
                // We already have same token
                if (key2 === null) {
                    if (value !== null) {
                        dst[i + 1] = value;
                    }
                    return;
                }
                else if (key2 === dst[i + 1]) {
                    dst[i + 2] = value;
                    return;
                }
            }
            // Increment counter.
            i++;
            if (key2 !== null)
                i++;
            if (value !== null)
                i++;
        }
        // insert at location.
        if (markerInsertPosition !== -1) {
            dst.splice(markerInsertPosition, 0, marker);
            i = markerInsertPosition + 1;
        }
        dst.splice(i++, 0, key1);
        if (key2 !== null) {
            dst.splice(i++, 0, key2);
        }
        if (value !== null) {
            dst.splice(i++, 0, value);
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /// Parent Injector Utils ///////////////////////////////////////////////////////////////
    function hasParentInjector(parentLocation) {
        return parentLocation !== NO_PARENT_INJECTOR;
    }
    function getParentInjectorIndex(parentLocation) {
        ngDevMode && assertNumber(parentLocation, 'Number expected');
        ngDevMode && assertNotEqual(parentLocation, -1, 'Not a valid state.');
        const parentInjectorIndex = parentLocation & 32767 /* RelativeInjectorLocationFlags.InjectorIndexMask */;
        ngDevMode &&
            assertGreaterThan(parentInjectorIndex, HEADER_OFFSET, 'Parent injector must be pointing past HEADER_OFFSET.');
        return parentLocation & 32767 /* RelativeInjectorLocationFlags.InjectorIndexMask */;
    }
    function getParentInjectorViewOffset(parentLocation) {
        return parentLocation >> 16 /* RelativeInjectorLocationFlags.ViewOffsetShift */;
    }
    /**
     * Unwraps a parent injector location number to find the view offset from the current injector,
     * then walks up the declaration view tree until the view is found that contains the parent
     * injector.
     *
     * @param location The location of the parent injector, which contains the view offset
     * @param startView The LView instance from which to start walking up the view tree
     * @returns The LView instance that contains the parent injector
     */
    function getParentInjectorView(location, startView) {
        let viewOffset = getParentInjectorViewOffset(location);
        let parentView = startView;
        // For most cases, the parent injector can be found on the host node (e.g. for component
        // or container), but we must keep the loop here to support the rarer case of deeply nested
        // <ng-template> tags or inline views, where the parent injector might live many views
        // above the child injector.
        while (viewOffset > 0) {
            parentView = parentView[DECLARATION_VIEW];
            viewOffset--;
        }
        return parentView;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Defines if the call to `inject` should include `viewProviders` in its resolution.
     *
     * This is set to true when we try to instantiate a component. This value is reset in
     * `getNodeInjectable` to a value which matches the declaration location of the token about to be
     * instantiated. This is done so that if we are injecting a token which was declared outside of
     * `viewProviders` we don't accidentally pull `viewProviders` in.
     *
     * Example:
     *
     * ```
     * @Injectable()
     * class MyService {
     *   constructor(public value: String) {}
     * }
     *
     * @Component({
     *   providers: [
     *     MyService,
     *     {provide: String, value: 'providers' }
     *   ]
     *   viewProviders: [
     *     {provide: String, value: 'viewProviders'}
     *   ]
     * })
     * class MyComponent {
     *   constructor(myService: MyService, value: String) {
     *     // We expect that Component can see into `viewProviders`.
     *     expect(value).toEqual('viewProviders');
     *     // `MyService` was not declared in `viewProviders` hence it can't see it.
     *     expect(myService.value).toEqual('providers');
     *   }
     * }
     *
     * ```
     */
    let includeViewProviders = true;
    function setIncludeViewProviders(v) {
        const oldValue = includeViewProviders;
        includeViewProviders = v;
        return oldValue;
    }
    /**
     * The number of slots in each bloom filter (used by DI). The larger this number, the fewer
     * directives that will share slots, and thus, the fewer false positives when checking for
     * the existence of a directive.
     */
    const BLOOM_SIZE = 256;
    const BLOOM_MASK = BLOOM_SIZE - 1;
    /**
     * The number of bits that is represented by a single bloom bucket. JS bit operations are 32 bits,
     * so each bucket represents 32 distinct tokens which accounts for log2(32) = 5 bits of a bloom hash
     * number.
     */
    const BLOOM_BUCKET_BITS = 5;
    /** Counter used to generate unique IDs for directives. */
    let nextNgElementId = 0;
    /** Value used when something wasn't found by an injector. */
    const NOT_FOUND = {};
    /**
     * Registers this directive as present in its node's injector by flipping the directive's
     * corresponding bit in the injector's bloom filter.
     *
     * @param injectorIndex The index of the node injector where this token should be registered
     * @param tView The TView for the injector's bloom filters
     * @param type The directive token to register
     */
    function bloomAdd(injectorIndex, tView, type) {
        ngDevMode && assertEqual(tView.firstCreatePass, true, 'expected firstCreatePass to be true');
        let id;
        if (typeof type === 'string') {
            id = type.charCodeAt(0) || 0;
        }
        else if (type.hasOwnProperty(NG_ELEMENT_ID)) {
            id = type[NG_ELEMENT_ID];
        }
        // Set a unique ID on the directive type, so if something tries to inject the directive,
        // we can easily retrieve the ID and hash it into the bloom bit that should be checked.
        if (id == null) {
            id = type[NG_ELEMENT_ID] = nextNgElementId++;
        }
        // We only have BLOOM_SIZE (256) slots in our bloom filter (8 buckets * 32 bits each),
        // so all unique IDs must be modulo-ed into a number from 0 - 255 to fit into the filter.
        const bloomHash = id & BLOOM_MASK;
        // Create a mask that targets the specific bit associated with the directive.
        // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
        // to bit positions 0 - 31 in a 32 bit integer.
        const mask = 1 << bloomHash;
        // Each bloom bucket in `tData` represents `BLOOM_BUCKET_BITS` number of bits of `bloomHash`.
        // Any bits in `bloomHash` beyond `BLOOM_BUCKET_BITS` indicate the bucket offset that the mask
        // should be written to.
        tView.data[injectorIndex + (bloomHash >> BLOOM_BUCKET_BITS)] |= mask;
    }
    /**
     * Creates (or gets an existing) injector for a given element or container.
     *
     * @param tNode for which an injector should be retrieved / created.
     * @param lView View where the node is stored
     * @returns Node injector
     */
    function getOrCreateNodeInjectorForNode(tNode, lView) {
        const existingInjectorIndex = getInjectorIndex(tNode, lView);
        if (existingInjectorIndex !== -1) {
            return existingInjectorIndex;
        }
        const tView = lView[TVIEW];
        if (tView.firstCreatePass) {
            tNode.injectorIndex = lView.length;
            insertBloom(tView.data, tNode); // foundation for node bloom
            insertBloom(lView, null); // foundation for cumulative bloom
            insertBloom(tView.blueprint, null);
        }
        const parentLoc = getParentInjectorLocation(tNode, lView);
        const injectorIndex = tNode.injectorIndex;
        // If a parent injector can't be found, its location is set to -1.
        // In that case, we don't need to set up a cumulative bloom
        if (hasParentInjector(parentLoc)) {
            const parentIndex = getParentInjectorIndex(parentLoc);
            const parentLView = getParentInjectorView(parentLoc, lView);
            const parentData = parentLView[TVIEW].data;
            // Creates a cumulative bloom filter that merges the parent's bloom filter
            // and its own cumulative bloom (which contains tokens for all ancestors)
            for (let i = 0; i < 8 /* NodeInjectorOffset.BLOOM_SIZE */; i++) {
                lView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
            }
        }
        lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */] = parentLoc;
        return injectorIndex;
    }
    function insertBloom(arr, footer) {
        arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
    }
    function getInjectorIndex(tNode, lView) {
        if (tNode.injectorIndex === -1 ||
            // If the injector index is the same as its parent's injector index, then the index has been
            // copied down from the parent node. No injector has been created yet on this node.
            (tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex) ||
            // After the first template pass, the injector index might exist but the parent values
            // might not have been calculated yet for this instance
            lView[tNode.injectorIndex + 8 /* NodeInjectorOffset.PARENT */] === null) {
            return -1;
        }
        else {
            ngDevMode && assertIndexInRange(lView, tNode.injectorIndex);
            return tNode.injectorIndex;
        }
    }
    /**
     * Finds the index of the parent injector, with a view offset if applicable. Used to set the
     * parent injector initially.
     *
     * @returns Returns a number that is the combination of the number of LViews that we have to go up
     * to find the LView containing the parent inject AND the index of the injector within that LView.
     */
    function getParentInjectorLocation(tNode, lView) {
        if (tNode.parent && tNode.parent.injectorIndex !== -1) {
            // If we have a parent `TNode` and there is an injector associated with it we are done, because
            // the parent injector is within the current `LView`.
            return tNode.parent.injectorIndex; // ViewOffset is 0
        }
        // When parent injector location is computed it may be outside of the current view. (ie it could
        // be pointing to a declared parent location). This variable stores number of declaration parents
        // we need to walk up in order to find the parent injector location.
        let declarationViewOffset = 0;
        let parentTNode = null;
        let lViewCursor = lView;
        // The parent injector is not in the current `LView`. We will have to walk the declared parent
        // `LView` hierarchy and look for it. If we walk of the top, that means that there is no parent
        // `NodeInjector`.
        while (lViewCursor !== null) {
            parentTNode = getTNodeFromLView(lViewCursor);
            if (parentTNode === null) {
                // If we have no parent, than we are done.
                return NO_PARENT_INJECTOR;
            }
            ngDevMode && parentTNode && assertTNodeForLView(parentTNode, lViewCursor[DECLARATION_VIEW]);
            // Every iteration of the loop requires that we go to the declared parent.
            declarationViewOffset++;
            lViewCursor = lViewCursor[DECLARATION_VIEW];
            if (parentTNode.injectorIndex !== -1) {
                // We found a NodeInjector which points to something.
                return (parentTNode.injectorIndex |
                    (declarationViewOffset << 16 /* RelativeInjectorLocationFlags.ViewOffsetShift */));
            }
        }
        return NO_PARENT_INJECTOR;
    }
    /**
     * Makes a type or an injection token public to the DI system by adding it to an
     * injector's bloom filter.
     *
     * @param di The node injector in which a directive will be added
     * @param token The type or the injection token to be made public
     */
    function diPublicInInjector(injectorIndex, tView, token) {
        bloomAdd(injectorIndex, tView, token);
    }
    /**
     * Inject static attribute value into directive constructor.
     *
     * This method is used with `factory` functions which are generated as part of
     * `defineDirective` or `defineComponent`. The method retrieves the static value
     * of an attribute. (Dynamic attributes are not supported since they are not resolved
     *  at the time of injection and can change over time.)
     *
     * # Example
     * Given:
     * ```
     * @Component(...)
     * class MyComponent {
     *   constructor(@Attribute('title') title: string) { ... }
     * }
     * ```
     * When instantiated with
     * ```
     * <my-component title="Hello"></my-component>
     * ```
     *
     * Then factory method generated is:
     * ```
     * MyComponent.ɵcmp = defineComponent({
     *   factory: () => new MyComponent(injectAttribute('title'))
     *   ...
     * })
     * ```
     *
     * @publicApi
     */
    function injectAttributeImpl(tNode, attrNameToInject) {
        ngDevMode && assertTNodeType(tNode, 12 /* TNodeType.AnyContainer */ | 3 /* TNodeType.AnyRNode */);
        ngDevMode && assertDefined(tNode, 'expecting tNode');
        if (attrNameToInject === 'class') {
            return tNode.classes;
        }
        if (attrNameToInject === 'style') {
            return tNode.styles;
        }
        const attrs = tNode.attrs;
        if (attrs) {
            const attrsLength = attrs.length;
            let i = 0;
            while (i < attrsLength) {
                const value = attrs[i];
                // If we hit a `Bindings` or `Template` marker then we are done.
                if (isNameOnlyAttributeMarker(value))
                    break;
                // Skip namespaced attributes
                if (value === 0 /* AttributeMarker.NamespaceURI */) {
                    // we skip the next two values
                    // as namespaced attributes looks like
                    // [..., AttributeMarker.NamespaceURI, 'http://someuri.com/test', 'test:exist',
                    // 'existValue', ...]
                    i = i + 2;
                }
                else if (typeof value === 'number') {
                    // Skip to the first value of the marked attribute.
                    i++;
                    while (i < attrsLength && typeof attrs[i] === 'string') {
                        i++;
                    }
                }
                else if (value === attrNameToInject) {
                    return attrs[i + 1];
                }
                else {
                    i = i + 2;
                }
            }
        }
        return null;
    }
    function notFoundValueOrThrow(notFoundValue, token, flags) {
        if ((flags & InjectFlags.Optional) || notFoundValue !== undefined) {
            return notFoundValue;
        }
        else {
            throwProviderNotFoundError(token, 'NodeInjector');
        }
    }
    /**
     * Returns the value associated to the given token from the ModuleInjector or throws exception
     *
     * @param lView The `LView` that contains the `tNode`
     * @param token The token to look for
     * @param flags Injection flags
     * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
     * @returns the value from the injector or throws an exception
     */
    function lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue) {
        if ((flags & InjectFlags.Optional) && notFoundValue === undefined) {
            // This must be set or the NullInjector will throw for optional deps
            notFoundValue = null;
        }
        if ((flags & (InjectFlags.Self | InjectFlags.Host)) === 0) {
            const moduleInjector = lView[INJECTOR$1];
            // switch to `injectInjectorOnly` implementation for module injector, since module injector
            // should not have access to Component/Directive DI scope (that may happen through
            // `directiveInject` implementation)
            const previousInjectImplementation = setInjectImplementation(undefined);
            try {
                if (moduleInjector) {
                    return moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional);
                }
                else {
                    return injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
                }
            }
            finally {
                setInjectImplementation(previousInjectImplementation);
            }
        }
        return notFoundValueOrThrow(notFoundValue, token, flags);
    }
    /**
     * Returns the value associated to the given token from the NodeInjectors => ModuleInjector.
     *
     * Look for the injector providing the token by walking up the node injector tree and then
     * the module injector tree.
     *
     * This function patches `token` with `__NG_ELEMENT_ID__` which contains the id for the bloom
     * filter. `-1` is reserved for injecting `Injector` (implemented by `NodeInjector`)
     *
     * @param tNode The Node where the search for the injector should start
     * @param lView The `LView` that contains the `tNode`
     * @param token The token to look for
     * @param flags Injection flags
     * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
     * @returns the value from the injector, `null` when not found, or `notFoundValue` if provided
     */
    function getOrCreateInjectable(tNode, lView, token, flags = InjectFlags.Default, notFoundValue) {
        if (tNode !== null) {
            // If the view or any of its ancestors have an embedded
            // view injector, we have to look it up there first.
            if (lView[FLAGS] & 1024 /* LViewFlags.HasEmbeddedViewInjector */) {
                const embeddedInjectorValue = lookupTokenUsingEmbeddedInjector(tNode, lView, token, flags, NOT_FOUND);
                if (embeddedInjectorValue !== NOT_FOUND) {
                    return embeddedInjectorValue;
                }
            }
            // Otherwise try the node injector.
            const value = lookupTokenUsingNodeInjector(tNode, lView, token, flags, NOT_FOUND);
            if (value !== NOT_FOUND) {
                return value;
            }
        }
        // Finally, fall back to the module injector.
        return lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
    }
    /**
     * Returns the value associated to the given token from the node injector.
     *
     * @param tNode The Node where the search for the injector should start
     * @param lView The `LView` that contains the `tNode`
     * @param token The token to look for
     * @param flags Injection flags
     * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
     * @returns the value from the injector, `null` when not found, or `notFoundValue` if provided
     */
    function lookupTokenUsingNodeInjector(tNode, lView, token, flags, notFoundValue) {
        const bloomHash = bloomHashBitOrFactory(token);
        // If the ID stored here is a function, this is a special object like ElementRef or TemplateRef
        // so just call the factory function to create it.
        if (typeof bloomHash === 'function') {
            if (!enterDI(lView, tNode, flags)) {
                // Failed to enter DI, try module injector instead. If a token is injected with the @Host
                // flag, the module injector is not searched for that token in Ivy.
                return (flags & InjectFlags.Host) ?
                    notFoundValueOrThrow(notFoundValue, token, flags) :
                    lookupTokenUsingModuleInjector(lView, token, flags, notFoundValue);
            }
            try {
                const value = bloomHash(flags);
                if (value == null && !(flags & InjectFlags.Optional)) {
                    throwProviderNotFoundError(token);
                }
                else {
                    return value;
                }
            }
            finally {
                leaveDI();
            }
        }
        else if (typeof bloomHash === 'number') {
            // A reference to the previous injector TView that was found while climbing the element
            // injector tree. This is used to know if viewProviders can be accessed on the current
            // injector.
            let previousTView = null;
            let injectorIndex = getInjectorIndex(tNode, lView);
            let parentLocation = NO_PARENT_INJECTOR;
            let hostTElementNode = flags & InjectFlags.Host ? lView[DECLARATION_COMPONENT_VIEW][T_HOST] : null;
            // If we should skip this injector, or if there is no injector on this node, start by
            // searching the parent injector.
            if (injectorIndex === -1 || flags & InjectFlags.SkipSelf) {
                parentLocation = injectorIndex === -1 ? getParentInjectorLocation(tNode, lView) :
                    lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */];
                if (parentLocation === NO_PARENT_INJECTOR || !shouldSearchParent(flags, false)) {
                    injectorIndex = -1;
                }
                else {
                    previousTView = lView[TVIEW];
                    injectorIndex = getParentInjectorIndex(parentLocation);
                    lView = getParentInjectorView(parentLocation, lView);
                }
            }
            // Traverse up the injector tree until we find a potential match or until we know there
            // *isn't* a match.
            while (injectorIndex !== -1) {
                ngDevMode && assertNodeInjector(lView, injectorIndex);
                // Check the current injector. If it matches, see if it contains token.
                const tView = lView[TVIEW];
                ngDevMode &&
                    assertTNodeForLView(tView.data[injectorIndex + 8 /* NodeInjectorOffset.TNODE */], lView);
                if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                    // At this point, we have an injector which *may* contain the token, so we step through
                    // the providers and directives associated with the injector's corresponding node to get
                    // the instance.
                    const instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
                    if (instance !== NOT_FOUND) {
                        return instance;
                    }
                }
                parentLocation = lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */];
                if (parentLocation !== NO_PARENT_INJECTOR &&
                    shouldSearchParent(flags, lView[TVIEW].data[injectorIndex + 8 /* NodeInjectorOffset.TNODE */] === hostTElementNode) &&
                    bloomHasToken(bloomHash, injectorIndex, lView)) {
                    // The def wasn't found anywhere on this node, so it was a false positive.
                    // Traverse up the tree and continue searching.
                    previousTView = tView;
                    injectorIndex = getParentInjectorIndex(parentLocation);
                    lView = getParentInjectorView(parentLocation, lView);
                }
                else {
                    // If we should not search parent OR If the ancestor bloom filter value does not have the
                    // bit corresponding to the directive we can give up on traversing up to find the specific
                    // injector.
                    injectorIndex = -1;
                }
            }
        }
        return notFoundValue;
    }
    function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
        const currentTView = lView[TVIEW];
        const tNode = currentTView.data[injectorIndex + 8 /* NodeInjectorOffset.TNODE */];
        // First, we need to determine if view providers can be accessed by the starting element.
        // There are two possibilities
        const canAccessViewProviders = previousTView == null ?
            // 1) This is the first invocation `previousTView == null` which means that we are at the
            // `TNode` of where injector is starting to look. In such a case the only time we are allowed
            // to look into the ViewProviders is if:
            // - we are on a component
            // - AND the injector set `includeViewProviders` to true (implying that the token can see
            // ViewProviders because it is the Component or a Service which itself was declared in
            // ViewProviders)
            (isComponentHost(tNode) && includeViewProviders) :
            // 2) `previousTView != null` which means that we are now walking across the parent nodes.
            // In such a case we are only allowed to look into the ViewProviders if:
            // - We just crossed from child View to Parent View `previousTView != currentTView`
            // - AND the parent TNode is an Element.
            // This means that we just came from the Component's View and therefore are allowed to see
            // into the ViewProviders.
            (previousTView != currentTView && ((tNode.type & 3 /* TNodeType.AnyRNode */) !== 0));
        // This special case happens when there is a @host on the inject and when we are searching
        // on the host element node.
        const isHostSpecialCase = (flags & InjectFlags.Host) && hostTElementNode === tNode;
        const injectableIdx = locateDirectiveOrProvider(tNode, currentTView, token, canAccessViewProviders, isHostSpecialCase);
        if (injectableIdx !== null) {
            return getNodeInjectable(lView, currentTView, injectableIdx, tNode);
        }
        else {
            return NOT_FOUND;
        }
    }
    /**
     * Searches for the given token among the node's directives and providers.
     *
     * @param tNode TNode on which directives are present.
     * @param tView The tView we are currently processing
     * @param token Provider token or type of a directive to look for.
     * @param canAccessViewProviders Whether view providers should be considered.
     * @param isHostSpecialCase Whether the host special case applies.
     * @returns Index of a found directive or provider, or null when none found.
     */
    function locateDirectiveOrProvider(tNode, tView, token, canAccessViewProviders, isHostSpecialCase) {
        const nodeProviderIndexes = tNode.providerIndexes;
        const tInjectables = tView.data;
        const injectablesStart = nodeProviderIndexes & 1048575 /* TNodeProviderIndexes.ProvidersStartIndexMask */;
        const directivesStart = tNode.directiveStart;
        const directiveEnd = tNode.directiveEnd;
        const cptViewProvidersCount = nodeProviderIndexes >> 20 /* TNodeProviderIndexes.CptViewProvidersCountShift */;
        const startingIndex = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount;
        // When the host special case applies, only the viewProviders and the component are visible
        const endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : directiveEnd;
        for (let i = startingIndex; i < endIndex; i++) {
            const providerTokenOrDef = tInjectables[i];
            if (i < directivesStart && token === providerTokenOrDef ||
                i >= directivesStart && providerTokenOrDef.type === token) {
                return i;
            }
        }
        if (isHostSpecialCase) {
            const dirDef = tInjectables[directivesStart];
            if (dirDef && isComponentDef(dirDef) && dirDef.type === token) {
                return directivesStart;
            }
        }
        return null;
    }
    /**
     * Retrieve or instantiate the injectable from the `LView` at particular `index`.
     *
     * This function checks to see if the value has already been instantiated and if so returns the
     * cached `injectable`. Otherwise if it detects that the value is still a factory it
     * instantiates the `injectable` and caches the value.
     */
    function getNodeInjectable(lView, tView, index, tNode) {
        let value = lView[index];
        const tData = tView.data;
        if (isFactory(value)) {
            const factory = value;
            if (factory.resolving) {
                throwCyclicDependencyError(stringifyForError(tData[index]));
            }
            const previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
            factory.resolving = true;
            const previousInjectImplementation = factory.injectImpl ? setInjectImplementation(factory.injectImpl) : null;
            const success = enterDI(lView, tNode, InjectFlags.Default);
            ngDevMode &&
                assertEqual(success, true, 'Because flags do not contain \`SkipSelf\' we expect this to always succeed.');
            try {
                value = lView[index] = factory.factory(undefined, tData, lView, tNode);
                // This code path is hit for both directives and providers.
                // For perf reasons, we want to avoid searching for hooks on providers.
                // It does no harm to try (the hooks just won't exist), but the extra
                // checks are unnecessary and this is a hot path. So we check to see
                // if the index of the dependency is in the directive range for this
                // tNode. If it's not, we know it's a provider and skip hook registration.
                if (tView.firstCreatePass && index >= tNode.directiveStart) {
                    ngDevMode && assertDirectiveDef(tData[index]);
                    registerPreOrderHooks(index, tData[index], tView);
                }
            }
            finally {
                previousInjectImplementation !== null &&
                    setInjectImplementation(previousInjectImplementation);
                setIncludeViewProviders(previousIncludeViewProviders);
                factory.resolving = false;
                leaveDI();
            }
        }
        return value;
    }
    /**
     * Returns the bit in an injector's bloom filter that should be used to determine whether or not
     * the directive might be provided by the injector.
     *
     * When a directive is public, it is added to the bloom filter and given a unique ID that can be
     * retrieved on the Type. When the directive isn't public or the token is not a directive `null`
     * is returned as the node injector can not possibly provide that token.
     *
     * @param token the injection token
     * @returns the matching bit to check in the bloom filter or `null` if the token is not known.
     *   When the returned value is negative then it represents special values such as `Injector`.
     */
    function bloomHashBitOrFactory(token) {
        ngDevMode && assertDefined(token, 'token must be defined');
        if (typeof token === 'string') {
            return token.charCodeAt(0) || 0;
        }
        const tokenId =
        // First check with `hasOwnProperty` so we don't get an inherited ID.
        token.hasOwnProperty(NG_ELEMENT_ID) ? token[NG_ELEMENT_ID] : undefined;
        // Negative token IDs are used for special objects such as `Injector`
        if (typeof tokenId === 'number') {
            if (tokenId >= 0) {
                return tokenId & BLOOM_MASK;
            }
            else {
                ngDevMode &&
                    assertEqual(tokenId, -1 /* InjectorMarkers.Injector */, 'Expecting to get Special Injector Id');
                return createNodeInjector;
            }
        }
        else {
            return tokenId;
        }
    }
    function bloomHasToken(bloomHash, injectorIndex, injectorView) {
        // Create a mask that targets the specific bit associated with the directive we're looking for.
        // JS bit operations are 32 bits, so this will be a number between 2^0 and 2^31, corresponding
        // to bit positions 0 - 31 in a 32 bit integer.
        const mask = 1 << bloomHash;
        // Each bloom bucket in `injectorView` represents `BLOOM_BUCKET_BITS` number of bits of
        // `bloomHash`. Any bits in `bloomHash` beyond `BLOOM_BUCKET_BITS` indicate the bucket offset
        // that should be used.
        const value = injectorView[injectorIndex + (bloomHash >> BLOOM_BUCKET_BITS)];
        // If the bloom filter value has the bit corresponding to the directive's bloomBit flipped on,
        // this injector is a potential match.
        return !!(value & mask);
    }
    /** Returns true if flags prevent parent injector from being searched for tokens */
    function shouldSearchParent(flags, isFirstHostTNode) {
        return !(flags & InjectFlags.Self) && !(flags & InjectFlags.Host && isFirstHostTNode);
    }
    class NodeInjector {
        constructor(_tNode, _lView) {
            this._tNode = _tNode;
            this._lView = _lView;
        }
        get(token, notFoundValue, flags) {
            return getOrCreateInjectable(this._tNode, this._lView, token, convertToBitFlags(flags), notFoundValue);
        }
    }
    /** Creates a `NodeInjector` for the current node. */
    function createNodeInjector() {
        return new NodeInjector(getCurrentTNode(), getLView());
    }
    /**
     * Returns a value from the closest embedded or node injector.
     *
     * @param tNode The Node where the search for the injector should start
     * @param lView The `LView` that contains the `tNode`
     * @param token The token to look for
     * @param flags Injection flags
     * @param notFoundValue The value to return when the injection flags is `InjectFlags.Optional`
     * @returns the value from the injector, `null` when not found, or `notFoundValue` if provided
     */
    function lookupTokenUsingEmbeddedInjector(tNode, lView, token, flags, notFoundValue) {
        let currentTNode = tNode;
        let currentLView = lView;
        // When an LView with an embedded view injector is inserted, it'll likely be interlaced with
        // nodes who may have injectors (e.g. node injector -> embedded view injector -> node injector).
        // Since the bloom filters for the node injectors have already been constructed and we don't
        // have a way of extracting the records from an injector, the only way to maintain the correct
        // hierarchy when resolving the value is to walk it node-by-node while attempting to resolve
        // the token at each level.
        while (currentTNode !== null && currentLView !== null &&
            (currentLView[FLAGS] & 1024 /* LViewFlags.HasEmbeddedViewInjector */) &&
            !(currentLView[FLAGS] & 256 /* LViewFlags.IsRoot */)) {
            ngDevMode && assertTNodeForLView(currentTNode, currentLView);
            // Note that this lookup on the node injector is using the `Self` flag, because
            // we don't want the node injector to look at any parent injectors since we
            // may hit the embedded view injector first.
            const nodeInjectorValue = lookupTokenUsingNodeInjector(currentTNode, currentLView, token, flags | InjectFlags.Self, NOT_FOUND);
            if (nodeInjectorValue !== NOT_FOUND) {
                return nodeInjectorValue;
            }
            // Has an explicit type due to a TS bug: https://github.com/microsoft/TypeScript/issues/33191
            let parentTNode = currentTNode.parent;
            // `TNode.parent` includes the parent within the current view only. If it doesn't exist,
            // it means that we've hit the view boundary and we need to go up to the next view.
            if (!parentTNode) {
                // Before we go to the next LView, check if the token exists on the current embedded injector.
                const embeddedViewInjector = currentLView[EMBEDDED_VIEW_INJECTOR];
                if (embeddedViewInjector) {
                    const embeddedViewInjectorValue = embeddedViewInjector.get(token, NOT_FOUND, flags);
                    if (embeddedViewInjectorValue !== NOT_FOUND) {
                        return embeddedViewInjectorValue;
                    }
                }
                // Otherwise keep going up the tree.
                parentTNode = getTNodeFromLView(currentLView);
                currentLView = currentLView[DECLARATION_VIEW];
            }
            currentTNode = parentTNode;
        }
        return notFoundValue;
    }
    /** Gets the TNode associated with an LView inside of the declaration view. */
    function getTNodeFromLView(lView) {
        const tView = lView[TVIEW];
        const tViewType = tView.type;
        // The parent pointer differs based on `TView.type`.
        if (tViewType === 2 /* TViewType.Embedded */) {
            ngDevMode && assertDefined(tView.declTNode, 'Embedded TNodes should have declaration parents.');
            return tView.declTNode;
        }
        else if (tViewType === 1 /* TViewType.Component */) {
            // Components don't have `TView.declTNode` because each instance of component could be
            // inserted in different location, hence `TView.declTNode` is meaningless.
            return lView[T_HOST];
        }
        return null;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Facade for the attribute injection from DI.
     *
     * @codeGenApi
     */
    function ɵɵinjectAttribute(attrNameToInject) {
        return injectAttributeImpl(getCurrentTNode(), attrNameToInject);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Attribute decorator and metadata.
     *
     * @Annotation
     * @publicApi
     */
    const Attribute = makeParamDecorator('Attribute', (attributeName) => ({ attributeName, __NG_ELEMENT_ID__: () => ɵɵinjectAttribute(attributeName) }));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    let _reflect = null;
    function getReflect() {
        return (_reflect = _reflect || new ReflectionCapabilities());
    }
    function reflectDependencies(type) {
        return convertDependencies(getReflect().parameters(type));
    }
    function convertDependencies(deps) {
        return deps.map(dep => reflectDependency(dep));
    }
    function reflectDependency(dep) {
        const meta = {
            token: null,
            attribute: null,
            host: false,
            optional: false,
            self: false,
            skipSelf: false,
        };
        if (Array.isArray(dep) && dep.length > 0) {
            for (let j = 0; j < dep.length; j++) {
                const param = dep[j];
                if (param === undefined) {
                    // param may be undefined if type of dep is not set by ngtsc
                    continue;
                }
                const proto = Object.getPrototypeOf(param);
                if (param instanceof Optional || proto.ngMetadataName === 'Optional') {
                    meta.optional = true;
                }
                else if (param instanceof SkipSelf || proto.ngMetadataName === 'SkipSelf') {
                    meta.skipSelf = true;
                }
                else if (param instanceof Self || proto.ngMetadataName === 'Self') {
                    meta.self = true;
                }
                else if (param instanceof Host || proto.ngMetadataName === 'Host') {
                    meta.host = true;
                }
                else if (param instanceof Inject) {
                    meta.token = param.token;
                }
                else if (param instanceof Attribute) {
                    if (param.attributeName === undefined) {
                        throw new RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode && `Attribute name must be defined.`);
                    }
                    meta.attribute = param.attributeName;
                }
                else {
                    meta.token = param;
                }
            }
        }
        else if (dep === undefined || (Array.isArray(dep) && dep.length === 0)) {
            meta.token = null;
        }
        else {
            meta.token = dep;
        }
        return meta;
    }
    function reportUnknownPropertyError(message) {
        {
            console.error(formatRuntimeError(303 /* RuntimeErrorCode.UNKNOWN_BINDING */, message));
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
     * Flags for renderer-specific style modifiers.
     * @publicApi
     */
    var RendererStyleFlags2;
    (function (RendererStyleFlags2) {
        // TODO(misko): This needs to be refactored into a separate file so that it can be imported from
        // `node_manipulation.ts` Currently doing the import cause resolution order to change and fails
        // the tests. The work around is to have hard coded value in `node_manipulation.ts` for now.
        /**
         * Marks a style as important.
         */
        RendererStyleFlags2[RendererStyleFlags2["Important"] = 1] = "Important";
        /**
         * Marks a style as using dash case naming (this-is-dash-case).
         */
        RendererStyleFlags2[RendererStyleFlags2["DashCase"] = 2] = "DashCase";
    })(RendererStyleFlags2 || (RendererStyleFlags2 = {}));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // Keeps track of the currently-active LViews.
    const TRACKED_LVIEWS = new Map();
    // Used for generating unique IDs for LViews.
    let uniqueIdCounter = 0;
    /** Gets a unique ID that can be assigned to an LView. */
    function getUniqueLViewId() {
        return uniqueIdCounter++;
    }
    /** Starts tracking an LView. */
    function registerLView(lView) {
        ngDevMode && assertNumber(lView[ID], 'LView must have an ID in order to be registered');
        TRACKED_LVIEWS.set(lView[ID], lView);
    }
    /** Stops tracking an LView. */
    function unregisterLView(lView) {
        ngDevMode && assertNumber(lView[ID], 'Cannot stop tracking an LView that does not have an ID');
        TRACKED_LVIEWS.delete(lView[ID]);
    }
    /**
     * This property will be monkey-patched on elements, components and directives.
     */
    const MONKEY_PATCH_KEY_NAME = '__ngContext__';
    /**
     * Assigns the given data to the given target (which could be a component,
     * directive or DOM node instance) using monkey-patching.
     */
    function attachPatchData(target, data) {
        ngDevMode && assertDefined(target, 'Target expected');
        // Only attach the ID of the view in order to avoid memory leaks (see #41047). We only do this
        // for `LView`, because we have control over when an `LView` is created and destroyed, whereas
        // we can't know when to remove an `LContext`.
        if (isLView(data)) {
            target[MONKEY_PATCH_KEY_NAME] = data[ID];
            registerLView(data);
        }
        else {
            target[MONKEY_PATCH_KEY_NAME] = data;
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    let _icuContainerIterate;
    /**
     * Iterator which provides ability to visit all of the `TIcuContainerNode` root `RNode`s.
     */
    function icuContainerIterate(tIcuContainerNode, lView) {
        return _icuContainerIterate(tIcuContainerNode, lView);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Gets the parent LView of the passed LView, if the PARENT is an LContainer, will get the parent of
     * that LContainer, which is an LView
     * @param lView the lView whose parent to get
     */
    function getLViewParent(lView) {
        ngDevMode && assertLView(lView);
        const parent = lView[PARENT];
        return isLContainer(parent) ? parent[PARENT] : parent;
    }
    /**
     * Gets the first `LContainer` in the LView or `null` if none exists.
     */
    function getFirstLContainer(lView) {
        return getNearestLContainer(lView[CHILD_HEAD]);
    }
    /**
     * Gets the next `LContainer` that is a sibling of the given container.
     */
    function getNextLContainer(container) {
        return getNearestLContainer(container[NEXT]);
    }
    function getNearestLContainer(viewOrContainer) {
        while (viewOrContainer !== null && !isLContainer(viewOrContainer)) {
            viewOrContainer = viewOrContainer[NEXT];
        }
        return viewOrContainer;
    }
    /**
     * NOTE: for performance reasons, the possible actions are inlined within the function instead of
     * being passed as an argument.
     */
    function applyToElementOrContainer(action, renderer, parent, lNodeToHandle, beforeNode) {
        // If this slot was allocated for a text node dynamically created by i18n, the text node itself
        // won't be created until i18nApply() in the update block, so this node should be skipped.
        // For more info, see "ICU expressions should work inside an ngTemplateOutlet inside an ngFor"
        // in `i18n_spec.ts`.
        if (lNodeToHandle != null) {
            let lContainer;
            let isComponent = false;
            // We are expecting an RNode, but in the case of a component or LContainer the `RNode` is
            // wrapped in an array which needs to be unwrapped. We need to know if it is a component and if
            // it has LContainer so that we can process all of those cases appropriately.
            if (isLContainer(lNodeToHandle)) {
                lContainer = lNodeToHandle;
            }
            else if (isLView(lNodeToHandle)) {
                isComponent = true;
                ngDevMode && assertDefined(lNodeToHandle[HOST], 'HOST must be defined for a component LView');
                lNodeToHandle = lNodeToHandle[HOST];
            }
            const rNode = unwrapRNode(lNodeToHandle);
            if (action === 0 /* WalkTNodeTreeAction.Create */ && parent !== null) {
                if (beforeNode == null) {
                    nativeAppendChild(renderer, parent, rNode);
                }
                else {
                    nativeInsertBefore(renderer, parent, rNode, beforeNode || null, true);
                }
            }
            else if (action === 1 /* WalkTNodeTreeAction.Insert */ && parent !== null) {
                nativeInsertBefore(renderer, parent, rNode, beforeNode || null, true);
            }
            else if (action === 2 /* WalkTNodeTreeAction.Detach */) {
                nativeRemoveNode(renderer, rNode, isComponent);
            }
            else if (action === 3 /* WalkTNodeTreeAction.Destroy */) {
                ngDevMode && ngDevMode.rendererDestroyNode++;
                renderer.destroyNode(rNode);
            }
            if (lContainer != null) {
                applyContainer(renderer, action, lContainer, parent, beforeNode);
            }
        }
    }
    /**
     * Creates a native element from a tag name, using a renderer.
     * @param renderer A renderer to use
     * @param name the tag name
     * @param namespace Optional namespace for element.
     * @returns the element created
     */
    function createElementNode(renderer, name, namespace) {
        ngDevMode && ngDevMode.rendererCreateElement++;
        return renderer.createElement(name, namespace);
    }
    /**
     * Removes all DOM elements associated with a view.
     *
     * Because some root nodes of the view may be containers, we sometimes need
     * to propagate deeply into the nested containers to remove all elements in the
     * views beneath it.
     *
     * @param tView The `TView' of the `LView` from which elements should be added or removed
     * @param lView The view from which elements should be added or removed
     */
    function removeViewFromContainer(tView, lView) {
        const renderer = lView[RENDERER];
        applyView(tView, lView, renderer, 2 /* WalkTNodeTreeAction.Detach */, null, null);
        lView[HOST] = null;
        lView[T_HOST] = null;
    }
    /**
     * Detach a `LView` from the DOM by detaching its nodes.
     *
     * @param tView The `TView' of the `LView` to be detached
     * @param lView the `LView` to be detached.
     */
    function renderDetachView(tView, lView) {
        applyView(tView, lView, lView[RENDERER], 2 /* WalkTNodeTreeAction.Detach */, null, null);
    }
    /**
     * Traverses down and up the tree of views and containers to remove listeners and
     * call onDestroy callbacks.
     *
     * Notes:
     *  - Because it's used for onDestroy calls, it needs to be bottom-up.
     *  - Must process containers instead of their views to avoid splicing
     *  when views are destroyed and re-added.
     *  - Using a while loop because it's faster than recursion
     *  - Destroy only called on movement to sibling or movement to parent (laterally or up)
     *
     *  @param rootView The view to destroy
     */
    function destroyViewTree(rootView) {
        // If the view has no children, we can clean it up and return early.
        let lViewOrLContainer = rootView[CHILD_HEAD];
        if (!lViewOrLContainer) {
            return cleanUpView(rootView[TVIEW], rootView);
        }
        while (lViewOrLContainer) {
            let next = null;
            if (isLView(lViewOrLContainer)) {
                // If LView, traverse down to child.
                next = lViewOrLContainer[CHILD_HEAD];
            }
            else {
                ngDevMode && assertLContainer(lViewOrLContainer);
                // If container, traverse down to its first LView.
                const firstView = lViewOrLContainer[CONTAINER_HEADER_OFFSET];
                if (firstView)
                    next = firstView;
            }
            if (!next) {
                // Only clean up view when moving to the side or up, as destroy hooks
                // should be called in order from the bottom up.
                while (lViewOrLContainer && !lViewOrLContainer[NEXT] && lViewOrLContainer !== rootView) {
                    if (isLView(lViewOrLContainer)) {
                        cleanUpView(lViewOrLContainer[TVIEW], lViewOrLContainer);
                    }
                    lViewOrLContainer = lViewOrLContainer[PARENT];
                }
                if (lViewOrLContainer === null)
                    lViewOrLContainer = rootView;
                if (isLView(lViewOrLContainer)) {
                    cleanUpView(lViewOrLContainer[TVIEW], lViewOrLContainer);
                }
                next = lViewOrLContainer && lViewOrLContainer[NEXT];
            }
            lViewOrLContainer = next;
        }
    }
    function detachMovedView(declarationContainer, lView) {
        ngDevMode && assertLContainer(declarationContainer);
        ngDevMode &&
            assertDefined(declarationContainer[MOVED_VIEWS], 'A projected view should belong to a non-empty projected views collection');
        const movedViews = declarationContainer[MOVED_VIEWS];
        const declarationViewIndex = movedViews.indexOf(lView);
        const insertionLContainer = lView[PARENT];
        ngDevMode && assertLContainer(insertionLContainer);
        // If the view was marked for refresh but then detached before it was checked (where the flag
        // would be cleared and the counter decremented), we need to decrement the view counter here
        // instead.
        if (lView[FLAGS] & 512 /* LViewFlags.RefreshTransplantedView */) {
            lView[FLAGS] &= ~512 /* LViewFlags.RefreshTransplantedView */;
            updateTransplantedViewCount(insertionLContainer, -1);
        }
        movedViews.splice(declarationViewIndex, 1);
    }
    /**
     * Detaches a view from a container.
     *
     * This method removes the view from the container's array of active views. It also
     * removes the view's elements from the DOM.
     *
     * @param lContainer The container from which to detach a view
     * @param removeIndex The index of the view to detach
     * @returns Detached LView instance.
     */
    function detachView(lContainer, removeIndex) {
        if (lContainer.length <= CONTAINER_HEADER_OFFSET)
            return;
        const indexInContainer = CONTAINER_HEADER_OFFSET + removeIndex;
        const viewToDetach = lContainer[indexInContainer];
        if (viewToDetach) {
            const declarationLContainer = viewToDetach[DECLARATION_LCONTAINER];
            if (declarationLContainer !== null && declarationLContainer !== lContainer) {
                detachMovedView(declarationLContainer, viewToDetach);
            }
            if (removeIndex > 0) {
                lContainer[indexInContainer - 1][NEXT] = viewToDetach[NEXT];
            }
            const removedLView = removeFromArray(lContainer, CONTAINER_HEADER_OFFSET + removeIndex);
            removeViewFromContainer(viewToDetach[TVIEW], viewToDetach);
            // notify query that a view has been removed
            const lQueries = removedLView[QUERIES];
            if (lQueries !== null) {
                lQueries.detachView(removedLView[TVIEW]);
            }
            viewToDetach[PARENT] = null;
            viewToDetach[NEXT] = null;
            // Unsets the attached flag
            viewToDetach[FLAGS] &= ~64 /* LViewFlags.Attached */;
        }
        return viewToDetach;
    }
    /**
     * A standalone function which destroys an LView,
     * conducting clean up (e.g. removing listeners, calling onDestroys).
     *
     * @param tView The `TView' of the `LView` to be destroyed
     * @param lView The view to be destroyed.
     */
    function destroyLView(tView, lView) {
        if (!(lView[FLAGS] & 128 /* LViewFlags.Destroyed */)) {
            const renderer = lView[RENDERER];
            if (renderer.destroyNode) {
                applyView(tView, lView, renderer, 3 /* WalkTNodeTreeAction.Destroy */, null, null);
            }
            destroyViewTree(lView);
        }
    }
    /**
     * Calls onDestroys hooks for all directives and pipes in a given view and then removes all
     * listeners. Listeners are removed as the last step so events delivered in the onDestroys hooks
     * can be propagated to @Output listeners.
     *
     * @param tView `TView` for the `LView` to clean up.
     * @param lView The LView to clean up
     */
    function cleanUpView(tView, lView) {
        if (!(lView[FLAGS] & 128 /* LViewFlags.Destroyed */)) {
            // Usually the Attached flag is removed when the view is detached from its parent, however
            // if it's a root view, the flag won't be unset hence why we're also removing on destroy.
            lView[FLAGS] &= ~64 /* LViewFlags.Attached */;
            // Mark the LView as destroyed *before* executing the onDestroy hooks. An onDestroy hook
            // runs arbitrary user code, which could include its own `viewRef.destroy()` (or similar). If
            // We don't flag the view as destroyed before the hooks, this could lead to an infinite loop.
            // This also aligns with the ViewEngine behavior. It also means that the onDestroy hook is
            // really more of an "afterDestroy" hook if you think about it.
            lView[FLAGS] |= 128 /* LViewFlags.Destroyed */;
            executeOnDestroys(tView, lView);
            processCleanups(tView, lView);
            // For component views only, the local renderer is destroyed at clean up time.
            if (lView[TVIEW].type === 1 /* TViewType.Component */) {
                ngDevMode && ngDevMode.rendererDestroy++;
                lView[RENDERER].destroy();
            }
            const declarationContainer = lView[DECLARATION_LCONTAINER];
            // we are dealing with an embedded view that is still inserted into a container
            if (declarationContainer !== null && isLContainer(lView[PARENT])) {
                // and this is a projected view
                if (declarationContainer !== lView[PARENT]) {
                    detachMovedView(declarationContainer, lView);
                }
                // For embedded views still attached to a container: remove query result from this view.
                const lQueries = lView[QUERIES];
                if (lQueries !== null) {
                    lQueries.detachView(tView);
                }
            }
            // Unregister the view once everything else has been cleaned up.
            unregisterLView(lView);
        }
    }
    /** Removes listeners and unsubscribes from output subscriptions */
    function processCleanups(tView, lView) {
        const tCleanup = tView.cleanup;
        const lCleanup = lView[CLEANUP];
        // `LCleanup` contains both share information with `TCleanup` as well as instance specific
        // information appended at the end. We need to know where the end of the `TCleanup` information
        // is, and we track this with `lastLCleanupIndex`.
        let lastLCleanupIndex = -1;
        if (tCleanup !== null) {
            for (let i = 0; i < tCleanup.length - 1; i += 2) {
                if (typeof tCleanup[i] === 'string') {
                    // This is a native DOM listener. It will occupy 4 entries in the TCleanup array (hence i +=
                    // 2 at the end of this block).
                    const targetIdx = tCleanup[i + 3];
                    ngDevMode && assertNumber(targetIdx, 'cleanup target must be a number');
                    if (targetIdx >= 0) {
                        // unregister
                        lCleanup[lastLCleanupIndex = targetIdx]();
                    }
                    else {
                        // Subscription
                        lCleanup[lastLCleanupIndex = -targetIdx].unsubscribe();
                    }
                    i += 2;
                }
                else {
                    // This is a cleanup function that is grouped with the index of its context
                    const context = lCleanup[lastLCleanupIndex = tCleanup[i + 1]];
                    tCleanup[i].call(context);
                }
            }
        }
        if (lCleanup !== null) {
            for (let i = lastLCleanupIndex + 1; i < lCleanup.length; i++) {
                const instanceCleanupFn = lCleanup[i];
                ngDevMode && assertFunction(instanceCleanupFn, 'Expecting instance cleanup function.');
                instanceCleanupFn();
            }
            lView[CLEANUP] = null;
        }
    }
    /** Calls onDestroy hooks for this view */
    function executeOnDestroys(tView, lView) {
        let destroyHooks;
        if (tView != null && (destroyHooks = tView.destroyHooks) != null) {
            for (let i = 0; i < destroyHooks.length; i += 2) {
                const context = lView[destroyHooks[i]];
                // Only call the destroy hook if the context has been requested.
                if (!(context instanceof NodeInjectorFactory)) {
                    const toCall = destroyHooks[i + 1];
                    if (Array.isArray(toCall)) {
                        for (let j = 0; j < toCall.length; j += 2) {
                            const callContext = context[toCall[j]];
                            const hook = toCall[j + 1];
                            try {
                                hook.call(callContext);
                            }
                            finally {
                            }
                        }
                    }
                    else {
                        try {
                            toCall.call(context);
                        }
                        finally {
                        }
                    }
                }
            }
        }
    }
    /**
     * Inserts a native node before another native node for a given parent.
     * This is a utility function that can be used when native nodes were determined.
     */
    function nativeInsertBefore(renderer, parent, child, beforeNode, isMove) {
        ngDevMode && ngDevMode.rendererInsertBefore++;
        renderer.insertBefore(parent, child, beforeNode, isMove);
    }
    function nativeAppendChild(renderer, parent, child) {
        ngDevMode && ngDevMode.rendererAppendChild++;
        ngDevMode && assertDefined(parent, 'parent node must be defined');
        renderer.appendChild(parent, child);
    }
    /** Removes a node from the DOM given its native parent. */
    function nativeRemoveChild(renderer, parent, child, isHostElement) {
        renderer.removeChild(parent, child, isHostElement);
    }
    /**
     * Returns a native parent of a given native node.
     */
    function nativeParentNode(renderer, node) {
        return renderer.parentNode(node);
    }
    function getProjectionNodes(lView, tNode) {
        if (tNode !== null) {
            const componentView = lView[DECLARATION_COMPONENT_VIEW];
            const componentHost = componentView[T_HOST];
            const slotIdx = tNode.projection;
            ngDevMode && assertProjectionSlots(lView);
            return componentHost.projection[slotIdx];
        }
        return null;
    }
    /**
     * Removes a native node itself using a given renderer. To remove the node we are looking up its
     * parent from the native tree as not all platforms / browsers support the equivalent of
     * node.remove().
     *
     * @param renderer A renderer to be used
     * @param rNode The native node that should be removed
     * @param isHostElement A flag indicating if a node to be removed is a host of a component.
     */
    function nativeRemoveNode(renderer, rNode, isHostElement) {
        ngDevMode && ngDevMode.rendererRemoveNode++;
        const nativeParent = nativeParentNode(renderer, rNode);
        if (nativeParent) {
            nativeRemoveChild(renderer, nativeParent, rNode, isHostElement);
        }
    }
    /**
     * Performs the operation of `action` on the node. Typically this involves inserting or removing
     * nodes on the LView or projection boundary.
     */
    function applyNodes(renderer, action, tNode, lView, parentRElement, beforeNode, isProjection) {
        while (tNode != null) {
            ngDevMode && assertTNodeForLView(tNode, lView);
            ngDevMode &&
                assertTNodeType(tNode, 3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */ | 16 /* TNodeType.Projection */ | 32 /* TNodeType.Icu */);
            const rawSlotValue = lView[tNode.index];
            const tNodeType = tNode.type;
            if (isProjection) {
                if (action === 0 /* WalkTNodeTreeAction.Create */) {
                    rawSlotValue && attachPatchData(unwrapRNode(rawSlotValue), lView);
                    tNode.flags |= 2 /* TNodeFlags.isProjected */;
                }
            }
            if ((tNode.flags & 32 /* TNodeFlags.isDetached */) !== 32 /* TNodeFlags.isDetached */) {
                if (tNodeType & 8 /* TNodeType.ElementContainer */) {
                    applyNodes(renderer, action, tNode.child, lView, parentRElement, beforeNode, false);
                    applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
                }
                else if (tNodeType & 32 /* TNodeType.Icu */) {
                    const nextRNode = icuContainerIterate(tNode, lView);
                    let rNode;
                    while (rNode = nextRNode()) {
                        applyToElementOrContainer(action, renderer, parentRElement, rNode, beforeNode);
                    }
                    applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
                }
                else if (tNodeType & 16 /* TNodeType.Projection */) {
                    applyProjectionRecursive(renderer, action, lView, tNode, parentRElement, beforeNode);
                }
                else {
                    ngDevMode && assertTNodeType(tNode, 3 /* TNodeType.AnyRNode */ | 4 /* TNodeType.Container */);
                    applyToElementOrContainer(action, renderer, parentRElement, rawSlotValue, beforeNode);
                }
            }
            tNode = isProjection ? tNode.projectionNext : tNode.next;
        }
    }
    function applyView(tView, lView, renderer, action, parentRElement, beforeNode) {
        applyNodes(renderer, action, tView.firstChild, lView, parentRElement, beforeNode, false);
    }
    /**
     * `applyProjectionRecursive` performs operation on the projection specified by `action` (insert,
     * detach, destroy)
     *
     * Inserting a projection requires us to locate the projected nodes from the parent component. The
     * complication is that those nodes themselves could be re-projected from their parent component.
     *
     * @param renderer Render to use
     * @param action action to perform (insert, detach, destroy)
     * @param lView The LView which needs to be inserted, detached, destroyed.
     * @param tProjectionNode node to project
     * @param parentRElement parent DOM element for insertion/removal.
     * @param beforeNode Before which node the insertions should happen.
     */
    function applyProjectionRecursive(renderer, action, lView, tProjectionNode, parentRElement, beforeNode) {
        const componentLView = lView[DECLARATION_COMPONENT_VIEW];
        const componentNode = componentLView[T_HOST];
        ngDevMode &&
            assertEqual(typeof tProjectionNode.projection, 'number', 'expecting projection index');
        const nodeToProjectOrRNodes = componentNode.projection[tProjectionNode.projection];
        if (Array.isArray(nodeToProjectOrRNodes)) {
            // This should not exist, it is a bit of a hack. When we bootstrap a top level node and we
            // need to support passing projectable nodes, so we cheat and put them in the TNode
            // of the Host TView. (Yes we put instance info at the T Level). We can get away with it
            // because we know that that TView is not shared and therefore it will not be a problem.
            // This should be refactored and cleaned up.
            for (let i = 0; i < nodeToProjectOrRNodes.length; i++) {
                const rNode = nodeToProjectOrRNodes[i];
                applyToElementOrContainer(action, renderer, parentRElement, rNode, beforeNode);
            }
        }
        else {
            let nodeToProject = nodeToProjectOrRNodes;
            const projectedComponentLView = componentLView[PARENT];
            applyNodes(renderer, action, nodeToProject, projectedComponentLView, parentRElement, beforeNode, true);
        }
    }
    /**
     * `applyContainer` performs an operation on the container and its views as specified by
     * `action` (insert, detach, destroy)
     *
     * Inserting a Container is complicated by the fact that the container may have Views which
     * themselves have containers or projections.
     *
     * @param renderer Renderer to use
     * @param action action to perform (insert, detach, destroy)
     * @param lContainer The LContainer which needs to be inserted, detached, destroyed.
     * @param parentRElement parent DOM element for insertion/removal.
     * @param beforeNode Before which node the insertions should happen.
     */
    function applyContainer(renderer, action, lContainer, parentRElement, beforeNode) {
        ngDevMode && assertLContainer(lContainer);
        const anchor = lContainer[NATIVE]; // LContainer has its own before node.
        const native = unwrapRNode(lContainer);
        // An LContainer can be created dynamically on any node by injecting ViewContainerRef.
        // Asking for a ViewContainerRef on an element will result in a creation of a separate anchor
        // node (comment in the DOM) that will be different from the LContainer's host node. In this
        // particular case we need to execute action on 2 nodes:
        // - container's host node (this is done in the executeActionOnElementOrContainer)
        // - container's host node (this is done here)
        if (anchor !== native) {
            // This is very strange to me (Misko). I would expect that the native is same as anchor. I
            // don't see a reason why they should be different, but they are.
            //
            // If they are we need to process the second anchor as well.
            applyToElementOrContainer(action, renderer, parentRElement, anchor, beforeNode);
        }
        for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
            const lView = lContainer[i];
            applyView(lView[TVIEW], lView, renderer, action, parentRElement, anchor);
        }
    }
    /**
     * Write `cssText` to `RElement`.
     *
     * This function does direct write without any reconciliation. Used for writing initial values, so
     * that static styling values do not pull in the style parser.
     *
     * @param renderer Renderer to use
     * @param element The element which needs to be updated.
     * @param newValue The new class list to write.
     */
    function writeDirectStyle(renderer, element, newValue) {
        ngDevMode && assertString(newValue, '\'newValue\' should be a string');
        renderer.setAttribute(element, 'style', newValue);
        ngDevMode && ngDevMode.rendererSetStyle++;
    }
    /**
     * Write `className` to `RElement`.
     *
     * This function does direct write without any reconciliation. Used for writing initial values, so
     * that static styling values do not pull in the style parser.
     *
     * @param renderer Renderer to use
     * @param element The element which needs to be updated.
     * @param newValue The new class list to write.
     */
    function writeDirectClass(renderer, element, newValue) {
        ngDevMode && assertString(newValue, '\'newValue\' should be a string');
        if (newValue === '') {
            // There are tests in `google3` which expect `element.getAttribute('class')` to be `null`.
            renderer.removeAttribute(element, 'class');
        }
        else {
            renderer.setAttribute(element, 'class', newValue);
        }
        ngDevMode && ngDevMode.rendererSetClassName++;
    }
    /** Sets up the static DOM attributes on an `RNode`. */
    function setupStaticAttributes(renderer, element, tNode) {
        const { mergedAttrs, classes, styles } = tNode;
        if (mergedAttrs !== null) {
            setUpAttributes(renderer, element, mergedAttrs);
        }
        if (classes !== null) {
            writeDirectClass(renderer, element, classes);
        }
        if (styles !== null) {
            writeDirectStyle(renderer, element, styles);
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
     * The Trusted Types policy, or null if Trusted Types are not
     * enabled/supported, or undefined if the policy has not been created yet.
     */
    let policy$1;
    /**
     * Returns the Trusted Types policy, or null if Trusted Types are not
     * enabled/supported. The first call to this function will create the policy.
     */
    function getPolicy$1() {
        if (policy$1 === undefined) {
            policy$1 = null;
            if (_global$1.trustedTypes) {
                try {
                    policy$1 = _global$1.trustedTypes.createPolicy('angular', {
                        createHTML: (s) => s,
                        createScript: (s) => s,
                        createScriptURL: (s) => s,
                    });
                }
                catch (_a) {
                    // trustedTypes.createPolicy throws if called with a name that is
                    // already registered, even in report-only mode. Until the API changes,
                    // catch the error not to break the applications functionally. In such
                    // cases, the code will fall back to using strings.
                }
            }
        }
        return policy$1;
    }
    /**
     * Unsafely promote a string to a TrustedScript, falling back to strings when
     * Trusted Types are not available.
     * @security In particular, it must be assured that the provided string will
     * never cause an XSS vulnerability if used in a context that will be
     * interpreted and executed as a script by a browser, e.g. when calling eval.
     */
    function trustedScriptFromString(script) {
        var _a;
        return ((_a = getPolicy$1()) === null || _a === void 0 ? void 0 : _a.createScript(script)) || script;
    }
    /**
     * Unsafely call the Function constructor with the given string arguments. It
     * is only available in development mode, and should be stripped out of
     * production code.
     * @security This is a security-sensitive function; any use of this function
     * must go through security review. In particular, it must be assured that it
     * is only called from development code, as use in production code can lead to
     * XSS vulnerabilities.
     */
    function newTrustedFunctionForDev(...args) {
        if (typeof ngDevMode === 'undefined') {
            throw new Error('newTrustedFunctionForDev should never be called in production');
        }
        if (!_global$1.trustedTypes) {
            // In environments that don't support Trusted Types, fall back to the most
            // straightforward implementation:
            return new Function(...args);
        }
        // Chrome currently does not support passing TrustedScript to the Function
        // constructor. The following implements the workaround proposed on the page
        // below, where the Chromium bug is also referenced:
        // https://github.com/w3c/webappsec-trusted-types/wiki/Trusted-Types-for-function-constructor
        const fnArgs = args.slice(0, -1).join(',');
        const fnBody = args[args.length - 1];
        const body = `(function anonymous(${fnArgs}
) { ${fnBody}
})`;
        // Using eval directly confuses the compiler and prevents this module from
        // being stripped out of JS binaries even if not used. The global['eval']
        // indirection fixes that.
        const fn = _global$1['eval'](trustedScriptFromString(body));
        if (fn.bind === undefined) {
            // Workaround for a browser bug that only exists in Chrome 83, where passing
            // a TrustedScript to eval just returns the TrustedScript back without
            // evaluating it. In that case, fall back to the most straightforward
            // implementation:
            return new Function(...args);
        }
        // To completely mimic the behavior of calling "new Function", two more
        // things need to happen:
        // 1. Stringifying the resulting function should return its source code
        fn.toString = () => body;
        // 2. When calling the resulting function, `this` should refer to `global`
        return fn.bind(_global$1);
        // When Trusted Types support in Function constructors is widely available,
        // the implementation of this function can be simplified to:
        // return new Function(...args.map(a => trustedScriptFromString(a)));
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function tagSet(tags) {
        const res = {};
        for (const t of tags.split(','))
            res[t] = true;
        return res;
    }
    function merge(...sets) {
        const res = {};
        for (const s of sets) {
            for (const v in s) {
                if (s.hasOwnProperty(v))
                    res[v] = true;
            }
        }
        return res;
    }
    // Good source of info about elements and attributes
    // https://html.spec.whatwg.org/#semantics
    // https://simon.html5.org/html-elements
    // Safe Void Elements - HTML5
    // https://html.spec.whatwg.org/#void-elements
    const VOID_ELEMENTS = tagSet('area,br,col,hr,img,wbr');
    // Elements that you can, intentionally, leave open (and which close themselves)
    // https://html.spec.whatwg.org/#optional-tags
    const OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr');
    const OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet('rp,rt');
    const OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS);
    // Safe Block Elements - HTML5
    const BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet('address,article,' +
        'aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
        'h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'));
    // Inline Elements - HTML5
    const INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet('a,abbr,acronym,audio,b,' +
        'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,' +
        'samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'));
    merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS);
    // Attributes that have href and hence need to be sanitized
    const URI_ATTRS = tagSet('background,cite,href,itemtype,longdesc,poster,src,xlink:href');
    const HTML_ATTRS = tagSet('abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,' +
        'compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,' +
        'ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,' +
        'scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,' +
        'valign,value,vspace,width');
    // Accessibility attributes as per WAI-ARIA 1.1 (W3C Working Draft 14 December 2018)
    const ARIA_ATTRS = tagSet('aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,' +
        'aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,' +
        'aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,' +
        'aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,' +
        'aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,' +
        'aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,' +
        'aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext');
    // NB: This currently consciously doesn't support SVG. SVG sanitization has had several security
    // issues in the past, so it seems safer to leave it out if possible. If support for binding SVG via
    // innerHTML is required, SVG attributes should be added here.
    // NB: Sanitization does not allow <form> elements or other active elements (<button> etc). Those
    // can be sanitized, but they increase security surface area without a legitimate use case, so they
    // are left out here.
    merge(URI_ATTRS, HTML_ATTRS, ARIA_ATTRS);
    // Elements whose content should not be traversed/preserved, if the elements themselves are invalid.
    //
    // Typically, `<invalid>Some content</invalid>` would traverse (and in this case preserve)
    // `Some content`, but strip `invalid-element` opening/closing tags. For some elements, though, we
    // don't want to preserve the content, if the elements themselves are going to be removed.
    tagSet('script,style,template');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A SecurityContext marks a location that has dangerous security implications, e.g. a DOM property
     * like `innerHTML` that could cause Cross Site Scripting (XSS) security bugs when improperly
     * handled.
     *
     * See DomSanitizer for more details on security in Angular applications.
     *
     * @publicApi
     */
    var SecurityContext;
    (function (SecurityContext) {
        SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
        SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
        SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
        SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
        SecurityContext[SecurityContext["URL"] = 4] = "URL";
        SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
    })(SecurityContext || (SecurityContext = {}));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Creates a token that can be used in a DI Provider.
     *
     * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
     * runtime representation) such as when injecting an interface, callable type, array or
     * parameterized type.
     *
     * `InjectionToken` is parameterized on `T` which is the type of object which will be returned by
     * the `Injector`. This provides an additional level of type safety.
     *
     * ```
     * interface MyInterface {...}
     * const myInterface = injector.get(new InjectionToken<MyInterface>('SomeToken'));
     * // myInterface is inferred to be MyInterface.
     * ```
     *
     * When creating an `InjectionToken`, you can optionally specify a factory function which returns
     * (possibly by creating) a default value of the parameterized type `T`. This sets up the
     * `InjectionToken` using this factory as a provider as if it was defined explicitly in the
     * application's root injector. If the factory function, which takes zero arguments, needs to inject
     * dependencies, it can do so using the `inject` function.
     * As you can see in the Tree-shakable InjectionToken example below.
     *
     * Additionally, if a `factory` is specified you can also specify the `providedIn` option, which
     * overrides the above behavior and marks the token as belonging to a particular `@NgModule` (note:
     * this option is now deprecated). As mentioned above, `'root'` is the default value for
     * `providedIn`.
     *
     * The `providedIn: NgModule` and `providedIn: 'any'` options are deprecated.
     *
     * @usageNotes
     * ### Basic Examples
     *
     * ### Plain InjectionToken
     *
     * {@example core/di/ts/injector_spec.ts region='InjectionToken'}
     *
     * ### Tree-shakable InjectionToken
     *
     * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
     *
     *
     * @publicApi
     */
    class InjectionToken {
        /**
         * @param _desc   Description for the token,
         *                used only for debugging purposes,
         *                it should but does not need to be unique
         * @param options Options for the token's usage, as described above
         */
        constructor(_desc, options) {
            this._desc = _desc;
            /** @internal */
            this.ngMetadataName = 'InjectionToken';
            this.ɵprov = undefined;
            if (typeof options == 'number') {
                (typeof ngDevMode === 'undefined' || ngDevMode) &&
                    assertLessThan(options, 0, 'Only negative numbers are supported here');
                // This is a special hack to assign __NG_ELEMENT_ID__ to this instance.
                // See `InjectorMarkers`
                this.__NG_ELEMENT_ID__ = options;
            }
            else if (options !== undefined) {
                this.ɵprov = ɵɵdefineInjectable({
                    token: this,
                    providedIn: options.providedIn || 'root',
                    factory: options.factory,
                });
            }
        }
        /**
         * @internal
         */
        get multi() {
            return this;
        }
        toString() {
            return `InjectionToken ${this._desc}`;
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
     * A multi-provider token for initialization functions that will run upon construction of an
     * environment injector.
     *
     * @publicApi
     */
    const ENVIRONMENT_INITIALIZER = new InjectionToken('ENVIRONMENT_INITIALIZER');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * An InjectionToken that gets the current `Injector` for `createInjector()`-style injectors.
     *
     * Requesting this token instead of `Injector` allows `StaticInjector` to be tree-shaken from a
     * project.
     *
     * @publicApi
     */
    const INJECTOR = new InjectionToken('INJECTOR',
    // Disable tslint because this is const enum which gets inlined not top level prop access.
    // tslint:disable-next-line: no-toplevel-property-access
    -1 /* InjectorMarkers.Injector */);

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const INJECTOR_DEF_TYPES = new InjectionToken('INJECTOR_DEF_TYPES');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    class NullInjector {
        get(token, notFoundValue = THROW_IF_NOT_FOUND) {
            if (notFoundValue === THROW_IF_NOT_FOUND) {
                const error = new Error(`NullInjectorError: No provider for ${stringify(token)}!`);
                error.name = 'NullInjectorError';
                throw error;
            }
            return notFoundValue;
        }
    }
    /**
     * Collects providers from all NgModules and standalone components, including transitively imported
     * ones.
     *
     * Providers extracted via `importProvidersFrom` are only usable in an application injector or
     * another environment injector (such as a route injector). They should not be used in component
     * providers.
     *
     * More information about standalone components can be found in [this
     * guide](guide/standalone-components).
     *
     * @usageNotes
     * The results of the `importProvidersFrom` call can be used in the `bootstrapApplication` call:
     *
     * ```typescript
     * await bootstrapApplication(RootComponent, {
     *   providers: [
     *     importProvidersFrom(NgModuleOne, NgModuleTwo)
     *   ]
     * });
     * ```
     *
     * You can also use the `importProvidersFrom` results in the `providers` field of a route, when a
     * standalone component is used:
     *
     * ```typescript
     * export const ROUTES: Route[] = [
     *   {
     *     path: 'foo',
     *     providers: [
     *       importProvidersFrom(NgModuleOne, NgModuleTwo)
     *     ],
     *     component: YourStandaloneComponent
     *   }
     * ];
     * ```
     *
     * @returns Collected providers from the specified list of types.
     * @publicApi
     */
    function importProvidersFrom(...sources) {
        return {
            ɵproviders: internalImportProvidersFrom(true, sources),
            ɵfromNgModule: true,
        };
    }
    function internalImportProvidersFrom(checkForStandaloneCmp, ...sources) {
        const providersOut = [];
        const dedup = new Set(); // already seen types
        let injectorTypesWithProviders;
        deepForEach(sources, source => {
            if ((typeof ngDevMode === 'undefined' || ngDevMode) && checkForStandaloneCmp) {
                const cmpDef = getComponentDef$1(source);
                if (cmpDef === null || cmpDef === void 0 ? void 0 : cmpDef.standalone) {
                    throw new RuntimeError(800 /* RuntimeErrorCode.IMPORT_PROVIDERS_FROM_STANDALONE */, `Importing providers supports NgModule or ModuleWithProviders but got a standalone component "${stringifyForError(source)}"`);
                }
            }
            // Narrow `source` to access the internal type analogue for `ModuleWithProviders`.
            const internalSource = source;
            if (walkProviderTree(internalSource, providersOut, [], dedup)) {
                injectorTypesWithProviders || (injectorTypesWithProviders = []);
                injectorTypesWithProviders.push(internalSource);
            }
        });
        // Collect all providers from `ModuleWithProviders` types.
        if (injectorTypesWithProviders !== undefined) {
            processInjectorTypesWithProviders(injectorTypesWithProviders, providersOut);
        }
        return providersOut;
    }
    /**
     * Collects all providers from the list of `ModuleWithProviders` and appends them to the provided
     * array.
     */
    function processInjectorTypesWithProviders(typesWithProviders, providersOut) {
        for (let i = 0; i < typesWithProviders.length; i++) {
            const { ngModule, providers } = typesWithProviders[i];
            deepForEachProvider(providers, provider => {
                ngDevMode && validateProvider(provider, providers || EMPTY_ARRAY, ngModule);
                providersOut.push(provider);
            });
        }
    }
    /**
     * The logic visits an `InjectorType`, an `InjectorTypeWithProviders`, or a standalone
     * `ComponentType`, and all of its transitive providers and collects providers.
     *
     * If an `InjectorTypeWithProviders` that declares providers besides the type is specified,
     * the function will return "true" to indicate that the providers of the type definition need
     * to be processed. This allows us to process providers of injector types after all imports of
     * an injector definition are processed. (following View Engine semantics: see FW-1349)
     */
    function walkProviderTree(container, providersOut, parents, dedup) {
        container = resolveForwardRef(container);
        if (!container)
            return false;
        // The actual type which had the definition. Usually `container`, but may be an unwrapped type
        // from `InjectorTypeWithProviders`.
        let defType = null;
        let injDef = getInjectorDef(container);
        const cmpDef = !injDef && getComponentDef$1(container);
        if (!injDef && !cmpDef) {
            // `container` is not an injector type or a component type. It might be:
            //  * An `InjectorTypeWithProviders` that wraps an injector type.
            //  * A standalone directive or pipe that got pulled in from a standalone component's
            //    dependencies.
            // Try to unwrap it as an `InjectorTypeWithProviders` first.
            const ngModule = container.ngModule;
            injDef = getInjectorDef(ngModule);
            if (injDef) {
                defType = ngModule;
            }
            else {
                // Not a component or injector type, so ignore it.
                return false;
            }
        }
        else if (cmpDef && !cmpDef.standalone) {
            return false;
        }
        else {
            defType = container;
        }
        // Check for circular dependencies.
        if (ngDevMode && parents.indexOf(defType) !== -1) {
            const defName = stringify(defType);
            const path = parents.map(stringify);
            throwCyclicDependencyError(defName, path);
        }
        // Check for multiple imports of the same module
        const isDuplicate = dedup.has(defType);
        if (cmpDef) {
            if (isDuplicate) {
                // This component definition has already been processed.
                return false;
            }
            dedup.add(defType);
            if (cmpDef.dependencies) {
                const deps = typeof cmpDef.dependencies === 'function' ? cmpDef.dependencies() : cmpDef.dependencies;
                for (const dep of deps) {
                    walkProviderTree(dep, providersOut, parents, dedup);
                }
            }
        }
        else if (injDef) {
            // First, include providers from any imports.
            if (injDef.imports != null && !isDuplicate) {
                // Before processing defType's imports, add it to the set of parents. This way, if it ends
                // up deeply importing itself, this can be detected.
                ngDevMode && parents.push(defType);
                // Add it to the set of dedups. This way we can detect multiple imports of the same module
                dedup.add(defType);
                let importTypesWithProviders;
                try {
                    deepForEach(injDef.imports, imported => {
                        if (walkProviderTree(imported, providersOut, parents, dedup)) {
                            importTypesWithProviders || (importTypesWithProviders = []);
                            // If the processed import is an injector type with providers, we store it in the
                            // list of import types with providers, so that we can process those afterwards.
                            importTypesWithProviders.push(imported);
                        }
                    });
                }
                finally {
                    // Remove it from the parents set when finished.
                    ngDevMode && parents.pop();
                }
                // Imports which are declared with providers (TypeWithProviders) need to be processed
                // after all imported modules are processed. This is similar to how View Engine
                // processes/merges module imports in the metadata resolver. See: FW-1349.
                if (importTypesWithProviders !== undefined) {
                    processInjectorTypesWithProviders(importTypesWithProviders, providersOut);
                }
            }
            if (!isDuplicate) {
                // Track the InjectorType and add a provider for it.
                // It's important that this is done after the def's imports.
                const factory = getFactoryDef(defType) || (() => new defType());
                // Append extra providers to make more info available for consumers (to retrieve an injector
                // type), as well as internally (to calculate an injection scope correctly and eagerly
                // instantiate a `defType` when an injector is created).
                providersOut.push(
                // Provider to create `defType` using its factory.
                { provide: defType, useFactory: factory, deps: EMPTY_ARRAY },
                // Make this `defType` available to an internal logic that calculates injector scope.
                { provide: INJECTOR_DEF_TYPES, useValue: defType, multi: true },
                // Provider to eagerly instantiate `defType` via `ENVIRONMENT_INITIALIZER`.
                { provide: ENVIRONMENT_INITIALIZER, useValue: () => ɵɵinject(defType), multi: true } //
                );
            }
            // Next, include providers listed on the definition itself.
            const defProviders = injDef.providers;
            if (defProviders != null && !isDuplicate) {
                const injectorType = container;
                deepForEachProvider(defProviders, provider => {
                    ngDevMode && validateProvider(provider, defProviders, injectorType);
                    providersOut.push(provider);
                });
            }
        }
        else {
            // Should not happen, but just in case.
            return false;
        }
        return (defType !== container &&
            container.providers !== undefined);
    }
    function validateProvider(provider, providers, containerType) {
        if (isTypeProvider(provider) || isValueProvider(provider) || isFactoryProvider(provider) ||
            isExistingProvider(provider)) {
            return;
        }
        // Here we expect the provider to be a `useClass` provider (by elimination).
        const classRef = resolveForwardRef(provider && (provider.useClass || provider.provide));
        if (!classRef) {
            throwInvalidProviderError(containerType, providers, provider);
        }
    }
    function deepForEachProvider(providers, fn) {
        for (let provider of providers) {
            if (isEnvironmentProviders(provider)) {
                provider = provider.ɵproviders;
            }
            if (Array.isArray(provider)) {
                deepForEachProvider(provider, fn);
            }
            else {
                fn(provider);
            }
        }
    }
    const USE_VALUE$1 = getClosureSafeProperty({ provide: String, useValue: getClosureSafeProperty });
    function isValueProvider(value) {
        return value !== null && typeof value == 'object' && USE_VALUE$1 in value;
    }
    function isExistingProvider(value) {
        return !!(value && value.useExisting);
    }
    function isFactoryProvider(value) {
        return !!(value && value.useFactory);
    }
    function isTypeProvider(value) {
        return typeof value === 'function';
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * An internal token whose presence in an injector indicates that the injector should treat itself
     * as a root scoped injector when processing requests for unknown tokens which may indicate
     * they are provided in the root scope.
     */
    const INJECTOR_SCOPE = new InjectionToken('Set Injector scope.');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Marker which indicates that a value has not yet been created from the factory function.
     */
    const NOT_YET = {};
    /**
     * Marker which indicates that the factory function for a token is in the process of being called.
     *
     * If the injector is asked to inject a token with its value set to CIRCULAR, that indicates
     * injection of a dependency has recursively attempted to inject the original token, and there is
     * a circular dependency among the providers.
     */
    const CIRCULAR = {};
    /**
     * A lazily initialized NullInjector.
     */
    let NULL_INJECTOR$1 = undefined;
    function getNullInjector() {
        if (NULL_INJECTOR$1 === undefined) {
            NULL_INJECTOR$1 = new NullInjector();
        }
        return NULL_INJECTOR$1;
    }
    /**
     * An `Injector` that's part of the environment injector hierarchy, which exists outside of the
     * component tree.
     */
    class EnvironmentInjector {
    }
    class R3Injector extends EnvironmentInjector {
        constructor(providers, parent, source, scopes) {
            super();
            this.parent = parent;
            this.source = source;
            this.scopes = scopes;
            /**
             * Map of tokens to records which contain the instances of those tokens.
             * - `null` value implies that we don't have the record. Used by tree-shakable injectors
             * to prevent further searches.
             */
            this.records = new Map();
            /**
             * Set of values instantiated by this injector which contain `ngOnDestroy` lifecycle hooks.
             */
            this._ngOnDestroyHooks = new Set();
            this._onDestroyHooks = [];
            this._destroyed = false;
            // Start off by creating Records for every provider.
            forEachSingleProvider(providers, provider => this.processProvider(provider));
            // Make sure the INJECTOR token provides this injector.
            this.records.set(INJECTOR, makeRecord(undefined, this));
            // And `EnvironmentInjector` if the current injector is supposed to be env-scoped.
            if (scopes.has('environment')) {
                this.records.set(EnvironmentInjector, makeRecord(undefined, this));
            }
            // Detect whether this injector has the APP_ROOT_SCOPE token and thus should provide
            // any injectable scoped to APP_ROOT_SCOPE.
            const record = this.records.get(INJECTOR_SCOPE);
            if (record != null && typeof record.value === 'string') {
                this.scopes.add(record.value);
            }
            this.injectorDefTypes =
                new Set(this.get(INJECTOR_DEF_TYPES.multi, EMPTY_ARRAY, InjectFlags.Self));
        }
        /**
         * Flag indicating that this injector was previously destroyed.
         */
        get destroyed() {
            return this._destroyed;
        }
        /**
         * Destroy the injector and release references to every instance or provider associated with it.
         *
         * Also calls the `OnDestroy` lifecycle hooks of every instance that was created for which a
         * hook was found.
         */
        destroy() {
            this.assertNotDestroyed();
            // Set destroyed = true first, in case lifecycle hooks re-enter destroy().
            this._destroyed = true;
            try {
                // Call all the lifecycle hooks.
                for (const service of this._ngOnDestroyHooks) {
                    service.ngOnDestroy();
                }
                for (const hook of this._onDestroyHooks) {
                    hook();
                }
            }
            finally {
                // Release all references.
                this.records.clear();
                this._ngOnDestroyHooks.clear();
                this.injectorDefTypes.clear();
                this._onDestroyHooks.length = 0;
            }
        }
        onDestroy(callback) {
            this._onDestroyHooks.push(callback);
        }
        runInContext(fn) {
            this.assertNotDestroyed();
            const previousInjector = setCurrentInjector(this);
            const previousInjectImplementation = setInjectImplementation(undefined);
            try {
                return fn();
            }
            finally {
                setCurrentInjector(previousInjector);
                setInjectImplementation(previousInjectImplementation);
            }
        }
        get(token, notFoundValue = THROW_IF_NOT_FOUND, flags = InjectFlags.Default) {
            this.assertNotDestroyed();
            flags = convertToBitFlags(flags);
            // Set the injection context.
            const previousInjector = setCurrentInjector(this);
            const previousInjectImplementation = setInjectImplementation(undefined);
            try {
                // Check for the SkipSelf flag.
                if (!(flags & InjectFlags.SkipSelf)) {
                    // SkipSelf isn't set, check if the record belongs to this injector.
                    let record = this.records.get(token);
                    if (record === undefined) {
                        // No record, but maybe the token is scoped to this injector. Look for an injectable
                        // def with a scope matching this injector.
                        const def = couldBeInjectableType(token) && getInjectableDef(token);
                        if (def && this.injectableDefInScope(def)) {
                            // Found an injectable def and it's scoped to this injector. Pretend as if it was here
                            // all along.
                            record = makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET);
                        }
                        else {
                            record = null;
                        }
                        this.records.set(token, record);
                    }
                    // If a record was found, get the instance for it and return it.
                    if (record != null /* NOT null || undefined */) {
                        return this.hydrate(token, record);
                    }
                }
                // Select the next injector based on the Self flag - if self is set, the next injector is
                // the NullInjector, otherwise it's the parent.
                const nextInjector = !(flags & InjectFlags.Self) ? this.parent : getNullInjector();
                // Set the notFoundValue based on the Optional flag - if optional is set and notFoundValue
                // is undefined, the value is null, otherwise it's the notFoundValue.
                notFoundValue = (flags & InjectFlags.Optional) && notFoundValue === THROW_IF_NOT_FOUND ?
                    null :
                    notFoundValue;
                return nextInjector.get(token, notFoundValue);
            }
            catch (e) {
                if (e.name === 'NullInjectorError') {
                    const path = e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || [];
                    path.unshift(stringify(token));
                    if (previousInjector) {
                        // We still have a parent injector, keep throwing
                        throw e;
                    }
                    else {
                        // Format & throw the final error message when we don't have any previous injector
                        return catchInjectorError(e, token, 'R3InjectorError', this.source);
                    }
                }
                else {
                    throw e;
                }
            }
            finally {
                // Lastly, restore the previous injection context.
                setInjectImplementation(previousInjectImplementation);
                setCurrentInjector(previousInjector);
            }
        }
        /** @internal */
        resolveInjectorInitializers() {
            const previousInjector = setCurrentInjector(this);
            const previousInjectImplementation = setInjectImplementation(undefined);
            try {
                const initializers = this.get(ENVIRONMENT_INITIALIZER.multi, EMPTY_ARRAY, InjectFlags.Self);
                if (ngDevMode && !Array.isArray(initializers)) {
                    throw new RuntimeError(209 /* RuntimeErrorCode.INVALID_MULTI_PROVIDER */, 'Unexpected type of the `ENVIRONMENT_INITIALIZER` token value ' +
                        `(expected an array, but got ${typeof initializers}). ` +
                        'Please check that the `ENVIRONMENT_INITIALIZER` token is configured as a ' +
                        '`multi: true` provider.');
                }
                for (const initializer of initializers) {
                    initializer();
                }
            }
            finally {
                setCurrentInjector(previousInjector);
                setInjectImplementation(previousInjectImplementation);
            }
        }
        toString() {
            const tokens = [];
            const records = this.records;
            for (const token of records.keys()) {
                tokens.push(stringify(token));
            }
            return `R3Injector[${tokens.join(', ')}]`;
        }
        assertNotDestroyed() {
            if (this._destroyed) {
                throw new RuntimeError(205 /* RuntimeErrorCode.INJECTOR_ALREADY_DESTROYED */, ngDevMode && 'Injector has already been destroyed.');
            }
        }
        /**
         * Process a `SingleProvider` and add it.
         */
        processProvider(provider) {
            // Determine the token from the provider. Either it's its own token, or has a {provide: ...}
            // property.
            provider = resolveForwardRef(provider);
            let token = isTypeProvider(provider) ? provider : resolveForwardRef(provider && provider.provide);
            // Construct a `Record` for the provider.
            const record = providerToRecord(provider);
            if (!isTypeProvider(provider) && provider.multi === true) {
                // If the provider indicates that it's a multi-provider, process it specially.
                // First check whether it's been defined already.
                let multiRecord = this.records.get(token);
                if (multiRecord) {
                    // It has. Throw a nice error if
                    if (ngDevMode && multiRecord.multi === undefined) {
                        throwMixedMultiProviderError();
                    }
                }
                else {
                    multiRecord = makeRecord(undefined, NOT_YET, true);
                    multiRecord.factory = () => injectArgs(multiRecord.multi);
                    this.records.set(token, multiRecord);
                }
                token = provider;
                multiRecord.multi.push(provider);
            }
            else {
                const existing = this.records.get(token);
                if (ngDevMode && existing && existing.multi !== undefined) {
                    throwMixedMultiProviderError();
                }
            }
            this.records.set(token, record);
        }
        hydrate(token, record) {
            if (ngDevMode && record.value === CIRCULAR) {
                throwCyclicDependencyError(stringify(token));
            }
            else if (record.value === NOT_YET) {
                record.value = CIRCULAR;
                record.value = record.factory();
            }
            if (typeof record.value === 'object' && record.value && hasOnDestroy(record.value)) {
                this._ngOnDestroyHooks.add(record.value);
            }
            return record.value;
        }
        injectableDefInScope(def) {
            if (!def.providedIn) {
                return false;
            }
            const providedIn = resolveForwardRef(def.providedIn);
            if (typeof providedIn === 'string') {
                return providedIn === 'any' || (this.scopes.has(providedIn));
            }
            else {
                return this.injectorDefTypes.has(providedIn);
            }
        }
    }
    function injectableDefOrInjectorDefFactory(token) {
        // Most tokens will have an injectable def directly on them, which specifies a factory directly.
        const injectableDef = getInjectableDef(token);
        const factory = injectableDef !== null ? injectableDef.factory : getFactoryDef(token);
        if (factory !== null) {
            return factory;
        }
        // InjectionTokens should have an injectable def (ɵprov) and thus should be handled above.
        // If it's missing that, it's an error.
        if (token instanceof InjectionToken) {
            throw new RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode && `Token ${stringify(token)} is missing a ɵprov definition.`);
        }
        // Undecorated types can sometimes be created if they have no constructor arguments.
        if (token instanceof Function) {
            return getUndecoratedInjectableFactory(token);
        }
        // There was no way to resolve a factory for this token.
        throw new RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode && 'unreachable');
    }
    function getUndecoratedInjectableFactory(token) {
        // If the token has parameters then it has dependencies that we cannot resolve implicitly.
        const paramLength = token.length;
        if (paramLength > 0) {
            const args = newArray(paramLength, '?');
            throw new RuntimeError(204 /* RuntimeErrorCode.INVALID_INJECTION_TOKEN */, ngDevMode && `Can't resolve all parameters for ${stringify(token)}: (${args.join(', ')}).`);
        }
        // The constructor function appears to have no parameters.
        // This might be because it inherits from a super-class. In which case, use an injectable
        // def from an ancestor if there is one.
        // Otherwise this really is a simple class with no dependencies, so return a factory that
        // just instantiates the zero-arg constructor.
        const inheritedInjectableDef = getInheritedInjectableDef(token);
        if (inheritedInjectableDef !== null) {
            return () => inheritedInjectableDef.factory(token);
        }
        else {
            return () => new token();
        }
    }
    function providerToRecord(provider) {
        if (isValueProvider(provider)) {
            return makeRecord(undefined, provider.useValue);
        }
        else {
            const factory = providerToFactory(provider);
            return makeRecord(factory, NOT_YET);
        }
    }
    /**
     * Converts a `SingleProvider` into a factory function.
     *
     * @param provider provider to convert to factory
     */
    function providerToFactory(provider, ngModuleType, providers) {
        let factory = undefined;
        if (ngDevMode && isEnvironmentProviders(provider)) {
            throwInvalidProviderError(undefined, providers, provider);
        }
        if (isTypeProvider(provider)) {
            const unwrappedProvider = resolveForwardRef(provider);
            return getFactoryDef(unwrappedProvider) || injectableDefOrInjectorDefFactory(unwrappedProvider);
        }
        else {
            if (isValueProvider(provider)) {
                factory = () => resolveForwardRef(provider.useValue);
            }
            else if (isFactoryProvider(provider)) {
                factory = () => provider.useFactory(...injectArgs(provider.deps || []));
            }
            else if (isExistingProvider(provider)) {
                factory = () => ɵɵinject(resolveForwardRef(provider.useExisting));
            }
            else {
                const classRef = resolveForwardRef(provider &&
                    (provider.useClass || provider.provide));
                if (ngDevMode && !classRef) {
                    throwInvalidProviderError(ngModuleType, providers, provider);
                }
                if (hasDeps(provider)) {
                    factory = () => new (classRef)(...injectArgs(provider.deps));
                }
                else {
                    return getFactoryDef(classRef) || injectableDefOrInjectorDefFactory(classRef);
                }
            }
        }
        return factory;
    }
    function makeRecord(factory, value, multi = false) {
        return {
            factory: factory,
            value: value,
            multi: multi ? [] : undefined,
        };
    }
    function hasDeps(value) {
        return !!value.deps;
    }
    function hasOnDestroy(value) {
        return value !== null && typeof value === 'object' &&
            typeof value.ngOnDestroy === 'function';
    }
    function couldBeInjectableType(value) {
        return (typeof value === 'function') ||
            (typeof value === 'object' && value instanceof InjectionToken);
    }
    function forEachSingleProvider(providers, fn) {
        for (const provider of providers) {
            if (Array.isArray(provider)) {
                forEachSingleProvider(provider, fn);
            }
            else if (provider && isEnvironmentProviders(provider)) {
                forEachSingleProvider(provider.ɵproviders, fn);
            }
            else {
                fn(provider);
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
     * Represents a component created by a `ComponentFactory`.
     * Provides access to the component instance and related objects,
     * and provides the means of destroying the instance.
     *
     * @publicApi
     */
    class ComponentRef$1 {
    }
    /**
     * Base class for a factory that can create a component dynamically.
     * Instantiate a factory for a given type of component with `resolveComponentFactory()`.
     * Use the resulting `ComponentFactory.create()` method to create a component of that type.
     *
     * @see [Dynamic Components](guide/dynamic-component-loader)
     *
     * @publicApi
     *
     * @deprecated Angular no longer requires Component factories. Please use other APIs where
     *     Component class can be used directly.
     */
    class ComponentFactory$1 {
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function noComponentFactoryError(component) {
        const error = Error(`No component factory found for ${stringify(component)}. Did you add it to @NgModule.entryComponents?`);
        error[ERROR_COMPONENT] = component;
        return error;
    }
    const ERROR_COMPONENT = 'ngComponent';
    class _NullComponentFactoryResolver {
        resolveComponentFactory(component) {
            throw noComponentFactoryError(component);
        }
    }
    /**
     * A simple registry that maps `Components` to generated `ComponentFactory` classes
     * that can be used to create instances of components.
     * Use to obtain the factory for a given component type,
     * then use the factory's `create()` method to create a component of that type.
     *
     * Note: since v13, dynamic component creation via
     * [`ViewContainerRef.createComponent`](api/core/ViewContainerRef#createComponent)
     * does **not** require resolving component factory: component class can be used directly.
     *
     * @publicApi
     *
     * @deprecated Angular no longer requires Component factories. Please use other APIs where
     *     Component class can be used directly.
     */
    class ComponentFactoryResolver$1 {
    }
    ComponentFactoryResolver$1.NULL = ( /* @__PURE__ */new _NullComponentFactoryResolver());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Creates an ElementRef from the most recent node.
     *
     * @returns The ElementRef instance to use
     */
    function injectElementRef() {
        return createElementRef(getCurrentTNode(), getLView());
    }
    /**
     * Creates an ElementRef given a node.
     *
     * @param tNode The node for which you'd like an ElementRef
     * @param lView The view to which the node belongs
     * @returns The ElementRef instance to use
     */
    function createElementRef(tNode, lView) {
        return new ElementRef(getNativeByTNode(tNode, lView));
    }
    /**
     * A wrapper around a native element inside of a View.
     *
     * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
     * element.
     *
     * @security Permitting direct access to the DOM can make your application more vulnerable to
     * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
     * [Security Guide](https://g.co/ng/security).
     *
     * @publicApi
     */
    // Note: We don't expose things like `Injector`, `ViewContainer`, ... here,
    // i.e. users have to ask for what they need. With that, we can build better analysis tools
    // and could do better codegen in the future.
    class ElementRef {
        constructor(nativeElement) {
            this.nativeElement = nativeElement;
        }
    }
    /**
     * @internal
     * @nocollapse
     */
    ElementRef.__NG_ELEMENT_ID__ = injectElementRef;

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    new InjectionToken('Renderer2Interceptor');
    /**
     * Creates and initializes a custom renderer that implements the `Renderer2` base class.
     *
     * @publicApi
     */
    class RendererFactory2 {
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Sanitizer is used by the views to sanitize potentially dangerous values.
     *
     * @publicApi
     */
    class Sanitizer {
    }
    /** @nocollapse */
    Sanitizer.ɵprov = ɵɵdefineInjectable({
        token: Sanitizer,
        providedIn: 'root',
        factory: () => null,
    });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @description Represents the version of Angular
     *
     * @publicApi
     */
    class Version {
        constructor(full) {
            this.full = full;
            this.major = full.split('.')[0];
            this.minor = full.split('.')[1];
            this.patch = full.split('.').slice(2).join('.');
        }
    }
    /**
     * @publicApi
     */
    const VERSION = new Version('15.0.1');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // This default value is when checking the hierarchy for a token.
    //
    // It means both:
    // - the token is not provided by the current injector,
    // - only the element injectors should be checked (ie do not check module injectors
    //
    //          mod1
    //         /
    //       el1   mod2
    //         \  /
    //         el2
    //
    // When requesting el2.injector.get(token), we should check in the following order and return the
    // first found value:
    // - el2.injector.get(token, default)
    // - el1.injector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) -> do not check the module
    // - mod2.injector.get(token, default)
    const NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const ERROR_ORIGINAL_ERROR = 'ngOriginalError';
    function getOriginalError(error) {
        return error[ERROR_ORIGINAL_ERROR];
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Provides a hook for centralized exception handling.
     *
     * The default implementation of `ErrorHandler` prints error messages to the `console`. To
     * intercept error handling, write a custom exception handler that replaces this default as
     * appropriate for your app.
     *
     * @usageNotes
     * ### Example
     *
     * ```
     * class MyErrorHandler implements ErrorHandler {
     *   handleError(error) {
     *     // do something with the exception
     *   }
     * }
     *
     * @NgModule({
     *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
     * })
     * class MyModule {}
     * ```
     *
     * @publicApi
     */
    class ErrorHandler {
        constructor() {
            /**
             * @internal
             */
            this._console = console;
        }
        handleError(error) {
            const originalError = this._findOriginalError(error);
            this._console.error('ERROR', error);
            if (originalError) {
                this._console.error('ORIGINAL ERROR', originalError);
            }
        }
        /** @internal */
        _findOriginalError(error) {
            let e = error && getOriginalError(error);
            while (e && getOriginalError(e)) {
                e = getOriginalError(e);
            }
            return e || null;
        }
    }
    const NG_TEMPLATE_SELECTOR = 'ng-template';
    /**
     * Checks whether the `tNode` represents an inline template (e.g. `*ngFor`).
     *
     * @param tNode current TNode
     */
    function isInlineTemplate(tNode) {
        return tNode.type === 4 /* TNodeType.Container */ && tNode.value !== NG_TEMPLATE_SELECTOR;
    }
    function isPositive(mode) {
        return (mode & 1 /* SelectorFlags.NOT */) === 0;
    }
    function maybeWrapInNotSelector(isNegativeMode, chunk) {
        return isNegativeMode ? ':not(' + chunk.trim() + ')' : chunk;
    }
    function stringifyCSSSelector(selector) {
        let result = selector[0];
        let i = 1;
        let mode = 2 /* SelectorFlags.ATTRIBUTE */;
        let currentChunk = '';
        let isNegativeMode = false;
        while (i < selector.length) {
            let valueOrMarker = selector[i];
            if (typeof valueOrMarker === 'string') {
                if (mode & 2 /* SelectorFlags.ATTRIBUTE */) {
                    const attrValue = selector[++i];
                    currentChunk +=
                        '[' + valueOrMarker + (attrValue.length > 0 ? '="' + attrValue + '"' : '') + ']';
                }
                else if (mode & 8 /* SelectorFlags.CLASS */) {
                    currentChunk += '.' + valueOrMarker;
                }
                else if (mode & 4 /* SelectorFlags.ELEMENT */) {
                    currentChunk += ' ' + valueOrMarker;
                }
            }
            else {
                //
                // Append current chunk to the final result in case we come across SelectorFlag, which
                // indicates that the previous section of a selector is over. We need to accumulate content
                // between flags to make sure we wrap the chunk later in :not() selector if needed, e.g.
                // ```
                //  ['', Flags.CLASS, '.classA', Flags.CLASS | Flags.NOT, '.classB', '.classC']
                // ```
                // should be transformed to `.classA :not(.classB .classC)`.
                //
                // Note: for negative selector part, we accumulate content between flags until we find the
                // next negative flag. This is needed to support a case where `:not()` rule contains more than
                // one chunk, e.g. the following selector:
                // ```
                //  ['', Flags.ELEMENT | Flags.NOT, 'p', Flags.CLASS, 'foo', Flags.CLASS | Flags.NOT, 'bar']
                // ```
                // should be stringified to `:not(p.foo) :not(.bar)`
                //
                if (currentChunk !== '' && !isPositive(valueOrMarker)) {
                    result += maybeWrapInNotSelector(isNegativeMode, currentChunk);
                    currentChunk = '';
                }
                mode = valueOrMarker;
                // According to CssSelector spec, once we come across `SelectorFlags.NOT` flag, the negative
                // mode is maintained for remaining chunks of a selector.
                isNegativeMode = isNegativeMode || !isPositive(mode);
            }
            i++;
        }
        if (currentChunk !== '') {
            result += maybeWrapInNotSelector(isNegativeMode, currentChunk);
        }
        return result;
    }
    /**
     * Generates string representation of CSS selector in parsed form.
     *
     * ComponentDef and DirectiveDef are generated with the selector in parsed form to avoid doing
     * additional parsing at runtime (for example, for directive matching). However in some cases (for
     * example, while bootstrapping a component), a string version of the selector is required to query
     * for the host element on the page. This function takes the parsed form of a selector and returns
     * its string representation.
     *
     * @param selectorList selector in parsed form
     * @returns string representation of a given selector
     */
    function stringifyCSSSelectorList(selectorList) {
        return selectorList.map(stringifyCSSSelector).join(',');
    }
    /**
     * Extracts attributes and classes information from a given CSS selector.
     *
     * This function is used while creating a component dynamically. In this case, the host element
     * (that is created dynamically) should contain attributes and classes specified in component's CSS
     * selector.
     *
     * @param selector CSS selector in parsed form (in a form of array)
     * @returns object with `attrs` and `classes` fields that contain extracted information
     */
    function extractAttrsAndClassesFromSelector(selector) {
        const attrs = [];
        const classes = [];
        let i = 1;
        let mode = 2 /* SelectorFlags.ATTRIBUTE */;
        while (i < selector.length) {
            let valueOrMarker = selector[i];
            if (typeof valueOrMarker === 'string') {
                if (mode === 2 /* SelectorFlags.ATTRIBUTE */) {
                    if (valueOrMarker !== '') {
                        attrs.push(valueOrMarker, selector[++i]);
                    }
                }
                else if (mode === 8 /* SelectorFlags.CLASS */) {
                    classes.push(valueOrMarker);
                }
            }
            else {
                // According to CssSelector spec, once we come across `SelectorFlags.NOT` flag, the negative
                // mode is maintained for remaining chunks of a selector. Since attributes and classes are
                // extracted only for "positive" part of the selector, we can stop here.
                if (!isPositive(mode))
                    break;
                mode = valueOrMarker;
            }
            i++;
        }
        return { attrs, classes };
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** A special value which designates that a value has not changed. */
    const NO_CHANGE = (typeof ngDevMode === 'undefined' || ngDevMode) ? { __brand__: 'NO_CHANGE' } : {};
    function selectIndexInternal(tView, lView, index, checkNoChangesMode) {
        ngDevMode && assertIndexInDeclRange(lView, index);
        // Flush the initial hooks for elements in the view that have been added up to this point.
        // PERF WARNING: do NOT extract this to a separate function without running benchmarks
        if (!checkNoChangesMode) {
            const hooksInitPhaseCompleted = (lView[FLAGS] & 3 /* LViewFlags.InitPhaseStateMask */) === 3 /* InitPhaseState.InitPhaseCompleted */;
            if (hooksInitPhaseCompleted) {
                const preOrderCheckHooks = tView.preOrderCheckHooks;
                if (preOrderCheckHooks !== null) {
                    executeCheckHooks(lView, preOrderCheckHooks, index);
                }
            }
            else {
                const preOrderHooks = tView.preOrderHooks;
                if (preOrderHooks !== null) {
                    executeInitAndCheckHooks(lView, preOrderHooks, 0 /* InitPhaseState.OnInitHooksToBeRun */, index);
                }
            }
        }
        // We must set the selected index *after* running the hooks, because hooks may have side-effects
        // that cause other template functions to run, thus updating the selected index, which is global
        // state. If we run `setSelectedIndex` *before* we run the hooks, in some cases the selected index
        // will be altered by the time we leave the `ɵɵadvance` instruction.
        setSelectedIndex(index);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A mapping of the @angular/core API surface used in generated expressions to the actual symbols.
     *
     * This should be kept up to date with the public exports of @angular/core.
     */
    const angularCoreDiEnv = {
        'ɵɵdefineInjectable': ɵɵdefineInjectable,
        'ɵɵdefineInjector': ɵɵdefineInjector,
        'ɵɵinject': ɵɵinject,
        'ɵɵinvalidFactoryDep': ɵɵinvalidFactoryDep,
        'resolveForwardRef': resolveForwardRef,
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Compile an Angular injectable according to its `Injectable` metadata, and patch the resulting
     * injectable def (`ɵprov`) onto the injectable type.
     */
    function compileInjectable(type, meta) {
        let ngInjectableDef = null;
        let ngFactoryDef = null;
        // if NG_PROV_DEF is already defined on this class then don't overwrite it
        if (!type.hasOwnProperty(NG_PROV_DEF)) {
            Object.defineProperty(type, NG_PROV_DEF, {
                get: () => {
                    if (ngInjectableDef === null) {
                        const compiler = getCompilerFacade({ usage: 0 /* JitCompilerUsage.Decorator */, kind: 'injectable', type });
                        ngInjectableDef = compiler.compileInjectable(angularCoreDiEnv, `ng:///${type.name}/ɵprov.js`, getInjectableMetadata(type, meta));
                    }
                    return ngInjectableDef;
                },
            });
        }
        // if NG_FACTORY_DEF is already defined on this class then don't overwrite it
        if (!type.hasOwnProperty(NG_FACTORY_DEF)) {
            Object.defineProperty(type, NG_FACTORY_DEF, {
                get: () => {
                    if (ngFactoryDef === null) {
                        const compiler = getCompilerFacade({ usage: 0 /* JitCompilerUsage.Decorator */, kind: 'injectable', type });
                        ngFactoryDef = compiler.compileFactory(angularCoreDiEnv, `ng:///${type.name}/ɵfac.js`, {
                            name: type.name,
                            type,
                            typeArgumentCount: 0,
                            deps: reflectDependencies(type),
                            target: compiler.FactoryTarget.Injectable
                        });
                    }
                    return ngFactoryDef;
                },
                // Leave this configurable so that the factories from directives or pipes can take precedence.
                configurable: true
            });
        }
    }
    const USE_VALUE = getClosureSafeProperty({ provide: String, useValue: getClosureSafeProperty });
    function isUseClassProvider(meta) {
        return meta.useClass !== undefined;
    }
    function isUseValueProvider(meta) {
        return USE_VALUE in meta;
    }
    function isUseFactoryProvider(meta) {
        return meta.useFactory !== undefined;
    }
    function isUseExistingProvider(meta) {
        return meta.useExisting !== undefined;
    }
    function getInjectableMetadata(type, srcMeta) {
        // Allow the compilation of a class with a `@Injectable()` decorator without parameters
        const meta = srcMeta || { providedIn: null };
        const compilerMeta = {
            name: type.name,
            type: type,
            typeArgumentCount: 0,
            providedIn: meta.providedIn,
        };
        if ((isUseClassProvider(meta) || isUseFactoryProvider(meta)) && meta.deps !== undefined) {
            compilerMeta.deps = convertDependencies(meta.deps);
        }
        // Check to see if the user explicitly provided a `useXxxx` property.
        if (isUseClassProvider(meta)) {
            compilerMeta.useClass = meta.useClass;
        }
        else if (isUseValueProvider(meta)) {
            compilerMeta.useValue = meta.useValue;
        }
        else if (isUseFactoryProvider(meta)) {
            compilerMeta.useFactory = meta.useFactory;
        }
        else if (isUseExistingProvider(meta)) {
            compilerMeta.useExisting = meta.useExisting;
        }
        return compilerMeta;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Injectable decorator and metadata.
     *
     * @Annotation
     * @publicApi
     */
    makeDecorator('Injectable', undefined, undefined, undefined, (type, meta) => compileInjectable(type, meta));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Create a new `Injector` which is configured using a `defType` of `InjectorType<any>`s.
     *
     * @publicApi
     */
    function createInjector(defType, parent = null, additionalProviders = null, name) {
        const injector = createInjectorWithoutInjectorInstances(defType, parent, additionalProviders, name);
        injector.resolveInjectorInitializers();
        return injector;
    }
    /**
     * Creates a new injector without eagerly resolving its injector types. Can be used in places
     * where resolving the injector types immediately can lead to an infinite loop. The injector types
     * should be resolved at a later point by calling `_resolveInjectorDefTypes`.
     */
    function createInjectorWithoutInjectorInstances(defType, parent = null, additionalProviders = null, name, scopes = new Set()) {
        const providers = [
            additionalProviders || EMPTY_ARRAY,
            importProvidersFrom(defType),
        ];
        name = name || (typeof defType === 'object' ? undefined : stringify(defType));
        return new R3Injector(providers, parent || getNullInjector(), name || null, scopes);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Concrete injectors implement this interface. Injectors are configured
     * with [providers](guide/glossary#provider) that associate
     * dependencies of various types with [injection tokens](guide/glossary#di-token).
     *
     * @see ["DI Providers"](guide/dependency-injection-providers).
     * @see `StaticProvider`
     *
     * @usageNotes
     *
     *  The following example creates a service injector instance.
     *
     * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
     *
     * ### Usage example
     *
     * {@example core/di/ts/injector_spec.ts region='Injector'}
     *
     * `Injector` returns itself when given `Injector` as a token:
     *
     * {@example core/di/ts/injector_spec.ts region='injectInjector'}
     *
     * @publicApi
     */
    class Injector {
        static create(options, parent) {
            var _a;
            if (Array.isArray(options)) {
                return createInjector({ name: '' }, parent, options, '');
            }
            else {
                const name = (_a = options.name) !== null && _a !== void 0 ? _a : '';
                return createInjector({ name }, options.parent, options.providers, name);
            }
        }
    }
    Injector.THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND;
    Injector.NULL = ( /* @__PURE__ */new NullInjector());
    /** @nocollapse */
    Injector.ɵprov = ɵɵdefineInjectable({
        token: Injector,
        providedIn: 'any',
        factory: () => ɵɵinject(INJECTOR),
    });
    /**
     * @internal
     * @nocollapse
     */
    Injector.__NG_ELEMENT_ID__ = -1 /* InjectorMarkers.Injector */;

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
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function ɵɵdirectiveInject(token, flags = InjectFlags.Default) {
        const lView = getLView();
        // Fall back to inject() if view hasn't been created. This situation can happen in tests
        // if inject utilities are used before bootstrapping.
        if (lView === null) {
            // Verify that we will not get into infinite loop.
            ngDevMode && assertInjectImplementationNotEqual(ɵɵdirectiveInject);
            return ɵɵinject(token, flags);
        }
        const tNode = getCurrentTNode();
        return getOrCreateInjectable(tNode, lView, resolveForwardRef(token), flags);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * THIS FILE CONTAINS CODE WHICH SHOULD BE TREE SHAKEN AND NEVER CALLED FROM PRODUCTION CODE!!!
     */
    /**
     * Creates an `Array` construction with a given name. This is useful when
     * looking for memory consumption to see what time of array it is.
     *
     *
     * @param name Name to give to the constructor
     * @returns A subclass of `Array` if possible. This can only be done in
     *          environments which support `class` construct.
     */
    function createNamedArrayType(name) {
        // This should never be called in prod mode, so let's verify that is the case.
        if (ngDevMode) {
            try {
                // If this function were compromised the following could lead to arbitrary
                // script execution. We bless it with Trusted Types anyway since this
                // function is stripped out of production binaries.
                return (newTrustedFunctionForDev('Array', `return class ${name} extends Array{}`))(Array);
            }
            catch (e) {
                // If it does not work just give up and fall back to regular Array.
                return Array;
            }
        }
        else {
            throw new Error('Looks like we are in \'prod mode\', but we are creating a named Array type, which is wrong! Check your code');
        }
    }
    function getTStylingRangePrev(tStylingRange) {
        ngDevMode && assertNumber(tStylingRange, 'expected number');
        return (tStylingRange >> 17 /* StylingRange.PREV_SHIFT */) & 32767 /* StylingRange.UNSIGNED_MASK */;
    }
    function getTStylingRangePrevDuplicate(tStylingRange) {
        ngDevMode && assertNumber(tStylingRange, 'expected number');
        return (tStylingRange & 2 /* StylingRange.PREV_DUPLICATE */) ==
            2 /* StylingRange.PREV_DUPLICATE */;
    }
    function getTStylingRangeNext(tStylingRange) {
        ngDevMode && assertNumber(tStylingRange, 'expected number');
        return (tStylingRange & 131068 /* StylingRange.NEXT_MASK */) >> 2 /* StylingRange.NEXT_SHIFT */;
    }
    function getTStylingRangeNextDuplicate(tStylingRange) {
        ngDevMode && assertNumber(tStylingRange, 'expected number');
        return (tStylingRange & 1 /* StylingRange.NEXT_DUPLICATE */) ===
            1 /* StylingRange.NEXT_DUPLICATE */;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Patch a `debug` property on top of the existing object.
     *
     * NOTE: always call this method with `ngDevMode && attachDebugObject(...)`
     *
     * @param obj Object to patch
     * @param debug Value to patch
     */
    function attachDebugObject(obj, debug) {
        if (ngDevMode) {
            Object.defineProperty(obj, 'debug', { value: debug, enumerable: false });
        }
        else {
            throw new Error('This method should be guarded with `ngDevMode` so that it can be tree shaken in production!');
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /*
     * This file contains conditionally attached classes which provide human readable (debug) level
     * information for `LView`, `LContainer` and other internal data structures. These data structures
     * are stored internally as array which makes it very difficult during debugging to reason about the
     * current state of the system.
     *
     * Patching the array with extra property does change the array's hidden class' but it does not
     * change the cost of access, therefore this patching should not have significant if any impact in
     * `ngDevMode` mode. (see: https://jsperf.com/array-vs-monkey-patch-array)
     *
     * So instead of seeing:
     * ```
     * Array(30) [Object, 659, null, …]
     * ```
     *
     * You get to see:
     * ```
     * LViewDebug {
     *   views: [...],
     *   flags: {attached: true, ...}
     *   nodes: [
     *     {html: '<div id="123">', ..., nodes: [
     *       {html: '<span>', ..., nodes: null}
     *     ]}
     *   ]
     * }
     * ```
     */
    let LVIEW_COMPONENT_CACHE;
    let LVIEW_EMBEDDED_CACHE;
    let LVIEW_ROOT;
    let LVIEW_COMPONENT;
    let LVIEW_EMBEDDED;
    /**
     * This function clones a blueprint and creates LView.
     *
     * Simple slice will keep the same type, and we need it to be LView
     */
    function cloneToLViewFromTViewBlueprint(tView) {
        const debugTView = tView;
        const lView = getLViewToClone(debugTView.type, tView.template && tView.template.name);
        return lView.concat(tView.blueprint);
    }
    class LRootView extends Array {
    }
    class LComponentView extends Array {
    }
    class LEmbeddedView extends Array {
    }
    function getLViewToClone(type, name) {
        switch (type) {
            case 0 /* TViewType.Root */:
                if (LVIEW_ROOT === undefined)
                    LVIEW_ROOT = new LRootView();
                return LVIEW_ROOT;
            case 1 /* TViewType.Component */:
                if (!ngDevMode || !ngDevMode.namedConstructors) {
                    if (LVIEW_COMPONENT === undefined)
                        LVIEW_COMPONENT = new LComponentView();
                    return LVIEW_COMPONENT;
                }
                if (LVIEW_COMPONENT_CACHE === undefined)
                    LVIEW_COMPONENT_CACHE = new Map();
                let componentArray = LVIEW_COMPONENT_CACHE.get(name);
                if (componentArray === undefined) {
                    componentArray = new (createNamedArrayType('LComponentView' + nameSuffix(name)))();
                    LVIEW_COMPONENT_CACHE.set(name, componentArray);
                }
                return componentArray;
            case 2 /* TViewType.Embedded */:
                if (!ngDevMode || !ngDevMode.namedConstructors) {
                    if (LVIEW_EMBEDDED === undefined)
                        LVIEW_EMBEDDED = new LEmbeddedView();
                    return LVIEW_EMBEDDED;
                }
                if (LVIEW_EMBEDDED_CACHE === undefined)
                    LVIEW_EMBEDDED_CACHE = new Map();
                let embeddedArray = LVIEW_EMBEDDED_CACHE.get(name);
                if (embeddedArray === undefined) {
                    embeddedArray = new (createNamedArrayType('LEmbeddedView' + nameSuffix(name)))();
                    LVIEW_EMBEDDED_CACHE.set(name, embeddedArray);
                }
                return embeddedArray;
        }
    }
    function nameSuffix(text) {
        if (text == null)
            return '';
        const index = text.lastIndexOf('_Template');
        return '_' + (index === -1 ? text : text.slice(0, index));
    }
    /**
     * This class is a debug version of Object literal so that we can have constructor name show up
     * in
     * debug tools in ngDevMode.
     */
    const TViewConstructor = class TView {
        constructor(type, blueprint, template, queries, viewQuery, declTNode, data, bindingStartIndex, expandoStartIndex, hostBindingOpCodes, firstCreatePass, firstUpdatePass, staticViewQueries, staticContentQueries, preOrderHooks, preOrderCheckHooks, contentHooks, contentCheckHooks, viewHooks, viewCheckHooks, destroyHooks, cleanup, contentQueries, components, directiveRegistry, pipeRegistry, firstChild, schemas, consts, incompleteFirstPass, _decls, _vars) {
            this.type = type;
            this.blueprint = blueprint;
            this.template = template;
            this.queries = queries;
            this.viewQuery = viewQuery;
            this.declTNode = declTNode;
            this.data = data;
            this.bindingStartIndex = bindingStartIndex;
            this.expandoStartIndex = expandoStartIndex;
            this.hostBindingOpCodes = hostBindingOpCodes;
            this.firstCreatePass = firstCreatePass;
            this.firstUpdatePass = firstUpdatePass;
            this.staticViewQueries = staticViewQueries;
            this.staticContentQueries = staticContentQueries;
            this.preOrderHooks = preOrderHooks;
            this.preOrderCheckHooks = preOrderCheckHooks;
            this.contentHooks = contentHooks;
            this.contentCheckHooks = contentCheckHooks;
            this.viewHooks = viewHooks;
            this.viewCheckHooks = viewCheckHooks;
            this.destroyHooks = destroyHooks;
            this.cleanup = cleanup;
            this.contentQueries = contentQueries;
            this.components = components;
            this.directiveRegistry = directiveRegistry;
            this.pipeRegistry = pipeRegistry;
            this.firstChild = firstChild;
            this.schemas = schemas;
            this.consts = consts;
            this.incompleteFirstPass = incompleteFirstPass;
            this._decls = _decls;
            this._vars = _vars;
        }
        get template_() {
            const buf = [];
            processTNodeChildren(this.firstChild, buf);
            return buf.join('');
        }
        get type_() {
            return TViewTypeAsString[this.type] || `TViewType.?${this.type}?`;
        }
    };
    class TNode {
        constructor(tView_, //
        type, //
        index, //
        insertBeforeIndex, //
        injectorIndex, //
        componentOffset, //
        directiveStart, //
        directiveEnd, //
        directiveStylingLast, //
        propertyBindings, //
        flags, //
        providerIndexes, //
        value, //
        attrs, //
        mergedAttrs, //
        localNames, //
        initialInputs, //
        inputs, //
        outputs, //
        tViews, //
        next, //
        projectionNext, //
        child, //
        parent, //
        projection, //
        styles, //
        stylesWithoutHost, //
        residualStyles, //
        classes, //
        classesWithoutHost, //
        residualClasses, //
        classBindings, //
        styleBindings) {
            this.tView_ = tView_;
            this.type = type;
            this.index = index;
            this.insertBeforeIndex = insertBeforeIndex;
            this.injectorIndex = injectorIndex;
            this.componentOffset = componentOffset;
            this.directiveStart = directiveStart;
            this.directiveEnd = directiveEnd;
            this.directiveStylingLast = directiveStylingLast;
            this.propertyBindings = propertyBindings;
            this.flags = flags;
            this.providerIndexes = providerIndexes;
            this.value = value;
            this.attrs = attrs;
            this.mergedAttrs = mergedAttrs;
            this.localNames = localNames;
            this.initialInputs = initialInputs;
            this.inputs = inputs;
            this.outputs = outputs;
            this.tViews = tViews;
            this.next = next;
            this.projectionNext = projectionNext;
            this.child = child;
            this.parent = parent;
            this.projection = projection;
            this.styles = styles;
            this.stylesWithoutHost = stylesWithoutHost;
            this.residualStyles = residualStyles;
            this.classes = classes;
            this.classesWithoutHost = classesWithoutHost;
            this.residualClasses = residualClasses;
            this.classBindings = classBindings;
            this.styleBindings = styleBindings;
        }
        /**
         * Return a human debug version of the set of `NodeInjector`s which will be consulted when
         * resolving tokens from this `TNode`.
         *
         * When debugging applications, it is often difficult to determine which `NodeInjector`s will be
         * consulted. This method shows a list of `DebugNode`s representing the `TNode`s which will be
         * consulted in order when resolving a token starting at this `TNode`.
         *
         * The original data is stored in `LView` and `TView` with a lot of offset indexes, and so it is
         * difficult to reason about.
         *
         * @param lView The `LView` instance for this `TNode`.
         */
        debugNodeInjectorPath(lView) {
            const path = [];
            let injectorIndex = getInjectorIndex(this, lView);
            if (injectorIndex === -1) {
                // Looks like the current `TNode` does not have `NodeInjector` associated with it => look for
                // parent NodeInjector.
                const parentLocation = getParentInjectorLocation(this, lView);
                if (parentLocation !== NO_PARENT_INJECTOR) {
                    // We found a parent, so start searching from the parent location.
                    injectorIndex = getParentInjectorIndex(parentLocation);
                    lView = getParentInjectorView(parentLocation, lView);
                }
            }
            while (injectorIndex !== -1) {
                ngDevMode && assertNodeInjector(lView, injectorIndex);
                const tNode = lView[TVIEW].data[injectorIndex + 8 /* NodeInjectorOffset.TNODE */];
                path.push(buildDebugNode(tNode, lView));
                const parentLocation = lView[injectorIndex + 8 /* NodeInjectorOffset.PARENT */];
                if (parentLocation === NO_PARENT_INJECTOR) {
                    injectorIndex = -1;
                }
                else {
                    injectorIndex = getParentInjectorIndex(parentLocation);
                    lView = getParentInjectorView(parentLocation, lView);
                }
            }
            return path;
        }
        get type_() {
            return toTNodeTypeAsString(this.type) || `TNodeType.?${this.type}?`;
        }
        get flags_() {
            const flags = [];
            if (this.flags & 8 /* TNodeFlags.hasClassInput */)
                flags.push('TNodeFlags.hasClassInput');
            if (this.flags & 4 /* TNodeFlags.hasContentQuery */)
                flags.push('TNodeFlags.hasContentQuery');
            if (this.flags & 16 /* TNodeFlags.hasStyleInput */)
                flags.push('TNodeFlags.hasStyleInput');
            if (this.flags & 64 /* TNodeFlags.hasHostBindings */)
                flags.push('TNodeFlags.hasHostBindings');
            if (this.flags & 1 /* TNodeFlags.isDirectiveHost */)
                flags.push('TNodeFlags.isDirectiveHost');
            if (this.flags & 32 /* TNodeFlags.isDetached */)
                flags.push('TNodeFlags.isDetached');
            if (this.flags & 2 /* TNodeFlags.isProjected */)
                flags.push('TNodeFlags.isProjected');
            return flags.join('|');
        }
        get template_() {
            if (this.type & 1 /* TNodeType.Text */)
                return this.value;
            const buf = [];
            const tagName = typeof this.value === 'string' && this.value || this.type_;
            buf.push('<', tagName);
            if (this.flags) {
                buf.push(' ', this.flags_);
            }
            if (this.attrs) {
                for (let i = 0; i < this.attrs.length;) {
                    const attrName = this.attrs[i++];
                    if (typeof attrName == 'number') {
                        break;
                    }
                    const attrValue = this.attrs[i++];
                    buf.push(' ', attrName, '="', attrValue, '"');
                }
            }
            buf.push('>');
            processTNodeChildren(this.child, buf);
            buf.push('</', tagName, '>');
            return buf.join('');
        }
        get styleBindings_() {
            return toDebugStyleBinding(this, false);
        }
        get classBindings_() {
            return toDebugStyleBinding(this, true);
        }
        get providerIndexStart_() {
            return this.providerIndexes & 1048575 /* TNodeProviderIndexes.ProvidersStartIndexMask */;
        }
        get providerIndexEnd_() {
            return this.providerIndexStart_ +
                (this.providerIndexes >>> 20 /* TNodeProviderIndexes.CptViewProvidersCountShift */);
        }
    }
    const TNodeDebug = TNode;
    function toDebugStyleBinding(tNode, isClassBased) {
        const tData = tNode.tView_.data;
        const bindings = [];
        const range = isClassBased ? tNode.classBindings : tNode.styleBindings;
        const prev = getTStylingRangePrev(range);
        const next = getTStylingRangeNext(range);
        let isTemplate = next !== 0;
        let cursor = isTemplate ? next : prev;
        while (cursor !== 0) {
            const itemKey = tData[cursor];
            const itemRange = tData[cursor + 1];
            bindings.unshift({
                key: itemKey,
                index: cursor,
                isTemplate: isTemplate,
                prevDuplicate: getTStylingRangePrevDuplicate(itemRange),
                nextDuplicate: getTStylingRangeNextDuplicate(itemRange),
                nextIndex: getTStylingRangeNext(itemRange),
                prevIndex: getTStylingRangePrev(itemRange),
            });
            if (cursor === prev)
                isTemplate = false;
            cursor = getTStylingRangePrev(itemRange);
        }
        bindings.push((isClassBased ? tNode.residualClasses : tNode.residualStyles) || null);
        return bindings;
    }
    function processTNodeChildren(tNode, buf) {
        while (tNode) {
            buf.push(tNode.template_);
            tNode = tNode.next;
        }
    }
    class TViewData extends Array {
    }
    let TVIEWDATA_EMPTY; // can't initialize here or it will not be tree shaken, because
    // `LView` constructor could have side-effects.
    /**
     * This function clones a blueprint and creates TData.
     *
     * Simple slice will keep the same type, and we need it to be TData
     */
    function cloneToTViewData(list) {
        if (TVIEWDATA_EMPTY === undefined)
            TVIEWDATA_EMPTY = new TViewData();
        return TVIEWDATA_EMPTY.concat(list);
    }
    class LViewBlueprint extends Array {
    }
    class TViewComponents extends Array {
    }
    class TNodeInitialInputs extends Array {
    }
    class LCleanup extends Array {
    }
    class TCleanup extends Array {
    }
    function attachLViewDebug(lView) {
        attachDebugObject(lView, new LViewDebug(lView));
    }
    function toDebug(obj) {
        if (obj) {
            const debug = obj.debug;
            assertDefined(debug, 'Object does not have a debug representation.');
            return debug;
        }
        else {
            return obj;
        }
    }
    /**
     * Use this method to unwrap a native element in `LView` and convert it into HTML for easier
     * reading.
     *
     * @param value possibly wrapped native DOM node.
     * @param includeChildren If `true` then the serialized HTML form will include child elements
     * (same
     * as `outerHTML`). If `false` then the serialized HTML form will only contain the element
     * itself
     * (will not serialize child elements).
     */
    function toHtml(value, includeChildren = false) {
        const node = unwrapRNode(value);
        if (node) {
            switch (node.nodeType) {
                case Node.TEXT_NODE:
                    return node.textContent;
                case Node.COMMENT_NODE:
                    return `<!--${node.textContent}-->`;
                case Node.ELEMENT_NODE:
                    const outerHTML = node.outerHTML;
                    if (includeChildren) {
                        return outerHTML;
                    }
                    else {
                        const innerHTML = '>' + node.innerHTML + '<';
                        return (outerHTML.split(innerHTML)[0]) + '>';
                    }
            }
        }
        return null;
    }
    class LViewDebug {
        constructor(_raw_lView) {
            this._raw_lView = _raw_lView;
        }
        /**
         * Flags associated with the `LView` unpacked into a more readable state.
         */
        get flags() {
            const flags = this._raw_lView[FLAGS];
            return {
                __raw__flags__: flags,
                initPhaseState: flags & 3 /* LViewFlags.InitPhaseStateMask */,
                creationMode: !!(flags & 4 /* LViewFlags.CreationMode */),
                firstViewPass: !!(flags & 8 /* LViewFlags.FirstLViewPass */),
                checkAlways: !!(flags & 16 /* LViewFlags.CheckAlways */),
                dirty: !!(flags & 32 /* LViewFlags.Dirty */),
                attached: !!(flags & 64 /* LViewFlags.Attached */),
                destroyed: !!(flags & 128 /* LViewFlags.Destroyed */),
                isRoot: !!(flags & 256 /* LViewFlags.IsRoot */),
                indexWithinInitPhase: flags >> 11 /* LViewFlags.IndexWithinInitPhaseShift */,
            };
        }
        get parent() {
            return toDebug(this._raw_lView[PARENT]);
        }
        get hostHTML() {
            return toHtml(this._raw_lView[HOST], true);
        }
        get html() {
            return (this.nodes || []).map(mapToHTML).join('');
        }
        get context() {
            return this._raw_lView[CONTEXT];
        }
        /**
         * The tree of nodes associated with the current `LView`. The nodes have been normalized into
         * a tree structure with relevant details pulled out for readability.
         */
        get nodes() {
            const lView = this._raw_lView;
            const tNode = lView[TVIEW].firstChild;
            return toDebugNodes(tNode, lView);
        }
        get template() {
            return this.tView.template_;
        }
        get tView() {
            return this._raw_lView[TVIEW];
        }
        get cleanup() {
            return this._raw_lView[CLEANUP];
        }
        get injector() {
            return this._raw_lView[INJECTOR$1];
        }
        get rendererFactory() {
            return this._raw_lView[RENDERER_FACTORY];
        }
        get renderer() {
            return this._raw_lView[RENDERER];
        }
        get sanitizer() {
            return this._raw_lView[SANITIZER];
        }
        get childHead() {
            return toDebug(this._raw_lView[CHILD_HEAD]);
        }
        get next() {
            return toDebug(this._raw_lView[NEXT]);
        }
        get childTail() {
            return toDebug(this._raw_lView[CHILD_TAIL]);
        }
        get declarationView() {
            return toDebug(this._raw_lView[DECLARATION_VIEW]);
        }
        get queries() {
            return this._raw_lView[QUERIES];
        }
        get tHost() {
            return this._raw_lView[T_HOST];
        }
        get id() {
            return this._raw_lView[ID];
        }
        get decls() {
            return toLViewRange(this.tView, this._raw_lView, HEADER_OFFSET, this.tView.bindingStartIndex);
        }
        get vars() {
            return toLViewRange(this.tView, this._raw_lView, this.tView.bindingStartIndex, this.tView.expandoStartIndex);
        }
        get expando() {
            return toLViewRange(this.tView, this._raw_lView, this.tView.expandoStartIndex, this._raw_lView.length);
        }
        /**
         * Normalized view of child views (and containers) attached at this location.
         */
        get childViews() {
            const childViews = [];
            let child = this.childHead;
            while (child) {
                childViews.push(child);
                child = child.next;
            }
            return childViews;
        }
    }
    function mapToHTML(node) {
        if (node.type === 'ElementContainer') {
            return (node.children || []).map(mapToHTML).join('');
        }
        else if (node.type === 'IcuContainer') {
            throw new Error('Not implemented');
        }
        else {
            return toHtml(node.native, true) || '';
        }
    }
    function toLViewRange(tView, lView, start, end) {
        let content = [];
        for (let index = start; index < end; index++) {
            content.push({ index: index, t: tView.data[index], l: lView[index] });
        }
        return { start: start, end: end, length: end - start, content: content };
    }
    /**
     * Turns a flat list of nodes into a tree by walking the associated `TNode` tree.
     *
     * @param tNode
     * @param lView
     */
    function toDebugNodes(tNode, lView) {
        if (tNode) {
            const debugNodes = [];
            let tNodeCursor = tNode;
            while (tNodeCursor) {
                debugNodes.push(buildDebugNode(tNodeCursor, lView));
                tNodeCursor = tNodeCursor.next;
            }
            return debugNodes;
        }
        else {
            return [];
        }
    }
    function buildDebugNode(tNode, lView) {
        const rawValue = lView[tNode.index];
        const native = unwrapRNode(rawValue);
        const factories = [];
        const instances = [];
        const tView = lView[TVIEW];
        for (let i = tNode.directiveStart; i < tNode.directiveEnd; i++) {
            const def = tView.data[i];
            factories.push(def.type);
            instances.push(lView[i]);
        }
        return {
            html: toHtml(native),
            type: toTNodeTypeAsString(tNode.type),
            tNode,
            native: native,
            children: toDebugNodes(tNode.child, lView),
            factories,
            instances,
            injector: buildNodeInjectorDebug(tNode, tView, lView),
            get injectorResolutionPath() {
                return tNode.debugNodeInjectorPath(lView);
            },
        };
    }
    function buildNodeInjectorDebug(tNode, tView, lView) {
        const viewProviders = [];
        for (let i = tNode.providerIndexStart_; i < tNode.providerIndexEnd_; i++) {
            viewProviders.push(tView.data[i]);
        }
        const providers = [];
        for (let i = tNode.providerIndexEnd_; i < tNode.directiveEnd; i++) {
            providers.push(tView.data[i]);
        }
        const nodeInjectorDebug = {
            bloom: toBloom(lView, tNode.injectorIndex),
            cumulativeBloom: toBloom(tView.data, tNode.injectorIndex),
            providers,
            viewProviders,
            parentInjectorIndex: lView[tNode.providerIndexStart_ - 1],
        };
        return nodeInjectorDebug;
    }
    /**
     * Convert a number at `idx` location in `array` into binary representation.
     *
     * @param array
     * @param idx
     */
    function binary(array, idx) {
        const value = array[idx];
        // If not a number we print 8 `?` to retain alignment but let user know that it was called on
        // wrong type.
        if (typeof value !== 'number')
            return '????????';
        // We prefix 0s so that we have constant length number
        const text = '00000000' + value.toString(2);
        return text.substring(text.length - 8);
    }
    /**
     * Convert a bloom filter at location `idx` in `array` into binary representation.
     *
     * @param array
     * @param idx
     */
    function toBloom(array, idx) {
        if (idx < 0) {
            return 'NO_NODE_INJECTOR';
        }
        return `${binary(array, idx + 7)}_${binary(array, idx + 6)}_${binary(array, idx + 5)}_${binary(array, idx + 4)}_${binary(array, idx + 3)}_${binary(array, idx + 2)}_${binary(array, idx + 1)}_${binary(array, idx + 0)}`;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Invoke `HostBindingsFunction`s for view.
     *
     * This methods executes `TView.hostBindingOpCodes`. It is used to execute the
     * `HostBindingsFunction`s associated with the current `LView`.
     *
     * @param tView Current `TView`.
     * @param lView Current `LView`.
     */
    function processHostBindingOpCodes(tView, lView) {
        const hostBindingOpCodes = tView.hostBindingOpCodes;
        if (hostBindingOpCodes === null)
            return;
        try {
            for (let i = 0; i < hostBindingOpCodes.length; i++) {
                const opCode = hostBindingOpCodes[i];
                if (opCode < 0) {
                    // Negative numbers are element indexes.
                    setSelectedIndex(~opCode);
                }
                else {
                    // Positive numbers are NumberTuple which store bindingRootIndex and directiveIndex.
                    const directiveIdx = opCode;
                    const bindingRootIndx = hostBindingOpCodes[++i];
                    const hostBindingFn = hostBindingOpCodes[++i];
                    setBindingRootForHostBindings(bindingRootIndx, directiveIdx);
                    const context = lView[directiveIdx];
                    hostBindingFn(2 /* RenderFlags.Update */, context);
                }
            }
        }
        finally {
            setSelectedIndex(-1);
        }
    }
    /** Refreshes all content queries declared by directives in a given view */
    function refreshContentQueries(tView, lView) {
        const contentQueries = tView.contentQueries;
        if (contentQueries !== null) {
            for (let i = 0; i < contentQueries.length; i += 2) {
                const queryStartIdx = contentQueries[i];
                const directiveDefIdx = contentQueries[i + 1];
                if (directiveDefIdx !== -1) {
                    const directiveDef = tView.data[directiveDefIdx];
                    ngDevMode && assertDefined(directiveDef, 'DirectiveDef not found.');
                    ngDevMode &&
                        assertDefined(directiveDef.contentQueries, 'contentQueries function should be defined');
                    setCurrentQueryIndex(queryStartIdx);
                    directiveDef.contentQueries(2 /* RenderFlags.Update */, lView[directiveDefIdx], directiveDefIdx);
                }
            }
        }
    }
    /** Refreshes child components in the current view (update mode). */
    function refreshChildComponents(hostLView, components) {
        for (let i = 0; i < components.length; i++) {
            refreshComponent(hostLView, components[i]);
        }
    }
    /** Renders child components in the current view (creation mode). */
    function renderChildComponents(hostLView, components) {
        for (let i = 0; i < components.length; i++) {
            renderComponent(hostLView, components[i]);
        }
    }
    function createLView(parentLView, tView, context, flags, host, tHostNode, rendererFactory, renderer, sanitizer, injector, embeddedViewInjector) {
        const lView = ngDevMode ? cloneToLViewFromTViewBlueprint(tView) : tView.blueprint.slice();
        lView[HOST] = host;
        lView[FLAGS] = flags | 4 /* LViewFlags.CreationMode */ | 64 /* LViewFlags.Attached */ | 8 /* LViewFlags.FirstLViewPass */;
        if (embeddedViewInjector !== null ||
            (parentLView && (parentLView[FLAGS] & 1024 /* LViewFlags.HasEmbeddedViewInjector */))) {
            lView[FLAGS] |= 1024 /* LViewFlags.HasEmbeddedViewInjector */;
        }
        resetPreOrderHookFlags(lView);
        ngDevMode && tView.declTNode && parentLView && assertTNodeForLView(tView.declTNode, parentLView);
        lView[PARENT] = lView[DECLARATION_VIEW] = parentLView;
        lView[CONTEXT] = context;
        lView[RENDERER_FACTORY] = (rendererFactory || parentLView && parentLView[RENDERER_FACTORY]);
        ngDevMode && assertDefined(lView[RENDERER_FACTORY], 'RendererFactory is required');
        lView[RENDERER] = (renderer || parentLView && parentLView[RENDERER]);
        ngDevMode && assertDefined(lView[RENDERER], 'Renderer is required');
        lView[SANITIZER] = sanitizer || parentLView && parentLView[SANITIZER] || null;
        lView[INJECTOR$1] = injector || parentLView && parentLView[INJECTOR$1] || null;
        lView[T_HOST] = tHostNode;
        lView[ID] = getUniqueLViewId();
        lView[EMBEDDED_VIEW_INJECTOR] = embeddedViewInjector;
        ngDevMode &&
            assertEqual(tView.type == 2 /* TViewType.Embedded */ ? parentLView !== null : true, true, 'Embedded views must have parentLView');
        lView[DECLARATION_COMPONENT_VIEW] =
            tView.type == 2 /* TViewType.Embedded */ ? parentLView[DECLARATION_COMPONENT_VIEW] : lView;
        ngDevMode && attachLViewDebug(lView);
        return lView;
    }
    function getOrCreateTNode(tView, index, type, name, attrs) {
        ngDevMode && index !== 0 && // 0 are bogus nodes and they are OK. See `createContainerRef` in
            // `view_engine_compatibility` for additional context.
            assertGreaterThanOrEqual(index, HEADER_OFFSET, 'TNodes can\'t be in the LView header.');
        // Keep this function short, so that the VM will inline it.
        ngDevMode && assertPureTNodeType(type);
        let tNode = tView.data[index];
        if (tNode === null) {
            tNode = createTNodeAtIndex(tView, index, type, name, attrs);
            if (isInI18nBlock()) {
                // If we are in i18n block then all elements should be pre declared through `Placeholder`
                // See `TNodeType.Placeholder` and `LFrame.inI18n` for more context.
                // If the `TNode` was not pre-declared than it means it was not mentioned which means it was
                // removed, so we mark it as detached.
                tNode.flags |= 32 /* TNodeFlags.isDetached */;
            }
        }
        else if (tNode.type & 64 /* TNodeType.Placeholder */) {
            tNode.type = type;
            tNode.value = name;
            tNode.attrs = attrs;
            const parent = getCurrentParentTNode();
            tNode.injectorIndex = parent === null ? -1 : parent.injectorIndex;
            ngDevMode && assertTNodeForTView(tNode, tView);
            ngDevMode && assertEqual(index, tNode.index, 'Expecting same index');
        }
        setCurrentTNode(tNode, true);
        return tNode;
    }
    function createTNodeAtIndex(tView, index, type, name, attrs) {
        const currentTNode = getCurrentTNodePlaceholderOk();
        const isParent = isCurrentTNodeParent();
        const parent = isParent ? currentTNode : currentTNode && currentTNode.parent;
        // Parents cannot cross component boundaries because components will be used in multiple places.
        const tNode = tView.data[index] =
            createTNode(tView, parent, type, index, name, attrs);
        // Assign a pointer to the first child node of a given view. The first node is not always the one
        // at index 0, in case of i18n, index 0 can be the instruction `i18nStart` and the first node has
        // the index 1 or more, so we can't just check node index.
        if (tView.firstChild === null) {
            tView.firstChild = tNode;
        }
        if (currentTNode !== null) {
            if (isParent) {
                // FIXME(misko): This logic looks unnecessarily complicated. Could we simplify?
                if (currentTNode.child == null && tNode.parent !== null) {
                    // We are in the same view, which means we are adding content node to the parent view.
                    currentTNode.child = tNode;
                }
            }
            else {
                if (currentTNode.next === null) {
                    // In the case of i18n the `currentTNode` may already be linked, in which case we don't want
                    // to break the links which i18n created.
                    currentTNode.next = tNode;
                }
            }
        }
        return tNode;
    }
    /**
     * When elements are created dynamically after a view blueprint is created (e.g. through
     * i18nApply()), we need to adjust the blueprint for future
     * template passes.
     *
     * @param tView `TView` associated with `LView`
     * @param lView The `LView` containing the blueprint to adjust
     * @param numSlotsToAlloc The number of slots to alloc in the LView, should be >0
     * @param initialValue Initial value to store in blueprint
     */
    function allocExpando(tView, lView, numSlotsToAlloc, initialValue) {
        if (numSlotsToAlloc === 0)
            return -1;
        if (ngDevMode) {
            assertFirstCreatePass(tView);
            assertSame(tView, lView[TVIEW], '`LView` must be associated with `TView`!');
            assertEqual(tView.data.length, lView.length, 'Expecting LView to be same size as TView');
            assertEqual(tView.data.length, tView.blueprint.length, 'Expecting Blueprint to be same size as TView');
            assertFirstUpdatePass(tView);
        }
        const allocIdx = lView.length;
        for (let i = 0; i < numSlotsToAlloc; i++) {
            lView.push(initialValue);
            tView.blueprint.push(initialValue);
            tView.data.push(null);
        }
        return allocIdx;
    }
    //////////////////////////
    //// Render
    //////////////////////////
    /**
     * Processes a view in the creation mode. This includes a number of steps in a specific order:
     * - creating view query functions (if any);
     * - executing a template function in the creation mode;
     * - updating static queries (if any);
     * - creating child components defined in a given view.
     */
    function renderView(tView, lView, context) {
        ngDevMode && assertEqual(isCreationMode(lView), true, 'Should be run in creation mode');
        enterView(lView);
        try {
            const viewQuery = tView.viewQuery;
            if (viewQuery !== null) {
                executeViewQueryFn(1 /* RenderFlags.Create */, viewQuery, context);
            }
            // Execute a template associated with this view, if it exists. A template function might not be
            // defined for the root component views.
            const templateFn = tView.template;
            if (templateFn !== null) {
                executeTemplate(tView, lView, templateFn, 1 /* RenderFlags.Create */, context);
            }
            // This needs to be set before children are processed to support recursive components.
            // This must be set to false immediately after the first creation run because in an
            // ngFor loop, all the views will be created together before update mode runs and turns
            // off firstCreatePass. If we don't set it here, instances will perform directive
            // matching, etc again and again.
            if (tView.firstCreatePass) {
                tView.firstCreatePass = false;
            }
            // We resolve content queries specifically marked as `static` in creation mode. Dynamic
            // content queries are resolved during change detection (i.e. update mode), after embedded
            // views are refreshed (see block above).
            if (tView.staticContentQueries) {
                refreshContentQueries(tView, lView);
            }
            // We must materialize query results before child components are processed
            // in case a child component has projected a container. The LContainer needs
            // to exist so the embedded views are properly attached by the container.
            if (tView.staticViewQueries) {
                executeViewQueryFn(2 /* RenderFlags.Update */, tView.viewQuery, context);
            }
            // Render child component views.
            const components = tView.components;
            if (components !== null) {
                renderChildComponents(lView, components);
            }
        }
        catch (error) {
            // If we didn't manage to get past the first template pass due to
            // an error, mark the view as corrupted so we can try to recover.
            if (tView.firstCreatePass) {
                tView.incompleteFirstPass = true;
                tView.firstCreatePass = false;
            }
            throw error;
        }
        finally {
            lView[FLAGS] &= ~4 /* LViewFlags.CreationMode */;
            leaveView();
        }
    }
    /**
     * Processes a view in update mode. This includes a number of steps in a specific order:
     * - executing a template function in update mode;
     * - executing hooks;
     * - refreshing queries;
     * - setting host bindings;
     * - refreshing child (embedded and component) views.
     */
    function refreshView(tView, lView, templateFn, context) {
        ngDevMode && assertEqual(isCreationMode(lView), false, 'Should be run in update mode');
        const flags = lView[FLAGS];
        if ((flags & 128 /* LViewFlags.Destroyed */) === 128 /* LViewFlags.Destroyed */)
            return;
        enterView(lView);
        // Check no changes mode is a dev only mode used to verify that bindings have not changed
        // since they were assigned. We do not want to execute lifecycle hooks in that mode.
        const isInCheckNoChangesPass = ngDevMode && isInCheckNoChangesMode();
        try {
            resetPreOrderHookFlags(lView);
            setBindingIndex(tView.bindingStartIndex);
            if (templateFn !== null) {
                executeTemplate(tView, lView, templateFn, 2 /* RenderFlags.Update */, context);
            }
            const hooksInitPhaseCompleted = (flags & 3 /* LViewFlags.InitPhaseStateMask */) === 3 /* InitPhaseState.InitPhaseCompleted */;
            // execute pre-order hooks (OnInit, OnChanges, DoCheck)
            // PERF WARNING: do NOT extract this to a separate function without running benchmarks
            if (!isInCheckNoChangesPass) {
                if (hooksInitPhaseCompleted) {
                    const preOrderCheckHooks = tView.preOrderCheckHooks;
                    if (preOrderCheckHooks !== null) {
                        executeCheckHooks(lView, preOrderCheckHooks, null);
                    }
                }
                else {
                    const preOrderHooks = tView.preOrderHooks;
                    if (preOrderHooks !== null) {
                        executeInitAndCheckHooks(lView, preOrderHooks, 0 /* InitPhaseState.OnInitHooksToBeRun */, null);
                    }
                    incrementInitPhaseFlags(lView, 0 /* InitPhaseState.OnInitHooksToBeRun */);
                }
            }
            // First mark transplanted views that are declared in this lView as needing a refresh at their
            // insertion points. This is needed to avoid the situation where the template is defined in this
            // `LView` but its declaration appears after the insertion component.
            markTransplantedViewsForRefresh(lView);
            refreshEmbeddedViews(lView);
            // Content query results must be refreshed before content hooks are called.
            if (tView.contentQueries !== null) {
                refreshContentQueries(tView, lView);
            }
            // execute content hooks (AfterContentInit, AfterContentChecked)
            // PERF WARNING: do NOT extract this to a separate function without running benchmarks
            if (!isInCheckNoChangesPass) {
                if (hooksInitPhaseCompleted) {
                    const contentCheckHooks = tView.contentCheckHooks;
                    if (contentCheckHooks !== null) {
                        executeCheckHooks(lView, contentCheckHooks);
                    }
                }
                else {
                    const contentHooks = tView.contentHooks;
                    if (contentHooks !== null) {
                        executeInitAndCheckHooks(lView, contentHooks, 1 /* InitPhaseState.AfterContentInitHooksToBeRun */);
                    }
                    incrementInitPhaseFlags(lView, 1 /* InitPhaseState.AfterContentInitHooksToBeRun */);
                }
            }
            processHostBindingOpCodes(tView, lView);
            // Refresh child component views.
            const components = tView.components;
            if (components !== null) {
                refreshChildComponents(lView, components);
            }
            // View queries must execute after refreshing child components because a template in this view
            // could be inserted in a child component. If the view query executes before child component
            // refresh, the template might not yet be inserted.
            const viewQuery = tView.viewQuery;
            if (viewQuery !== null) {
                executeViewQueryFn(2 /* RenderFlags.Update */, viewQuery, context);
            }
            // execute view hooks (AfterViewInit, AfterViewChecked)
            // PERF WARNING: do NOT extract this to a separate function without running benchmarks
            if (!isInCheckNoChangesPass) {
                if (hooksInitPhaseCompleted) {
                    const viewCheckHooks = tView.viewCheckHooks;
                    if (viewCheckHooks !== null) {
                        executeCheckHooks(lView, viewCheckHooks);
                    }
                }
                else {
                    const viewHooks = tView.viewHooks;
                    if (viewHooks !== null) {
                        executeInitAndCheckHooks(lView, viewHooks, 2 /* InitPhaseState.AfterViewInitHooksToBeRun */);
                    }
                    incrementInitPhaseFlags(lView, 2 /* InitPhaseState.AfterViewInitHooksToBeRun */);
                }
            }
            if (tView.firstUpdatePass === true) {
                // We need to make sure that we only flip the flag on successful `refreshView` only
                // Don't do this in `finally` block.
                // If we did this in `finally` block then an exception could block the execution of styling
                // instructions which in turn would be unable to insert themselves into the styling linked
                // list. The result of this would be that if the exception would not be throw on subsequent CD
                // the styling would be unable to process it data and reflect to the DOM.
                tView.firstUpdatePass = false;
            }
            // Do not reset the dirty state when running in check no changes mode. We don't want components
            // to behave differently depending on whether check no changes is enabled or not. For example:
            // Marking an OnPush component as dirty from within the `ngAfterViewInit` hook in order to
            // refresh a `NgClass` binding should work. If we would reset the dirty state in the check
            // no changes cycle, the component would be not be dirty for the next update pass. This would
            // be different in production mode where the component dirty state is not reset.
            if (!isInCheckNoChangesPass) {
                lView[FLAGS] &= ~(32 /* LViewFlags.Dirty */ | 8 /* LViewFlags.FirstLViewPass */);
            }
            if (lView[FLAGS] & 512 /* LViewFlags.RefreshTransplantedView */) {
                lView[FLAGS] &= ~512 /* LViewFlags.RefreshTransplantedView */;
                updateTransplantedViewCount(lView[PARENT], -1);
            }
        }
        finally {
            leaveView();
        }
    }
    function executeTemplate(tView, lView, templateFn, rf, context) {
        const prevSelectedIndex = getSelectedIndex();
        const isUpdatePhase = rf & 2 /* RenderFlags.Update */;
        try {
            setSelectedIndex(-1);
            if (isUpdatePhase && lView.length > HEADER_OFFSET) {
                // When we're updating, inherently select 0 so we don't
                // have to generate that instruction for most update blocks.
                selectIndexInternal(tView, lView, HEADER_OFFSET, !!ngDevMode && isInCheckNoChangesMode());
            }
            const preHookType = isUpdatePhase ? 2 /* ProfilerEvent.TemplateUpdateStart */ : 0 /* ProfilerEvent.TemplateCreateStart */;
            profiler(preHookType, context);
            templateFn(rf, context);
        }
        finally {
            setSelectedIndex(prevSelectedIndex);
        }
    }
    //////////////////////////
    //// Element
    //////////////////////////
    function executeContentQueries(tView, tNode, lView) {
        if (isContentQueryHost(tNode)) {
            const start = tNode.directiveStart;
            const end = tNode.directiveEnd;
            for (let directiveIndex = start; directiveIndex < end; directiveIndex++) {
                const def = tView.data[directiveIndex];
                if (def.contentQueries) {
                    def.contentQueries(1 /* RenderFlags.Create */, lView[directiveIndex], directiveIndex);
                }
            }
        }
    }
    /**
     * Gets TView from a template function or creates a new TView
     * if it doesn't already exist.
     *
     * @param def ComponentDef
     * @returns TView
     */
    function getOrCreateComponentTView(def) {
        const tView = def.tView;
        // Create a TView if there isn't one, or recreate it if the first create pass didn't
        // complete successfully since we can't know for sure whether it's in a usable shape.
        if (tView === null || tView.incompleteFirstPass) {
            // Declaration node here is null since this function is called when we dynamically create a
            // component and hence there is no declaration.
            const declTNode = null;
            return def.tView = createTView(1 /* TViewType.Component */, declTNode, def.template, def.decls, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas, def.consts);
        }
        return tView;
    }
    /**
     * Creates a TView instance
     *
     * @param type Type of `TView`.
     * @param declTNode Declaration location of this `TView`.
     * @param templateFn Template function
     * @param decls The number of nodes, local refs, and pipes in this template
     * @param directives Registry of directives for this view
     * @param pipes Registry of pipes for this view
     * @param viewQuery View queries for this view
     * @param schemas Schemas for this view
     * @param consts Constants for this view
     */
    function createTView(type, declTNode, templateFn, decls, vars, directives, pipes, viewQuery, schemas, constsOrFactory) {
        ngDevMode && ngDevMode.tView++;
        const bindingStartIndex = HEADER_OFFSET + decls;
        // This length does not yet contain host bindings from child directives because at this point,
        // we don't know which directives are active on this template. As soon as a directive is matched
        // that has a host binding, we will update the blueprint with that def's hostVars count.
        const initialViewLength = bindingStartIndex + vars;
        const blueprint = createViewBlueprint(bindingStartIndex, initialViewLength);
        const consts = typeof constsOrFactory === 'function' ? constsOrFactory() : constsOrFactory;
        const tView = blueprint[TVIEW] = ngDevMode ?
            new TViewConstructor(type, // type: TViewType,
            blueprint, // blueprint: LView,
            templateFn, // template: ComponentTemplate<{}>|null,
            null, // queries: TQueries|null
            viewQuery, // viewQuery: ViewQueriesFunction<{}>|null,
            declTNode, // declTNode: TNode|null,
            cloneToTViewData(blueprint).fill(null, bindingStartIndex), // data: TData,
            bindingStartIndex, // bindingStartIndex: number,
            initialViewLength, // expandoStartIndex: number,
            null, // hostBindingOpCodes: HostBindingOpCodes,
            true, // firstCreatePass: boolean,
            true, // firstUpdatePass: boolean,
            false, // staticViewQueries: boolean,
            false, // staticContentQueries: boolean,
            null, // preOrderHooks: HookData|null,
            null, // preOrderCheckHooks: HookData|null,
            null, // contentHooks: HookData|null,
            null, // contentCheckHooks: HookData|null,
            null, // viewHooks: HookData|null,
            null, // viewCheckHooks: HookData|null,
            null, // destroyHooks: DestroyHookData|null,
            null, // cleanup: any[]|null,
            null, // contentQueries: number[]|null,
            null, // components: number[]|null,
            typeof directives === 'function' ? //
                directives() : //
                directives, // directiveRegistry: DirectiveDefList|null,
            typeof pipes === 'function' ? pipes() : pipes, // pipeRegistry: PipeDefList|null,
            null, // firstChild: TNode|null,
            schemas, // schemas: SchemaMetadata[]|null,
            consts, // consts: TConstants|null
            false, // incompleteFirstPass: boolean
            decls, // ngDevMode only: decls
            vars) :
            {
                type: type,
                blueprint: blueprint,
                template: templateFn,
                queries: null,
                viewQuery: viewQuery,
                declTNode: declTNode,
                data: blueprint.slice().fill(null, bindingStartIndex),
                bindingStartIndex: bindingStartIndex,
                expandoStartIndex: initialViewLength,
                hostBindingOpCodes: null,
                firstCreatePass: true,
                firstUpdatePass: true,
                staticViewQueries: false,
                staticContentQueries: false,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: typeof directives === 'function' ? directives() : directives,
                pipeRegistry: typeof pipes === 'function' ? pipes() : pipes,
                firstChild: null,
                schemas: schemas,
                consts: consts,
                incompleteFirstPass: false
            };
        if (ngDevMode) {
            // For performance reasons it is important that the tView retains the same shape during runtime.
            // (To make sure that all of the code is monomorphic.) For this reason we seal the object to
            // prevent class transitions.
            Object.seal(tView);
        }
        return tView;
    }
    function createViewBlueprint(bindingStartIndex, initialViewLength) {
        const blueprint = ngDevMode ? new LViewBlueprint() : [];
        for (let i = 0; i < initialViewLength; i++) {
            blueprint.push(i < bindingStartIndex ? null : NO_CHANGE);
        }
        return blueprint;
    }
    /**
     * Locates the host native element, used for bootstrapping existing nodes into rendering pipeline.
     *
     * @param rendererFactory Factory function to create renderer instance.
     * @param elementOrSelector Render element or CSS selector to locate the element.
     * @param encapsulation View Encapsulation defined for component that requests host element.
     */
    function locateHostElement(renderer, elementOrSelector, encapsulation) {
        // When using native Shadow DOM, do not clear host element to allow native slot projection
        const preserveContent = encapsulation === ViewEncapsulation.ShadowDom;
        return renderer.selectRootElement(elementOrSelector, preserveContent);
    }
    /**
     * Saves context for this cleanup function in LView.cleanupInstances.
     *
     * On the first template pass, saves in TView:
     * - Cleanup function
     * - Index of context we just saved in LView.cleanupInstances
     *
     * This function can also be used to store instance specific cleanup fns. In that case the `context`
     * is `null` and the function is store in `LView` (rather than it `TView`).
     */
    function storeCleanupWithContext(tView, lView, context, cleanupFn) {
        const lCleanup = getOrCreateLViewCleanup(lView);
        if (context === null) {
            // If context is null that this is instance specific callback. These callbacks can only be
            // inserted after template shared instances. For this reason in ngDevMode we freeze the TView.
            if (ngDevMode) {
                Object.freeze(getOrCreateTViewCleanup(tView));
            }
            lCleanup.push(cleanupFn);
        }
        else {
            lCleanup.push(context);
            if (tView.firstCreatePass) {
                getOrCreateTViewCleanup(tView).push(cleanupFn, lCleanup.length - 1);
            }
        }
    }
    function createTNode(tView, tParent, type, index, value, attrs) {
        ngDevMode && index !== 0 && // 0 are bogus nodes and they are OK. See `createContainerRef` in
            // `view_engine_compatibility` for additional context.
            assertGreaterThanOrEqual(index, HEADER_OFFSET, 'TNodes can\'t be in the LView header.');
        ngDevMode && assertNotSame(attrs, undefined, '\'undefined\' is not valid value for \'attrs\'');
        ngDevMode && ngDevMode.tNode++;
        ngDevMode && tParent && assertTNodeForTView(tParent, tView);
        let injectorIndex = tParent ? tParent.injectorIndex : -1;
        const tNode = ngDevMode ?
            new TNodeDebug(tView, // tView_: TView
            type, // type: TNodeType
            index, // index: number
            null, // insertBeforeIndex: null|-1|number|number[]
            injectorIndex, // injectorIndex: number
            -1, // componentOffset: number
            -1, // directiveStart: number
            -1, // directiveEnd: number
            -1, // directiveStylingLast: number
            null, // propertyBindings: number[]|null
            0, // flags: TNodeFlags
            0, // providerIndexes: TNodeProviderIndexes
            value, // value: string|null
            attrs, // attrs: (string|AttributeMarker|(string|SelectorFlags)[])[]|null
            null, // mergedAttrs
            null, // localNames: (string|number)[]|null
            undefined, // initialInputs: (string[]|null)[]|null|undefined
            null, // inputs: PropertyAliases|null
            null, // outputs: PropertyAliases|null
            null, // tViews: ITView|ITView[]|null
            null, // next: ITNode|null
            null, // projectionNext: ITNode|null
            null, // child: ITNode|null
            tParent, // parent: TElementNode|TContainerNode|null
            null, // projection: number|(ITNode|RNode[])[]|null
            null, // styles: string|null
            null, // stylesWithoutHost: string|null
            undefined, // residualStyles: string|null
            null, // classes: string|null
            null, // classesWithoutHost: string|null
            undefined, // residualClasses: string|null
            0, // classBindings: TStylingRange;
            0) :
            {
                type,
                index,
                insertBeforeIndex: null,
                injectorIndex,
                directiveStart: -1,
                directiveEnd: -1,
                directiveStylingLast: -1,
                componentOffset: -1,
                propertyBindings: null,
                flags: 0,
                providerIndexes: 0,
                value: value,
                attrs: attrs,
                mergedAttrs: null,
                localNames: null,
                initialInputs: undefined,
                inputs: null,
                outputs: null,
                tViews: null,
                next: null,
                projectionNext: null,
                child: null,
                parent: tParent,
                projection: null,
                styles: null,
                stylesWithoutHost: null,
                residualStyles: undefined,
                classes: null,
                classesWithoutHost: null,
                residualClasses: undefined,
                classBindings: 0,
                styleBindings: 0,
            };
        if (ngDevMode) {
            // For performance reasons it is important that the tNode retains the same shape during runtime.
            // (To make sure that all of the code is monomorphic.) For this reason we seal the object to
            // prevent class transitions.
            Object.seal(tNode);
        }
        return tNode;
    }
    /**
     * Generates the `PropertyAliases` data structure from the provided input/output mapping.
     * @param aliasMap Input/output mapping from the directive definition.
     * @param directiveIndex Index of the directive.
     * @param propertyAliases Object in which to store the results.
     * @param hostDirectiveAliasMap Object used to alias or filter out properties for host directives.
     * If the mapping is provided, it'll act as an allowlist, as well as a mapping of what public
     * name inputs/outputs should be exposed under.
     */
    function generatePropertyAliases(aliasMap, directiveIndex, propertyAliases, hostDirectiveAliasMap) {
        for (let publicName in aliasMap) {
            if (aliasMap.hasOwnProperty(publicName)) {
                propertyAliases = propertyAliases === null ? {} : propertyAliases;
                const internalName = aliasMap[publicName];
                // If there are no host directive mappings, we want to remap using the alias map from the
                // definition itself. If there is an alias map, it has two functions:
                // 1. It serves as an allowlist of bindings that are exposed by the host directives. Only the
                // ones inside the host directive map will be exposed on the host.
                // 2. The public name of the property is aliased using the host directive alias map, rather
                // than the alias map from the definition.
                if (hostDirectiveAliasMap === null) {
                    addPropertyAlias(propertyAliases, directiveIndex, publicName, internalName);
                }
                else if (hostDirectiveAliasMap.hasOwnProperty(publicName)) {
                    addPropertyAlias(propertyAliases, directiveIndex, hostDirectiveAliasMap[publicName], internalName);
                }
            }
        }
        return propertyAliases;
    }
    function addPropertyAlias(propertyAliases, directiveIndex, publicName, internalName) {
        if (propertyAliases.hasOwnProperty(publicName)) {
            propertyAliases[publicName].push(directiveIndex, internalName);
        }
        else {
            propertyAliases[publicName] = [directiveIndex, internalName];
        }
    }
    /**
     * Initializes data structures required to work with directive inputs and outputs.
     * Initialization is done for all directives matched on a given TNode.
     */
    function initializeInputAndOutputAliases(tView, tNode, hostDirectiveDefinitionMap) {
        ngDevMode && assertFirstCreatePass(tView);
        const start = tNode.directiveStart;
        const end = tNode.directiveEnd;
        const tViewData = tView.data;
        const tNodeAttrs = tNode.attrs;
        const inputsFromAttrs = ngDevMode ? new TNodeInitialInputs() : [];
        let inputsStore = null;
        let outputsStore = null;
        for (let directiveIndex = start; directiveIndex < end; directiveIndex++) {
            const directiveDef = tViewData[directiveIndex];
            const aliasData = hostDirectiveDefinitionMap ? hostDirectiveDefinitionMap.get(directiveDef) : null;
            const aliasedInputs = aliasData ? aliasData.inputs : null;
            const aliasedOutputs = aliasData ? aliasData.outputs : null;
            inputsStore =
                generatePropertyAliases(directiveDef.inputs, directiveIndex, inputsStore, aliasedInputs);
            outputsStore =
                generatePropertyAliases(directiveDef.outputs, directiveIndex, outputsStore, aliasedOutputs);
            // Do not use unbound attributes as inputs to structural directives, since structural
            // directive inputs can only be set using microsyntax (e.g. `<div *dir="exp">`).
            // TODO(FW-1930): microsyntax expressions may also contain unbound/static attributes, which
            // should be set for inline templates.
            const initialInputs = (inputsStore !== null && tNodeAttrs !== null && !isInlineTemplate(tNode)) ?
                generateInitialInputs(inputsStore, directiveIndex, tNodeAttrs) :
                null;
            inputsFromAttrs.push(initialInputs);
        }
        if (inputsStore !== null) {
            if (inputsStore.hasOwnProperty('class')) {
                tNode.flags |= 8 /* TNodeFlags.hasClassInput */;
            }
            if (inputsStore.hasOwnProperty('style')) {
                tNode.flags |= 16 /* TNodeFlags.hasStyleInput */;
            }
        }
        tNode.initialInputs = inputsFromAttrs;
        tNode.inputs = inputsStore;
        tNode.outputs = outputsStore;
    }
    /** If node is an OnPush component, marks its LView dirty. */
    function markDirtyIfOnPush(lView, viewIndex) {
        ngDevMode && assertLView(lView);
        const childComponentLView = getComponentLViewByIndex(viewIndex, lView);
        if (!(childComponentLView[FLAGS] & 16 /* LViewFlags.CheckAlways */)) {
            childComponentLView[FLAGS] |= 32 /* LViewFlags.Dirty */;
        }
    }
    /** Initializes the data structures necessary for a list of directives to be instantiated. */
    function initializeDirectives(tView, lView, tNode, directives, exportsMap, hostDirectiveDefs) {
        ngDevMode && assertFirstCreatePass(tView);
        // Publishes the directive types to DI so they can be injected. Needs to
        // happen in a separate pass before the TNode flags have been initialized.
        for (let i = 0; i < directives.length; i++) {
            diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, lView), tView, directives[i].type);
        }
        initTNodeFlags(tNode, tView.data.length, directives.length);
        // When the same token is provided by several directives on the same node, some rules apply in
        // the viewEngine:
        // - viewProviders have priority over providers
        // - the last directive in NgModule.declarations has priority over the previous one
        // So to match these rules, the order in which providers are added in the arrays is very
        // important.
        for (let i = 0; i < directives.length; i++) {
            const def = directives[i];
            if (def.providersResolver)
                def.providersResolver(def);
        }
        let preOrderHooksFound = false;
        let preOrderCheckHooksFound = false;
        let directiveIdx = allocExpando(tView, lView, directives.length, null);
        ngDevMode &&
            assertSame(directiveIdx, tNode.directiveStart, 'TNode.directiveStart should point to just allocated space');
        for (let i = 0; i < directives.length; i++) {
            const def = directives[i];
            // Merge the attrs in the order of matches. This assumes that the first directive is the
            // component itself, so that the component has the least priority.
            tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, def.hostAttrs);
            configureViewWithDirective(tView, tNode, lView, directiveIdx, def);
            saveNameToExportMap(directiveIdx, def, exportsMap);
            if (def.contentQueries !== null)
                tNode.flags |= 4 /* TNodeFlags.hasContentQuery */;
            if (def.hostBindings !== null || def.hostAttrs !== null || def.hostVars !== 0)
                tNode.flags |= 64 /* TNodeFlags.hasHostBindings */;
            const lifeCycleHooks = def.type.prototype;
            // Only push a node index into the preOrderHooks array if this is the first
            // pre-order hook found on this node.
            if (!preOrderHooksFound &&
                (lifeCycleHooks.ngOnChanges || lifeCycleHooks.ngOnInit || lifeCycleHooks.ngDoCheck)) {
                // We will push the actual hook function into this array later during dir instantiation.
                // We cannot do it now because we must ensure hooks are registered in the same
                // order that directives are created (i.e. injection order).
                (tView.preOrderHooks || (tView.preOrderHooks = [])).push(tNode.index);
                preOrderHooksFound = true;
            }
            if (!preOrderCheckHooksFound && (lifeCycleHooks.ngOnChanges || lifeCycleHooks.ngDoCheck)) {
                (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(tNode.index);
                preOrderCheckHooksFound = true;
            }
            directiveIdx++;
        }
        initializeInputAndOutputAliases(tView, tNode, hostDirectiveDefs);
    }
    /**
     * Add `hostBindings` to the `TView.hostBindingOpCodes`.
     *
     * @param tView `TView` to which the `hostBindings` should be added.
     * @param tNode `TNode` the element which contains the directive
     * @param directiveIdx Directive index in view.
     * @param directiveVarsIdx Where will the directive's vars be stored
     * @param def `ComponentDef`/`DirectiveDef`, which contains the `hostVars`/`hostBindings` to add.
     */
    function registerHostBindingOpCodes(tView, tNode, directiveIdx, directiveVarsIdx, def) {
        ngDevMode && assertFirstCreatePass(tView);
        const hostBindings = def.hostBindings;
        if (hostBindings) {
            let hostBindingOpCodes = tView.hostBindingOpCodes;
            if (hostBindingOpCodes === null) {
                hostBindingOpCodes = tView.hostBindingOpCodes = [];
            }
            const elementIndx = ~tNode.index;
            if (lastSelectedElementIdx(hostBindingOpCodes) != elementIndx) {
                // Conditionally add select element so that we are more efficient in execution.
                // NOTE: this is strictly not necessary and it trades code size for runtime perf.
                // (We could just always add it.)
                hostBindingOpCodes.push(elementIndx);
            }
            hostBindingOpCodes.push(directiveIdx, directiveVarsIdx, hostBindings);
        }
    }
    /**
     * Returns the last selected element index in the `HostBindingOpCodes`
     *
     * For perf reasons we don't need to update the selected element index in `HostBindingOpCodes` only
     * if it changes. This method returns the last index (or '0' if not found.)
     *
     * Selected element index are only the ones which are negative.
     */
    function lastSelectedElementIdx(hostBindingOpCodes) {
        let i = hostBindingOpCodes.length;
        while (i > 0) {
            const value = hostBindingOpCodes[--i];
            if (typeof value === 'number' && value < 0) {
                return value;
            }
        }
        return 0;
    }
    function invokeDirectivesHostBindings(tView, lView, tNode) {
        const start = tNode.directiveStart;
        const end = tNode.directiveEnd;
        const elementIndex = tNode.index;
        const currentDirectiveIndex = getCurrentDirectiveIndex();
        try {
            setSelectedIndex(elementIndex);
            for (let dirIndex = start; dirIndex < end; dirIndex++) {
                const def = tView.data[dirIndex];
                const directive = lView[dirIndex];
                setCurrentDirectiveIndex(dirIndex);
                if (def.hostBindings !== null || def.hostVars !== 0 || def.hostAttrs !== null) {
                    invokeHostBindingsInCreationMode(def, directive);
                }
            }
        }
        finally {
            setSelectedIndex(-1);
            setCurrentDirectiveIndex(currentDirectiveIndex);
        }
    }
    /**
     * Invoke the host bindings in creation mode.
     *
     * @param def `DirectiveDef` which may contain the `hostBindings` function.
     * @param directive Instance of directive.
     */
    function invokeHostBindingsInCreationMode(def, directive) {
        if (def.hostBindings !== null) {
            def.hostBindings(1 /* RenderFlags.Create */, directive);
        }
    }
    /**
     * Marks a given TNode as a component's host. This consists of:
     * - setting the component offset on the TNode.
     * - storing index of component's host element so it will be queued for view refresh during CD.
     */
    function markAsComponentHost(tView, hostTNode, componentOffset) {
        ngDevMode && assertFirstCreatePass(tView);
        ngDevMode && assertGreaterThan(componentOffset, -1, 'componentOffset must be great than -1');
        hostTNode.componentOffset = componentOffset;
        (tView.components || (tView.components = ngDevMode ? new TViewComponents() : []))
            .push(hostTNode.index);
    }
    /**
     * Builds up an export map as directives are created, so local refs can be quickly mapped
     * to their directive instances.
     */
    function saveNameToExportMap(directiveIdx, def, exportsMap) {
        if (exportsMap) {
            if (def.exportAs) {
                for (let i = 0; i < def.exportAs.length; i++) {
                    exportsMap[def.exportAs[i]] = directiveIdx;
                }
            }
            if (isComponentDef(def))
                exportsMap[''] = directiveIdx;
        }
    }
    /**
     * Initializes the flags on the current node, setting all indices to the initial index,
     * the directive count to 0, and adding the isComponent flag.
     * @param index the initial index
     */
    function initTNodeFlags(tNode, index, numberOfDirectives) {
        ngDevMode &&
            assertNotEqual(numberOfDirectives, tNode.directiveEnd - tNode.directiveStart, 'Reached the max number of directives');
        tNode.flags |= 1 /* TNodeFlags.isDirectiveHost */;
        // When the first directive is created on a node, save the index
        tNode.directiveStart = index;
        tNode.directiveEnd = index + numberOfDirectives;
        tNode.providerIndexes = index;
    }
    /**
     * Setup directive for instantiation.
     *
     * We need to create a `NodeInjectorFactory` which is then inserted in both the `Blueprint` as well
     * as `LView`. `TView` gets the `DirectiveDef`.
     *
     * @param tView `TView`
     * @param tNode `TNode`
     * @param lView `LView`
     * @param directiveIndex Index where the directive will be stored in the Expando.
     * @param def `DirectiveDef`
     */
    function configureViewWithDirective(tView, tNode, lView, directiveIndex, def) {
        ngDevMode &&
            assertGreaterThanOrEqual(directiveIndex, HEADER_OFFSET, 'Must be in Expando section');
        tView.data[directiveIndex] = def;
        const directiveFactory = def.factory || (def.factory = getFactoryDef(def.type, true));
        // Even though `directiveFactory` will already be using `ɵɵdirectiveInject` in its generated code,
        // we also want to support `inject()` directly from the directive constructor context so we set
        // `ɵɵdirectiveInject` as the inject implementation here too.
        const nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), ɵɵdirectiveInject);
        tView.blueprint[directiveIndex] = nodeInjectorFactory;
        lView[directiveIndex] = nodeInjectorFactory;
        registerHostBindingOpCodes(tView, tNode, directiveIndex, allocExpando(tView, lView, def.hostVars, NO_CHANGE), def);
    }
    /**
     * Generates initialInputData for a node and stores it in the template's static storage
     * so subsequent template invocations don't have to recalculate it.
     *
     * initialInputData is an array containing values that need to be set as input properties
     * for directives on this node, but only once on creation. We need this array to support
     * the case where you set an @Input property of a directive using attribute-like syntax.
     * e.g. if you have a `name` @Input, you can set it once like this:
     *
     * <my-component name="Bess"></my-component>
     *
     * @param inputs Input alias map that was generated from the directive def inputs.
     * @param directiveIndex Index of the directive that is currently being processed.
     * @param attrs Static attrs on this node.
     */
    function generateInitialInputs(inputs, directiveIndex, attrs) {
        let inputsToStore = null;
        let i = 0;
        while (i < attrs.length) {
            const attrName = attrs[i];
            if (attrName === 0 /* AttributeMarker.NamespaceURI */) {
                // We do not allow inputs on namespaced attributes.
                i += 4;
                continue;
            }
            else if (attrName === 5 /* AttributeMarker.ProjectAs */) {
                // Skip over the `ngProjectAs` value.
                i += 2;
                continue;
            }
            // If we hit any other attribute markers, we're done anyway. None of those are valid inputs.
            if (typeof attrName === 'number')
                break;
            if (inputs.hasOwnProperty(attrName)) {
                if (inputsToStore === null)
                    inputsToStore = [];
                // Find the input's public name from the input store. Note that we can be found easier
                // through the directive def, but we want to do it using the inputs store so that it can
                // account for host directive aliases.
                const inputConfig = inputs[attrName];
                for (let j = 0; j < inputConfig.length; j += 2) {
                    if (inputConfig[j] === directiveIndex) {
                        inputsToStore.push(attrName, inputConfig[j + 1], attrs[i + 1]);
                        // A directive can't have multiple inputs with the same name so we can break here.
                        break;
                    }
                }
            }
            i += 2;
        }
        return inputsToStore;
    }
    /**
     * Goes over embedded views (ones created through ViewContainerRef APIs) and refreshes
     * them by executing an associated template function.
     */
    function refreshEmbeddedViews(lView) {
        for (let lContainer = getFirstLContainer(lView); lContainer !== null; lContainer = getNextLContainer(lContainer)) {
            for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
                const embeddedLView = lContainer[i];
                const embeddedTView = embeddedLView[TVIEW];
                ngDevMode && assertDefined(embeddedTView, 'TView must be allocated');
                if (viewAttachedToChangeDetector(embeddedLView)) {
                    refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[CONTEXT]);
                }
            }
        }
    }
    /**
     * Mark transplanted views as needing to be refreshed at their insertion points.
     *
     * @param lView The `LView` that may have transplanted views.
     */
    function markTransplantedViewsForRefresh(lView) {
        for (let lContainer = getFirstLContainer(lView); lContainer !== null; lContainer = getNextLContainer(lContainer)) {
            if (!lContainer[HAS_TRANSPLANTED_VIEWS])
                continue;
            const movedViews = lContainer[MOVED_VIEWS];
            ngDevMode && assertDefined(movedViews, 'Transplanted View flags set but missing MOVED_VIEWS');
            for (let i = 0; i < movedViews.length; i++) {
                const movedLView = movedViews[i];
                const insertionLContainer = movedLView[PARENT];
                ngDevMode && assertLContainer(insertionLContainer);
                // We don't want to increment the counter if the moved LView was already marked for
                // refresh.
                if ((movedLView[FLAGS] & 512 /* LViewFlags.RefreshTransplantedView */) === 0) {
                    updateTransplantedViewCount(insertionLContainer, 1);
                }
                // Note, it is possible that the `movedViews` is tracking views that are transplanted *and*
                // those that aren't (declaration component === insertion component). In the latter case,
                // it's fine to add the flag, as we will clear it immediately in
                // `refreshEmbeddedViews` for the view currently being refreshed.
                movedLView[FLAGS] |= 512 /* LViewFlags.RefreshTransplantedView */;
            }
        }
    }
    /////////////
    /**
     * Refreshes components by entering the component view and processing its bindings, queries, etc.
     *
     * @param componentHostIdx  Element index in LView[] (adjusted for HEADER_OFFSET)
     */
    function refreshComponent(hostLView, componentHostIdx) {
        ngDevMode && assertEqual(isCreationMode(hostLView), false, 'Should be run in update mode');
        const componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
        // Only attached components that are CheckAlways or OnPush and dirty should be refreshed
        if (viewAttachedToChangeDetector(componentView)) {
            const tView = componentView[TVIEW];
            if (componentView[FLAGS] & (16 /* LViewFlags.CheckAlways */ | 32 /* LViewFlags.Dirty */)) {
                refreshView(tView, componentView, tView.template, componentView[CONTEXT]);
            }
            else if (componentView[TRANSPLANTED_VIEWS_TO_REFRESH] > 0) {
                // Only attached components that are CheckAlways or OnPush and dirty should be refreshed
                refreshContainsDirtyView(componentView);
            }
        }
    }
    /**
     * Refreshes all transplanted views marked with `LViewFlags.RefreshTransplantedView` that are
     * children or descendants of the given lView.
     *
     * @param lView The lView which contains descendant transplanted views that need to be refreshed.
     */
    function refreshContainsDirtyView(lView) {
        for (let lContainer = getFirstLContainer(lView); lContainer !== null; lContainer = getNextLContainer(lContainer)) {
            for (let i = CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
                const embeddedLView = lContainer[i];
                if (viewAttachedToChangeDetector(embeddedLView)) {
                    if (embeddedLView[FLAGS] & 512 /* LViewFlags.RefreshTransplantedView */) {
                        const embeddedTView = embeddedLView[TVIEW];
                        ngDevMode && assertDefined(embeddedTView, 'TView must be allocated');
                        refreshView(embeddedTView, embeddedLView, embeddedTView.template, embeddedLView[CONTEXT]);
                    }
                    else if (embeddedLView[TRANSPLANTED_VIEWS_TO_REFRESH] > 0) {
                        refreshContainsDirtyView(embeddedLView);
                    }
                }
            }
        }
        const tView = lView[TVIEW];
        // Refresh child component views.
        const components = tView.components;
        if (components !== null) {
            for (let i = 0; i < components.length; i++) {
                const componentView = getComponentLViewByIndex(components[i], lView);
                // Only attached components that are CheckAlways or OnPush and dirty should be refreshed
                if (viewAttachedToChangeDetector(componentView) &&
                    componentView[TRANSPLANTED_VIEWS_TO_REFRESH] > 0) {
                    refreshContainsDirtyView(componentView);
                }
            }
        }
    }
    function renderComponent(hostLView, componentHostIdx) {
        ngDevMode && assertEqual(isCreationMode(hostLView), true, 'Should be run in creation mode');
        const componentView = getComponentLViewByIndex(componentHostIdx, hostLView);
        const componentTView = componentView[TVIEW];
        syncViewWithBlueprint(componentTView, componentView);
        renderView(componentTView, componentView, componentView[CONTEXT]);
    }
    /**
     * Syncs an LView instance with its blueprint if they have gotten out of sync.
     *
     * Typically, blueprints and their view instances should always be in sync, so the loop here
     * will be skipped. However, consider this case of two components side-by-side:
     *
     * App template:
     * ```
     * <comp></comp>
     * <comp></comp>
     * ```
     *
     * The following will happen:
     * 1. App template begins processing.
     * 2. First <comp> is matched as a component and its LView is created.
     * 3. Second <comp> is matched as a component and its LView is created.
     * 4. App template completes processing, so it's time to check child templates.
     * 5. First <comp> template is checked. It has a directive, so its def is pushed to blueprint.
     * 6. Second <comp> template is checked. Its blueprint has been updated by the first
     * <comp> template, but its LView was created before this update, so it is out of sync.
     *
     * Note that embedded views inside ngFor loops will never be out of sync because these views
     * are processed as soon as they are created.
     *
     * @param tView The `TView` that contains the blueprint for syncing
     * @param lView The view to sync
     */
    function syncViewWithBlueprint(tView, lView) {
        for (let i = lView.length; i < tView.blueprint.length; i++) {
            lView.push(tView.blueprint[i]);
        }
    }
    /**
     * Adds LView or LContainer to the end of the current view tree.
     *
     * This structure will be used to traverse through nested views to remove listeners
     * and call onDestroy callbacks.
     *
     * @param lView The view where LView or LContainer should be added
     * @param adjustedHostIndex Index of the view's host node in LView[], adjusted for header
     * @param lViewOrLContainer The LView or LContainer to add to the view tree
     * @returns The state passed in
     */
    function addToViewTree(lView, lViewOrLContainer) {
        // TODO(benlesh/misko): This implementation is incorrect, because it always adds the LContainer
        // to the end of the queue, which means if the developer retrieves the LContainers from RNodes out
        // of order, the change detection will run out of order, as the act of retrieving the the
        // LContainer from the RNode is what adds it to the queue.
        if (lView[CHILD_HEAD]) {
            lView[CHILD_TAIL][NEXT] = lViewOrLContainer;
        }
        else {
            lView[CHILD_HEAD] = lViewOrLContainer;
        }
        lView[CHILD_TAIL] = lViewOrLContainer;
        return lViewOrLContainer;
    }
    ///////////////////////////////
    //// Change detection
    ///////////////////////////////
    /**
     * Marks current view and all ancestors dirty.
     *
     * Returns the root view because it is found as a byproduct of marking the view tree
     * dirty, and can be used by methods that consume markViewDirty() to easily schedule
     * change detection. Otherwise, such methods would need to traverse up the view tree
     * an additional time to get the root view and schedule a tick on it.
     *
     * @param lView The starting LView to mark dirty
     * @returns the root LView
     */
    function markViewDirty(lView) {
        while (lView) {
            lView[FLAGS] |= 32 /* LViewFlags.Dirty */;
            const parent = getLViewParent(lView);
            // Stop traversing up as soon as you find a root view that wasn't attached to any container
            if (isRootView(lView) && !parent) {
                return lView;
            }
            // continue otherwise
            lView = parent;
        }
        return null;
    }
    function detectChangesInternal(tView, lView, context, notifyErrorHandler = true) {
        const rendererFactory = lView[RENDERER_FACTORY];
        // Check no changes mode is a dev only mode used to verify that bindings have not changed
        // since they were assigned. We do not want to invoke renderer factory functions in that mode
        // to avoid any possible side-effects.
        const checkNoChangesMode = !!ngDevMode && isInCheckNoChangesMode();
        if (!checkNoChangesMode && rendererFactory.begin)
            rendererFactory.begin();
        try {
            refreshView(tView, lView, tView.template, context);
        }
        catch (error) {
            if (notifyErrorHandler) {
                handleError(lView, error);
            }
            throw error;
        }
        finally {
            if (!checkNoChangesMode && rendererFactory.end)
                rendererFactory.end();
        }
    }
    function checkNoChangesInternal(tView, lView, context, notifyErrorHandler = true) {
        setIsInCheckNoChangesMode(true);
        try {
            detectChangesInternal(tView, lView, context, notifyErrorHandler);
        }
        finally {
            setIsInCheckNoChangesMode(false);
        }
    }
    function executeViewQueryFn(flags, viewQueryFn, component) {
        ngDevMode && assertDefined(viewQueryFn, 'View queries function to execute must be defined.');
        setCurrentQueryIndex(0);
        viewQueryFn(flags, component);
    }
    function getOrCreateLViewCleanup(view) {
        // top level variables should not be exported for performance reasons (PERF_NOTES.md)
        return view[CLEANUP] || (view[CLEANUP] = ngDevMode ? new LCleanup() : []);
    }
    function getOrCreateTViewCleanup(tView) {
        return tView.cleanup || (tView.cleanup = ngDevMode ? new TCleanup() : []);
    }
    /** Handles an error thrown in an LView. */
    function handleError(lView, error) {
        const injector = lView[INJECTOR$1];
        const errorHandler = injector ? injector.get(ErrorHandler, null) : null;
        errorHandler && errorHandler.handleError(error);
    }
    /**
     * Set the inputs of directives at the current node to corresponding value.
     *
     * @param tView The current TView
     * @param lView the `LView` which contains the directives.
     * @param inputs mapping between the public "input" name and privately-known,
     *        possibly minified, property names to write to.
     * @param value Value to set.
     */
    function setInputsForProperty(tView, lView, inputs, publicName, value) {
        for (let i = 0; i < inputs.length;) {
            const index = inputs[i++];
            const privateName = inputs[i++];
            const instance = lView[index];
            ngDevMode && assertIndexInRange(lView, index);
            const def = tView.data[index];
            if (def.setInput !== null) {
                def.setInput(instance, value, publicName, privateName);
            }
            else {
                instance[privateName] = value;
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
     * Compute the static styling (class/style) from `TAttributes`.
     *
     * This function should be called during `firstCreatePass` only.
     *
     * @param tNode The `TNode` into which the styling information should be loaded.
     * @param attrs `TAttributes` containing the styling information.
     * @param writeToHost Where should the resulting static styles be written?
     *   - `false` Write to `TNode.stylesWithoutHost` / `TNode.classesWithoutHost`
     *   - `true` Write to `TNode.styles` / `TNode.classes`
     */
    function computeStaticStyling(tNode, attrs, writeToHost) {
        ngDevMode &&
            assertFirstCreatePass(getTView(), 'Expecting to be called in first template pass only');
        let styles = writeToHost ? tNode.styles : null;
        let classes = writeToHost ? tNode.classes : null;
        let mode = 0;
        if (attrs !== null) {
            for (let i = 0; i < attrs.length; i++) {
                const value = attrs[i];
                if (typeof value === 'number') {
                    mode = value;
                }
                else if (mode == 1 /* AttributeMarker.Classes */) {
                    classes = concatStringsWithSpace(classes, value);
                }
                else if (mode == 2 /* AttributeMarker.Styles */) {
                    const style = value;
                    const styleValue = attrs[++i];
                    styles = concatStringsWithSpace(styles, style + ': ' + styleValue + ';');
                }
            }
        }
        writeToHost ? tNode.styles = styles : tNode.stylesWithoutHost = styles;
        writeToHost ? tNode.classes = classes : tNode.classesWithoutHost = classes;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function collectNativeNodes(tView, lView, tNode, result, isProjection = false) {
        while (tNode !== null) {
            ngDevMode &&
                assertTNodeType(tNode, 3 /* TNodeType.AnyRNode */ | 12 /* TNodeType.AnyContainer */ | 16 /* TNodeType.Projection */ | 32 /* TNodeType.Icu */);
            const lNode = lView[tNode.index];
            if (lNode !== null) {
                result.push(unwrapRNode(lNode));
            }
            // A given lNode can represent either a native node or a LContainer (when it is a host of a
            // ViewContainerRef). When we find a LContainer we need to descend into it to collect root nodes
            // from the views in this container.
            if (isLContainer(lNode)) {
                for (let i = CONTAINER_HEADER_OFFSET; i < lNode.length; i++) {
                    const lViewInAContainer = lNode[i];
                    const lViewFirstChildTNode = lViewInAContainer[TVIEW].firstChild;
                    if (lViewFirstChildTNode !== null) {
                        collectNativeNodes(lViewInAContainer[TVIEW], lViewInAContainer, lViewFirstChildTNode, result);
                    }
                }
            }
            const tNodeType = tNode.type;
            if (tNodeType & 8 /* TNodeType.ElementContainer */) {
                collectNativeNodes(tView, lView, tNode.child, result);
            }
            else if (tNodeType & 32 /* TNodeType.Icu */) {
                const nextRNode = icuContainerIterate(tNode, lView);
                let rNode;
                while (rNode = nextRNode()) {
                    result.push(rNode);
                }
            }
            else if (tNodeType & 16 /* TNodeType.Projection */) {
                const nodesInSlot = getProjectionNodes(lView, tNode);
                if (Array.isArray(nodesInSlot)) {
                    result.push(...nodesInSlot);
                }
                else {
                    const parentView = getLViewParent(lView[DECLARATION_COMPONENT_VIEW]);
                    ngDevMode && assertParentView(parentView);
                    collectNativeNodes(parentView[TVIEW], parentView, nodesInSlot, result, true);
                }
            }
            tNode = isProjection ? tNode.projectionNext : tNode.next;
        }
        return result;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    class ViewRef {
        constructor(
        /**
         * This represents `LView` associated with the component when ViewRef is a ChangeDetectorRef.
         *
         * When ViewRef is created for a dynamic component, this also represents the `LView` for the
         * component.
         *
         * For a "regular" ViewRef created for an embedded view, this is the `LView` for the embedded
         * view.
         *
         * @internal
         */
        _lView,
        /**
         * This represents the `LView` associated with the point where `ChangeDetectorRef` was
         * requested.
         *
         * This may be different from `_lView` if the `_cdRefInjectingView` is an embedded view.
         */
        _cdRefInjectingView) {
            this._lView = _lView;
            this._cdRefInjectingView = _cdRefInjectingView;
            this._appRef = null;
            this._attachedToViewContainer = false;
        }
        get rootNodes() {
            const lView = this._lView;
            const tView = lView[TVIEW];
            return collectNativeNodes(tView, lView, tView.firstChild, []);
        }
        get context() {
            return this._lView[CONTEXT];
        }
        set context(value) {
            this._lView[CONTEXT] = value;
        }
        get destroyed() {
            return (this._lView[FLAGS] & 128 /* LViewFlags.Destroyed */) === 128 /* LViewFlags.Destroyed */;
        }
        destroy() {
            if (this._appRef) {
                this._appRef.detachView(this);
            }
            else if (this._attachedToViewContainer) {
                const parent = this._lView[PARENT];
                if (isLContainer(parent)) {
                    const viewRefs = parent[VIEW_REFS];
                    const index = viewRefs ? viewRefs.indexOf(this) : -1;
                    if (index > -1) {
                        ngDevMode &&
                            assertEqual(index, parent.indexOf(this._lView) - CONTAINER_HEADER_OFFSET, 'An attached view should be in the same position within its container as its ViewRef in the VIEW_REFS array.');
                        detachView(parent, index);
                        removeFromArray(viewRefs, index);
                    }
                }
                this._attachedToViewContainer = false;
            }
            destroyLView(this._lView[TVIEW], this._lView);
        }
        onDestroy(callback) {
            storeCleanupWithContext(this._lView[TVIEW], this._lView, null, callback);
        }
        /**
         * Marks a view and all of its ancestors dirty.
         *
         * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush OnPush} component is
         * checked when it needs to be re-rendered but the two normal triggers haven't marked it
         * dirty (i.e. inputs haven't changed and events haven't fired in the view).
         *
         * <!-- TODO: Add a link to a chapter on OnPush components -->
         *
         * @usageNotes
         * ### Example
         *
         * ```typescript
         * @Component({
         *   selector: 'app-root',
         *   template: `Number of ticks: {{numberOfTicks}}`
         *   changeDetection: ChangeDetectionStrategy.OnPush,
         * })
         * class AppComponent {
         *   numberOfTicks = 0;
         *
         *   constructor(private ref: ChangeDetectorRef) {
         *     setInterval(() => {
         *       this.numberOfTicks++;
         *       // the following is required, otherwise the view will not be updated
         *       this.ref.markForCheck();
         *     }, 1000);
         *   }
         * }
         * ```
         */
        markForCheck() {
            markViewDirty(this._cdRefInjectingView || this._lView);
        }
        /**
         * Detaches the view from the change detection tree.
         *
         * Detached views will not be checked during change detection runs until they are
         * re-attached, even if they are dirty. `detach` can be used in combination with
         * {@link ChangeDetectorRef#detectChanges detectChanges} to implement local change
         * detection checks.
         *
         * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
         * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
         *
         * @usageNotes
         * ### Example
         *
         * The following example defines a component with a large list of readonly data.
         * Imagine the data changes constantly, many times per second. For performance reasons,
         * we want to check and update the list every five seconds. We can do that by detaching
         * the component's change detector and doing a local check every five seconds.
         *
         * ```typescript
         * class DataProvider {
         *   // in a real application the returned data will be different every time
         *   get data() {
         *     return [1,2,3,4,5];
         *   }
         * }
         *
         * @Component({
         *   selector: 'giant-list',
         *   template: `
         *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
         *   `,
         * })
         * class GiantList {
         *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
         *     ref.detach();
         *     setInterval(() => {
         *       this.ref.detectChanges();
         *     }, 5000);
         *   }
         * }
         *
         * @Component({
         *   selector: 'app',
         *   providers: [DataProvider],
         *   template: `
         *     <giant-list><giant-list>
         *   `,
         * })
         * class App {
         * }
         * ```
         */
        detach() {
            this._lView[FLAGS] &= ~64 /* LViewFlags.Attached */;
        }
        /**
         * Re-attaches a view to the change detection tree.
         *
         * This can be used to re-attach views that were previously detached from the tree
         * using {@link ChangeDetectorRef#detach detach}. Views are attached to the tree by default.
         *
         * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
         *
         * @usageNotes
         * ### Example
         *
         * The following example creates a component displaying `live` data. The component will detach
         * its change detector from the main change detector tree when the component's live property
         * is set to false.
         *
         * ```typescript
         * class DataProvider {
         *   data = 1;
         *
         *   constructor() {
         *     setInterval(() => {
         *       this.data = this.data * 2;
         *     }, 500);
         *   }
         * }
         *
         * @Component({
         *   selector: 'live-data',
         *   inputs: ['live'],
         *   template: 'Data: {{dataProvider.data}}'
         * })
         * class LiveData {
         *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
         *
         *   set live(value) {
         *     if (value) {
         *       this.ref.reattach();
         *     } else {
         *       this.ref.detach();
         *     }
         *   }
         * }
         *
         * @Component({
         *   selector: 'app-root',
         *   providers: [DataProvider],
         *   template: `
         *     Live Update: <input type="checkbox" [(ngModel)]="live">
         *     <live-data [live]="live"><live-data>
         *   `,
         * })
         * class AppComponent {
         *   live = true;
         * }
         * ```
         */
        reattach() {
            this._lView[FLAGS] |= 64 /* LViewFlags.Attached */;
        }
        /**
         * Checks the view and its children.
         *
         * This can also be used in combination with {@link ChangeDetectorRef#detach detach} to implement
         * local change detection checks.
         *
         * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
         * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
         *
         * @usageNotes
         * ### Example
         *
         * The following example defines a component with a large list of readonly data.
         * Imagine, the data changes constantly, many times per second. For performance reasons,
         * we want to check and update the list every five seconds.
         *
         * We can do that by detaching the component's change detector and doing a local change detection
         * check every five seconds.
         *
         * See {@link ChangeDetectorRef#detach detach} for more information.
         */
        detectChanges() {
            detectChangesInternal(this._lView[TVIEW], this._lView, this.context);
        }
        /**
         * Checks the change detector and its children, and throws if any changes are detected.
         *
         * This is used in development mode to verify that running change detection doesn't
         * introduce other changes.
         */
        checkNoChanges() {
            if (ngDevMode) {
                checkNoChangesInternal(this._lView[TVIEW], this._lView, this.context);
            }
        }
        attachToViewContainerRef() {
            if (this._appRef) {
                throw new RuntimeError(902 /* RuntimeErrorCode.VIEW_ALREADY_ATTACHED */, ngDevMode && 'This view is already attached directly to the ApplicationRef!');
            }
            this._attachedToViewContainer = true;
        }
        detachFromAppRef() {
            this._appRef = null;
            renderDetachView(this._lView[TVIEW], this._lView);
        }
        attachToAppRef(appRef) {
            if (this._attachedToViewContainer) {
                throw new RuntimeError(902 /* RuntimeErrorCode.VIEW_ALREADY_ATTACHED */, ngDevMode && 'This view is already attached to a ViewContainer!');
            }
            this._appRef = appRef;
        }
    }
    /** @internal */
    class RootViewRef extends ViewRef {
        constructor(_view) {
            super(_view);
            this._view = _view;
        }
        detectChanges() {
            const lView = this._view;
            const tView = lView[TVIEW];
            const context = lView[CONTEXT];
            detectChangesInternal(tView, lView, context, false);
        }
        checkNoChanges() {
            if (ngDevMode) {
                const lView = this._view;
                const tView = lView[TVIEW];
                const context = lView[CONTEXT];
                checkNoChangesInternal(tView, lView, context, false);
            }
        }
        get context() {
            return null;
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    class ComponentFactoryResolver extends ComponentFactoryResolver$1 {
        /**
         * @param ngModule The NgModuleRef to which all resolved factories are bound.
         */
        constructor(ngModule) {
            super();
            this.ngModule = ngModule;
        }
        resolveComponentFactory(component) {
            ngDevMode && assertComponentType(component);
            const componentDef = getComponentDef$1(component);
            return new ComponentFactory(componentDef, this.ngModule);
        }
    }
    function toRefArray(map) {
        const array = [];
        for (let nonMinified in map) {
            if (map.hasOwnProperty(nonMinified)) {
                const minified = map[nonMinified];
                array.push({ propName: minified, templateName: nonMinified });
            }
        }
        return array;
    }
    function getNamespace(elementName) {
        const name = elementName.toLowerCase();
        return name === 'svg' ? SVG_NAMESPACE : (name === 'math' ? MATH_ML_NAMESPACE : null);
    }
    /**
     * Injector that looks up a value using a specific injector, before falling back to the module
     * injector. Used primarily when creating components or embedded views dynamically.
     */
    class ChainedInjector {
        constructor(injector, parentInjector) {
            this.injector = injector;
            this.parentInjector = parentInjector;
        }
        get(token, notFoundValue, flags) {
            flags = convertToBitFlags(flags);
            const value = this.injector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, flags);
            if (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
                notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
                // Return the value from the root element injector when
                // - it provides it
                //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
                // - the module injector should not be checked
                //   (notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
                return value;
            }
            return this.parentInjector.get(token, notFoundValue, flags);
        }
    }
    /**
     * ComponentFactory interface implementation.
     */
    class ComponentFactory extends ComponentFactory$1 {
        /**
         * @param componentDef The component definition.
         * @param ngModule The NgModuleRef to which the factory is bound.
         */
        constructor(componentDef, ngModule) {
            super();
            this.componentDef = componentDef;
            this.ngModule = ngModule;
            this.componentType = componentDef.type;
            this.selector = stringifyCSSSelectorList(componentDef.selectors);
            this.ngContentSelectors =
                componentDef.ngContentSelectors ? componentDef.ngContentSelectors : [];
            this.isBoundToModule = !!ngModule;
        }
        get inputs() {
            return toRefArray(this.componentDef.inputs);
        }
        get outputs() {
            return toRefArray(this.componentDef.outputs);
        }
        create(injector, projectableNodes, rootSelectorOrNode, environmentInjector) {
            environmentInjector = environmentInjector || this.ngModule;
            let realEnvironmentInjector = environmentInjector instanceof EnvironmentInjector ?
                environmentInjector :
                environmentInjector === null || environmentInjector === void 0 ? void 0 : environmentInjector.injector;
            if (realEnvironmentInjector && this.componentDef.getStandaloneInjector !== null) {
                realEnvironmentInjector = this.componentDef.getStandaloneInjector(realEnvironmentInjector) ||
                    realEnvironmentInjector;
            }
            const rootViewInjector = realEnvironmentInjector ? new ChainedInjector(injector, realEnvironmentInjector) : injector;
            const rendererFactory = rootViewInjector.get(RendererFactory2, null);
            if (rendererFactory === null) {
                throw new RuntimeError(407 /* RuntimeErrorCode.RENDERER_NOT_FOUND */, ngDevMode &&
                    'Angular was not able to inject a renderer (RendererFactory2). ' +
                        'Likely this is due to a broken DI hierarchy. ' +
                        'Make sure that any injector used to create this component has a correct parent.');
            }
            const sanitizer = rootViewInjector.get(Sanitizer, null);
            const hostRenderer = rendererFactory.createRenderer(null, this.componentDef);
            // Determine a tag name used for creating host elements when this component is created
            // dynamically. Default to 'div' if this component did not specify any tag name in its selector.
            const elementName = this.componentDef.selectors[0][0] || 'div';
            const hostRNode = rootSelectorOrNode ?
                locateHostElement(hostRenderer, rootSelectorOrNode, this.componentDef.encapsulation) :
                createElementNode(hostRenderer, elementName, getNamespace(elementName));
            const rootFlags = this.componentDef.onPush ? 32 /* LViewFlags.Dirty */ | 256 /* LViewFlags.IsRoot */ :
                16 /* LViewFlags.CheckAlways */ | 256 /* LViewFlags.IsRoot */;
            // Create the root view. Uses empty TView and ContentTemplate.
            const rootTView = createTView(0 /* TViewType.Root */, null, null, 1, 0, null, null, null, null, null);
            const rootLView = createLView(null, rootTView, null, rootFlags, null, null, rendererFactory, hostRenderer, sanitizer, rootViewInjector, null);
            // rootView is the parent when bootstrapping
            // TODO(misko): it looks like we are entering view here but we don't really need to as
            // `renderView` does that. However as the code is written it is needed because
            // `createRootComponentView` and `createRootComponent` both read global state. Fixing those
            // issues would allow us to drop this.
            enterView(rootLView);
            let component;
            let tElementNode;
            try {
                const rootComponentDef = this.componentDef;
                let rootDirectives;
                let hostDirectiveDefs = null;
                if (rootComponentDef.findHostDirectiveDefs) {
                    rootDirectives = [];
                    hostDirectiveDefs = new Map();
                    rootComponentDef.findHostDirectiveDefs(rootComponentDef, rootDirectives, hostDirectiveDefs);
                    rootDirectives.push(rootComponentDef);
                }
                else {
                    rootDirectives = [rootComponentDef];
                }
                const hostTNode = createRootComponentTNode(rootLView, hostRNode);
                const componentView = createRootComponentView(hostTNode, hostRNode, rootComponentDef, rootDirectives, rootLView, rendererFactory, hostRenderer);
                tElementNode = getTNode(rootTView, HEADER_OFFSET);
                // TODO(crisbeto): in practice `hostRNode` should always be defined, but there are some tests
                // where the renderer is mocked out and `undefined` is returned. We should update the tests so
                // that this check can be removed.
                if (hostRNode) {
                    setRootNodeAttributes(hostRenderer, rootComponentDef, hostRNode, rootSelectorOrNode);
                }
                if (projectableNodes !== undefined) {
                    projectNodes(tElementNode, this.ngContentSelectors, projectableNodes);
                }
                // TODO: should LifecycleHooksFeature and other host features be generated by the compiler and
                // executed here?
                // Angular 5 reference: https://stackblitz.com/edit/lifecycle-hooks-vcref
                component = createRootComponent(componentView, rootComponentDef, rootDirectives, hostDirectiveDefs, rootLView, [LifecycleHooksFeature]);
                renderView(rootTView, rootLView, null);
            }
            finally {
                leaveView();
            }
            return new ComponentRef(this.componentType, component, createElementRef(tElementNode, rootLView), rootLView, tElementNode);
        }
    }
    new ComponentFactoryResolver();
    /**
     * Represents an instance of a Component created via a {@link ComponentFactory}.
     *
     * `ComponentRef` provides access to the Component Instance as well other objects related to this
     * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
     * method.
     *
     */
    class ComponentRef extends ComponentRef$1 {
        constructor(componentType, instance, location, _rootLView, _tNode) {
            super();
            this.location = location;
            this._rootLView = _rootLView;
            this._tNode = _tNode;
            this.instance = instance;
            this.hostView = this.changeDetectorRef = new RootViewRef(_rootLView);
            this.componentType = componentType;
        }
        setInput(name, value) {
            const inputData = this._tNode.inputs;
            let dataValue;
            if (inputData !== null && (dataValue = inputData[name])) {
                const lView = this._rootLView;
                setInputsForProperty(lView[TVIEW], lView, dataValue, name, value);
                markDirtyIfOnPush(lView, this._tNode.index);
            }
            else {
                if (ngDevMode) {
                    const cmpNameForError = stringifyForError(this.componentType);
                    let message = `Can't set value of the '${name}' input on the '${cmpNameForError}' component. `;
                    message += `Make sure that the '${name}' property is annotated with @Input() or a mapped @Input('${name}') exists.`;
                    reportUnknownPropertyError(message);
                }
            }
        }
        get injector() {
            return new NodeInjector(this._tNode, this._rootLView);
        }
        destroy() {
            this.hostView.destroy();
        }
        onDestroy(callback) {
            this.hostView.onDestroy(callback);
        }
    }
    /** Creates a TNode that can be used to instantiate a root component. */
    function createRootComponentTNode(lView, rNode) {
        const tView = lView[TVIEW];
        const index = HEADER_OFFSET;
        ngDevMode && assertIndexInRange(lView, index);
        lView[index] = rNode;
        // '#host' is added here as we don't know the real host DOM name (we don't want to read it) and at
        // the same time we want to communicate the debug `TNode` that this is a special `TNode`
        // representing a host element.
        return getOrCreateTNode(tView, index, 2 /* TNodeType.Element */, '#host', null);
    }
    /**
     * Creates the root component view and the root component node.
     *
     * @param rNode Render host element.
     * @param rootComponentDef ComponentDef
     * @param rootView The parent view where the host node is stored
     * @param rendererFactory Factory to be used for creating child renderers.
     * @param hostRenderer The current renderer
     * @param sanitizer The sanitizer, if provided
     *
     * @returns Component view created
     */
    function createRootComponentView(tNode, rNode, rootComponentDef, rootDirectives, rootView, rendererFactory, hostRenderer, sanitizer) {
        const tView = rootView[TVIEW];
        applyRootComponentStyling(rootDirectives, tNode, rNode, hostRenderer);
        const viewRenderer = rendererFactory.createRenderer(rNode, rootComponentDef);
        const componentView = createLView(rootView, getOrCreateComponentTView(rootComponentDef), null, rootComponentDef.onPush ? 32 /* LViewFlags.Dirty */ : 16 /* LViewFlags.CheckAlways */, rootView[tNode.index], tNode, rendererFactory, viewRenderer, sanitizer || null, null, null);
        if (tView.firstCreatePass) {
            markAsComponentHost(tView, tNode, rootDirectives.length - 1);
        }
        addToViewTree(rootView, componentView);
        // Store component view at node index, with node as the HOST
        return rootView[tNode.index] = componentView;
    }
    /** Sets up the styling information on a root component. */
    function applyRootComponentStyling(rootDirectives, tNode, rNode, hostRenderer) {
        for (const def of rootDirectives) {
            tNode.mergedAttrs = mergeHostAttrs(tNode.mergedAttrs, def.hostAttrs);
        }
        if (tNode.mergedAttrs !== null) {
            computeStaticStyling(tNode, tNode.mergedAttrs, true);
            if (rNode !== null) {
                setupStaticAttributes(hostRenderer, rNode, tNode);
            }
        }
    }
    /**
     * Creates a root component and sets it up with features and host bindings.Shared by
     * renderComponent() and ViewContainerRef.createComponent().
     */
    function createRootComponent(componentView, rootComponentDef, rootDirectives, hostDirectiveDefs, rootLView, hostFeatures) {
        const rootTNode = getCurrentTNode();
        ngDevMode && assertDefined(rootTNode, 'tNode should have been already created');
        const tView = rootLView[TVIEW];
        const native = getNativeByTNode(rootTNode, rootLView);
        initializeDirectives(tView, rootLView, rootTNode, rootDirectives, null, hostDirectiveDefs);
        for (let i = 0; i < rootDirectives.length; i++) {
            const directiveIndex = rootTNode.directiveStart + i;
            const directiveInstance = getNodeInjectable(rootLView, tView, directiveIndex, rootTNode);
            attachPatchData(directiveInstance, rootLView);
        }
        invokeDirectivesHostBindings(tView, rootLView, rootTNode);
        if (native) {
            attachPatchData(native, rootLView);
        }
        // We're guaranteed for the `componentOffset` to be positive here
        // since a root component always matches a component def.
        ngDevMode &&
            assertGreaterThan(rootTNode.componentOffset, -1, 'componentOffset must be great than -1');
        const component = getNodeInjectable(rootLView, tView, rootTNode.directiveStart + rootTNode.componentOffset, rootTNode);
        componentView[CONTEXT] = rootLView[CONTEXT] = component;
        if (hostFeatures !== null) {
            for (const feature of hostFeatures) {
                feature(component, rootComponentDef);
            }
        }
        // We want to generate an empty QueryList for root content queries for backwards
        // compatibility with ViewEngine.
        executeContentQueries(tView, rootTNode, componentView);
        return component;
    }
    /** Sets the static attributes on a root component. */
    function setRootNodeAttributes(hostRenderer, componentDef, hostRNode, rootSelectorOrNode) {
        if (rootSelectorOrNode) {
            setUpAttributes(hostRenderer, hostRNode, ['ng-version', VERSION.full]);
        }
        else {
            // If host element is created as a part of this function call (i.e. `rootSelectorOrNode`
            // is not defined), also apply attributes and classes extracted from component selector.
            // Extract attributes and classes from the first selector only to match VE behavior.
            const { attrs, classes } = extractAttrsAndClassesFromSelector(componentDef.selectors[0]);
            if (attrs) {
                setUpAttributes(hostRenderer, hostRNode, attrs);
            }
            if (classes && classes.length > 0) {
                writeDirectClass(hostRenderer, hostRNode, classes.join(' '));
            }
        }
    }
    /** Projects the `projectableNodes` that were specified when creating a root component. */
    function projectNodes(tNode, ngContentSelectors, projectableNodes) {
        const projection = tNode.projection = [];
        for (let i = 0; i < ngContentSelectors.length; i++) {
            const nodesforSlot = projectableNodes[i];
            // Projectable nodes can be passed as array of arrays or an array of iterables (ngUpgrade
            // case). Here we do normalize passed data structure to be an array of arrays to avoid
            // complex checks down the line.
            // We also normalize the length of the passed in projectable nodes (to match the number of
            // <ng-container> slots defined by a component).
            projection.push(nodesforSlot != null ? Array.from(nodesforSlot) : null);
        }
    }
    /**
     * Used to enable lifecycle hooks on the root component.
     *
     * Include this feature when calling `renderComponent` if the root component
     * you are rendering has lifecycle hooks defined. Otherwise, the hooks won't
     * be called properly.
     *
     * Example:
     *
     * ```
     * renderComponent(AppComponent, {hostFeatures: [LifecycleHooksFeature]});
     * ```
     */
    function LifecycleHooksFeature() {
        const tNode = getCurrentTNode();
        ngDevMode && assertDefined(tNode, 'TNode is required');
        registerPostOrderHooks(getLView()[TVIEW], tNode);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * NOTE: changes to the `ngI18nClosureMode` name must be synced with `compiler-cli/src/tooling.ts`.
     */
    if (typeof ngI18nClosureMode === 'undefined') {
        // These property accesses can be ignored because ngI18nClosureMode will be set to false
        // when optimizing code and the whole if statement will be dropped.
        // Make sure to refer to ngI18nClosureMode as ['ngI18nClosureMode'] for closure.
        // NOTE: we need to have it in IIFE so that the tree-shaker is happy.
        (function () {
            // tslint:disable-next-line:no-toplevel-property-access
            _global$1['ngI18nClosureMode'] =
                // TODO(FW-1250): validate that this actually, you know, works.
                // tslint:disable-next-line:no-toplevel-property-access
                typeof goog !== 'undefined' && typeof goog.getMsg === 'function';
        })();
    }
    /**
     * Index of each type of locale data from the locale data array
     */
    var LocaleDataIndex;
    (function (LocaleDataIndex) {
        LocaleDataIndex[LocaleDataIndex["LocaleId"] = 0] = "LocaleId";
        LocaleDataIndex[LocaleDataIndex["DayPeriodsFormat"] = 1] = "DayPeriodsFormat";
        LocaleDataIndex[LocaleDataIndex["DayPeriodsStandalone"] = 2] = "DayPeriodsStandalone";
        LocaleDataIndex[LocaleDataIndex["DaysFormat"] = 3] = "DaysFormat";
        LocaleDataIndex[LocaleDataIndex["DaysStandalone"] = 4] = "DaysStandalone";
        LocaleDataIndex[LocaleDataIndex["MonthsFormat"] = 5] = "MonthsFormat";
        LocaleDataIndex[LocaleDataIndex["MonthsStandalone"] = 6] = "MonthsStandalone";
        LocaleDataIndex[LocaleDataIndex["Eras"] = 7] = "Eras";
        LocaleDataIndex[LocaleDataIndex["FirstDayOfWeek"] = 8] = "FirstDayOfWeek";
        LocaleDataIndex[LocaleDataIndex["WeekendRange"] = 9] = "WeekendRange";
        LocaleDataIndex[LocaleDataIndex["DateFormat"] = 10] = "DateFormat";
        LocaleDataIndex[LocaleDataIndex["TimeFormat"] = 11] = "TimeFormat";
        LocaleDataIndex[LocaleDataIndex["DateTimeFormat"] = 12] = "DateTimeFormat";
        LocaleDataIndex[LocaleDataIndex["NumberSymbols"] = 13] = "NumberSymbols";
        LocaleDataIndex[LocaleDataIndex["NumberFormats"] = 14] = "NumberFormats";
        LocaleDataIndex[LocaleDataIndex["CurrencyCode"] = 15] = "CurrencyCode";
        LocaleDataIndex[LocaleDataIndex["CurrencySymbol"] = 16] = "CurrencySymbol";
        LocaleDataIndex[LocaleDataIndex["CurrencyName"] = 17] = "CurrencyName";
        LocaleDataIndex[LocaleDataIndex["Currencies"] = 18] = "Currencies";
        LocaleDataIndex[LocaleDataIndex["Directionality"] = 19] = "Directionality";
        LocaleDataIndex[LocaleDataIndex["PluralCase"] = 20] = "PluralCase";
        LocaleDataIndex[LocaleDataIndex["ExtraData"] = 21] = "ExtraData";
    })(LocaleDataIndex || (LocaleDataIndex = {}));
    /**
     * See `I18nCreateOpCodes`
     */
    var I18nCreateOpCode;
    (function (I18nCreateOpCode) {
        /**
         * Number of bits to shift index so that it can be combined with the `APPEND_EAGERLY` and
         * `COMMENT`.
         */
        I18nCreateOpCode[I18nCreateOpCode["SHIFT"] = 2] = "SHIFT";
        /**
         * Should the node be appended to parent immediately after creation.
         */
        I18nCreateOpCode[I18nCreateOpCode["APPEND_EAGERLY"] = 1] = "APPEND_EAGERLY";
        /**
         * If set the node should be comment (rather than a text) node.
         */
        I18nCreateOpCode[I18nCreateOpCode["COMMENT"] = 2] = "COMMENT";
    })(I18nCreateOpCode || (I18nCreateOpCode = {}));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Represents an instance of an `NgModule` created by an `NgModuleFactory`.
     * Provides access to the `NgModule` instance and related objects.
     *
     * @publicApi
     */
    class NgModuleRef$1 {
    }
    class EnvironmentNgModuleRefAdapter extends NgModuleRef$1 {
        constructor(providers, parent, source) {
            super();
            this.componentFactoryResolver = new ComponentFactoryResolver(this);
            this.instance = null;
            const injector = new R3Injector([
                ...providers,
                { provide: NgModuleRef$1, useValue: this },
                { provide: ComponentFactoryResolver$1, useValue: this.componentFactoryResolver },
            ], parent || getNullInjector(), source, new Set(['environment']));
            this.injector = injector;
            injector.resolveInjectorInitializers();
        }
        destroy() {
            this.injector.destroy();
        }
        onDestroy(callback) {
            this.injector.onDestroy(callback);
        }
    }
    /**
     * Create a new environment injector.
     *
     * Learn more about environment injectors in
     * [this guide](guide/standalone-components#environment-injectors).
     *
     * @param providers An array of providers.
     * @param parent A parent environment injector.
     * @param debugName An optional name for this injector instance, which will be used in error
     *     messages.
     *
     * @publicApi
     */
    function createEnvironmentInjector(providers, parent, debugName = null) {
        const adapter = new EnvironmentNgModuleRefAdapter(providers, parent, debugName);
        return adapter.injector;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A service used by the framework to create instances of standalone injectors. Those injectors are
     * created on demand in case of dynamic component instantiation and contain ambient providers
     * collected from the imports graph rooted at a given standalone component.
     */
    class StandaloneService {
        constructor(_injector) {
            this._injector = _injector;
            this.cachedInjectors = new Map();
        }
        getOrCreateStandaloneInjector(componentDef) {
            if (!componentDef.standalone) {
                return null;
            }
            if (!this.cachedInjectors.has(componentDef.id)) {
                const providers = internalImportProvidersFrom(false, componentDef.type);
                const standaloneInjector = providers.length > 0 ?
                    createEnvironmentInjector([providers], this._injector, `Standalone[${componentDef.type.name}]`) :
                    null;
                this.cachedInjectors.set(componentDef.id, standaloneInjector);
            }
            return this.cachedInjectors.get(componentDef.id);
        }
        ngOnDestroy() {
            try {
                for (const injector of this.cachedInjectors.values()) {
                    if (injector !== null) {
                        injector.destroy();
                    }
                }
            }
            finally {
                this.cachedInjectors.clear();
            }
        }
    }
    /** @nocollapse */
    StandaloneService.ɵprov = ɵɵdefineInjectable({
        token: StandaloneService,
        providedIn: 'environment',
        factory: () => new StandaloneService(ɵɵinject(EnvironmentInjector)),
    });
    function generateStandaloneInDeclarationsError(type, location) {
        const prefix = `Unexpected "${stringifyForError(type)}" found in the "declarations" array of the`;
        const suffix = `"${stringifyForError(type)}" is marked as standalone and can't be declared ` +
            'in any NgModule - did you intend to import it instead (by adding it to the "imports" array)?';
        return `${prefix} ${location}, ${suffix}`;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    let _nextReferenceId = 0;
    class MetadataOverrider {
        constructor() {
            this._references = new Map();
        }
        /**
         * Creates a new instance for the given metadata class
         * based on an old instance and overrides.
         */
        overrideMetadata(metadataClass, oldMetadata, override) {
            const props = {};
            if (oldMetadata) {
                _valueProps(oldMetadata).forEach((prop) => props[prop] = oldMetadata[prop]);
            }
            if (override.set) {
                if (override.remove || override.add) {
                    throw new Error(`Cannot set and add/remove ${core["ɵstringify"](metadataClass)} at the same time!`);
                }
                setMetadata(props, override.set);
            }
            if (override.remove) {
                removeMetadata(props, override.remove, this._references);
            }
            if (override.add) {
                addMetadata(props, override.add);
            }
            return new metadataClass(props);
        }
    }
    function removeMetadata(metadata, remove, references) {
        const removeObjects = new Set();
        for (const prop in remove) {
            const removeValue = remove[prop];
            if (Array.isArray(removeValue)) {
                removeValue.forEach((value) => {
                    removeObjects.add(_propHashKey(prop, value, references));
                });
            }
            else {
                removeObjects.add(_propHashKey(prop, removeValue, references));
            }
        }
        for (const prop in metadata) {
            const propValue = metadata[prop];
            if (Array.isArray(propValue)) {
                metadata[prop] = propValue.filter((value) => !removeObjects.has(_propHashKey(prop, value, references)));
            }
            else {
                if (removeObjects.has(_propHashKey(prop, propValue, references))) {
                    metadata[prop] = undefined;
                }
            }
        }
    }
    function addMetadata(metadata, add) {
        for (const prop in add) {
            const addValue = add[prop];
            const propValue = metadata[prop];
            if (propValue != null && Array.isArray(propValue)) {
                metadata[prop] = propValue.concat(addValue);
            }
            else {
                metadata[prop] = addValue;
            }
        }
    }
    function setMetadata(metadata, set) {
        for (const prop in set) {
            metadata[prop] = set[prop];
        }
    }
    function _propHashKey(propName, propValue, references) {
        let nextObjectId = 0;
        const objectIds = new Map();
        const replacer = (key, value) => {
            if (value !== null && typeof value === 'object') {
                if (objectIds.has(value)) {
                    return objectIds.get(value);
                }
                // Record an id for this object such that any later references use the object's id instead
                // of the object itself, in order to break cyclic pointers in objects.
                objectIds.set(value, `ɵobj#${nextObjectId++}`);
                // The first time an object is seen the object itself is serialized.
                return value;
            }
            else if (typeof value === 'function') {
                value = _serializeReference(value, references);
            }
            return value;
        };
        return `${propName}:${JSON.stringify(propValue, replacer)}`;
    }
    function _serializeReference(ref, references) {
        let id = references.get(ref);
        if (!id) {
            id = `${core["ɵstringify"](ref)}${_nextReferenceId++}`;
            references.set(ref, id);
        }
        return id;
    }
    function _valueProps(obj) {
        const props = [];
        // regular public props
        Object.keys(obj).forEach((prop) => {
            if (!prop.startsWith('_')) {
                props.push(prop);
            }
        });
        // getters
        let proto = obj;
        while (proto = Object.getPrototypeOf(proto)) {
            Object.keys(proto).forEach((protoProp) => {
                const desc = Object.getOwnPropertyDescriptor(proto, protoProp);
                if (!protoProp.startsWith('_') && desc && 'get' in desc) {
                    props.push(protoProp);
                }
            });
        }
        return props;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const reflection = new core["ɵReflectionCapabilities"]();
    /**
     * Allows to override ivy metadata for tests (via the `TestBed`).
     */
    class OverrideResolver {
        constructor() {
            this.overrides = new Map();
            this.resolved = new Map();
        }
        addOverride(type, override) {
            const overrides = this.overrides.get(type) || [];
            overrides.push(override);
            this.overrides.set(type, overrides);
            this.resolved.delete(type);
        }
        setOverrides(overrides) {
            this.overrides.clear();
            overrides.forEach(([type, override]) => {
                this.addOverride(type, override);
            });
        }
        getAnnotation(type) {
            const annotations = reflection.annotations(type);
            // Try to find the nearest known Type annotation and make sure that this annotation is an
            // instance of the type we are looking for, so we can use it for resolution. Note: there might
            // be multiple known annotations found due to the fact that Components can extend Directives (so
            // both Directive and Component annotations would be present), so we always check if the known
            // annotation has the right type.
            for (let i = annotations.length - 1; i >= 0; i--) {
                const annotation = annotations[i];
                const isKnownType = annotation instanceof core.Directive || annotation instanceof core.Component ||
                    annotation instanceof core.Pipe || annotation instanceof core.NgModule;
                if (isKnownType) {
                    return annotation instanceof this.type ? annotation : null;
                }
            }
            return null;
        }
        resolve(type) {
            let resolved = this.resolved.get(type) || null;
            if (!resolved) {
                resolved = this.getAnnotation(type);
                if (resolved) {
                    const overrides = this.overrides.get(type);
                    if (overrides) {
                        const overrider = new MetadataOverrider();
                        overrides.forEach(override => {
                            resolved = overrider.overrideMetadata(this.type, resolved, override);
                        });
                    }
                }
                this.resolved.set(type, resolved);
            }
            return resolved;
        }
    }
    class DirectiveResolver extends OverrideResolver {
        get type() {
            return core.Directive;
        }
    }
    class ComponentResolver extends OverrideResolver {
        get type() {
            return core.Component;
        }
    }
    class PipeResolver extends OverrideResolver {
        get type() {
            return core.Pipe;
        }
    }
    class NgModuleResolver extends OverrideResolver {
        get type() {
            return core.NgModule;
        }
    }

    var TestingModuleOverride;
    (function (TestingModuleOverride) {
        TestingModuleOverride[TestingModuleOverride["DECLARATION"] = 0] = "DECLARATION";
        TestingModuleOverride[TestingModuleOverride["OVERRIDE_TEMPLATE"] = 1] = "OVERRIDE_TEMPLATE";
    })(TestingModuleOverride || (TestingModuleOverride = {}));
    function isTestingModuleOverride(value) {
        return value === TestingModuleOverride.DECLARATION ||
            value === TestingModuleOverride.OVERRIDE_TEMPLATE;
    }
    function assertNoStandaloneComponents(types, resolver, location) {
        types.forEach(type => {
            const component = resolver.resolve(type);
            if (component && component.standalone) {
                throw new Error(generateStandaloneInDeclarationsError(type, location));
            }
        });
    }
    class TestBedCompiler {
        constructor(platform, additionalModuleTypes) {
            this.platform = platform;
            this.additionalModuleTypes = additionalModuleTypes;
            this.originalComponentResolutionQueue = null;
            // Testing module configuration
            this.declarations = [];
            this.imports = [];
            this.providers = [];
            this.schemas = [];
            // Queues of components/directives/pipes that should be recompiled.
            this.pendingComponents = new Set();
            this.pendingDirectives = new Set();
            this.pendingPipes = new Set();
            // Keep track of all components and directives, so we can patch Providers onto defs later.
            this.seenComponents = new Set();
            this.seenDirectives = new Set();
            // Keep track of overridden modules, so that we can collect all affected ones in the module tree.
            this.overriddenModules = new Set();
            // Store resolved styles for Components that have template overrides present and `styleUrls`
            // defined at the same time.
            this.existingComponentStyles = new Map();
            this.resolvers = initResolvers();
            this.componentToModuleScope = new Map();
            // Map that keeps initial version of component/directive/pipe defs in case
            // we compile a Type again, thus overriding respective static fields. This is
            // required to make sure we restore defs to their initial states between test runs.
            // Note: one class may have multiple defs (for example: ɵmod and ɵinj in case of an
            // NgModule), store all of them in a map.
            this.initialNgDefs = new Map();
            // Array that keeps cleanup operations for initial versions of component/directive/pipe/module
            // defs in case TestBed makes changes to the originals.
            this.defCleanupOps = [];
            this._injector = null;
            this.compilerProviders = null;
            this.providerOverrides = [];
            this.rootProviderOverrides = [];
            // Overrides for injectables with `{providedIn: SomeModule}` need to be tracked and added to that
            // module's provider list.
            this.providerOverridesByModule = new Map();
            this.providerOverridesByToken = new Map();
            this.scopesWithOverriddenProviders = new Set();
            this.testModuleRef = null;
            class DynamicTestModule {
            }
            this.testModuleType = DynamicTestModule;
        }
        setCompilerProviders(providers) {
            this.compilerProviders = providers;
            this._injector = null;
        }
        configureTestingModule(moduleDef) {
            // Enqueue any compilation tasks for the directly declared component.
            if (moduleDef.declarations !== undefined) {
                // Verify that there are no standalone components
                assertNoStandaloneComponents(moduleDef.declarations, this.resolvers.component, '"TestBed.configureTestingModule" call');
                this.queueTypeArray(moduleDef.declarations, TestingModuleOverride.DECLARATION);
                this.declarations.push(...moduleDef.declarations);
            }
            // Enqueue any compilation tasks for imported modules.
            if (moduleDef.imports !== undefined) {
                this.queueTypesFromModulesArray(moduleDef.imports);
                this.imports.push(...moduleDef.imports);
            }
            if (moduleDef.providers !== undefined) {
                this.providers.push(...moduleDef.providers);
            }
            if (moduleDef.schemas !== undefined) {
                this.schemas.push(...moduleDef.schemas);
            }
        }
        overrideModule(ngModule, override) {
            this.overriddenModules.add(ngModule);
            // Compile the module right away.
            this.resolvers.module.addOverride(ngModule, override);
            const metadata = this.resolvers.module.resolve(ngModule);
            if (metadata === null) {
                throw invalidTypeError(ngModule.name, 'NgModule');
            }
            this.recompileNgModule(ngModule, metadata);
            // At this point, the module has a valid module def (ɵmod), but the override may have introduced
            // new declarations or imported modules. Ingest any possible new types and add them to the
            // current queue.
            this.queueTypesFromModulesArray([ngModule]);
        }
        overrideComponent(component, override) {
            this.verifyNoStandaloneFlagOverrides(component, override);
            this.resolvers.component.addOverride(component, override);
            this.pendingComponents.add(component);
        }
        overrideDirective(directive, override) {
            this.verifyNoStandaloneFlagOverrides(directive, override);
            this.resolvers.directive.addOverride(directive, override);
            this.pendingDirectives.add(directive);
        }
        overridePipe(pipe, override) {
            this.verifyNoStandaloneFlagOverrides(pipe, override);
            this.resolvers.pipe.addOverride(pipe, override);
            this.pendingPipes.add(pipe);
        }
        verifyNoStandaloneFlagOverrides(type, override) {
            var _a, _b, _c;
            if (((_a = override.add) === null || _a === void 0 ? void 0 : _a.hasOwnProperty('standalone')) || ((_b = override.set) === null || _b === void 0 ? void 0 : _b.hasOwnProperty('standalone')) ||
                ((_c = override.remove) === null || _c === void 0 ? void 0 : _c.hasOwnProperty('standalone'))) {
                throw new Error(`An override for the ${type.name} class has the \`standalone\` flag. ` +
                    `Changing the \`standalone\` flag via TestBed overrides is not supported.`);
            }
        }
        overrideProvider(token, provider) {
            let providerDef;
            if (provider.useFactory !== undefined) {
                providerDef = {
                    provide: token,
                    useFactory: provider.useFactory,
                    deps: provider.deps || [],
                    multi: provider.multi
                };
            }
            else if (provider.useValue !== undefined) {
                providerDef = { provide: token, useValue: provider.useValue, multi: provider.multi };
            }
            else {
                providerDef = { provide: token };
            }
            const injectableDef = typeof token !== 'string' ? core["ɵgetInjectableDef"](token) : null;
            const providedIn = injectableDef === null ? null : core.resolveForwardRef(injectableDef.providedIn);
            const overridesBucket = providedIn === 'root' ? this.rootProviderOverrides : this.providerOverrides;
            overridesBucket.push(providerDef);
            // Keep overrides grouped by token as well for fast lookups using token
            this.providerOverridesByToken.set(token, providerDef);
            if (injectableDef !== null && providedIn !== null && typeof providedIn !== 'string') {
                const existingOverrides = this.providerOverridesByModule.get(providedIn);
                if (existingOverrides !== undefined) {
                    existingOverrides.push(providerDef);
                }
                else {
                    this.providerOverridesByModule.set(providedIn, [providerDef]);
                }
            }
        }
        overrideTemplateUsingTestingModule(type, template) {
            const def = type[core["ɵNG_COMP_DEF"]];
            const hasStyleUrls = () => {
                const metadata = this.resolvers.component.resolve(type);
                return !!metadata.styleUrls && metadata.styleUrls.length > 0;
            };
            const overrideStyleUrls = !!def && !isComponentDefPendingResolution(type) && hasStyleUrls();
            // In Ivy, compiling a component does not require knowing the module providing the
            // component's scope, so overrideTemplateUsingTestingModule can be implemented purely via
            // overrideComponent. Important: overriding template requires full Component re-compilation,
            // which may fail in case styleUrls are also present (thus Component is considered as required
            // resolution). In order to avoid this, we preemptively set styleUrls to an empty array,
            // preserve current styles available on Component def and restore styles back once compilation
            // is complete.
            const override = overrideStyleUrls ? { template, styles: [], styleUrls: [] } : { template };
            this.overrideComponent(type, { set: override });
            if (overrideStyleUrls && def.styles && def.styles.length > 0) {
                this.existingComponentStyles.set(type, def.styles);
            }
            // Set the component's scope to be the testing module.
            this.componentToModuleScope.set(type, TestingModuleOverride.OVERRIDE_TEMPLATE);
        }
        compileComponents() {
            return tslib.__awaiter(this, void 0, void 0, function* () {
                this.clearComponentResolutionQueue();
                // Run compilers for all queued types.
                let needsAsyncResources = this.compileTypesSync();
                // compileComponents() should not be async unless it needs to be.
                if (needsAsyncResources) {
                    let resourceLoader;
                    let resolver = (url) => {
                        if (!resourceLoader) {
                            resourceLoader = this.injector.get(compiler.ResourceLoader);
                        }
                        return Promise.resolve(resourceLoader.get(url));
                    };
                    yield resolveComponentResources(resolver);
                }
            });
        }
        finalize() {
            // One last compile
            this.compileTypesSync();
            // Create the testing module itself.
            this.compileTestModule();
            this.applyTransitiveScopes();
            this.applyProviderOverrides();
            // Patch previously stored `styles` Component values (taken from ɵcmp), in case these
            // Components have `styleUrls` fields defined and template override was requested.
            this.patchComponentsWithExistingStyles();
            // Clear the componentToModuleScope map, so that future compilations don't reset the scope of
            // every component.
            this.componentToModuleScope.clear();
            const parentInjector = this.platform.injector;
            this.testModuleRef = new core["ɵRender3NgModuleRef"](this.testModuleType, parentInjector);
            // ApplicationInitStatus.runInitializers() is marked @internal to core.
            // Cast it to any before accessing it.
            this.testModuleRef.injector.get(core.ApplicationInitStatus).runInitializers();
            // Set locale ID after running app initializers, since locale information might be updated while
            // running initializers. This is also consistent with the execution order while bootstrapping an
            // app (see `packages/core/src/application_ref.ts` file).
            const localeId = this.testModuleRef.injector.get(core.LOCALE_ID, core["ɵDEFAULT_LOCALE_ID"]);
            core["ɵsetLocaleId"](localeId);
            return this.testModuleRef;
        }
        /**
         * @internal
         */
        _compileNgModuleSync(moduleType) {
            this.queueTypesFromModulesArray([moduleType]);
            this.compileTypesSync();
            this.applyProviderOverrides();
            this.applyProviderOverridesInScope(moduleType);
            this.applyTransitiveScopes();
        }
        /**
         * @internal
         */
        _compileNgModuleAsync(moduleType) {
            return tslib.__awaiter(this, void 0, void 0, function* () {
                this.queueTypesFromModulesArray([moduleType]);
                yield this.compileComponents();
                this.applyProviderOverrides();
                this.applyProviderOverridesInScope(moduleType);
                this.applyTransitiveScopes();
            });
        }
        /**
         * @internal
         */
        _getModuleResolver() {
            return this.resolvers.module;
        }
        /**
         * @internal
         */
        _getComponentFactories(moduleType) {
            return maybeUnwrapFn(moduleType.ɵmod.declarations).reduce((factories, declaration) => {
                const componentDef = declaration.ɵcmp;
                componentDef && factories.push(new core["ɵRender3ComponentFactory"](componentDef, this.testModuleRef));
                return factories;
            }, []);
        }
        compileTypesSync() {
            // Compile all queued components, directives, pipes.
            let needsAsyncResources = false;
            this.pendingComponents.forEach(declaration => {
                needsAsyncResources = needsAsyncResources || isComponentDefPendingResolution(declaration);
                const metadata = this.resolvers.component.resolve(declaration);
                if (metadata === null) {
                    throw invalidTypeError(declaration.name, 'Component');
                }
                this.maybeStoreNgDef(core["ɵNG_COMP_DEF"], declaration);
                core["ɵcompileComponent"](declaration, metadata);
            });
            this.pendingComponents.clear();
            this.pendingDirectives.forEach(declaration => {
                const metadata = this.resolvers.directive.resolve(declaration);
                if (metadata === null) {
                    throw invalidTypeError(declaration.name, 'Directive');
                }
                this.maybeStoreNgDef(core["ɵNG_DIR_DEF"], declaration);
                core["ɵcompileDirective"](declaration, metadata);
            });
            this.pendingDirectives.clear();
            this.pendingPipes.forEach(declaration => {
                const metadata = this.resolvers.pipe.resolve(declaration);
                if (metadata === null) {
                    throw invalidTypeError(declaration.name, 'Pipe');
                }
                this.maybeStoreNgDef(core["ɵNG_PIPE_DEF"], declaration);
                core["ɵcompilePipe"](declaration, metadata);
            });
            this.pendingPipes.clear();
            return needsAsyncResources;
        }
        applyTransitiveScopes() {
            if (this.overriddenModules.size > 0) {
                // Module overrides (via `TestBed.overrideModule`) might affect scopes that were previously
                // calculated and stored in `transitiveCompileScopes`. If module overrides are present,
                // collect all affected modules and reset scopes to force their re-calculation.
                const testingModuleDef = this.testModuleType[core["ɵNG_MOD_DEF"]];
                const affectedModules = this.collectModulesAffectedByOverrides(testingModuleDef.imports);
                if (affectedModules.size > 0) {
                    affectedModules.forEach(moduleType => {
                        this.storeFieldOfDefOnType(moduleType, core["ɵNG_MOD_DEF"], 'transitiveCompileScopes');
                        moduleType[core["ɵNG_MOD_DEF"]].transitiveCompileScopes = null;
                    });
                }
            }
            const moduleToScope = new Map();
            const getScopeOfModule = (moduleType) => {
                if (!moduleToScope.has(moduleType)) {
                    const isTestingModule = isTestingModuleOverride(moduleType);
                    const realType = isTestingModule ? this.testModuleType : moduleType;
                    moduleToScope.set(moduleType, core["ɵtransitiveScopesFor"](realType));
                }
                return moduleToScope.get(moduleType);
            };
            this.componentToModuleScope.forEach((moduleType, componentType) => {
                const moduleScope = getScopeOfModule(moduleType);
                this.storeFieldOfDefOnType(componentType, core["ɵNG_COMP_DEF"], 'directiveDefs');
                this.storeFieldOfDefOnType(componentType, core["ɵNG_COMP_DEF"], 'pipeDefs');
                // `tView` that is stored on component def contains information about directives and pipes
                // that are in the scope of this component. Patching component scope will cause `tView` to be
                // changed. Store original `tView` before patching scope, so the `tView` (including scope
                // information) is restored back to its previous/original state before running next test.
                this.storeFieldOfDefOnType(componentType, core["ɵNG_COMP_DEF"], 'tView');
                core["ɵpatchComponentDefWithScope"](componentType.ɵcmp, moduleScope);
            });
            this.componentToModuleScope.clear();
        }
        applyProviderOverrides() {
            const maybeApplyOverrides = (field) => (type) => {
                const resolver = field === core["ɵNG_COMP_DEF"] ? this.resolvers.component : this.resolvers.directive;
                const metadata = resolver.resolve(type);
                if (this.hasProviderOverrides(metadata.providers)) {
                    this.patchDefWithProviderOverrides(type, field);
                }
            };
            this.seenComponents.forEach(maybeApplyOverrides(core["ɵNG_COMP_DEF"]));
            this.seenDirectives.forEach(maybeApplyOverrides(core["ɵNG_DIR_DEF"]));
            this.seenComponents.clear();
            this.seenDirectives.clear();
        }
        /**
         * Applies provider overrides to a given type (either an NgModule or a standalone component)
         * and all imported NgModules and standalone components recursively.
         */
        applyProviderOverridesInScope(type) {
            var _a;
            const hasScope = isStandaloneComponent(type) || isNgModule(type);
            // The function can be re-entered recursively while inspecting dependencies
            // of an NgModule or a standalone component. Exit early if we come across a
            // type that can not have a scope (directive or pipe) or the type is already
            // processed earlier.
            if (!hasScope || this.scopesWithOverriddenProviders.has(type)) {
                return;
            }
            this.scopesWithOverriddenProviders.add(type);
            // NOTE: the line below triggers JIT compilation of the module injector,
            // which also invokes verification of the NgModule semantics, which produces
            // detailed error messages. The fact that the code relies on this line being
            // present here is suspicious and should be refactored in a way that the line
            // below can be moved (for ex. after an early exit check below).
            const injectorDef = type[core["ɵNG_INJ_DEF"]];
            // No provider overrides, exit early.
            if (this.providerOverridesByToken.size === 0)
                return;
            if (isStandaloneComponent(type)) {
                // Visit all component dependencies and override providers there.
                const def = getComponentDef(type);
                const dependencies = maybeUnwrapFn((_a = def.dependencies) !== null && _a !== void 0 ? _a : []);
                for (const dependency of dependencies) {
                    this.applyProviderOverridesInScope(dependency);
                }
            }
            else {
                const providers = [
                    ...injectorDef.providers,
                    ...(this.providerOverridesByModule.get(type) || [])
                ];
                if (this.hasProviderOverrides(providers)) {
                    this.maybeStoreNgDef(core["ɵNG_INJ_DEF"], type);
                    this.storeFieldOfDefOnType(type, core["ɵNG_INJ_DEF"], 'providers');
                    injectorDef.providers = this.getOverriddenProviders(providers);
                }
                // Apply provider overrides to imported modules recursively
                const moduleDef = type[core["ɵNG_MOD_DEF"]];
                const imports = maybeUnwrapFn(moduleDef.imports);
                for (const importedModule of imports) {
                    this.applyProviderOverridesInScope(importedModule);
                }
                // Also override the providers on any ModuleWithProviders imports since those don't appear in
                // the moduleDef.
                for (const importedModule of flatten(injectorDef.imports)) {
                    if (isModuleWithProviders(importedModule)) {
                        this.defCleanupOps.push({
                            object: importedModule,
                            fieldName: 'providers',
                            originalValue: importedModule.providers
                        });
                        importedModule.providers = this.getOverriddenProviders(importedModule.providers);
                    }
                }
            }
        }
        patchComponentsWithExistingStyles() {
            this.existingComponentStyles.forEach((styles, type) => type[core["ɵNG_COMP_DEF"]].styles = styles);
            this.existingComponentStyles.clear();
        }
        queueTypeArray(arr, moduleType) {
            for (const value of arr) {
                if (Array.isArray(value)) {
                    this.queueTypeArray(value, moduleType);
                }
                else {
                    this.queueType(value, moduleType);
                }
            }
        }
        recompileNgModule(ngModule, metadata) {
            // Cache the initial ngModuleDef as it will be overwritten.
            this.maybeStoreNgDef(core["ɵNG_MOD_DEF"], ngModule);
            this.maybeStoreNgDef(core["ɵNG_INJ_DEF"], ngModule);
            core["ɵcompileNgModuleDefs"](ngModule, metadata);
        }
        queueType(type, moduleType) {
            const component = this.resolvers.component.resolve(type);
            if (component) {
                // Check whether a give Type has respective NG def (ɵcmp) and compile if def is
                // missing. That might happen in case a class without any Angular decorators extends another
                // class where Component/Directive/Pipe decorator is defined.
                if (isComponentDefPendingResolution(type) || !type.hasOwnProperty(core["ɵNG_COMP_DEF"])) {
                    this.pendingComponents.add(type);
                }
                this.seenComponents.add(type);
                // Keep track of the module which declares this component, so later the component's scope
                // can be set correctly. If the component has already been recorded here, then one of several
                // cases is true:
                // * the module containing the component was imported multiple times (common).
                // * the component is declared in multiple modules (which is an error).
                // * the component was in 'declarations' of the testing module, and also in an imported module
                //   in which case the module scope will be TestingModuleOverride.DECLARATION.
                // * overrideTemplateUsingTestingModule was called for the component in which case the module
                //   scope will be TestingModuleOverride.OVERRIDE_TEMPLATE.
                //
                // If the component was previously in the testing module's 'declarations' (meaning the
                // current value is TestingModuleOverride.DECLARATION), then `moduleType` is the component's
                // real module, which was imported. This pattern is understood to mean that the component
                // should use its original scope, but that the testing module should also contain the
                // component in its scope.
                //
                // Note: standalone components have no associated NgModule, so the `moduleType` can be `null`.
                if (moduleType !== null &&
                    (!this.componentToModuleScope.has(type) ||
                        this.componentToModuleScope.get(type) === TestingModuleOverride.DECLARATION)) {
                    this.componentToModuleScope.set(type, moduleType);
                }
                return;
            }
            const directive = this.resolvers.directive.resolve(type);
            if (directive) {
                if (!type.hasOwnProperty(core["ɵNG_DIR_DEF"])) {
                    this.pendingDirectives.add(type);
                }
                this.seenDirectives.add(type);
                return;
            }
            const pipe = this.resolvers.pipe.resolve(type);
            if (pipe && !type.hasOwnProperty(core["ɵNG_PIPE_DEF"])) {
                this.pendingPipes.add(type);
                return;
            }
        }
        queueTypesFromModulesArray(arr) {
            // Because we may encounter the same NgModule while processing the imports and exports of an
            // NgModule tree, we cache them in this set so we can skip ones that have already been seen
            // encountered. In some test setups, this caching resulted in 10X runtime improvement.
            const processedNgModuleDefs = new Set();
            const queueTypesFromModulesArrayRecur = (arr) => {
                var _a;
                for (const value of arr) {
                    if (Array.isArray(value)) {
                        queueTypesFromModulesArrayRecur(value);
                    }
                    else if (hasNgModuleDef(value)) {
                        const def = value.ɵmod;
                        if (processedNgModuleDefs.has(def)) {
                            continue;
                        }
                        processedNgModuleDefs.add(def);
                        // Look through declarations, imports, and exports, and queue
                        // everything found there.
                        this.queueTypeArray(maybeUnwrapFn(def.declarations), value);
                        queueTypesFromModulesArrayRecur(maybeUnwrapFn(def.imports));
                        queueTypesFromModulesArrayRecur(maybeUnwrapFn(def.exports));
                    }
                    else if (isModuleWithProviders(value)) {
                        queueTypesFromModulesArrayRecur([value.ngModule]);
                    }
                    else if (isStandaloneComponent(value)) {
                        this.queueType(value, null);
                        const def = getComponentDef(value);
                        const dependencies = maybeUnwrapFn((_a = def.dependencies) !== null && _a !== void 0 ? _a : []);
                        dependencies.forEach((dependency) => {
                            // Note: in AOT, the `dependencies` might also contain regular
                            // (NgModule-based) Component, Directive and Pipes, so we handle
                            // them separately and proceed with recursive process for standalone
                            // Components and NgModules only.
                            if (isStandaloneComponent(dependency) || hasNgModuleDef(dependency)) {
                                queueTypesFromModulesArrayRecur([dependency]);
                            }
                            else {
                                this.queueType(dependency, null);
                            }
                        });
                    }
                }
            };
            queueTypesFromModulesArrayRecur(arr);
        }
        // When module overrides (via `TestBed.overrideModule`) are present, it might affect all modules
        // that import (even transitively) an overridden one. For all affected modules we need to
        // recalculate their scopes for a given test run and restore original scopes at the end. The goal
        // of this function is to collect all affected modules in a set for further processing. Example:
        // if we have the following module hierarchy: A -> B -> C (where `->` means `imports`) and module
        // `C` is overridden, we consider `A` and `B` as affected, since their scopes might become
        // invalidated with the override.
        collectModulesAffectedByOverrides(arr) {
            const seenModules = new Set();
            const affectedModules = new Set();
            const calcAffectedModulesRecur = (arr, path) => {
                for (const value of arr) {
                    if (Array.isArray(value)) {
                        // If the value is an array, just flatten it (by invoking this function recursively),
                        // keeping "path" the same.
                        calcAffectedModulesRecur(value, path);
                    }
                    else if (hasNgModuleDef(value)) {
                        if (seenModules.has(value)) {
                            // If we've seen this module before and it's included into "affected modules" list, mark
                            // the whole path that leads to that module as affected, but do not descend into its
                            // imports, since we already examined them before.
                            if (affectedModules.has(value)) {
                                path.forEach(item => affectedModules.add(item));
                            }
                            continue;
                        }
                        seenModules.add(value);
                        if (this.overriddenModules.has(value)) {
                            path.forEach(item => affectedModules.add(item));
                        }
                        // Examine module imports recursively to look for overridden modules.
                        const moduleDef = value[core["ɵNG_MOD_DEF"]];
                        calcAffectedModulesRecur(maybeUnwrapFn(moduleDef.imports), path.concat(value));
                    }
                }
            };
            calcAffectedModulesRecur(arr, []);
            return affectedModules;
        }
        /**
         * Preserve an original def (such as ɵmod, ɵinj, etc) before applying an override.
         * Note: one class may have multiple defs (for example: ɵmod and ɵinj in case of
         * an NgModule). If there is a def in a set already, don't override it, since
         * an original one should be restored at the end of a test.
         */
        maybeStoreNgDef(prop, type) {
            if (!this.initialNgDefs.has(type)) {
                this.initialNgDefs.set(type, new Map());
            }
            const currentDefs = this.initialNgDefs.get(type);
            if (!currentDefs.has(prop)) {
                const currentDef = Object.getOwnPropertyDescriptor(type, prop);
                currentDefs.set(prop, currentDef);
            }
        }
        storeFieldOfDefOnType(type, defField, fieldName) {
            const def = type[defField];
            const originalValue = def[fieldName];
            this.defCleanupOps.push({ object: def, fieldName, originalValue });
        }
        /**
         * Clears current components resolution queue, but stores the state of the queue, so we can
         * restore it later. Clearing the queue is required before we try to compile components (via
         * `TestBed.compileComponents`), so that component defs are in sync with the resolution queue.
         */
        clearComponentResolutionQueue() {
            if (this.originalComponentResolutionQueue === null) {
                this.originalComponentResolutionQueue = new Map();
            }
            clearResolutionOfComponentResourcesQueue().forEach((value, key) => this.originalComponentResolutionQueue.set(key, value));
        }
        /*
         * Restores component resolution queue to the previously saved state. This operation is performed
         * as a part of restoring the state after completion of the current set of tests (that might
         * potentially mutate the state).
         */
        restoreComponentResolutionQueue() {
            if (this.originalComponentResolutionQueue !== null) {
                restoreComponentResolutionQueue(this.originalComponentResolutionQueue);
                this.originalComponentResolutionQueue = null;
            }
        }
        restoreOriginalState() {
            // Process cleanup ops in reverse order so the field's original value is restored correctly (in
            // case there were multiple overrides for the same field).
            forEachRight(this.defCleanupOps, (op) => {
                op.object[op.fieldName] = op.originalValue;
            });
            // Restore initial component/directive/pipe defs
            this.initialNgDefs.forEach((defs, type) => {
                defs.forEach((descriptor, prop) => {
                    if (!descriptor) {
                        // Delete operations are generally undesirable since they have performance
                        // implications on objects they were applied to. In this particular case, situations
                        // where this code is invoked should be quite rare to cause any noticeable impact,
                        // since it's applied only to some test cases (for example when class with no
                        // annotations extends some @Component) when we need to clear 'ɵcmp' field on a given
                        // class to restore its original state (before applying overrides and running tests).
                        delete type[prop];
                    }
                    else {
                        Object.defineProperty(type, prop, descriptor);
                    }
                });
            });
            this.initialNgDefs.clear();
            this.scopesWithOverriddenProviders.clear();
            this.restoreComponentResolutionQueue();
            // Restore the locale ID to the default value, this shouldn't be necessary but we never know
            core["ɵsetLocaleId"](core["ɵDEFAULT_LOCALE_ID"]);
        }
        compileTestModule() {
            class RootScopeModule {
            }
            core["ɵcompileNgModuleDefs"](RootScopeModule, {
                providers: [...this.rootProviderOverrides],
            });
            const ngZone = new core.NgZone({ enableLongStackTrace: true });
            const providers = [
                { provide: core.NgZone, useValue: ngZone },
                { provide: core.Compiler, useFactory: () => new R3TestCompiler(this) },
                ...this.providers,
                ...this.providerOverrides,
            ];
            const imports = [RootScopeModule, this.additionalModuleTypes, this.imports || []];
            // clang-format off
            core["ɵcompileNgModuleDefs"](this.testModuleType, {
                declarations: this.declarations,
                imports,
                schemas: this.schemas,
                providers,
            }, /* allowDuplicateDeclarationsInRoot */ true);
            // clang-format on
            this.applyProviderOverridesInScope(this.testModuleType);
        }
        get injector() {
            if (this._injector !== null) {
                return this._injector;
            }
            const providers = [];
            const compilerOptions = this.platform.injector.get(core.COMPILER_OPTIONS);
            compilerOptions.forEach(opts => {
                if (opts.providers) {
                    providers.push(opts.providers);
                }
            });
            if (this.compilerProviders !== null) {
                providers.push(...this.compilerProviders);
            }
            // TODO(ocombe): make this work with an Injector directly instead of creating a module for it
            class CompilerModule {
            }
            core["ɵcompileNgModuleDefs"](CompilerModule, { providers });
            const CompilerModuleFactory = new core["ɵNgModuleFactory"](CompilerModule);
            this._injector = CompilerModuleFactory.create(this.platform.injector).injector;
            return this._injector;
        }
        // get overrides for a specific provider (if any)
        getSingleProviderOverrides(provider) {
            const token = getProviderToken(provider);
            return this.providerOverridesByToken.get(token) || null;
        }
        getProviderOverrides(providers) {
            if (!providers || !providers.length || this.providerOverridesByToken.size === 0)
                return [];
            // There are two flattening operations here. The inner flattenProviders() operates on the
            // metadata's providers and applies a mapping function which retrieves overrides for each
            // incoming provider. The outer flatten() then flattens the produced overrides array. If this is
            // not done, the array can contain other empty arrays (e.g. `[[], []]`) which leak into the
            // providers array and contaminate any error messages that might be generated.
            return flatten(flattenProviders(providers, (provider) => this.getSingleProviderOverrides(provider) || []));
        }
        getOverriddenProviders(providers) {
            if (!providers || !providers.length || this.providerOverridesByToken.size === 0)
                return [];
            const flattenedProviders = flattenProviders(providers);
            const overrides = this.getProviderOverrides(flattenedProviders);
            const overriddenProviders = [...flattenedProviders, ...overrides];
            const final = [];
            const seenOverriddenProviders = new Set();
            // We iterate through the list of providers in reverse order to make sure provider overrides
            // take precedence over the values defined in provider list. We also filter out all providers
            // that have overrides, keeping overridden values only. This is needed, since presence of a
            // provider with `ngOnDestroy` hook will cause this hook to be registered and invoked later.
            forEachRight(overriddenProviders, (provider) => {
                const token = getProviderToken(provider);
                if (this.providerOverridesByToken.has(token)) {
                    if (!seenOverriddenProviders.has(token)) {
                        seenOverriddenProviders.add(token);
                        // Treat all overridden providers as `{multi: false}` (even if it's a multi-provider) to
                        // make sure that provided override takes highest precedence and is not combined with
                        // other instances of the same multi provider.
                        final.unshift(Object.assign(Object.assign({}, provider), { multi: false }));
                    }
                }
                else {
                    final.unshift(provider);
                }
            });
            return final;
        }
        hasProviderOverrides(providers) {
            return this.getProviderOverrides(providers).length > 0;
        }
        patchDefWithProviderOverrides(declaration, field) {
            const def = declaration[field];
            if (def && def.providersResolver) {
                this.maybeStoreNgDef(field, declaration);
                const resolver = def.providersResolver;
                const processProvidersFn = (providers) => this.getOverriddenProviders(providers);
                this.storeFieldOfDefOnType(declaration, field, 'providersResolver');
                def.providersResolver = (ngDef) => resolver(ngDef, processProvidersFn);
            }
        }
    }
    function initResolvers() {
        return {
            module: new NgModuleResolver(),
            component: new ComponentResolver(),
            directive: new DirectiveResolver(),
            pipe: new PipeResolver()
        };
    }
    function isStandaloneComponent(value) {
        const def = getComponentDef(value);
        return !!(def === null || def === void 0 ? void 0 : def.standalone);
    }
    function getComponentDef(value) {
        var _a;
        return (_a = value.ɵcmp) !== null && _a !== void 0 ? _a : null;
    }
    function hasNgModuleDef(value) {
        return value.hasOwnProperty('ɵmod');
    }
    function isNgModule(value) {
        return hasNgModuleDef(value);
    }
    function maybeUnwrapFn(maybeFn) {
        return maybeFn instanceof Function ? maybeFn() : maybeFn;
    }
    function flatten(values) {
        const out = [];
        values.forEach(value => {
            if (Array.isArray(value)) {
                out.push(...flatten(value));
            }
            else {
                out.push(value);
            }
        });
        return out;
    }
    function identityFn(value) {
        return value;
    }
    function flattenProviders(providers, mapFn = identityFn) {
        const out = [];
        for (let provider of providers) {
            if (core["ɵisEnvironmentProviders"](provider)) {
                provider = provider.ɵproviders;
            }
            if (Array.isArray(provider)) {
                out.push(...flattenProviders(provider, mapFn));
            }
            else {
                out.push(mapFn(provider));
            }
        }
        return out;
    }
    function getProviderField(provider, field) {
        return provider && typeof provider === 'object' && provider[field];
    }
    function getProviderToken(provider) {
        return getProviderField(provider, 'provide') || provider;
    }
    function isModuleWithProviders(value) {
        return value.hasOwnProperty('ngModule');
    }
    function forEachRight(values, fn) {
        for (let idx = values.length - 1; idx >= 0; idx--) {
            fn(values[idx], idx);
        }
    }
    function invalidTypeError(name, expectedType) {
        return new Error(`${name} class doesn't have @${expectedType} decorator or is missing metadata.`);
    }
    class R3TestCompiler {
        constructor(testBed) {
            this.testBed = testBed;
        }
        compileModuleSync(moduleType) {
            this.testBed._compileNgModuleSync(moduleType);
            return new core["ɵNgModuleFactory"](moduleType);
        }
        compileModuleAsync(moduleType) {
            return tslib.__awaiter(this, void 0, void 0, function* () {
                yield this.testBed._compileNgModuleAsync(moduleType);
                return new core["ɵNgModuleFactory"](moduleType);
            });
        }
        compileModuleAndAllComponentsSync(moduleType) {
            const ngModuleFactory = this.compileModuleSync(moduleType);
            const componentFactories = this.testBed._getComponentFactories(moduleType);
            return new core.ModuleWithComponentFactories(ngModuleFactory, componentFactories);
        }
        compileModuleAndAllComponentsAsync(moduleType) {
            return tslib.__awaiter(this, void 0, void 0, function* () {
                const ngModuleFactory = yield this.compileModuleAsync(moduleType);
                const componentFactories = this.testBed._getComponentFactories(moduleType);
                return new core.ModuleWithComponentFactories(ngModuleFactory, componentFactories);
            });
        }
        clearCache() { }
        clearCacheFor(type) { }
        getModuleId(moduleType) {
            const meta = this.testBed._getModuleResolver().resolve(moduleType);
            return meta && meta.id || undefined;
        }
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    let _nextRootElementId = 0;
    /**
     * Returns a singleton of the `TestBed` class.
     *
     * @publicApi
     */
    function getTestBed() {
        return TestBedImpl.INSTANCE;
    }
    /**
     * @description
     * Configures and initializes environment for unit testing and provides methods for
     * creating components and services in unit tests.
     *
     * TestBed is the primary api for writing unit tests for Angular applications and libraries.
     */
    class TestBedImpl {
        constructor() {
            // Properties
            this.platform = null;
            this.ngModule = null;
            this._compiler = null;
            this._testModuleRef = null;
            this._activeFixtures = [];
            /**
             * Internal-only flag to indicate whether a module
             * scoping queue has been checked and flushed already.
             * @nodoc
             */
            this.globalCompilationChecked = false;
        }
        static get INSTANCE() {
            return TestBedImpl._INSTANCE = TestBedImpl._INSTANCE || new TestBedImpl();
        }
        /**
         * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
         * angular module. These are common to every test in the suite.
         *
         * This may only be called once, to set up the common providers for the current test
         * suite on the current platform. If you absolutely need to change the providers,
         * first use `resetTestEnvironment`.
         *
         * Test modules and platforms for individual platforms are available from
         * '@angular/<platform_name>/testing'.
         *
         * @publicApi
         */
        static initTestEnvironment(ngModule, platform, options) {
            const testBed = TestBedImpl.INSTANCE;
            testBed.initTestEnvironment(ngModule, platform, options);
            return testBed;
        }
        /**
         * Reset the providers for the test injector.
         *
         * @publicApi
         */
        static resetTestEnvironment() {
            TestBedImpl.INSTANCE.resetTestEnvironment();
        }
        static configureCompiler(config) {
            return TestBedImpl.INSTANCE.configureCompiler(config);
        }
        /**
         * Allows overriding default providers, directives, pipes, modules of the test injector,
         * which are defined in test_injector.js
         */
        static configureTestingModule(moduleDef) {
            return TestBedImpl.INSTANCE.configureTestingModule(moduleDef);
        }
        /**
         * Compile components with a `templateUrl` for the test's NgModule.
         * It is necessary to call this function
         * as fetching urls is asynchronous.
         */
        static compileComponents() {
            return TestBedImpl.INSTANCE.compileComponents();
        }
        static overrideModule(ngModule, override) {
            return TestBedImpl.INSTANCE.overrideModule(ngModule, override);
        }
        static overrideComponent(component, override) {
            return TestBedImpl.INSTANCE.overrideComponent(component, override);
        }
        static overrideDirective(directive, override) {
            return TestBedImpl.INSTANCE.overrideDirective(directive, override);
        }
        static overridePipe(pipe, override) {
            return TestBedImpl.INSTANCE.overridePipe(pipe, override);
        }
        static overrideTemplate(component, template) {
            return TestBedImpl.INSTANCE.overrideTemplate(component, template);
        }
        /**
         * Overrides the template of the given component, compiling the template
         * in the context of the TestingModule.
         *
         * Note: This works for JIT and AOTed components as well.
         */
        static overrideTemplateUsingTestingModule(component, template) {
            return TestBedImpl.INSTANCE.overrideTemplateUsingTestingModule(component, template);
        }
        static overrideProvider(token, provider) {
            return TestBedImpl.INSTANCE.overrideProvider(token, provider);
        }
        static inject(token, notFoundValue, flags) {
            return TestBedImpl.INSTANCE.inject(token, notFoundValue, core["ɵconvertToBitFlags"](flags));
        }
        /** @deprecated from v9.0.0 use TestBed.inject */
        static get(token, notFoundValue = core.Injector.THROW_IF_NOT_FOUND, flags = core.InjectFlags.Default) {
            return TestBedImpl.INSTANCE.inject(token, notFoundValue, flags);
        }
        static createComponent(component) {
            return TestBedImpl.INSTANCE.createComponent(component);
        }
        static resetTestingModule() {
            return TestBedImpl.INSTANCE.resetTestingModule();
        }
        static execute(tokens, fn, context) {
            return TestBedImpl.INSTANCE.execute(tokens, fn, context);
        }
        static get platform() {
            return TestBedImpl.INSTANCE.platform;
        }
        static get ngModule() {
            return TestBedImpl.INSTANCE.ngModule;
        }
        /**
         * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
         * angular module. These are common to every test in the suite.
         *
         * This may only be called once, to set up the common providers for the current test
         * suite on the current platform. If you absolutely need to change the providers,
         * first use `resetTestEnvironment`.
         *
         * Test modules and platforms for individual platforms are available from
         * '@angular/<platform_name>/testing'.
         *
         * @publicApi
         */
        initTestEnvironment(ngModule, platform, options) {
            if (this.platform || this.ngModule) {
                throw new Error('Cannot set base providers because it has already been called');
            }
            TestBedImpl._environmentTeardownOptions = options === null || options === void 0 ? void 0 : options.teardown;
            TestBedImpl._environmentErrorOnUnknownElementsOption = options === null || options === void 0 ? void 0 : options.errorOnUnknownElements;
            TestBedImpl._environmentErrorOnUnknownPropertiesOption = options === null || options === void 0 ? void 0 : options.errorOnUnknownProperties;
            this.platform = platform;
            this.ngModule = ngModule;
            this._compiler = new TestBedCompiler(this.platform, this.ngModule);
            // TestBed does not have an API which can reliably detect the start of a test, and thus could be
            // used to track the state of the NgModule registry and reset it correctly. Instead, when we
            // know we're in a testing scenario, we disable the check for duplicate NgModule registration
            // completely.
            core["ɵsetAllowDuplicateNgModuleIdsForTest"](true);
        }
        /**
         * Reset the providers for the test injector.
         *
         * @publicApi
         */
        resetTestEnvironment() {
            this.resetTestingModule();
            this._compiler = null;
            this.platform = null;
            this.ngModule = null;
            TestBedImpl._environmentTeardownOptions = undefined;
            core["ɵsetAllowDuplicateNgModuleIdsForTest"](false);
        }
        resetTestingModule() {
            var _a, _b;
            this.checkGlobalCompilationFinished();
            core["ɵresetCompiledComponents"]();
            if (this._compiler !== null) {
                this.compiler.restoreOriginalState();
            }
            this._compiler = new TestBedCompiler(this.platform, this.ngModule);
            // Restore the previous value of the "error on unknown elements" option
            core["ɵsetUnknownElementStrictMode"]((_a = this._previousErrorOnUnknownElementsOption) !== null && _a !== void 0 ? _a : THROW_ON_UNKNOWN_ELEMENTS_DEFAULT);
            // Restore the previous value of the "error on unknown properties" option
            core["ɵsetUnknownPropertyStrictMode"]((_b = this._previousErrorOnUnknownPropertiesOption) !== null && _b !== void 0 ? _b : THROW_ON_UNKNOWN_PROPERTIES_DEFAULT);
            // We have to chain a couple of try/finally blocks, because each step can
            // throw errors and we don't want it to interrupt the next step and we also
            // want an error to be thrown at the end.
            try {
                this.destroyActiveFixtures();
            }
            finally {
                try {
                    if (this.shouldTearDownTestingModule()) {
                        this.tearDownTestingModule();
                    }
                }
                finally {
                    this._testModuleRef = null;
                    this._instanceTeardownOptions = undefined;
                    this._instanceErrorOnUnknownElementsOption = undefined;
                    this._instanceErrorOnUnknownPropertiesOption = undefined;
                }
            }
            return this;
        }
        configureCompiler(config) {
            if (config.useJit != null) {
                throw new Error('the Render3 compiler JiT mode is not configurable !');
            }
            if (config.providers !== undefined) {
                this.compiler.setCompilerProviders(config.providers);
            }
            return this;
        }
        configureTestingModule(moduleDef) {
            this.assertNotInstantiated('R3TestBed.configureTestingModule', 'configure the test module');
            // Trigger module scoping queue flush before executing other TestBed operations in a test.
            // This is needed for the first test invocation to ensure that globally declared modules have
            // their components scoped properly. See the `checkGlobalCompilationFinished` function
            // description for additional info.
            this.checkGlobalCompilationFinished();
            // Always re-assign the options, even if they're undefined.
            // This ensures that we don't carry them between tests.
            this._instanceTeardownOptions = moduleDef.teardown;
            this._instanceErrorOnUnknownElementsOption = moduleDef.errorOnUnknownElements;
            this._instanceErrorOnUnknownPropertiesOption = moduleDef.errorOnUnknownProperties;
            // Store the current value of the strict mode option,
            // so we can restore it later
            this._previousErrorOnUnknownElementsOption = core["ɵgetUnknownElementStrictMode"]();
            core["ɵsetUnknownElementStrictMode"](this.shouldThrowErrorOnUnknownElements());
            this._previousErrorOnUnknownPropertiesOption = core["ɵgetUnknownPropertyStrictMode"]();
            core["ɵsetUnknownPropertyStrictMode"](this.shouldThrowErrorOnUnknownProperties());
            this.compiler.configureTestingModule(moduleDef);
            return this;
        }
        compileComponents() {
            return this.compiler.compileComponents();
        }
        inject(token, notFoundValue, flags) {
            if (token === TestBed) {
                return this;
            }
            const UNDEFINED = {};
            const result = this.testModuleRef.injector.get(token, UNDEFINED, core["ɵconvertToBitFlags"](flags));
            return result === UNDEFINED ? this.compiler.injector.get(token, notFoundValue, flags) :
                result;
        }
        /** @deprecated from v9.0.0 use TestBed.inject */
        get(token, notFoundValue = core.Injector.THROW_IF_NOT_FOUND, flags = core.InjectFlags.Default) {
            return this.inject(token, notFoundValue, flags);
        }
        execute(tokens, fn, context) {
            const params = tokens.map(t => this.inject(t));
            return fn.apply(context, params);
        }
        overrideModule(ngModule, override) {
            this.assertNotInstantiated('overrideModule', 'override module metadata');
            this.compiler.overrideModule(ngModule, override);
            return this;
        }
        overrideComponent(component, override) {
            this.assertNotInstantiated('overrideComponent', 'override component metadata');
            this.compiler.overrideComponent(component, override);
            return this;
        }
        overrideTemplateUsingTestingModule(component, template) {
            this.assertNotInstantiated('R3TestBed.overrideTemplateUsingTestingModule', 'Cannot override template when the test module has already been instantiated');
            this.compiler.overrideTemplateUsingTestingModule(component, template);
            return this;
        }
        overrideDirective(directive, override) {
            this.assertNotInstantiated('overrideDirective', 'override directive metadata');
            this.compiler.overrideDirective(directive, override);
            return this;
        }
        overridePipe(pipe, override) {
            this.assertNotInstantiated('overridePipe', 'override pipe metadata');
            this.compiler.overridePipe(pipe, override);
            return this;
        }
        /**
         * Overwrites all providers for the given token with the given provider definition.
         */
        overrideProvider(token, provider) {
            this.assertNotInstantiated('overrideProvider', 'override provider');
            this.compiler.overrideProvider(token, provider);
            return this;
        }
        overrideTemplate(component, template) {
            return this.overrideComponent(component, { set: { template, templateUrl: null } });
        }
        createComponent(type) {
            const testComponentRenderer = this.inject(TestComponentRenderer);
            const rootElId = `root${_nextRootElementId++}`;
            testComponentRenderer.insertRootElement(rootElId);
            const componentDef = type.ɵcmp;
            if (!componentDef) {
                throw new Error(`It looks like '${core["ɵstringify"](type)}' has not been compiled.`);
            }
            // TODO: Don't cast as `InjectionToken<boolean>`, proper type is boolean[]
            const noNgZone = this.inject(ComponentFixtureNoNgZone, false);
            // TODO: Don't cast as `InjectionToken<boolean>`, proper type is boolean[]
            const autoDetect = this.inject(ComponentFixtureAutoDetect, false);
            const ngZone = noNgZone ? null : this.inject(core.NgZone, null);
            const componentFactory = new core["ɵRender3ComponentFactory"](componentDef);
            const initComponent = () => {
                const componentRef = componentFactory.create(core.Injector.NULL, [], `#${rootElId}`, this.testModuleRef);
                return new ComponentFixture(componentRef, ngZone, autoDetect);
            };
            const fixture = ngZone ? ngZone.run(initComponent) : initComponent();
            this._activeFixtures.push(fixture);
            return fixture;
        }
        /**
         * @internal strip this from published d.ts files due to
         * https://github.com/microsoft/TypeScript/issues/36216
         */
        get compiler() {
            if (this._compiler === null) {
                throw new Error(`Need to call TestBed.initTestEnvironment() first`);
            }
            return this._compiler;
        }
        /**
         * @internal strip this from published d.ts files due to
         * https://github.com/microsoft/TypeScript/issues/36216
         */
        get testModuleRef() {
            if (this._testModuleRef === null) {
                this._testModuleRef = this.compiler.finalize();
            }
            return this._testModuleRef;
        }
        assertNotInstantiated(methodName, methodDescription) {
            if (this._testModuleRef !== null) {
                throw new Error(`Cannot ${methodDescription} when the test module has already been instantiated. ` +
                    `Make sure you are not using \`inject\` before \`${methodName}\`.`);
            }
        }
        /**
         * Check whether the module scoping queue should be flushed, and flush it if needed.
         *
         * When the TestBed is reset, it clears the JIT module compilation queue, cancelling any
         * in-progress module compilation. This creates a potential hazard - the very first time the
         * TestBed is initialized (or if it's reset without being initialized), there may be pending
         * compilations of modules declared in global scope. These compilations should be finished.
         *
         * To ensure that globally declared modules have their components scoped properly, this function
         * is called whenever TestBed is initialized or reset. The _first_ time that this happens, prior
         * to any other operations, the scoping queue is flushed.
         */
        checkGlobalCompilationFinished() {
            // Checking _testNgModuleRef is null should not be necessary, but is left in as an additional
            // guard that compilations queued in tests (after instantiation) are never flushed accidentally.
            if (!this.globalCompilationChecked && this._testModuleRef === null) {
                core["ɵflushModuleScopingQueueAsMuchAsPossible"]();
            }
            this.globalCompilationChecked = true;
        }
        destroyActiveFixtures() {
            let errorCount = 0;
            this._activeFixtures.forEach((fixture) => {
                try {
                    fixture.destroy();
                }
                catch (e) {
                    errorCount++;
                    console.error('Error during cleanup of component', {
                        component: fixture.componentInstance,
                        stacktrace: e,
                    });
                }
            });
            this._activeFixtures = [];
            if (errorCount > 0 && this.shouldRethrowTeardownErrors()) {
                throw Error(`${errorCount} ${(errorCount === 1 ? 'component' : 'components')} ` +
                    `threw errors during cleanup`);
            }
        }
        shouldRethrowTeardownErrors() {
            var _a, _b;
            const instanceOptions = this._instanceTeardownOptions;
            const environmentOptions = TestBedImpl._environmentTeardownOptions;
            // If the new teardown behavior hasn't been configured, preserve the old behavior.
            if (!instanceOptions && !environmentOptions) {
                return TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT;
            }
            // Otherwise use the configured behavior or default to rethrowing.
            return (_b = (_a = instanceOptions === null || instanceOptions === void 0 ? void 0 : instanceOptions.rethrowErrors) !== null && _a !== void 0 ? _a : environmentOptions === null || environmentOptions === void 0 ? void 0 : environmentOptions.rethrowErrors) !== null && _b !== void 0 ? _b : this.shouldTearDownTestingModule();
        }
        shouldThrowErrorOnUnknownElements() {
            var _a, _b;
            // Check if a configuration has been provided to throw when an unknown element is found
            return (_b = (_a = this._instanceErrorOnUnknownElementsOption) !== null && _a !== void 0 ? _a : TestBedImpl._environmentErrorOnUnknownElementsOption) !== null && _b !== void 0 ? _b : THROW_ON_UNKNOWN_ELEMENTS_DEFAULT;
        }
        shouldThrowErrorOnUnknownProperties() {
            var _a, _b;
            // Check if a configuration has been provided to throw when an unknown property is found
            return (_b = (_a = this._instanceErrorOnUnknownPropertiesOption) !== null && _a !== void 0 ? _a : TestBedImpl._environmentErrorOnUnknownPropertiesOption) !== null && _b !== void 0 ? _b : THROW_ON_UNKNOWN_PROPERTIES_DEFAULT;
        }
        shouldTearDownTestingModule() {
            var _a, _b, _c, _d;
            return (_d = (_b = (_a = this._instanceTeardownOptions) === null || _a === void 0 ? void 0 : _a.destroyAfterEach) !== null && _b !== void 0 ? _b : (_c = TestBedImpl._environmentTeardownOptions) === null || _c === void 0 ? void 0 : _c.destroyAfterEach) !== null && _d !== void 0 ? _d : TEARDOWN_TESTING_MODULE_ON_DESTROY_DEFAULT;
        }
        tearDownTestingModule() {
            var _a;
            // If the module ref has already been destroyed, we won't be able to get a test renderer.
            if (this._testModuleRef === null) {
                return;
            }
            // Resolve the renderer ahead of time, because we want to remove the root elements as the very
            // last step, but the injector will be destroyed as a part of the module ref destruction.
            const testRenderer = this.inject(TestComponentRenderer);
            try {
                this._testModuleRef.destroy();
            }
            catch (e) {
                if (this.shouldRethrowTeardownErrors()) {
                    throw e;
                }
                else {
                    console.error('Error during cleanup of a testing module', {
                        component: this._testModuleRef.instance,
                        stacktrace: e,
                    });
                }
            }
            finally {
                (_a = testRenderer.removeAllRootElements) === null || _a === void 0 ? void 0 : _a.call(testRenderer);
            }
        }
    }
    TestBedImpl._INSTANCE = null;
    /**
     * @description
     * Configures and initializes environment for unit testing and provides methods for
     * creating components and services in unit tests.
     *
     * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
     *
     * @publicApi
     */
    const TestBed = TestBedImpl;
    /**
     * Allows injecting dependencies in `beforeEach()` and `it()`. Note: this function
     * (imported from the `@angular/core/testing` package) can **only** be used to inject dependencies
     * in tests. To inject dependencies in your application code, use the [`inject`](api/core/inject)
     * function from the `@angular/core` package instead.
     *
     * Example:
     *
     * ```
     * beforeEach(inject([Dependency, AClass], (dep, object) => {
     *   // some code that uses `dep` and `object`
     *   // ...
     * }));
     *
     * it('...', inject([AClass], (object) => {
     *   object.doSomething();
     *   expect(...);
     * })
     * ```
     *
     * @publicApi
     */
    function inject(tokens, fn) {
        const testBed = TestBedImpl.INSTANCE;
        // Not using an arrow function to preserve context passed from call site
        return function () {
            return testBed.execute(tokens, fn, this);
        };
    }
    /**
     * @publicApi
     */
    class InjectSetupWrapper {
        constructor(_moduleDef) {
            this._moduleDef = _moduleDef;
        }
        _addModule() {
            const moduleDef = this._moduleDef();
            if (moduleDef) {
                TestBedImpl.configureTestingModule(moduleDef);
            }
        }
        inject(tokens, fn) {
            const self = this;
            // Not using an arrow function to preserve context passed from call site
            return function () {
                self._addModule();
                return inject(tokens, fn).call(this);
            };
        }
    }
    function withModule(moduleDef, fn) {
        if (fn) {
            // Not using an arrow function to preserve context passed from call site
            return function () {
                const testBed = TestBedImpl.INSTANCE;
                if (moduleDef) {
                    testBed.configureTestingModule(moduleDef);
                }
                return fn.apply(this);
            };
        }
        return new InjectSetupWrapper(() => moduleDef);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const _global = (typeof window === 'undefined' ? global : window);
    // Reset the test providers and the fake async zone before each test.
    if (_global.beforeEach) {
        _global.beforeEach(getCleanupHook(false));
    }
    // We provide both a `beforeEach` and `afterEach`, because the updated behavior for
    // tearing down the module is supposed to run after the test so that we can associate
    // teardown errors with the correct test.
    if (_global.afterEach) {
        _global.afterEach(getCleanupHook(true));
    }
    function getCleanupHook(expectedTeardownValue) {
        return () => {
            const testBed = TestBedImpl.INSTANCE;
            if (testBed.shouldTearDownTestingModule() === expectedTeardownValue) {
                testBed.resetTestingModule();
                resetFakeAsyncZone();
            }
        };
    }
    /**
     * This API should be removed. But doing so seems to break `google3` and so it requires a bit of
     * investigation.
     *
     * A work around is to mark it as `@codeGenApi` for now and investigate later.
     *
     * @codeGenApi
     */
    // TODO(iminar): Remove this code in a safe way.
    const __core_private_testing_placeholder__ = '';

    exports.ComponentFixture = ComponentFixture;
    exports.ComponentFixtureAutoDetect = ComponentFixtureAutoDetect;
    exports.ComponentFixtureNoNgZone = ComponentFixtureNoNgZone;
    exports.InjectSetupWrapper = InjectSetupWrapper;
    exports.TestBed = TestBed;
    exports.TestComponentRenderer = TestComponentRenderer;
    exports.__core_private_testing_placeholder__ = __core_private_testing_placeholder__;
    exports.async = async;
    exports.discardPeriodicTasks = discardPeriodicTasks;
    exports.fakeAsync = fakeAsync;
    exports.flush = flush;
    exports.flushMicrotasks = flushMicrotasks;
    exports.getTestBed = getTestBed;
    exports.inject = inject;
    exports.resetFakeAsyncZone = resetFakeAsyncZone;
    exports.tick = tick;
    exports.waitForAsync = waitForAsync;
    exports.withModule = withModule;
    exports["ɵMetadataOverrider"] = MetadataOverrider;

}));
