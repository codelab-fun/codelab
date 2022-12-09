(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tslib'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.rxjsOperators = {}, global.tslib));
})(this, (function (exports, tslib) { 'use strict';

    function isFunction(value) {
        return typeof value === 'function';
    }

    function hasLift(source) {
        return isFunction(source === null || source === void 0 ? void 0 : source.lift);
    }
    function operate(init) {
        return function (source) {
            if (hasLift(source)) {
                return source.lift(function (liftedSource) {
                    try {
                        return init(liftedSource, this);
                    }
                    catch (err) {
                        this.error(err);
                    }
                });
            }
            throw new TypeError('Unable to lift unknown Observable type');
        };
    }

    var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

    function isPromise(value) {
        return isFunction(value === null || value === void 0 ? void 0 : value.then);
    }

    function createErrorClass(createImpl) {
        var _super = function (instance) {
            Error.call(instance);
            instance.stack = new Error().stack;
        };
        var ctorFunc = createImpl(_super);
        ctorFunc.prototype = Object.create(Error.prototype);
        ctorFunc.prototype.constructor = ctorFunc;
        return ctorFunc;
    }

    var UnsubscriptionError = createErrorClass(function (_super) {
        return function UnsubscriptionErrorImpl(errors) {
            _super(this);
            this.message = errors
                ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ')
                : '';
            this.name = 'UnsubscriptionError';
            this.errors = errors;
        };
    });

    function arrRemove(arr, item) {
        if (arr) {
            var index = arr.indexOf(item);
            0 <= index && arr.splice(index, 1);
        }
    }

    var Subscription = (function () {
        function Subscription(initialTeardown) {
            this.initialTeardown = initialTeardown;
            this.closed = false;
            this._parentage = null;
            this._finalizers = null;
        }
        Subscription.prototype.unsubscribe = function () {
            var e_1, _a, e_2, _b;
            var errors;
            if (!this.closed) {
                this.closed = true;
                var _parentage = this._parentage;
                if (_parentage) {
                    this._parentage = null;
                    if (Array.isArray(_parentage)) {
                        try {
                            for (var _parentage_1 = tslib.__values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                                var parent_1 = _parentage_1_1.value;
                                parent_1.remove(this);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    else {
                        _parentage.remove(this);
                    }
                }
                var initialFinalizer = this.initialTeardown;
                if (isFunction(initialFinalizer)) {
                    try {
                        initialFinalizer();
                    }
                    catch (e) {
                        errors = e instanceof UnsubscriptionError ? e.errors : [e];
                    }
                }
                var _finalizers = this._finalizers;
                if (_finalizers) {
                    this._finalizers = null;
                    try {
                        for (var _finalizers_1 = tslib.__values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                            var finalizer = _finalizers_1_1.value;
                            try {
                                execFinalizer(finalizer);
                            }
                            catch (err) {
                                errors = errors !== null && errors !== void 0 ? errors : [];
                                if (err instanceof UnsubscriptionError) {
                                    errors = tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(errors)), tslib.__read(err.errors));
                                }
                                else {
                                    errors.push(err);
                                }
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (errors) {
                    throw new UnsubscriptionError(errors);
                }
            }
        };
        Subscription.prototype.add = function (teardown) {
            var _a;
            if (teardown && teardown !== this) {
                if (this.closed) {
                    execFinalizer(teardown);
                }
                else {
                    if (teardown instanceof Subscription) {
                        if (teardown.closed || teardown._hasParent(this)) {
                            return;
                        }
                        teardown._addParent(this);
                    }
                    (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
                }
            }
        };
        Subscription.prototype._hasParent = function (parent) {
            var _parentage = this._parentage;
            return _parentage === parent || (Array.isArray(_parentage) && _parentage.includes(parent));
        };
        Subscription.prototype._addParent = function (parent) {
            var _parentage = this._parentage;
            this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
        };
        Subscription.prototype._removeParent = function (parent) {
            var _parentage = this._parentage;
            if (_parentage === parent) {
                this._parentage = null;
            }
            else if (Array.isArray(_parentage)) {
                arrRemove(_parentage, parent);
            }
        };
        Subscription.prototype.remove = function (teardown) {
            var _finalizers = this._finalizers;
            _finalizers && arrRemove(_finalizers, teardown);
            if (teardown instanceof Subscription) {
                teardown._removeParent(this);
            }
        };
        Subscription.EMPTY = (function () {
            var empty = new Subscription();
            empty.closed = true;
            return empty;
        })();
        return Subscription;
    }());
    var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
    function isSubscription(value) {
        return (value instanceof Subscription ||
            (value && 'closed' in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe)));
    }
    function execFinalizer(finalizer) {
        if (isFunction(finalizer)) {
            finalizer();
        }
        else {
            finalizer.unsubscribe();
        }
    }

    var config = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: undefined,
        useDeprecatedSynchronousErrorHandling: false,
        useDeprecatedNextContext: false,
    };

    var timeoutProvider = {
        setTimeout: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return setTimeout.apply(void 0, tslib.__spreadArray([handler, timeout], tslib.__read(args)));
        },
        clearTimeout: function (handle) {
            return (clearTimeout)(handle);
        },
        delegate: undefined,
    };

    function reportUnhandledError(err) {
        timeoutProvider.setTimeout(function () {
            {
                throw err;
            }
        });
    }

    function noop() { }

    function errorContext(cb) {
        {
            cb();
        }
    }

    var Subscriber = (function (_super) {
        tslib.__extends(Subscriber, _super);
        function Subscriber(destination) {
            var _this = _super.call(this) || this;
            _this.isStopped = false;
            if (destination) {
                _this.destination = destination;
                if (isSubscription(destination)) {
                    destination.add(_this);
                }
            }
            else {
                _this.destination = EMPTY_OBSERVER;
            }
            return _this;
        }
        Subscriber.create = function (next, error, complete) {
            return new SafeSubscriber(next, error, complete);
        };
        Subscriber.prototype.next = function (value) {
            if (this.isStopped) ;
            else {
                this._next(value);
            }
        };
        Subscriber.prototype.error = function (err) {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function () {
            if (this.isStopped) ;
            else {
                this.isStopped = true;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function () {
            if (!this.closed) {
                this.isStopped = true;
                _super.prototype.unsubscribe.call(this);
                this.destination = null;
            }
        };
        Subscriber.prototype._next = function (value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function (err) {
            try {
                this.destination.error(err);
            }
            finally {
                this.unsubscribe();
            }
        };
        Subscriber.prototype._complete = function () {
            try {
                this.destination.complete();
            }
            finally {
                this.unsubscribe();
            }
        };
        return Subscriber;
    }(Subscription));
    var _bind = Function.prototype.bind;
    function bind(fn, thisArg) {
        return _bind.call(fn, thisArg);
    }
    var ConsumerObserver = (function () {
        function ConsumerObserver(partialObserver) {
            this.partialObserver = partialObserver;
        }
        ConsumerObserver.prototype.next = function (value) {
            var partialObserver = this.partialObserver;
            if (partialObserver.next) {
                try {
                    partialObserver.next(value);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        ConsumerObserver.prototype.error = function (err) {
            var partialObserver = this.partialObserver;
            if (partialObserver.error) {
                try {
                    partialObserver.error(err);
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
            else {
                handleUnhandledError(err);
            }
        };
        ConsumerObserver.prototype.complete = function () {
            var partialObserver = this.partialObserver;
            if (partialObserver.complete) {
                try {
                    partialObserver.complete();
                }
                catch (error) {
                    handleUnhandledError(error);
                }
            }
        };
        return ConsumerObserver;
    }());
    var SafeSubscriber = (function (_super) {
        tslib.__extends(SafeSubscriber, _super);
        function SafeSubscriber(observerOrNext, error, complete) {
            var _this = _super.call(this) || this;
            var partialObserver;
            if (isFunction(observerOrNext) || !observerOrNext) {
                partialObserver = {
                    next: (observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : undefined),
                    error: error !== null && error !== void 0 ? error : undefined,
                    complete: complete !== null && complete !== void 0 ? complete : undefined,
                };
            }
            else {
                var context_1;
                if (_this && config.useDeprecatedNextContext) {
                    context_1 = Object.create(observerOrNext);
                    context_1.unsubscribe = function () { return _this.unsubscribe(); };
                    partialObserver = {
                        next: observerOrNext.next && bind(observerOrNext.next, context_1),
                        error: observerOrNext.error && bind(observerOrNext.error, context_1),
                        complete: observerOrNext.complete && bind(observerOrNext.complete, context_1),
                    };
                }
                else {
                    partialObserver = observerOrNext;
                }
            }
            _this.destination = new ConsumerObserver(partialObserver);
            return _this;
        }
        return SafeSubscriber;
    }(Subscriber));
    function handleUnhandledError(error) {
        {
            reportUnhandledError(error);
        }
    }
    function defaultErrorHandler(err) {
        throw err;
    }
    var EMPTY_OBSERVER = {
        closed: true,
        next: noop,
        error: defaultErrorHandler,
        complete: noop,
    };

    var observable = (function () { return (typeof Symbol === 'function' && Symbol.observable) || '@@observable'; })();

    function identity(x) {
        return x;
    }

    function pipe() {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return pipeFromArray(fns);
    }
    function pipeFromArray(fns) {
        if (fns.length === 0) {
            return identity;
        }
        if (fns.length === 1) {
            return fns[0];
        }
        return function piped(input) {
            return fns.reduce(function (prev, fn) { return fn(prev); }, input);
        };
    }

    var Observable = (function () {
        function Observable(subscribe) {
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }
        Observable.prototype.lift = function (operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function (observerOrNext, error, complete) {
            var _this = this;
            var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
            errorContext(function () {
                var _a = _this, operator = _a.operator, source = _a.source;
                subscriber.add(operator
                    ?
                        operator.call(subscriber, source)
                    : source
                        ?
                            _this._subscribe(subscriber)
                        :
                            _this._trySubscribe(subscriber));
            });
            return subscriber;
        };
        Observable.prototype._trySubscribe = function (sink) {
            try {
                return this._subscribe(sink);
            }
            catch (err) {
                sink.error(err);
            }
        };
        Observable.prototype.forEach = function (next, promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var subscriber = new SafeSubscriber({
                    next: function (value) {
                        try {
                            next(value);
                        }
                        catch (err) {
                            reject(err);
                            subscriber.unsubscribe();
                        }
                    },
                    error: reject,
                    complete: resolve,
                });
                _this.subscribe(subscriber);
            });
        };
        Observable.prototype._subscribe = function (subscriber) {
            var _a;
            return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
        };
        Observable.prototype[observable] = function () {
            return this;
        };
        Observable.prototype.pipe = function () {
            var operations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                operations[_i] = arguments[_i];
            }
            return pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function (promiseCtor) {
            var _this = this;
            promiseCtor = getPromiseCtor(promiseCtor);
            return new promiseCtor(function (resolve, reject) {
                var value;
                _this.subscribe(function (x) { return (value = x); }, function (err) { return reject(err); }, function () { return resolve(value); });
            });
        };
        Observable.create = function (subscribe) {
            return new Observable(subscribe);
        };
        return Observable;
    }());
    function getPromiseCtor(promiseCtor) {
        var _a;
        return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
    }
    function isObserver(value) {
        return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
    }
    function isSubscriber(value) {
        return (value && value instanceof Subscriber) || (isObserver(value) && isSubscription(value));
    }

    function isInteropObservable(input) {
        return isFunction(input[observable]);
    }

    function isAsyncIterable(obj) {
        return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
    }

    function createInvalidObservableTypeError(input) {
        return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
    }

    function getSymbolIterator() {
        if (typeof Symbol !== 'function' || !Symbol.iterator) {
            return '@@iterator';
        }
        return Symbol.iterator;
    }
    var iterator = getSymbolIterator();

    function isIterable(input) {
        return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
    }

    function readableStreamLikeToAsyncGenerator(readableStream) {
        return tslib.__asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
            var reader, _a, value, done;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reader = readableStream.getReader();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 9, 10]);
                        _b.label = 2;
                    case 2:
                        return [4, tslib.__await(reader.read())];
                    case 3:
                        _a = _b.sent(), value = _a.value, done = _a.done;
                        if (!done) return [3, 5];
                        return [4, tslib.__await(void 0)];
                    case 4: return [2, _b.sent()];
                    case 5: return [4, tslib.__await(value)];
                    case 6: return [4, _b.sent()];
                    case 7:
                        _b.sent();
                        return [3, 2];
                    case 8: return [3, 10];
                    case 9:
                        reader.releaseLock();
                        return [7];
                    case 10: return [2];
                }
            });
        });
    }
    function isReadableStreamLike(obj) {
        return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
    }

    function innerFrom(input) {
        if (input instanceof Observable) {
            return input;
        }
        if (input != null) {
            if (isInteropObservable(input)) {
                return fromInteropObservable(input);
            }
            if (isArrayLike(input)) {
                return fromArrayLike(input);
            }
            if (isPromise(input)) {
                return fromPromise(input);
            }
            if (isAsyncIterable(input)) {
                return fromAsyncIterable(input);
            }
            if (isIterable(input)) {
                return fromIterable(input);
            }
            if (isReadableStreamLike(input)) {
                return fromReadableStreamLike(input);
            }
        }
        throw createInvalidObservableTypeError(input);
    }
    function fromInteropObservable(obj) {
        return new Observable(function (subscriber) {
            var obs = obj[observable]();
            if (isFunction(obs.subscribe)) {
                return obs.subscribe(subscriber);
            }
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        });
    }
    function fromArrayLike(array) {
        return new Observable(function (subscriber) {
            for (var i = 0; i < array.length && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        });
    }
    function fromPromise(promise) {
        return new Observable(function (subscriber) {
            promise
                .then(function (value) {
                if (!subscriber.closed) {
                    subscriber.next(value);
                    subscriber.complete();
                }
            }, function (err) { return subscriber.error(err); })
                .then(null, reportUnhandledError);
        });
    }
    function fromIterable(iterable) {
        return new Observable(function (subscriber) {
            var e_1, _a;
            try {
                for (var iterable_1 = tslib.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                    var value = iterable_1_1.value;
                    subscriber.next(value);
                    if (subscriber.closed) {
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            subscriber.complete();
        });
    }
    function fromAsyncIterable(asyncIterable) {
        return new Observable(function (subscriber) {
            process(asyncIterable, subscriber).catch(function (err) { return subscriber.error(err); });
        });
    }
    function fromReadableStreamLike(readableStream) {
        return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
    }
    function process(asyncIterable, subscriber) {
        var asyncIterable_1, asyncIterable_1_1;
        var e_2, _a;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var value, e_2_1;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 11]);
                        asyncIterable_1 = tslib.__asyncValues(asyncIterable);
                        _b.label = 1;
                    case 1: return [4, asyncIterable_1.next()];
                    case 2:
                        if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
                        value = asyncIterable_1_1.value;
                        subscriber.next(value);
                        if (subscriber.closed) {
                            return [2];
                        }
                        _b.label = 3;
                    case 3: return [3, 1];
                    case 4: return [3, 11];
                    case 5:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 11];
                    case 6:
                        _b.trys.push([6, , 9, 10]);
                        if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
                        return [4, _a.call(asyncIterable_1)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 10: return [7];
                    case 11:
                        subscriber.complete();
                        return [2];
                }
            });
        });
    }

    function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
        return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
    }
    var OperatorSubscriber = (function (_super) {
        tslib.__extends(OperatorSubscriber, _super);
        function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
            var _this = _super.call(this, destination) || this;
            _this.onFinalize = onFinalize;
            _this.shouldUnsubscribe = shouldUnsubscribe;
            _this._next = onNext
                ? function (value) {
                    try {
                        onNext(value);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                }
                : _super.prototype._next;
            _this._error = onError
                ? function (err) {
                    try {
                        onError(err);
                    }
                    catch (err) {
                        destination.error(err);
                    }
                    finally {
                        this.unsubscribe();
                    }
                }
                : _super.prototype._error;
            _this._complete = onComplete
                ? function () {
                    try {
                        onComplete();
                    }
                    catch (err) {
                        destination.error(err);
                    }
                    finally {
                        this.unsubscribe();
                    }
                }
                : _super.prototype._complete;
            return _this;
        }
        OperatorSubscriber.prototype.unsubscribe = function () {
            var _a;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                var closed_1 = this.closed;
                _super.prototype.unsubscribe.call(this);
                !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
            }
        };
        return OperatorSubscriber;
    }(Subscriber));

    function audit(durationSelector) {
        return operate(function (source, subscriber) {
            var hasValue = false;
            var lastValue = null;
            var durationSubscriber = null;
            var isComplete = false;
            var endDuration = function () {
                durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
                durationSubscriber = null;
                if (hasValue) {
                    hasValue = false;
                    var value = lastValue;
                    lastValue = null;
                    subscriber.next(value);
                }
                isComplete && subscriber.complete();
            };
            var cleanupDuration = function () {
                durationSubscriber = null;
                isComplete && subscriber.complete();
            };
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                hasValue = true;
                lastValue = value;
                if (!durationSubscriber) {
                    innerFrom(durationSelector(value)).subscribe((durationSubscriber = createOperatorSubscriber(subscriber, endDuration, cleanupDuration)));
                }
            }, function () {
                isComplete = true;
                (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
            }));
        });
    }

    var Action = (function (_super) {
        tslib.__extends(Action, _super);
        function Action(scheduler, work) {
            return _super.call(this) || this;
        }
        Action.prototype.schedule = function (state, delay) {
            return this;
        };
        return Action;
    }(Subscription));

    var intervalProvider = {
        setInterval: function (handler, timeout) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            return setInterval.apply(void 0, tslib.__spreadArray([handler, timeout], tslib.__read(args)));
        },
        clearInterval: function (handle) {
            return (clearInterval)(handle);
        },
        delegate: undefined,
    };

    var AsyncAction = (function (_super) {
        tslib.__extends(AsyncAction, _super);
        function AsyncAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            _this.pending = false;
            return _this;
        }
        AsyncAction.prototype.schedule = function (state, delay) {
            var _a;
            if (delay === void 0) { delay = 0; }
            if (this.closed) {
                return this;
            }
            this.state = state;
            var id = this.id;
            var scheduler = this.scheduler;
            if (id != null) {
                this.id = this.recycleAsyncId(scheduler, id, delay);
            }
            this.pending = true;
            this.delay = delay;
            this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
            return this;
        };
        AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
            if (delay === void 0) { delay = 0; }
            return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
        };
        AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
            if (delay === void 0) { delay = 0; }
            if (delay != null && this.delay === delay && this.pending === false) {
                return id;
            }
            if (id != null) {
                intervalProvider.clearInterval(id);
            }
            return undefined;
        };
        AsyncAction.prototype.execute = function (state, delay) {
            if (this.closed) {
                return new Error('executing a cancelled action');
            }
            this.pending = false;
            var error = this._execute(state, delay);
            if (error) {
                return error;
            }
            else if (this.pending === false && this.id != null) {
                this.id = this.recycleAsyncId(this.scheduler, this.id, null);
            }
        };
        AsyncAction.prototype._execute = function (state, _delay) {
            var errored = false;
            var errorValue;
            try {
                this.work(state);
            }
            catch (e) {
                errored = true;
                errorValue = e ? e : new Error('Scheduled action threw falsy error');
            }
            if (errored) {
                this.unsubscribe();
                return errorValue;
            }
        };
        AsyncAction.prototype.unsubscribe = function () {
            if (!this.closed) {
                var _a = this, id = _a.id, scheduler = _a.scheduler;
                var actions = scheduler.actions;
                this.work = this.state = this.scheduler = null;
                this.pending = false;
                arrRemove(actions, this);
                if (id != null) {
                    this.id = this.recycleAsyncId(scheduler, id, null);
                }
                this.delay = null;
                _super.prototype.unsubscribe.call(this);
            }
        };
        return AsyncAction;
    }(Action));

    var dateTimestampProvider = {
        now: function () {
            return (dateTimestampProvider.delegate || Date).now();
        },
        delegate: undefined,
    };

    var Scheduler = (function () {
        function Scheduler(schedulerActionCtor, now) {
            if (now === void 0) { now = Scheduler.now; }
            this.schedulerActionCtor = schedulerActionCtor;
            this.now = now;
        }
        Scheduler.prototype.schedule = function (work, delay, state) {
            if (delay === void 0) { delay = 0; }
            return new this.schedulerActionCtor(this, work).schedule(state, delay);
        };
        Scheduler.now = dateTimestampProvider.now;
        return Scheduler;
    }());

    var AsyncScheduler = (function (_super) {
        tslib.__extends(AsyncScheduler, _super);
        function AsyncScheduler(SchedulerAction, now) {
            if (now === void 0) { now = Scheduler.now; }
            var _this = _super.call(this, SchedulerAction, now) || this;
            _this.actions = [];
            _this._active = false;
            return _this;
        }
        AsyncScheduler.prototype.flush = function (action) {
            var actions = this.actions;
            if (this._active) {
                actions.push(action);
                return;
            }
            var error;
            this._active = true;
            do {
                if ((error = action.execute(action.state, action.delay))) {
                    break;
                }
            } while ((action = actions.shift()));
            this._active = false;
            if (error) {
                while ((action = actions.shift())) {
                    action.unsubscribe();
                }
                throw error;
            }
        };
        return AsyncScheduler;
    }(Scheduler));

    var asyncScheduler = new AsyncScheduler(AsyncAction);
    var async = asyncScheduler;

    function isScheduler(value) {
        return value && isFunction(value.schedule);
    }

    function isValidDate(value) {
        return value instanceof Date && !isNaN(value);
    }

    function timer(dueTime, intervalOrScheduler, scheduler) {
        if (dueTime === void 0) { dueTime = 0; }
        if (scheduler === void 0) { scheduler = async; }
        var intervalDuration = -1;
        if (intervalOrScheduler != null) {
            if (isScheduler(intervalOrScheduler)) {
                scheduler = intervalOrScheduler;
            }
            else {
                intervalDuration = intervalOrScheduler;
            }
        }
        return new Observable(function (subscriber) {
            var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
            if (due < 0) {
                due = 0;
            }
            var n = 0;
            return scheduler.schedule(function () {
                if (!subscriber.closed) {
                    subscriber.next(n++);
                    if (0 <= intervalDuration) {
                        this.schedule(undefined, intervalDuration);
                    }
                    else {
                        subscriber.complete();
                    }
                }
            }, due);
        });
    }

    function auditTime(duration, scheduler) {
        if (scheduler === void 0) { scheduler = asyncScheduler; }
        return audit(function () { return timer(duration, scheduler); });
    }

    function buffer(closingNotifier) {
        return operate(function (source, subscriber) {
            var currentBuffer = [];
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return currentBuffer.push(value); }, function () {
                subscriber.next(currentBuffer);
                subscriber.complete();
            }));
            closingNotifier.subscribe(createOperatorSubscriber(subscriber, function () {
                var b = currentBuffer;
                currentBuffer = [];
                subscriber.next(b);
            }, noop));
            return function () {
                currentBuffer = null;
            };
        });
    }

    function bufferCount(bufferSize, startBufferEvery) {
        if (startBufferEvery === void 0) { startBufferEvery = null; }
        startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
        return operate(function (source, subscriber) {
            var buffers = [];
            var count = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var e_1, _a, e_2, _b;
                var toEmit = null;
                if (count++ % startBufferEvery === 0) {
                    buffers.push([]);
                }
                try {
                    for (var buffers_1 = tslib.__values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                        var buffer = buffers_1_1.value;
                        buffer.push(value);
                        if (bufferSize <= buffer.length) {
                            toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                            toEmit.push(buffer);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (toEmit) {
                    try {
                        for (var toEmit_1 = tslib.__values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
                            var buffer = toEmit_1_1.value;
                            arrRemove(buffers, buffer);
                            subscriber.next(buffer);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }, function () {
                var e_3, _a;
                try {
                    for (var buffers_2 = tslib.__values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
                        var buffer = buffers_2_1.value;
                        subscriber.next(buffer);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                subscriber.complete();
            }, undefined, function () {
                buffers = null;
            }));
        });
    }

    function last$1(arr) {
        return arr[arr.length - 1];
    }
    function popResultSelector(args) {
        return isFunction(last$1(args)) ? args.pop() : undefined;
    }
    function popScheduler(args) {
        return isScheduler(last$1(args)) ? args.pop() : undefined;
    }
    function popNumber(args, defaultValue) {
        return typeof last$1(args) === 'number' ? args.pop() : defaultValue;
    }

    function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
        if (delay === void 0) { delay = 0; }
        if (repeat === void 0) { repeat = false; }
        var scheduleSubscription = scheduler.schedule(function () {
            work();
            if (repeat) {
                parentSubscription.add(this.schedule(null, delay));
            }
            else {
                this.unsubscribe();
            }
        }, delay);
        parentSubscription.add(scheduleSubscription);
        if (!repeat) {
            return scheduleSubscription;
        }
    }

    function bufferTime(bufferTimeSpan) {
        var _a, _b;
        var otherArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            otherArgs[_i - 1] = arguments[_i];
        }
        var scheduler = (_a = popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : asyncScheduler;
        var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
        var maxBufferSize = otherArgs[1] || Infinity;
        return operate(function (source, subscriber) {
            var bufferRecords = [];
            var restartOnEmit = false;
            var emit = function (record) {
                var buffer = record.buffer, subs = record.subs;
                subs.unsubscribe();
                arrRemove(bufferRecords, record);
                subscriber.next(buffer);
                restartOnEmit && startBuffer();
            };
            var startBuffer = function () {
                if (bufferRecords) {
                    var subs = new Subscription();
                    subscriber.add(subs);
                    var buffer = [];
                    var record_1 = {
                        buffer: buffer,
                        subs: subs,
                    };
                    bufferRecords.push(record_1);
                    executeSchedule(subs, scheduler, function () { return emit(record_1); }, bufferTimeSpan);
                }
            };
            if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
                executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
            }
            else {
                restartOnEmit = true;
            }
            startBuffer();
            var bufferTimeSubscriber = createOperatorSubscriber(subscriber, function (value) {
                var e_1, _a;
                var recordsCopy = bufferRecords.slice();
                try {
                    for (var recordsCopy_1 = tslib.__values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
                        var record = recordsCopy_1_1.value;
                        var buffer = record.buffer;
                        buffer.push(value);
                        maxBufferSize <= buffer.length && emit(record);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a = recordsCopy_1.return)) _a.call(recordsCopy_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }, function () {
                while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
                    subscriber.next(bufferRecords.shift().buffer);
                }
                bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
                subscriber.complete();
                subscriber.unsubscribe();
            }, undefined, function () { return (bufferRecords = null); });
            source.subscribe(bufferTimeSubscriber);
        });
    }

    function bufferToggle(openings, closingSelector) {
        return operate(function (source, subscriber) {
            var buffers = [];
            innerFrom(openings).subscribe(createOperatorSubscriber(subscriber, function (openValue) {
                var buffer = [];
                buffers.push(buffer);
                var closingSubscription = new Subscription();
                var emitBuffer = function () {
                    arrRemove(buffers, buffer);
                    subscriber.next(buffer);
                    closingSubscription.unsubscribe();
                };
                closingSubscription.add(innerFrom(closingSelector(openValue)).subscribe(createOperatorSubscriber(subscriber, emitBuffer, noop)));
            }, noop));
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var e_1, _a;
                try {
                    for (var buffers_1 = tslib.__values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
                        var buffer = buffers_1_1.value;
                        buffer.push(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }, function () {
                while (buffers.length > 0) {
                    subscriber.next(buffers.shift());
                }
                subscriber.complete();
            }));
        });
    }

    function bufferWhen(closingSelector) {
        return operate(function (source, subscriber) {
            var buffer = null;
            var closingSubscriber = null;
            var openBuffer = function () {
                closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
                var b = buffer;
                buffer = [];
                b && subscriber.next(b);
                innerFrom(closingSelector()).subscribe((closingSubscriber = createOperatorSubscriber(subscriber, openBuffer, noop)));
            };
            openBuffer();
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return buffer === null || buffer === void 0 ? void 0 : buffer.push(value); }, function () {
                buffer && subscriber.next(buffer);
                subscriber.complete();
            }, undefined, function () { return (buffer = closingSubscriber = null); }));
        });
    }

    function catchError(selector) {
        return operate(function (source, subscriber) {
            var innerSub = null;
            var syncUnsub = false;
            var handledResult;
            innerSub = source.subscribe(createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
                handledResult = innerFrom(selector(err, catchError(selector)(source)));
                if (innerSub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    handledResult.subscribe(subscriber);
                }
                else {
                    syncUnsub = true;
                }
            }));
            if (syncUnsub) {
                innerSub.unsubscribe();
                innerSub = null;
                handledResult.subscribe(subscriber);
            }
        });
    }

    var isArray$2 = Array.isArray;
    var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
    function argsArgArrayOrObject(args) {
        if (args.length === 1) {
            var first_1 = args[0];
            if (isArray$2(first_1)) {
                return { args: first_1, keys: null };
            }
            if (isPOJO(first_1)) {
                var keys = getKeys(first_1);
                return {
                    args: keys.map(function (key) { return first_1[key]; }),
                    keys: keys,
                };
            }
        }
        return { args: args, keys: null };
    }
    function isPOJO(obj) {
        return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
    }

    function observeOn(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        return operate(function (source, subscriber) {
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return executeSchedule(subscriber, scheduler, function () { return subscriber.next(value); }, delay); }, function () { return executeSchedule(subscriber, scheduler, function () { return subscriber.complete(); }, delay); }, function (err) { return executeSchedule(subscriber, scheduler, function () { return subscriber.error(err); }, delay); }));
        });
    }

    function subscribeOn(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        return operate(function (source, subscriber) {
            subscriber.add(scheduler.schedule(function () { return source.subscribe(subscriber); }, delay));
        });
    }

    function scheduleObservable(input, scheduler) {
        return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
    }

    function schedulePromise(input, scheduler) {
        return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
    }

    function scheduleArray(input, scheduler) {
        return new Observable(function (subscriber) {
            var i = 0;
            return scheduler.schedule(function () {
                if (i === input.length) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(input[i++]);
                    if (!subscriber.closed) {
                        this.schedule();
                    }
                }
            });
        });
    }

    function scheduleIterable(input, scheduler) {
        return new Observable(function (subscriber) {
            var iterator$1;
            executeSchedule(subscriber, scheduler, function () {
                iterator$1 = input[iterator]();
                executeSchedule(subscriber, scheduler, function () {
                    var _a;
                    var value;
                    var done;
                    try {
                        (_a = iterator$1.next(), value = _a.value, done = _a.done);
                    }
                    catch (err) {
                        subscriber.error(err);
                        return;
                    }
                    if (done) {
                        subscriber.complete();
                    }
                    else {
                        subscriber.next(value);
                    }
                }, 0, true);
            });
            return function () { return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return(); };
        });
    }

    function scheduleAsyncIterable(input, scheduler) {
        if (!input) {
            throw new Error('Iterable cannot be null');
        }
        return new Observable(function (subscriber) {
            executeSchedule(subscriber, scheduler, function () {
                var iterator = input[Symbol.asyncIterator]();
                executeSchedule(subscriber, scheduler, function () {
                    iterator.next().then(function (result) {
                        if (result.done) {
                            subscriber.complete();
                        }
                        else {
                            subscriber.next(result.value);
                        }
                    });
                }, 0, true);
            });
        });
    }

    function scheduleReadableStreamLike(input, scheduler) {
        return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
    }

    function scheduled(input, scheduler) {
        if (input != null) {
            if (isInteropObservable(input)) {
                return scheduleObservable(input, scheduler);
            }
            if (isArrayLike(input)) {
                return scheduleArray(input, scheduler);
            }
            if (isPromise(input)) {
                return schedulePromise(input, scheduler);
            }
            if (isAsyncIterable(input)) {
                return scheduleAsyncIterable(input, scheduler);
            }
            if (isIterable(input)) {
                return scheduleIterable(input, scheduler);
            }
            if (isReadableStreamLike(input)) {
                return scheduleReadableStreamLike(input, scheduler);
            }
        }
        throw createInvalidObservableTypeError(input);
    }

    function from(input, scheduler) {
        return scheduler ? scheduled(input, scheduler) : innerFrom(input);
    }

    function map(project, thisArg) {
        return operate(function (source, subscriber) {
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                subscriber.next(project.call(thisArg, value, index++));
            }));
        });
    }

    var isArray$1 = Array.isArray;
    function callOrApply(fn, args) {
        return isArray$1(args) ? fn.apply(void 0, tslib.__spreadArray([], tslib.__read(args))) : fn(args);
    }
    function mapOneOrManyArgs(fn) {
        return map(function (args) { return callOrApply(fn, args); });
    }

    function createObject(keys, values) {
        return keys.reduce(function (result, key, i) { return ((result[key] = values[i]), result); }, {});
    }

    function combineLatest$1() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scheduler = popScheduler(args);
        var resultSelector = popResultSelector(args);
        var _a = argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
        if (observables.length === 0) {
            return from([], scheduler);
        }
        var result = new Observable(combineLatestInit(observables, scheduler, keys
            ?
                function (values) { return createObject(keys, values); }
            :
                identity));
        return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
    }
    function combineLatestInit(observables, scheduler, valueTransform) {
        if (valueTransform === void 0) { valueTransform = identity; }
        return function (subscriber) {
            maybeSchedule(scheduler, function () {
                var length = observables.length;
                var values = new Array(length);
                var active = length;
                var remainingFirstValues = length;
                var _loop_1 = function (i) {
                    maybeSchedule(scheduler, function () {
                        var source = from(observables[i], scheduler);
                        var hasFirstValue = false;
                        source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                            values[i] = value;
                            if (!hasFirstValue) {
                                hasFirstValue = true;
                                remainingFirstValues--;
                            }
                            if (!remainingFirstValues) {
                                subscriber.next(valueTransform(values.slice()));
                            }
                        }, function () {
                            if (!--active) {
                                subscriber.complete();
                            }
                        }));
                    }, subscriber);
                };
                for (var i = 0; i < length; i++) {
                    _loop_1(i);
                }
            }, subscriber);
        };
    }
    function maybeSchedule(scheduler, execute, subscription) {
        if (scheduler) {
            executeSchedule(subscription, scheduler, execute);
        }
        else {
            execute();
        }
    }

    function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
        var buffer = [];
        var active = 0;
        var index = 0;
        var isComplete = false;
        var checkComplete = function () {
            if (isComplete && !buffer.length && !active) {
                subscriber.complete();
            }
        };
        var outerNext = function (value) { return (active < concurrent ? doInnerSub(value) : buffer.push(value)); };
        var doInnerSub = function (value) {
            expand && subscriber.next(value);
            active++;
            var innerComplete = false;
            innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function (innerValue) {
                onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
                if (expand) {
                    outerNext(innerValue);
                }
                else {
                    subscriber.next(innerValue);
                }
            }, function () {
                innerComplete = true;
            }, undefined, function () {
                if (innerComplete) {
                    try {
                        active--;
                        var _loop_1 = function () {
                            var bufferedValue = buffer.shift();
                            if (innerSubScheduler) {
                                executeSchedule(subscriber, innerSubScheduler, function () { return doInnerSub(bufferedValue); });
                            }
                            else {
                                doInnerSub(bufferedValue);
                            }
                        };
                        while (buffer.length && active < concurrent) {
                            _loop_1();
                        }
                        checkComplete();
                    }
                    catch (err) {
                        subscriber.error(err);
                    }
                }
            }));
        };
        source.subscribe(createOperatorSubscriber(subscriber, outerNext, function () {
            isComplete = true;
            checkComplete();
        }));
        return function () {
            additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
        };
    }

    function mergeMap(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Infinity; }
        if (isFunction(resultSelector)) {
            return mergeMap(function (a, i) { return map(function (b, ii) { return resultSelector(a, b, i, ii); })(innerFrom(project(a, i))); }, concurrent);
        }
        else if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
        }
        return operate(function (source, subscriber) { return mergeInternals(source, subscriber, project, concurrent); });
    }

    function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
        return function (source, subscriber) {
            var hasState = hasSeed;
            var state = seed;
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var i = index++;
                state = hasState
                    ?
                        accumulator(state, value, i)
                    :
                        ((hasState = true), value);
                emitOnNext && subscriber.next(state);
            }, emitBeforeComplete &&
                (function () {
                    hasState && subscriber.next(state);
                    subscriber.complete();
                })));
        };
    }

    function reduce(accumulator, seed) {
        return operate(scanInternals(accumulator, seed, arguments.length >= 2, false, true));
    }

    var arrReducer = function (arr, value) { return (arr.push(value), arr); };
    function toArray() {
        return operate(function (source, subscriber) {
            reduce(arrReducer, [])(source).subscribe(subscriber);
        });
    }

    function joinAllInternals(joinFn, project) {
        return pipe(toArray(), mergeMap(function (sources) { return joinFn(sources); }), project ? mapOneOrManyArgs(project) : identity);
    }

    function combineLatestAll(project) {
        return joinAllInternals(combineLatest$1, project);
    }

    var combineAll = combineLatestAll;

    var isArray = Array.isArray;
    function argsOrArgArray(args) {
        return args.length === 1 && isArray(args[0]) ? args[0] : args;
    }

    function combineLatest() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var resultSelector = popResultSelector(args);
        return resultSelector
            ? pipe(combineLatest.apply(void 0, tslib.__spreadArray([], tslib.__read(args))), mapOneOrManyArgs(resultSelector))
            : operate(function (source, subscriber) {
                combineLatestInit(tslib.__spreadArray([source], tslib.__read(argsOrArgArray(args))))(subscriber);
            });
    }

    function combineLatestWith() {
        var otherSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            otherSources[_i] = arguments[_i];
        }
        return combineLatest.apply(void 0, tslib.__spreadArray([], tslib.__read(otherSources)));
    }

    function mergeAll(concurrent) {
        if (concurrent === void 0) { concurrent = Infinity; }
        return mergeMap(identity, concurrent);
    }

    function concatAll() {
        return mergeAll(1);
    }

    function concat$1() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scheduler = popScheduler(args);
        return operate(function (source, subscriber) {
            concatAll()(from(tslib.__spreadArray([source], tslib.__read(args)), scheduler)).subscribe(subscriber);
        });
    }

    function concatMap(project, resultSelector) {
        return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
    }

    function concatMapTo(innerObservable, resultSelector) {
        return isFunction(resultSelector) ? concatMap(function () { return innerObservable; }, resultSelector) : concatMap(function () { return innerObservable; });
    }

    function concatWith() {
        var otherSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            otherSources[_i] = arguments[_i];
        }
        return concat$1.apply(void 0, tslib.__spreadArray([], tslib.__read(otherSources)));
    }

    var ObjectUnsubscribedError = createErrorClass(function (_super) {
        return function ObjectUnsubscribedErrorImpl() {
            _super(this);
            this.name = 'ObjectUnsubscribedError';
            this.message = 'object unsubscribed';
        };
    });

    var Subject = (function (_super) {
        tslib.__extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.closed = false;
            _this.currentObservers = null;
            _this.observers = [];
            _this.isStopped = false;
            _this.hasError = false;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype.lift = function (operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype._throwIfClosed = function () {
            if (this.closed) {
                throw new ObjectUnsubscribedError();
            }
        };
        Subject.prototype.next = function (value) {
            var _this = this;
            errorContext(function () {
                var e_1, _a;
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    if (!_this.currentObservers) {
                        _this.currentObservers = Array.from(_this.observers);
                    }
                    try {
                        for (var _b = tslib.__values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var observer = _c.value;
                            observer.next(value);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            });
        };
        Subject.prototype.error = function (err) {
            var _this = this;
            errorContext(function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    _this.hasError = _this.isStopped = true;
                    _this.thrownError = err;
                    var observers = _this.observers;
                    while (observers.length) {
                        observers.shift().error(err);
                    }
                }
            });
        };
        Subject.prototype.complete = function () {
            var _this = this;
            errorContext(function () {
                _this._throwIfClosed();
                if (!_this.isStopped) {
                    _this.isStopped = true;
                    var observers = _this.observers;
                    while (observers.length) {
                        observers.shift().complete();
                    }
                }
            });
        };
        Subject.prototype.unsubscribe = function () {
            this.isStopped = this.closed = true;
            this.observers = this.currentObservers = null;
        };
        Object.defineProperty(Subject.prototype, "observed", {
            get: function () {
                var _a;
                return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
            },
            enumerable: false,
            configurable: true
        });
        Subject.prototype._trySubscribe = function (subscriber) {
            this._throwIfClosed();
            return _super.prototype._trySubscribe.call(this, subscriber);
        };
        Subject.prototype._subscribe = function (subscriber) {
            this._throwIfClosed();
            this._checkFinalizedStatuses(subscriber);
            return this._innerSubscribe(subscriber);
        };
        Subject.prototype._innerSubscribe = function (subscriber) {
            var _this = this;
            var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
            if (hasError || isStopped) {
                return EMPTY_SUBSCRIPTION;
            }
            this.currentObservers = null;
            observers.push(subscriber);
            return new Subscription(function () {
                _this.currentObservers = null;
                arrRemove(observers, subscriber);
            });
        };
        Subject.prototype._checkFinalizedStatuses = function (subscriber) {
            var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
            if (hasError) {
                subscriber.error(thrownError);
            }
            else if (isStopped) {
                subscriber.complete();
            }
        };
        Subject.prototype.asObservable = function () {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        Subject.create = function (destination, source) {
            return new AnonymousSubject(destination, source);
        };
        return Subject;
    }(Observable));
    var AnonymousSubject = (function (_super) {
        tslib.__extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function (value) {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        };
        AnonymousSubject.prototype.error = function (err) {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
        };
        AnonymousSubject.prototype.complete = function () {
            var _a, _b;
            (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        AnonymousSubject.prototype._subscribe = function (subscriber) {
            var _a, _b;
            return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
        };
        return AnonymousSubject;
    }(Subject));

    function fromSubscribable(subscribable) {
        return new Observable(function (subscriber) { return subscribable.subscribe(subscriber); });
    }

    var DEFAULT_CONFIG = {
        connector: function () { return new Subject(); },
    };
    function connect(selector, config) {
        if (config === void 0) { config = DEFAULT_CONFIG; }
        var connector = config.connector;
        return operate(function (source, subscriber) {
            var subject = connector();
            innerFrom(selector(fromSubscribable(subject))).subscribe(subscriber);
            subscriber.add(source.subscribe(subject));
        });
    }

    function count(predicate) {
        return reduce(function (total, value, i) { return (!predicate || predicate(value, i) ? total + 1 : total); }, 0);
    }

    function debounce(durationSelector) {
        return operate(function (source, subscriber) {
            var hasValue = false;
            var lastValue = null;
            var durationSubscriber = null;
            var emit = function () {
                durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
                durationSubscriber = null;
                if (hasValue) {
                    hasValue = false;
                    var value = lastValue;
                    lastValue = null;
                    subscriber.next(value);
                }
            };
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
                hasValue = true;
                lastValue = value;
                durationSubscriber = createOperatorSubscriber(subscriber, emit, noop);
                innerFrom(durationSelector(value)).subscribe(durationSubscriber);
            }, function () {
                emit();
                subscriber.complete();
            }, undefined, function () {
                lastValue = durationSubscriber = null;
            }));
        });
    }

    function debounceTime(dueTime, scheduler) {
        if (scheduler === void 0) { scheduler = asyncScheduler; }
        return operate(function (source, subscriber) {
            var activeTask = null;
            var lastValue = null;
            var lastTime = null;
            var emit = function () {
                if (activeTask) {
                    activeTask.unsubscribe();
                    activeTask = null;
                    var value = lastValue;
                    lastValue = null;
                    subscriber.next(value);
                }
            };
            function emitWhenIdle() {
                var targetTime = lastTime + dueTime;
                var now = scheduler.now();
                if (now < targetTime) {
                    activeTask = this.schedule(undefined, targetTime - now);
                    subscriber.add(activeTask);
                    return;
                }
                emit();
            }
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                lastValue = value;
                lastTime = scheduler.now();
                if (!activeTask) {
                    activeTask = scheduler.schedule(emitWhenIdle, dueTime);
                    subscriber.add(activeTask);
                }
            }, function () {
                emit();
                subscriber.complete();
            }, undefined, function () {
                lastValue = activeTask = null;
            }));
        });
    }

    function defaultIfEmpty(defaultValue) {
        return operate(function (source, subscriber) {
            var hasValue = false;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                hasValue = true;
                subscriber.next(value);
            }, function () {
                if (!hasValue) {
                    subscriber.next(defaultValue);
                }
                subscriber.complete();
            }));
        });
    }

    function concat() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return concatAll()(from(args, popScheduler(args)));
    }

    var EMPTY = new Observable(function (subscriber) { return subscriber.complete(); });

    function take(count) {
        return count <= 0
            ?
                function () { return EMPTY; }
            : operate(function (source, subscriber) {
                var seen = 0;
                source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                    if (++seen <= count) {
                        subscriber.next(value);
                        if (count <= seen) {
                            subscriber.complete();
                        }
                    }
                }));
            });
    }

    function ignoreElements() {
        return operate(function (source, subscriber) {
            source.subscribe(createOperatorSubscriber(subscriber, noop));
        });
    }

    function mapTo(value) {
        return map(function () { return value; });
    }

    function delayWhen(delayDurationSelector, subscriptionDelay) {
        if (subscriptionDelay) {
            return function (source) {
                return concat(subscriptionDelay.pipe(take(1), ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
            };
        }
        return mergeMap(function (value, index) { return delayDurationSelector(value, index).pipe(take(1), mapTo(value)); });
    }

    function delay(due, scheduler) {
        if (scheduler === void 0) { scheduler = asyncScheduler; }
        var duration = timer(due, scheduler);
        return delayWhen(function () { return duration; });
    }

    function of() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scheduler = popScheduler(args);
        return from(args, scheduler);
    }

    function throwError(errorOrErrorFactory, scheduler) {
        var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function () { return errorOrErrorFactory; };
        var init = function (subscriber) { return subscriber.error(errorFactory()); };
        return new Observable(scheduler ? function (subscriber) { return scheduler.schedule(init, 0, subscriber); } : init);
    }

    var NotificationKind;
    (function (NotificationKind) {
        NotificationKind["NEXT"] = "N";
        NotificationKind["ERROR"] = "E";
        NotificationKind["COMPLETE"] = "C";
    })(NotificationKind || (NotificationKind = {}));
    var Notification = (function () {
        function Notification(kind, value, error) {
            this.kind = kind;
            this.value = value;
            this.error = error;
            this.hasValue = kind === 'N';
        }
        Notification.prototype.observe = function (observer) {
            return observeNotification(this, observer);
        };
        Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
            var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
            return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
        };
        Notification.prototype.accept = function (nextOrObserver, error, complete) {
            var _a;
            return isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next)
                ? this.observe(nextOrObserver)
                : this.do(nextOrObserver, error, complete);
        };
        Notification.prototype.toObservable = function () {
            var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
            var result = kind === 'N'
                ?
                    of(value)
                :
                    kind === 'E'
                        ?
                            throwError(function () { return error; })
                        :
                            kind === 'C'
                                ?
                                    EMPTY
                                :
                                    0;
            if (!result) {
                throw new TypeError("Unexpected notification kind " + kind);
            }
            return result;
        };
        Notification.createNext = function (value) {
            return new Notification('N', value);
        };
        Notification.createError = function (err) {
            return new Notification('E', undefined, err);
        };
        Notification.createComplete = function () {
            return Notification.completeNotification;
        };
        Notification.completeNotification = new Notification('C');
        return Notification;
    }());
    function observeNotification(notification, observer) {
        var _a, _b, _c;
        var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
        if (typeof kind !== 'string') {
            throw new TypeError('Invalid notification, missing "kind"');
        }
        kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
    }

    function dematerialize() {
        return operate(function (source, subscriber) {
            source.subscribe(createOperatorSubscriber(subscriber, function (notification) { return observeNotification(notification, subscriber); }));
        });
    }

    function distinct(keySelector, flushes) {
        return operate(function (source, subscriber) {
            var distinctKeys = new Set();
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var key = keySelector ? keySelector(value) : value;
                if (!distinctKeys.has(key)) {
                    distinctKeys.add(key);
                    subscriber.next(value);
                }
            }));
            flushes === null || flushes === void 0 ? void 0 : flushes.subscribe(createOperatorSubscriber(subscriber, function () { return distinctKeys.clear(); }, noop));
        });
    }

    function distinctUntilChanged(comparator, keySelector) {
        if (keySelector === void 0) { keySelector = identity; }
        comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
        return operate(function (source, subscriber) {
            var previousKey;
            var first = true;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var currentKey = keySelector(value);
                if (first || !comparator(previousKey, currentKey)) {
                    first = false;
                    previousKey = currentKey;
                    subscriber.next(value);
                }
            }));
        });
    }
    function defaultCompare(a, b) {
        return a === b;
    }

    function distinctUntilKeyChanged(key, compare) {
        return distinctUntilChanged(function (x, y) { return compare ? compare(x[key], y[key]) : x[key] === y[key]; });
    }

    var ArgumentOutOfRangeError = createErrorClass(function (_super) {
        return function ArgumentOutOfRangeErrorImpl() {
            _super(this);
            this.name = 'ArgumentOutOfRangeError';
            this.message = 'argument out of range';
        };
    });

    function filter(predicate, thisArg) {
        return operate(function (source, subscriber) {
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return predicate.call(thisArg, value, index++) && subscriber.next(value); }));
        });
    }

    var EmptyError = createErrorClass(function (_super) { return function EmptyErrorImpl() {
        _super(this);
        this.name = 'EmptyError';
        this.message = 'no elements in sequence';
    }; });

    function throwIfEmpty(errorFactory) {
        if (errorFactory === void 0) { errorFactory = defaultErrorFactory; }
        return operate(function (source, subscriber) {
            var hasValue = false;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                hasValue = true;
                subscriber.next(value);
            }, function () { return (hasValue ? subscriber.complete() : subscriber.error(errorFactory())); }));
        });
    }
    function defaultErrorFactory() {
        return new EmptyError();
    }

    function elementAt(index, defaultValue) {
        if (index < 0) {
            throw new ArgumentOutOfRangeError();
        }
        var hasDefaultValue = arguments.length >= 2;
        return function (source) {
            return source.pipe(filter(function (v, i) { return i === index; }), take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new ArgumentOutOfRangeError(); }));
        };
    }

    function endWith() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return function (source) { return concat(source, of.apply(void 0, tslib.__spreadArray([], tslib.__read(values)))); };
    }

    function every(predicate, thisArg) {
        return operate(function (source, subscriber) {
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                if (!predicate.call(thisArg, value, index++, source)) {
                    subscriber.next(false);
                    subscriber.complete();
                }
            }, function () {
                subscriber.next(true);
                subscriber.complete();
            }));
        });
    }

    function exhaustMap(project, resultSelector) {
        if (resultSelector) {
            return function (source) {
                return source.pipe(exhaustMap(function (a, i) { return innerFrom(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); }));
            };
        }
        return operate(function (source, subscriber) {
            var index = 0;
            var innerSub = null;
            var isComplete = false;
            source.subscribe(createOperatorSubscriber(subscriber, function (outerValue) {
                if (!innerSub) {
                    innerSub = createOperatorSubscriber(subscriber, undefined, function () {
                        innerSub = null;
                        isComplete && subscriber.complete();
                    });
                    innerFrom(project(outerValue, index++)).subscribe(innerSub);
                }
            }, function () {
                isComplete = true;
                !innerSub && subscriber.complete();
            }));
        });
    }

    function exhaustAll() {
        return exhaustMap(identity);
    }

    var exhaust = exhaustAll;

    function expand(project, concurrent, scheduler) {
        if (concurrent === void 0) { concurrent = Infinity; }
        concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
        return operate(function (source, subscriber) {
            return mergeInternals(source, subscriber, project, concurrent, undefined, true, scheduler);
        });
    }

    function finalize(callback) {
        return operate(function (source, subscriber) {
            try {
                source.subscribe(subscriber);
            }
            finally {
                subscriber.add(callback);
            }
        });
    }

    function find(predicate, thisArg) {
        return operate(createFind(predicate, thisArg, 'value'));
    }
    function createFind(predicate, thisArg, emit) {
        var findIndex = emit === 'index';
        return function (source, subscriber) {
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var i = index++;
                if (predicate.call(thisArg, value, i, source)) {
                    subscriber.next(findIndex ? i : value);
                    subscriber.complete();
                }
            }, function () {
                subscriber.next(findIndex ? -1 : undefined);
                subscriber.complete();
            }));
        };
    }

    function findIndex(predicate, thisArg) {
        return operate(createFind(predicate, thisArg, 'index'));
    }

    function first(predicate, defaultValue) {
        var hasDefaultValue = arguments.length >= 2;
        return function (source) {
            return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); }));
        };
    }

    function groupBy(keySelector, elementOrOptions, duration, connector) {
        return operate(function (source, subscriber) {
            var element;
            if (!elementOrOptions || typeof elementOrOptions === 'function') {
                element = elementOrOptions;
            }
            else {
                (duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector);
            }
            var groups = new Map();
            var notify = function (cb) {
                groups.forEach(cb);
                cb(subscriber);
            };
            var handleError = function (err) { return notify(function (consumer) { return consumer.error(err); }); };
            var activeGroups = 0;
            var teardownAttempted = false;
            var groupBySourceSubscriber = new OperatorSubscriber(subscriber, function (value) {
                try {
                    var key_1 = keySelector(value);
                    var group_1 = groups.get(key_1);
                    if (!group_1) {
                        groups.set(key_1, (group_1 = connector ? connector() : new Subject()));
                        var grouped = createGroupedObservable(key_1, group_1);
                        subscriber.next(grouped);
                        if (duration) {
                            var durationSubscriber_1 = createOperatorSubscriber(group_1, function () {
                                group_1.complete();
                                durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
                            }, undefined, undefined, function () { return groups.delete(key_1); });
                            groupBySourceSubscriber.add(innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
                        }
                    }
                    group_1.next(element ? element(value) : value);
                }
                catch (err) {
                    handleError(err);
                }
            }, function () { return notify(function (consumer) { return consumer.complete(); }); }, handleError, function () { return groups.clear(); }, function () {
                teardownAttempted = true;
                return activeGroups === 0;
            });
            source.subscribe(groupBySourceSubscriber);
            function createGroupedObservable(key, groupSubject) {
                var result = new Observable(function (groupSubscriber) {
                    activeGroups++;
                    var innerSub = groupSubject.subscribe(groupSubscriber);
                    return function () {
                        innerSub.unsubscribe();
                        --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
                    };
                });
                result.key = key;
                return result;
            }
        });
    }

    function isEmpty() {
        return operate(function (source, subscriber) {
            source.subscribe(createOperatorSubscriber(subscriber, function () {
                subscriber.next(false);
                subscriber.complete();
            }, function () {
                subscriber.next(true);
                subscriber.complete();
            }));
        });
    }

    function takeLast(count) {
        return count <= 0
            ? function () { return EMPTY; }
            : operate(function (source, subscriber) {
                var buffer = [];
                source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                    buffer.push(value);
                    count < buffer.length && buffer.shift();
                }, function () {
                    var e_1, _a;
                    try {
                        for (var buffer_1 = tslib.__values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
                            var value = buffer_1_1.value;
                            subscriber.next(value);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    subscriber.complete();
                }, undefined, function () {
                    buffer = null;
                }));
            });
    }

    function last(predicate, defaultValue) {
        var hasDefaultValue = arguments.length >= 2;
        return function (source) {
            return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); }));
        };
    }

    function materialize() {
        return operate(function (source, subscriber) {
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                subscriber.next(Notification.createNext(value));
            }, function () {
                subscriber.next(Notification.createComplete());
                subscriber.complete();
            }, function (err) {
                subscriber.next(Notification.createError(err));
                subscriber.complete();
            }));
        });
    }

    function max(comparer) {
        return reduce(isFunction(comparer) ? function (x, y) { return (comparer(x, y) > 0 ? x : y); } : function (x, y) { return (x > y ? x : y); });
    }

    function merge() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var scheduler = popScheduler(args);
        var concurrent = popNumber(args, Infinity);
        args = argsOrArgArray(args);
        return operate(function (source, subscriber) {
            mergeAll(concurrent)(from(tslib.__spreadArray([source], tslib.__read(args)), scheduler)).subscribe(subscriber);
        });
    }

    var flatMap = mergeMap;

    function mergeMapTo(innerObservable, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Infinity; }
        if (isFunction(resultSelector)) {
            return mergeMap(function () { return innerObservable; }, resultSelector, concurrent);
        }
        if (typeof resultSelector === 'number') {
            concurrent = resultSelector;
        }
        return mergeMap(function () { return innerObservable; }, concurrent);
    }

    function mergeScan(accumulator, seed, concurrent) {
        if (concurrent === void 0) { concurrent = Infinity; }
        return operate(function (source, subscriber) {
            var state = seed;
            return mergeInternals(source, subscriber, function (value, index) { return accumulator(state, value, index); }, concurrent, function (value) {
                state = value;
            }, false, undefined, function () { return (state = null); });
        });
    }

    function mergeWith() {
        var otherSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            otherSources[_i] = arguments[_i];
        }
        return merge.apply(void 0, tslib.__spreadArray([], tslib.__read(otherSources)));
    }

    function min(comparer) {
        return reduce(isFunction(comparer) ? function (x, y) { return (comparer(x, y) < 0 ? x : y); } : function (x, y) { return (x < y ? x : y); });
    }

    function refCount() {
        return operate(function (source, subscriber) {
            var connection = null;
            source._refCount++;
            var refCounter = createOperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
                if (!source || source._refCount <= 0 || 0 < --source._refCount) {
                    connection = null;
                    return;
                }
                var sharedConnection = source._connection;
                var conn = connection;
                connection = null;
                if (sharedConnection && (!conn || sharedConnection === conn)) {
                    sharedConnection.unsubscribe();
                }
                subscriber.unsubscribe();
            });
            source.subscribe(refCounter);
            if (!refCounter.closed) {
                connection = source.connect();
            }
        });
    }

    var ConnectableObservable = (function (_super) {
        tslib.__extends(ConnectableObservable, _super);
        function ConnectableObservable(source, subjectFactory) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.subjectFactory = subjectFactory;
            _this._subject = null;
            _this._refCount = 0;
            _this._connection = null;
            if (hasLift(source)) {
                _this.lift = source.lift;
            }
            return _this;
        }
        ConnectableObservable.prototype._subscribe = function (subscriber) {
            return this.getSubject().subscribe(subscriber);
        };
        ConnectableObservable.prototype.getSubject = function () {
            var subject = this._subject;
            if (!subject || subject.isStopped) {
                this._subject = this.subjectFactory();
            }
            return this._subject;
        };
        ConnectableObservable.prototype._teardown = function () {
            this._refCount = 0;
            var _connection = this._connection;
            this._subject = this._connection = null;
            _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
        };
        ConnectableObservable.prototype.connect = function () {
            var _this = this;
            var connection = this._connection;
            if (!connection) {
                connection = this._connection = new Subscription();
                var subject_1 = this.getSubject();
                connection.add(this.source.subscribe(createOperatorSubscriber(subject_1, undefined, function () {
                    _this._teardown();
                    subject_1.complete();
                }, function (err) {
                    _this._teardown();
                    subject_1.error(err);
                }, function () { return _this._teardown(); })));
                if (connection.closed) {
                    this._connection = null;
                    connection = Subscription.EMPTY;
                }
            }
            return connection;
        };
        ConnectableObservable.prototype.refCount = function () {
            return refCount()(this);
        };
        return ConnectableObservable;
    }(Observable));

    function multicast(subjectOrSubjectFactory, selector) {
        var subjectFactory = isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () { return subjectOrSubjectFactory; };
        if (isFunction(selector)) {
            return connect(selector, {
                connector: subjectFactory,
            });
        }
        return function (source) { return new ConnectableObservable(source, subjectFactory); };
    }

    function onErrorResumeNext() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        var nextSources = argsOrArgArray(sources);
        return operate(function (source, subscriber) {
            var remaining = tslib.__spreadArray([source], tslib.__read(nextSources));
            var subscribeNext = function () {
                if (!subscriber.closed) {
                    if (remaining.length > 0) {
                        var nextSource = void 0;
                        try {
                            nextSource = innerFrom(remaining.shift());
                        }
                        catch (err) {
                            subscribeNext();
                            return;
                        }
                        var innerSub = createOperatorSubscriber(subscriber, undefined, noop, noop);
                        nextSource.subscribe(innerSub);
                        innerSub.add(subscribeNext);
                    }
                    else {
                        subscriber.complete();
                    }
                }
            };
            subscribeNext();
        });
    }

    function pairwise() {
        return operate(function (source, subscriber) {
            var prev;
            var hasPrev = false;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var p = prev;
                prev = value;
                hasPrev && subscriber.next([p, value]);
                hasPrev = true;
            }));
        });
    }

    function not(pred, thisArg) {
        return function (value, index) { return !pred.call(thisArg, value, index); };
    }

    function partition(predicate, thisArg) {
        return function (source) {
            return [filter(predicate, thisArg)(source), filter(not(predicate, thisArg))(source)];
        };
    }

    function pluck() {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        var length = properties.length;
        if (length === 0) {
            throw new Error('list of properties cannot be empty.');
        }
        return map(function (x) {
            var currentProp = x;
            for (var i = 0; i < length; i++) {
                var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
                if (typeof p !== 'undefined') {
                    currentProp = p;
                }
                else {
                    return undefined;
                }
            }
            return currentProp;
        });
    }

    function publish(selector) {
        return selector ? function (source) { return connect(selector)(source); } : function (source) { return multicast(new Subject())(source); };
    }

    var BehaviorSubject = (function (_super) {
        tslib.__extends(BehaviorSubject, _super);
        function BehaviorSubject(_value) {
            var _this = _super.call(this) || this;
            _this._value = _value;
            return _this;
        }
        Object.defineProperty(BehaviorSubject.prototype, "value", {
            get: function () {
                return this.getValue();
            },
            enumerable: false,
            configurable: true
        });
        BehaviorSubject.prototype._subscribe = function (subscriber) {
            var subscription = _super.prototype._subscribe.call(this, subscriber);
            !subscription.closed && subscriber.next(this._value);
            return subscription;
        };
        BehaviorSubject.prototype.getValue = function () {
            var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
            if (hasError) {
                throw thrownError;
            }
            this._throwIfClosed();
            return _value;
        };
        BehaviorSubject.prototype.next = function (value) {
            _super.prototype.next.call(this, (this._value = value));
        };
        return BehaviorSubject;
    }(Subject));

    function publishBehavior(initialValue) {
        return function (source) {
            var subject = new BehaviorSubject(initialValue);
            return new ConnectableObservable(source, function () { return subject; });
        };
    }

    var AsyncSubject = (function (_super) {
        tslib.__extends(AsyncSubject, _super);
        function AsyncSubject() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._value = null;
            _this._hasValue = false;
            _this._isComplete = false;
            return _this;
        }
        AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
            var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
            if (hasError) {
                subscriber.error(thrownError);
            }
            else if (isStopped || _isComplete) {
                _hasValue && subscriber.next(_value);
                subscriber.complete();
            }
        };
        AsyncSubject.prototype.next = function (value) {
            if (!this.isStopped) {
                this._value = value;
                this._hasValue = true;
            }
        };
        AsyncSubject.prototype.complete = function () {
            var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
            if (!_isComplete) {
                this._isComplete = true;
                _hasValue && _super.prototype.next.call(this, _value);
                _super.prototype.complete.call(this);
            }
        };
        return AsyncSubject;
    }(Subject));

    function publishLast() {
        return function (source) {
            var subject = new AsyncSubject();
            return new ConnectableObservable(source, function () { return subject; });
        };
    }

    var ReplaySubject = (function (_super) {
        tslib.__extends(ReplaySubject, _super);
        function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
            if (_bufferSize === void 0) { _bufferSize = Infinity; }
            if (_windowTime === void 0) { _windowTime = Infinity; }
            if (_timestampProvider === void 0) { _timestampProvider = dateTimestampProvider; }
            var _this = _super.call(this) || this;
            _this._bufferSize = _bufferSize;
            _this._windowTime = _windowTime;
            _this._timestampProvider = _timestampProvider;
            _this._buffer = [];
            _this._infiniteTimeWindow = true;
            _this._infiniteTimeWindow = _windowTime === Infinity;
            _this._bufferSize = Math.max(1, _bufferSize);
            _this._windowTime = Math.max(1, _windowTime);
            return _this;
        }
        ReplaySubject.prototype.next = function (value) {
            var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
            if (!isStopped) {
                _buffer.push(value);
                !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
            }
            this._trimBuffer();
            _super.prototype.next.call(this, value);
        };
        ReplaySubject.prototype._subscribe = function (subscriber) {
            this._throwIfClosed();
            this._trimBuffer();
            var subscription = this._innerSubscribe(subscriber);
            var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
            var copy = _buffer.slice();
            for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
                subscriber.next(copy[i]);
            }
            this._checkFinalizedStatuses(subscriber);
            return subscription;
        };
        ReplaySubject.prototype._trimBuffer = function () {
            var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
            var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
            _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
            if (!_infiniteTimeWindow) {
                var now = _timestampProvider.now();
                var last = 0;
                for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
                    last = i;
                }
                last && _buffer.splice(0, last + 1);
            }
        };
        return ReplaySubject;
    }(Subject));

    function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
        if (selectorOrScheduler && !isFunction(selectorOrScheduler)) {
            timestampProvider = selectorOrScheduler;
        }
        var selector = isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;
        return function (source) { return multicast(new ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source); };
    }

    function raceInit(sources) {
        return function (subscriber) {
            var subscriptions = [];
            var _loop_1 = function (i) {
                subscriptions.push(innerFrom(sources[i]).subscribe(createOperatorSubscriber(subscriber, function (value) {
                    if (subscriptions) {
                        for (var s = 0; s < subscriptions.length; s++) {
                            s !== i && subscriptions[s].unsubscribe();
                        }
                        subscriptions = null;
                    }
                    subscriber.next(value);
                })));
            };
            for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
                _loop_1(i);
            }
        };
    }

    function raceWith() {
        var otherSources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            otherSources[_i] = arguments[_i];
        }
        return !otherSources.length
            ? identity
            : operate(function (source, subscriber) {
                raceInit(tslib.__spreadArray([source], tslib.__read(otherSources)))(subscriber);
            });
    }

    function race() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return raceWith.apply(void 0, tslib.__spreadArray([], tslib.__read(argsOrArgArray(args))));
    }

    function repeat(countOrConfig) {
        var _a;
        var count = Infinity;
        var delay;
        if (countOrConfig != null) {
            if (typeof countOrConfig === 'object') {
                (_a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay);
            }
            else {
                count = countOrConfig;
            }
        }
        return count <= 0
            ? function () { return EMPTY; }
            : operate(function (source, subscriber) {
                var soFar = 0;
                var sourceSub;
                var resubscribe = function () {
                    sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
                    sourceSub = null;
                    if (delay != null) {
                        var notifier = typeof delay === 'number' ? timer(delay) : innerFrom(delay(soFar));
                        var notifierSubscriber_1 = createOperatorSubscriber(subscriber, function () {
                            notifierSubscriber_1.unsubscribe();
                            subscribeToSource();
                        });
                        notifier.subscribe(notifierSubscriber_1);
                    }
                    else {
                        subscribeToSource();
                    }
                };
                var subscribeToSource = function () {
                    var syncUnsub = false;
                    sourceSub = source.subscribe(createOperatorSubscriber(subscriber, undefined, function () {
                        if (++soFar < count) {
                            if (sourceSub) {
                                resubscribe();
                            }
                            else {
                                syncUnsub = true;
                            }
                        }
                        else {
                            subscriber.complete();
                        }
                    }));
                    if (syncUnsub) {
                        resubscribe();
                    }
                };
                subscribeToSource();
            });
    }

    function repeatWhen(notifier) {
        return operate(function (source, subscriber) {
            var innerSub;
            var syncResub = false;
            var completions$;
            var isNotifierComplete = false;
            var isMainComplete = false;
            var checkComplete = function () { return isMainComplete && isNotifierComplete && (subscriber.complete(), true); };
            var getCompletionSubject = function () {
                if (!completions$) {
                    completions$ = new Subject();
                    notifier(completions$).subscribe(createOperatorSubscriber(subscriber, function () {
                        if (innerSub) {
                            subscribeForRepeatWhen();
                        }
                        else {
                            syncResub = true;
                        }
                    }, function () {
                        isNotifierComplete = true;
                        checkComplete();
                    }));
                }
                return completions$;
            };
            var subscribeForRepeatWhen = function () {
                isMainComplete = false;
                innerSub = source.subscribe(createOperatorSubscriber(subscriber, undefined, function () {
                    isMainComplete = true;
                    !checkComplete() && getCompletionSubject().next();
                }));
                if (syncResub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    syncResub = false;
                    subscribeForRepeatWhen();
                }
            };
            subscribeForRepeatWhen();
        });
    }

    function retry(configOrCount) {
        if (configOrCount === void 0) { configOrCount = Infinity; }
        var config;
        if (configOrCount && typeof configOrCount === 'object') {
            config = configOrCount;
        }
        else {
            config = {
                count: configOrCount,
            };
        }
        var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
        return count <= 0
            ? identity
            : operate(function (source, subscriber) {
                var soFar = 0;
                var innerSub;
                var subscribeForRetry = function () {
                    var syncUnsub = false;
                    innerSub = source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                        if (resetOnSuccess) {
                            soFar = 0;
                        }
                        subscriber.next(value);
                    }, undefined, function (err) {
                        if (soFar++ < count) {
                            var resub_1 = function () {
                                if (innerSub) {
                                    innerSub.unsubscribe();
                                    innerSub = null;
                                    subscribeForRetry();
                                }
                                else {
                                    syncUnsub = true;
                                }
                            };
                            if (delay != null) {
                                var notifier = typeof delay === 'number' ? timer(delay) : innerFrom(delay(err, soFar));
                                var notifierSubscriber_1 = createOperatorSubscriber(subscriber, function () {
                                    notifierSubscriber_1.unsubscribe();
                                    resub_1();
                                }, function () {
                                    subscriber.complete();
                                });
                                notifier.subscribe(notifierSubscriber_1);
                            }
                            else {
                                resub_1();
                            }
                        }
                        else {
                            subscriber.error(err);
                        }
                    }));
                    if (syncUnsub) {
                        innerSub.unsubscribe();
                        innerSub = null;
                        subscribeForRetry();
                    }
                };
                subscribeForRetry();
            });
    }

    function retryWhen(notifier) {
        return operate(function (source, subscriber) {
            var innerSub;
            var syncResub = false;
            var errors$;
            var subscribeForRetryWhen = function () {
                innerSub = source.subscribe(createOperatorSubscriber(subscriber, undefined, undefined, function (err) {
                    if (!errors$) {
                        errors$ = new Subject();
                        notifier(errors$).subscribe(createOperatorSubscriber(subscriber, function () {
                            return innerSub ? subscribeForRetryWhen() : (syncResub = true);
                        }));
                    }
                    if (errors$) {
                        errors$.next(err);
                    }
                }));
                if (syncResub) {
                    innerSub.unsubscribe();
                    innerSub = null;
                    syncResub = false;
                    subscribeForRetryWhen();
                }
            };
            subscribeForRetryWhen();
        });
    }

    function sample(notifier) {
        return operate(function (source, subscriber) {
            var hasValue = false;
            var lastValue = null;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                hasValue = true;
                lastValue = value;
            }));
            notifier.subscribe(createOperatorSubscriber(subscriber, function () {
                if (hasValue) {
                    hasValue = false;
                    var value = lastValue;
                    lastValue = null;
                    subscriber.next(value);
                }
            }, noop));
        });
    }

    function interval(period, scheduler) {
        if (period === void 0) { period = 0; }
        if (scheduler === void 0) { scheduler = asyncScheduler; }
        if (period < 0) {
            period = 0;
        }
        return timer(period, period, scheduler);
    }

    function sampleTime(period, scheduler) {
        if (scheduler === void 0) { scheduler = asyncScheduler; }
        return sample(interval(period, scheduler));
    }

    function scan(accumulator, seed) {
        return operate(scanInternals(accumulator, seed, arguments.length >= 2, true));
    }

    function sequenceEqual(compareTo, comparator) {
        if (comparator === void 0) { comparator = function (a, b) { return a === b; }; }
        return operate(function (source, subscriber) {
            var aState = createState();
            var bState = createState();
            var emit = function (isEqual) {
                subscriber.next(isEqual);
                subscriber.complete();
            };
            var createSubscriber = function (selfState, otherState) {
                var sequenceEqualSubscriber = createOperatorSubscriber(subscriber, function (a) {
                    var buffer = otherState.buffer, complete = otherState.complete;
                    if (buffer.length === 0) {
                        complete ? emit(false) : selfState.buffer.push(a);
                    }
                    else {
                        !comparator(a, buffer.shift()) && emit(false);
                    }
                }, function () {
                    selfState.complete = true;
                    var complete = otherState.complete, buffer = otherState.buffer;
                    complete && emit(buffer.length === 0);
                    sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
                });
                return sequenceEqualSubscriber;
            };
            source.subscribe(createSubscriber(aState, bState));
            compareTo.subscribe(createSubscriber(bState, aState));
        });
    }
    function createState() {
        return {
            buffer: [],
            complete: false,
        };
    }

    function share(options) {
        if (options === void 0) { options = {}; }
        var _a = options.connector, connector = _a === void 0 ? function () { return new Subject(); } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
        return function (wrapperSource) {
            var connection;
            var resetConnection;
            var subject;
            var refCount = 0;
            var hasCompleted = false;
            var hasErrored = false;
            var cancelReset = function () {
                resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
                resetConnection = undefined;
            };
            var reset = function () {
                cancelReset();
                connection = subject = undefined;
                hasCompleted = hasErrored = false;
            };
            var resetAndUnsubscribe = function () {
                var conn = connection;
                reset();
                conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
            };
            return operate(function (source, subscriber) {
                refCount++;
                if (!hasErrored && !hasCompleted) {
                    cancelReset();
                }
                var dest = (subject = subject !== null && subject !== void 0 ? subject : connector());
                subscriber.add(function () {
                    refCount--;
                    if (refCount === 0 && !hasErrored && !hasCompleted) {
                        resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
                    }
                });
                dest.subscribe(subscriber);
                if (!connection &&
                    refCount > 0) {
                    connection = new SafeSubscriber({
                        next: function (value) { return dest.next(value); },
                        error: function (err) {
                            hasErrored = true;
                            cancelReset();
                            resetConnection = handleReset(reset, resetOnError, err);
                            dest.error(err);
                        },
                        complete: function () {
                            hasCompleted = true;
                            cancelReset();
                            resetConnection = handleReset(reset, resetOnComplete);
                            dest.complete();
                        },
                    });
                    innerFrom(source).subscribe(connection);
                }
            })(wrapperSource);
        };
    }
    function handleReset(reset, on) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (on === true) {
            reset();
            return;
        }
        if (on === false) {
            return;
        }
        var onSubscriber = new SafeSubscriber({
            next: function () {
                onSubscriber.unsubscribe();
                reset();
            },
        });
        return on.apply(void 0, tslib.__spreadArray([], tslib.__read(args))).subscribe(onSubscriber);
    }

    function shareReplay(configOrBufferSize, windowTime, scheduler) {
        var _a, _b, _c;
        var bufferSize;
        var refCount = false;
        if (configOrBufferSize && typeof configOrBufferSize === 'object') {
            (_a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler);
        }
        else {
            bufferSize = (configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity);
        }
        return share({
            connector: function () { return new ReplaySubject(bufferSize, windowTime, scheduler); },
            resetOnError: true,
            resetOnComplete: false,
            resetOnRefCountZero: refCount,
        });
    }

    var SequenceError = createErrorClass(function (_super) {
        return function SequenceErrorImpl(message) {
            _super(this);
            this.name = 'SequenceError';
            this.message = message;
        };
    });

    var NotFoundError = createErrorClass(function (_super) {
        return function NotFoundErrorImpl(message) {
            _super(this);
            this.name = 'NotFoundError';
            this.message = message;
        };
    });

    function single(predicate) {
        return operate(function (source, subscriber) {
            var hasValue = false;
            var singleValue;
            var seenValue = false;
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                seenValue = true;
                if (!predicate || predicate(value, index++, source)) {
                    hasValue && subscriber.error(new SequenceError('Too many matching values'));
                    hasValue = true;
                    singleValue = value;
                }
            }, function () {
                if (hasValue) {
                    subscriber.next(singleValue);
                    subscriber.complete();
                }
                else {
                    subscriber.error(seenValue ? new NotFoundError('No matching values') : new EmptyError());
                }
            }));
        });
    }

    function skip(count) {
        return filter(function (_, index) { return count <= index; });
    }

    function skipLast(skipCount) {
        return skipCount <= 0
            ?
                identity
            : operate(function (source, subscriber) {
                var ring = new Array(skipCount);
                var seen = 0;
                source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                    var valueIndex = seen++;
                    if (valueIndex < skipCount) {
                        ring[valueIndex] = value;
                    }
                    else {
                        var index = valueIndex % skipCount;
                        var oldValue = ring[index];
                        ring[index] = value;
                        subscriber.next(oldValue);
                    }
                }));
                return function () {
                    ring = null;
                };
            });
    }

    function skipUntil(notifier) {
        return operate(function (source, subscriber) {
            var taking = false;
            var skipSubscriber = createOperatorSubscriber(subscriber, function () {
                skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
                taking = true;
            }, noop);
            innerFrom(notifier).subscribe(skipSubscriber);
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return taking && subscriber.next(value); }));
        });
    }

    function skipWhile(predicate) {
        return operate(function (source, subscriber) {
            var taking = false;
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return (taking || (taking = !predicate(value, index++))) && subscriber.next(value); }));
        });
    }

    function startWith() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var scheduler = popScheduler(values);
        return operate(function (source, subscriber) {
            (scheduler ? concat(values, source, scheduler) : concat(values, source)).subscribe(subscriber);
        });
    }

    function switchMap(project, resultSelector) {
        return operate(function (source, subscriber) {
            var innerSubscriber = null;
            var index = 0;
            var isComplete = false;
            var checkComplete = function () { return isComplete && !innerSubscriber && subscriber.complete(); };
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
                var innerIndex = 0;
                var outerIndex = index++;
                innerFrom(project(value, outerIndex)).subscribe((innerSubscriber = createOperatorSubscriber(subscriber, function (innerValue) { return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue); }, function () {
                    innerSubscriber = null;
                    checkComplete();
                })));
            }, function () {
                isComplete = true;
                checkComplete();
            }));
        });
    }

    function switchAll() {
        return switchMap(identity);
    }

    function switchMapTo(innerObservable, resultSelector) {
        return isFunction(resultSelector) ? switchMap(function () { return innerObservable; }, resultSelector) : switchMap(function () { return innerObservable; });
    }

    function switchScan(accumulator, seed) {
        return operate(function (source, subscriber) {
            var state = seed;
            switchMap(function (value, index) { return accumulator(state, value, index); }, function (_, innerValue) { return ((state = innerValue), innerValue); })(source).subscribe(subscriber);
            return function () {
                state = null;
            };
        });
    }

    function takeUntil(notifier) {
        return operate(function (source, subscriber) {
            innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function () { return subscriber.complete(); }, noop));
            !subscriber.closed && source.subscribe(subscriber);
        });
    }

    function takeWhile(predicate, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        return operate(function (source, subscriber) {
            var index = 0;
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var result = predicate(value, index++);
                (result || inclusive) && subscriber.next(value);
                !result && subscriber.complete();
            }));
        });
    }

    function tap(observerOrNext, error, complete) {
        var tapObserver = isFunction(observerOrNext) || error || complete
            ?
                { next: observerOrNext, error: error, complete: complete }
            : observerOrNext;
        return tapObserver
            ? operate(function (source, subscriber) {
                var _a;
                (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                var isUnsub = true;
                source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                    var _a;
                    (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
                    subscriber.next(value);
                }, function () {
                    var _a;
                    isUnsub = false;
                    (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                    subscriber.complete();
                }, function (err) {
                    var _a;
                    isUnsub = false;
                    (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
                    subscriber.error(err);
                }, function () {
                    var _a, _b;
                    if (isUnsub) {
                        (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
                    }
                    (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
                }));
            })
            :
                identity;
    }

    var defaultThrottleConfig = {
        leading: true,
        trailing: false,
    };
    function throttle(durationSelector, config) {
        if (config === void 0) { config = defaultThrottleConfig; }
        return operate(function (source, subscriber) {
            var leading = config.leading, trailing = config.trailing;
            var hasValue = false;
            var sendValue = null;
            var throttled = null;
            var isComplete = false;
            var endThrottling = function () {
                throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
                throttled = null;
                if (trailing) {
                    send();
                    isComplete && subscriber.complete();
                }
            };
            var cleanupThrottling = function () {
                throttled = null;
                isComplete && subscriber.complete();
            };
            var startThrottle = function (value) {
                return (throttled = innerFrom(durationSelector(value)).subscribe(createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling)));
            };
            var send = function () {
                if (hasValue) {
                    hasValue = false;
                    var value = sendValue;
                    sendValue = null;
                    subscriber.next(value);
                    !isComplete && startThrottle(value);
                }
            };
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                hasValue = true;
                sendValue = value;
                !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
            }, function () {
                isComplete = true;
                !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
            }));
        });
    }

    function throttleTime(duration, scheduler, config) {
        if (scheduler === void 0) { scheduler = asyncScheduler; }
        if (config === void 0) { config = defaultThrottleConfig; }
        var duration$ = timer(duration, scheduler);
        return throttle(function () { return duration$; }, config);
    }

    function timeInterval(scheduler) {
        if (scheduler === void 0) { scheduler = asyncScheduler; }
        return operate(function (source, subscriber) {
            var last = scheduler.now();
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var now = scheduler.now();
                var interval = now - last;
                last = now;
                subscriber.next(new TimeInterval(value, interval));
            }));
        });
    }
    var TimeInterval = (function () {
        function TimeInterval(value, interval) {
            this.value = value;
            this.interval = interval;
        }
        return TimeInterval;
    }());

    var TimeoutError = createErrorClass(function (_super) {
        return function TimeoutErrorImpl(info) {
            if (info === void 0) { info = null; }
            _super(this);
            this.message = 'Timeout has occurred';
            this.name = 'TimeoutError';
            this.info = info;
        };
    });
    function timeout(config, schedulerArg) {
        var _a = (isValidDate(config) ? { first: config } : typeof config === 'number' ? { each: config } : config), first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
        if (first == null && each == null) {
            throw new TypeError('No timeout provided.');
        }
        return operate(function (source, subscriber) {
            var originalSourceSubscription;
            var timerSubscription;
            var lastValue = null;
            var seen = 0;
            var startTimer = function (delay) {
                timerSubscription = executeSchedule(subscriber, scheduler, function () {
                    try {
                        originalSourceSubscription.unsubscribe();
                        innerFrom(_with({
                            meta: meta,
                            lastValue: lastValue,
                            seen: seen,
                        })).subscribe(subscriber);
                    }
                    catch (err) {
                        subscriber.error(err);
                    }
                }, delay);
            };
            originalSourceSubscription = source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
                seen++;
                subscriber.next((lastValue = value));
                each > 0 && startTimer(each);
            }, undefined, undefined, function () {
                if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
                    timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
                }
                lastValue = null;
            }));
            !seen && startTimer(first != null ? (typeof first === 'number' ? first : +first - scheduler.now()) : each);
        });
    }
    function timeoutErrorFactory(info) {
        throw new TimeoutError(info);
    }

    function timeoutWith(due, withObservable, scheduler) {
        var first;
        var each;
        var _with;
        scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async;
        if (isValidDate(due)) {
            first = due;
        }
        else if (typeof due === 'number') {
            each = due;
        }
        if (withObservable) {
            _with = function () { return withObservable; };
        }
        else {
            throw new TypeError('No observable provided to switch to');
        }
        if (first == null && each == null) {
            throw new TypeError('No timeout provided.');
        }
        return timeout({
            first: first,
            each: each,
            scheduler: scheduler,
            with: _with,
        });
    }

    function timestamp(timestampProvider) {
        if (timestampProvider === void 0) { timestampProvider = dateTimestampProvider; }
        return map(function (value) { return ({ value: value, timestamp: timestampProvider.now() }); });
    }

    function window(windowBoundaries) {
        return operate(function (source, subscriber) {
            var windowSubject = new Subject();
            subscriber.next(windowSubject.asObservable());
            var errorHandler = function (err) {
                windowSubject.error(err);
                subscriber.error(err);
            };
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value); }, function () {
                windowSubject.complete();
                subscriber.complete();
            }, errorHandler));
            windowBoundaries.subscribe(createOperatorSubscriber(subscriber, function () {
                windowSubject.complete();
                subscriber.next((windowSubject = new Subject()));
            }, noop, errorHandler));
            return function () {
                windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
                windowSubject = null;
            };
        });
    }

    function windowCount(windowSize, startWindowEvery) {
        if (startWindowEvery === void 0) { startWindowEvery = 0; }
        var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
        return operate(function (source, subscriber) {
            var windows = [new Subject()];
            var starts = [];
            var count = 0;
            subscriber.next(windows[0].asObservable());
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var e_1, _a;
                try {
                    for (var windows_1 = tslib.__values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
                        var window_1 = windows_1_1.value;
                        window_1.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                var c = count - windowSize + 1;
                if (c >= 0 && c % startEvery === 0) {
                    windows.shift().complete();
                }
                if (++count % startEvery === 0) {
                    var window_2 = new Subject();
                    windows.push(window_2);
                    subscriber.next(window_2.asObservable());
                }
            }, function () {
                while (windows.length > 0) {
                    windows.shift().complete();
                }
                subscriber.complete();
            }, function (err) {
                while (windows.length > 0) {
                    windows.shift().error(err);
                }
                subscriber.error(err);
            }, function () {
                starts = null;
                windows = null;
            }));
        });
    }

    function windowTime(windowTimeSpan) {
        var _a, _b;
        var otherArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            otherArgs[_i - 1] = arguments[_i];
        }
        var scheduler = (_a = popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : asyncScheduler;
        var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
        var maxWindowSize = otherArgs[1] || Infinity;
        return operate(function (source, subscriber) {
            var windowRecords = [];
            var restartOnClose = false;
            var closeWindow = function (record) {
                var window = record.window, subs = record.subs;
                window.complete();
                subs.unsubscribe();
                arrRemove(windowRecords, record);
                restartOnClose && startWindow();
            };
            var startWindow = function () {
                if (windowRecords) {
                    var subs = new Subscription();
                    subscriber.add(subs);
                    var window_1 = new Subject();
                    var record_1 = {
                        window: window_1,
                        subs: subs,
                        seen: 0,
                    };
                    windowRecords.push(record_1);
                    subscriber.next(window_1.asObservable());
                    executeSchedule(subs, scheduler, function () { return closeWindow(record_1); }, windowTimeSpan);
                }
            };
            if (windowCreationInterval !== null && windowCreationInterval >= 0) {
                executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
            }
            else {
                restartOnClose = true;
            }
            startWindow();
            var loop = function (cb) { return windowRecords.slice().forEach(cb); };
            var terminate = function (cb) {
                loop(function (_a) {
                    var window = _a.window;
                    return cb(window);
                });
                cb(subscriber);
                subscriber.unsubscribe();
            };
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                loop(function (record) {
                    record.window.next(value);
                    maxWindowSize <= ++record.seen && closeWindow(record);
                });
            }, function () { return terminate(function (consumer) { return consumer.complete(); }); }, function (err) { return terminate(function (consumer) { return consumer.error(err); }); }));
            return function () {
                windowRecords = null;
            };
        });
    }

    function windowToggle(openings, closingSelector) {
        return operate(function (source, subscriber) {
            var windows = [];
            var handleError = function (err) {
                while (0 < windows.length) {
                    windows.shift().error(err);
                }
                subscriber.error(err);
            };
            innerFrom(openings).subscribe(createOperatorSubscriber(subscriber, function (openValue) {
                var window = new Subject();
                windows.push(window);
                var closingSubscription = new Subscription();
                var closeWindow = function () {
                    arrRemove(windows, window);
                    window.complete();
                    closingSubscription.unsubscribe();
                };
                var closingNotifier;
                try {
                    closingNotifier = innerFrom(closingSelector(openValue));
                }
                catch (err) {
                    handleError(err);
                    return;
                }
                subscriber.next(window.asObservable());
                closingSubscription.add(closingNotifier.subscribe(createOperatorSubscriber(subscriber, closeWindow, noop, handleError)));
            }, noop));
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                var e_1, _a;
                var windowsCopy = windows.slice();
                try {
                    for (var windowsCopy_1 = tslib.__values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
                        var window_1 = windowsCopy_1_1.value;
                        window_1.next(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }, function () {
                while (0 < windows.length) {
                    windows.shift().complete();
                }
                subscriber.complete();
            }, handleError, function () {
                while (0 < windows.length) {
                    windows.shift().unsubscribe();
                }
            }));
        });
    }

    function windowWhen(closingSelector) {
        return operate(function (source, subscriber) {
            var window;
            var closingSubscriber;
            var handleError = function (err) {
                window.error(err);
                subscriber.error(err);
            };
            var openWindow = function () {
                closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
                window === null || window === void 0 ? void 0 : window.complete();
                window = new Subject();
                subscriber.next(window.asObservable());
                var closingNotifier;
                try {
                    closingNotifier = innerFrom(closingSelector());
                }
                catch (err) {
                    handleError(err);
                    return;
                }
                closingNotifier.subscribe((closingSubscriber = createOperatorSubscriber(subscriber, openWindow, openWindow, handleError)));
            };
            openWindow();
            source.subscribe(createOperatorSubscriber(subscriber, function (value) { return window.next(value); }, function () {
                window.complete();
                subscriber.complete();
            }, handleError, function () {
                closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
                window = null;
            }));
        });
    }

    function withLatestFrom() {
        var inputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inputs[_i] = arguments[_i];
        }
        var project = popResultSelector(inputs);
        return operate(function (source, subscriber) {
            var len = inputs.length;
            var otherValues = new Array(len);
            var hasValue = inputs.map(function () { return false; });
            var ready = false;
            var _loop_1 = function (i) {
                innerFrom(inputs[i]).subscribe(createOperatorSubscriber(subscriber, function (value) {
                    otherValues[i] = value;
                    if (!ready && !hasValue[i]) {
                        hasValue[i] = true;
                        (ready = hasValue.every(identity)) && (hasValue = null);
                    }
                }, noop));
            };
            for (var i = 0; i < len; i++) {
                _loop_1(i);
            }
            source.subscribe(createOperatorSubscriber(subscriber, function (value) {
                if (ready) {
                    var values = tslib.__spreadArray([value], tslib.__read(otherValues));
                    subscriber.next(project ? project.apply(void 0, tslib.__spreadArray([], tslib.__read(values))) : values);
                }
            }));
        });
    }

    function zip$1() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var resultSelector = popResultSelector(args);
        var sources = argsOrArgArray(args);
        return sources.length
            ? new Observable(function (subscriber) {
                var buffers = sources.map(function () { return []; });
                var completed = sources.map(function () { return false; });
                subscriber.add(function () {
                    buffers = completed = null;
                });
                var _loop_1 = function (sourceIndex) {
                    innerFrom(sources[sourceIndex]).subscribe(createOperatorSubscriber(subscriber, function (value) {
                        buffers[sourceIndex].push(value);
                        if (buffers.every(function (buffer) { return buffer.length; })) {
                            var result = buffers.map(function (buffer) { return buffer.shift(); });
                            subscriber.next(resultSelector ? resultSelector.apply(void 0, tslib.__spreadArray([], tslib.__read(result))) : result);
                            if (buffers.some(function (buffer, i) { return !buffer.length && completed[i]; })) {
                                subscriber.complete();
                            }
                        }
                    }, function () {
                        completed[sourceIndex] = true;
                        !buffers[sourceIndex].length && subscriber.complete();
                    }));
                };
                for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
                    _loop_1(sourceIndex);
                }
                return function () {
                    buffers = completed = null;
                };
            })
            : EMPTY;
    }

    function zip() {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        return operate(function (source, subscriber) {
            zip$1.apply(void 0, tslib.__spreadArray([source], tslib.__read(sources))).subscribe(subscriber);
        });
    }

    function zipAll(project) {
        return joinAllInternals(zip$1, project);
    }

    function zipWith() {
        var otherInputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            otherInputs[_i] = arguments[_i];
        }
        return zip.apply(void 0, tslib.__spreadArray([], tslib.__read(otherInputs)));
    }

    exports.audit = audit;
    exports.auditTime = auditTime;
    exports.buffer = buffer;
    exports.bufferCount = bufferCount;
    exports.bufferTime = bufferTime;
    exports.bufferToggle = bufferToggle;
    exports.bufferWhen = bufferWhen;
    exports.catchError = catchError;
    exports.combineAll = combineAll;
    exports.combineLatest = combineLatest;
    exports.combineLatestAll = combineLatestAll;
    exports.combineLatestWith = combineLatestWith;
    exports.concat = concat$1;
    exports.concatAll = concatAll;
    exports.concatMap = concatMap;
    exports.concatMapTo = concatMapTo;
    exports.concatWith = concatWith;
    exports.connect = connect;
    exports.count = count;
    exports.debounce = debounce;
    exports.debounceTime = debounceTime;
    exports.defaultIfEmpty = defaultIfEmpty;
    exports.delay = delay;
    exports.delayWhen = delayWhen;
    exports.dematerialize = dematerialize;
    exports.distinct = distinct;
    exports.distinctUntilChanged = distinctUntilChanged;
    exports.distinctUntilKeyChanged = distinctUntilKeyChanged;
    exports.elementAt = elementAt;
    exports.endWith = endWith;
    exports.every = every;
    exports.exhaust = exhaust;
    exports.exhaustAll = exhaustAll;
    exports.exhaustMap = exhaustMap;
    exports.expand = expand;
    exports.filter = filter;
    exports.finalize = finalize;
    exports.find = find;
    exports.findIndex = findIndex;
    exports.first = first;
    exports.flatMap = flatMap;
    exports.groupBy = groupBy;
    exports.ignoreElements = ignoreElements;
    exports.isEmpty = isEmpty;
    exports.last = last;
    exports.map = map;
    exports.mapTo = mapTo;
    exports.materialize = materialize;
    exports.max = max;
    exports.merge = merge;
    exports.mergeAll = mergeAll;
    exports.mergeMap = mergeMap;
    exports.mergeMapTo = mergeMapTo;
    exports.mergeScan = mergeScan;
    exports.mergeWith = mergeWith;
    exports.min = min;
    exports.multicast = multicast;
    exports.observeOn = observeOn;
    exports.onErrorResumeNext = onErrorResumeNext;
    exports.pairwise = pairwise;
    exports.partition = partition;
    exports.pluck = pluck;
    exports.publish = publish;
    exports.publishBehavior = publishBehavior;
    exports.publishLast = publishLast;
    exports.publishReplay = publishReplay;
    exports.race = race;
    exports.raceWith = raceWith;
    exports.reduce = reduce;
    exports.refCount = refCount;
    exports.repeat = repeat;
    exports.repeatWhen = repeatWhen;
    exports.retry = retry;
    exports.retryWhen = retryWhen;
    exports.sample = sample;
    exports.sampleTime = sampleTime;
    exports.scan = scan;
    exports.sequenceEqual = sequenceEqual;
    exports.share = share;
    exports.shareReplay = shareReplay;
    exports.single = single;
    exports.skip = skip;
    exports.skipLast = skipLast;
    exports.skipUntil = skipUntil;
    exports.skipWhile = skipWhile;
    exports.startWith = startWith;
    exports.subscribeOn = subscribeOn;
    exports.switchAll = switchAll;
    exports.switchMap = switchMap;
    exports.switchMapTo = switchMapTo;
    exports.switchScan = switchScan;
    exports.take = take;
    exports.takeLast = takeLast;
    exports.takeUntil = takeUntil;
    exports.takeWhile = takeWhile;
    exports.tap = tap;
    exports.throttle = throttle;
    exports.throttleTime = throttleTime;
    exports.throwIfEmpty = throwIfEmpty;
    exports.timeInterval = timeInterval;
    exports.timeout = timeout;
    exports.timeoutWith = timeoutWith;
    exports.timestamp = timestamp;
    exports.toArray = toArray;
    exports.window = window;
    exports.windowCount = windowCount;
    exports.windowTime = windowTime;
    exports.windowToggle = windowToggle;
    exports.windowWhen = windowWhen;
    exports.withLatestFrom = withLatestFrom;
    exports.zip = zip;
    exports.zipAll = zipAll;
    exports.zipWith = zipWith;

}));
