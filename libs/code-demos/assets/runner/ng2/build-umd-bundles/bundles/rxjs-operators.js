(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports, require('tslib'))
    : typeof define === 'function' && define.amd
    ? define(['exports', 'tslib'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.rxjsOperators = {}), global.tslib));
})(this, function (exports, tslib) {
  'use strict';

  function isFunction(value) {
    return typeof value === 'function';
  }

  function hasLift(source) {
    return isFunction(
      source === null || source === void 0 ? void 0 : source.lift
    );
  }
  function operate(init) {
    return (source) => {
      if (hasLift(source)) {
        return source.lift(function (liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError('Unable to lift unknown Observable type');
    };
  }

  const isArrayLike = (x) =>
    x && typeof x.length === 'number' && typeof x !== 'function';

  function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
  }

  function createErrorClass(createImpl) {
    const _super = (instance) => {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    const ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }

  const UnsubscriptionError = createErrorClass(
    (_super) =>
      function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors
          ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}`
          : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
      }
  );

  function arrRemove(arr, item) {
    if (arr) {
      const index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }

  class Subscription {
    constructor(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    unsubscribe() {
      let errors;
      if (!this.closed) {
        this.closed = true;
        const { _parentage } = this;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            for (const parent of _parentage) {
              parent.remove(this);
            }
          } else {
            _parentage.remove(this);
          }
        }
        const { initialTeardown: initialFinalizer } = this;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        const { _finalizers } = this;
        if (_finalizers) {
          this._finalizers = null;
          for (const finalizer of _finalizers) {
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = [...errors, ...err.errors];
              } else {
                errors.push(err);
              }
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    }
    add(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers =
            (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(
            teardown
          );
        }
      }
    }
    _hasParent(parent) {
      const { _parentage } = this;
      return (
        _parentage === parent ||
        (Array.isArray(_parentage) && _parentage.includes(parent))
      );
    }
    _addParent(parent) {
      const { _parentage } = this;
      this._parentage = Array.isArray(_parentage)
        ? (_parentage.push(parent), _parentage)
        : _parentage
        ? [_parentage, parent]
        : parent;
    }
    _removeParent(parent) {
      const { _parentage } = this;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    }
    remove(teardown) {
      const { _finalizers } = this;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription) {
        teardown._removeParent(this);
      }
    }
  }
  Subscription.EMPTY = (() => {
    const empty = new Subscription();
    empty.closed = true;
    return empty;
  })();
  const EMPTY_SUBSCRIPTION = Subscription.EMPTY;
  function isSubscription(value) {
    return (
      value instanceof Subscription ||
      (value &&
        'closed' in value &&
        isFunction(value.remove) &&
        isFunction(value.add) &&
        isFunction(value.unsubscribe))
    );
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }

  const config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: undefined,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false,
  };

  const timeoutProvider = {
    setTimeout(handler, timeout, ...args) {
      const { delegate } = timeoutProvider;
      if (
        delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout
      ) {
        return delegate.setTimeout(handler, timeout, ...args);
      }
      return setTimeout(handler, timeout, ...args);
    },
    clearTimeout(handle) {
      const { delegate } = timeoutProvider;
      return (
        (delegate === null || delegate === void 0
          ? void 0
          : delegate.clearTimeout) || clearTimeout
      )(handle);
    },
    delegate: undefined,
  };

  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(() => {
      const { onUnhandledError } = config;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }

  function noop() {}

  const COMPLETE_NOTIFICATION = (() =>
    createNotification('C', undefined, undefined))();
  function errorNotification(error) {
    return createNotification('E', undefined, error);
  }
  function nextNotification(value) {
    return createNotification('N', value, undefined);
  }
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error,
    };
  }

  function errorContext(cb) {
    {
      cb();
    }
  }

  class Subscriber extends Subscription {
    constructor(destination) {
      super();
      this.isStopped = false;
      if (destination) {
        this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(this);
        }
      } else {
        this.destination = EMPTY_OBSERVER;
      }
    }
    static create(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    }
    next(value) {
      if (this.isStopped) {
        handleStoppedNotification(nextNotification(value), this);
      } else {
        this._next(value);
      }
    }
    error(err) {
      if (this.isStopped) {
        handleStoppedNotification(errorNotification(err), this);
      } else {
        this.isStopped = true;
        this._error(err);
      }
    }
    complete() {
      if (this.isStopped) {
        handleStoppedNotification(COMPLETE_NOTIFICATION, this);
      } else {
        this.isStopped = true;
        this._complete();
      }
    }
    unsubscribe() {
      if (!this.closed) {
        this.isStopped = true;
        super.unsubscribe();
        this.destination = null;
      }
    }
    _next(value) {
      this.destination.next(value);
    }
    _error(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  }
  const _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  class ConsumerObserver {
    constructor(partialObserver) {
      this.partialObserver = partialObserver;
    }
    next(value) {
      const { partialObserver } = this;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    }
    error(err) {
      const { partialObserver } = this;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    }
    complete() {
      const { partialObserver } = this;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    }
  }
  class SafeSubscriber extends Subscriber {
    constructor(observerOrNext, error, complete) {
      super();
      let partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next:
            observerOrNext !== null && observerOrNext !== void 0
              ? observerOrNext
              : undefined,
          error: error !== null && error !== void 0 ? error : undefined,
          complete:
            complete !== null && complete !== void 0 ? complete : undefined,
        };
      } else {
        let context;
        if (this && config.useDeprecatedNextContext) {
          context = Object.create(observerOrNext);
          context.unsubscribe = () => this.unsubscribe();
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context),
            error: observerOrNext.error && bind(observerOrNext.error, context),
            complete:
              observerOrNext.complete && bind(observerOrNext.complete, context),
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      this.destination = new ConsumerObserver(partialObserver);
    }
  }
  function handleUnhandledError(error) {
    {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  function handleStoppedNotification(notification, subscriber) {
    const { onStoppedNotification } = config;
    onStoppedNotification &&
      timeoutProvider.setTimeout(() =>
        onStoppedNotification(notification, subscriber)
      );
  }
  const EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop,
  };

  const observable = (() =>
    (typeof Symbol === 'function' && Symbol.observable) || '@@observable')();

  function identity(x) {
    return x;
  }

  function pipe(...fns) {
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
      return fns.reduce((prev, fn) => fn(prev), input);
    };
  }

  class Observable {
    constructor(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    lift(operator) {
      const observable = new Observable();
      observable.source = this;
      observable.operator = operator;
      return observable;
    }
    subscribe(observerOrNext, error, complete) {
      const subscriber = isSubscriber(observerOrNext)
        ? observerOrNext
        : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(() => {
        const { operator, source } = this;
        subscriber.add(
          operator
            ? operator.call(subscriber, source)
            : source
            ? this._subscribe(subscriber)
            : this._trySubscribe(subscriber)
        );
      });
      return subscriber;
    }
    _trySubscribe(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    }
    forEach(next, promiseCtor) {
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor((resolve, reject) => {
        const subscriber = new SafeSubscriber({
          next: (value) => {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve,
        });
        this.subscribe(subscriber);
      });
    }
    _subscribe(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0
        ? void 0
        : _a.subscribe(subscriber);
    }
    [observable]() {
      return this;
    }
    pipe(...operations) {
      return pipeFromArray(operations)(this);
    }
    toPromise(promiseCtor) {
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor((resolve, reject) => {
        let value;
        this.subscribe(
          (x) => (value = x),
          (err) => reject(err),
          () => resolve(value)
        );
      });
    }
  }
  Observable.create = (subscribe) => {
    return new Observable(subscribe);
  };
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a =
      promiseCtor !== null && promiseCtor !== void 0
        ? promiseCtor
        : config.Promise) !== null && _a !== void 0
      ? _a
      : Promise;
  }
  function isObserver(value) {
    return (
      value &&
      isFunction(value.next) &&
      isFunction(value.error) &&
      isFunction(value.complete)
    );
  }
  function isSubscriber(value) {
    return (
      (value && value instanceof Subscriber) ||
      (isObserver(value) && isSubscription(value))
    );
  }

  function isInteropObservable(input) {
    return isFunction(input[observable]);
  }

  function isAsyncIterable(obj) {
    return (
      Symbol.asyncIterator &&
      isFunction(
        obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]
      )
    );
  }

  function createInvalidObservableTypeError(input) {
    return new TypeError(
      `You provided ${
        input !== null && typeof input === 'object'
          ? 'an invalid object'
          : `'${input}'`
      } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
    );
  }

  function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
      return '@@iterator';
    }
    return Symbol.iterator;
  }
  const iterator = getSymbolIterator();

  function isIterable(input) {
    return isFunction(
      input === null || input === void 0 ? void 0 : input[iterator]
    );
  }

  function readableStreamLikeToAsyncGenerator(readableStream) {
    return tslib.__asyncGenerator(
      this,
      arguments,
      function* readableStreamLikeToAsyncGenerator_1() {
        const reader = readableStream.getReader();
        try {
          while (true) {
            const { value, done } = yield tslib.__await(reader.read());
            if (done) {
              return yield tslib.__await(void 0);
            }
            yield yield tslib.__await(value);
          }
        } finally {
          reader.releaseLock();
        }
      }
    );
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
    return new Observable((subscriber) => {
      const obs = obj[observable]();
      if (isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError(
        'Provided object does not correctly implement Symbol.observable'
      );
    });
  }
  function fromArrayLike(array) {
    return new Observable((subscriber) => {
      for (let i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise) {
    return new Observable((subscriber) => {
      promise
        .then(
          (value) => {
            if (!subscriber.closed) {
              subscriber.next(value);
              subscriber.complete();
            }
          },
          (err) => subscriber.error(err)
        )
        .then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable((subscriber) => {
      for (const value of iterable) {
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable((subscriber) => {
      process(asyncIterable, subscriber).catch((err) => subscriber.error(err));
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(
      readableStreamLikeToAsyncGenerator(readableStream)
    );
  }
  function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_1, _a;
    return tslib.__awaiter(this, void 0, void 0, function* () {
      try {
        for (
          asyncIterable_1 = tslib.__asyncValues(asyncIterable);
          (asyncIterable_1_1 = yield asyncIterable_1.next()),
            !asyncIterable_1_1.done;

        ) {
          const value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (
            asyncIterable_1_1 &&
            !asyncIterable_1_1.done &&
            (_a = asyncIterable_1.return)
          )
            yield _a.call(asyncIterable_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }

  function createOperatorSubscriber(
    destination,
    onNext,
    onComplete,
    onError,
    onFinalize
  ) {
    return new OperatorSubscriber(
      destination,
      onNext,
      onComplete,
      onError,
      onFinalize
    );
  }
  class OperatorSubscriber extends Subscriber {
    constructor(
      destination,
      onNext,
      onComplete,
      onError,
      onFinalize,
      shouldUnsubscribe
    ) {
      super(destination);
      this.onFinalize = onFinalize;
      this.shouldUnsubscribe = shouldUnsubscribe;
      this._next = onNext
        ? function (value) {
            try {
              onNext(value);
            } catch (err) {
              destination.error(err);
            }
          }
        : super._next;
      this._error = onError
        ? function (err) {
            try {
              onError(err);
            } catch (err) {
              destination.error(err);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error;
      this._complete = onComplete
        ? function () {
            try {
              onComplete();
            } catch (err) {
              destination.error(err);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete;
    }
    unsubscribe() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        const { closed } = this;
        super.unsubscribe();
        !closed &&
          ((_a = this.onFinalize) === null || _a === void 0
            ? void 0
            : _a.call(this));
      }
    }
  }

  function audit(durationSelector) {
    return operate((source, subscriber) => {
      let hasValue = false;
      let lastValue = null;
      let durationSubscriber = null;
      let isComplete = false;
      const endDuration = () => {
        durationSubscriber === null || durationSubscriber === void 0
          ? void 0
          : durationSubscriber.unsubscribe();
        durationSubscriber = null;
        if (hasValue) {
          hasValue = false;
          const value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
        isComplete && subscriber.complete();
      };
      const cleanupDuration = () => {
        durationSubscriber = null;
        isComplete && subscriber.complete();
      };
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            hasValue = true;
            lastValue = value;
            if (!durationSubscriber) {
              innerFrom(durationSelector(value)).subscribe(
                (durationSubscriber = createOperatorSubscriber(
                  subscriber,
                  endDuration,
                  cleanupDuration
                ))
              );
            }
          },
          () => {
            isComplete = true;
            (!hasValue || !durationSubscriber || durationSubscriber.closed) &&
              subscriber.complete();
          }
        )
      );
    });
  }

  class Action extends Subscription {
    constructor(scheduler, work) {
      super();
    }
    schedule(state, delay = 0) {
      return this;
    }
  }

  const intervalProvider = {
    setInterval(handler, timeout, ...args) {
      const { delegate } = intervalProvider;
      if (
        delegate === null || delegate === void 0 ? void 0 : delegate.setInterval
      ) {
        return delegate.setInterval(handler, timeout, ...args);
      }
      return setInterval(handler, timeout, ...args);
    },
    clearInterval(handle) {
      const { delegate } = intervalProvider;
      return (
        (delegate === null || delegate === void 0
          ? void 0
          : delegate.clearInterval) || clearInterval
      )(handle);
    },
    delegate: undefined,
  };

  class AsyncAction extends Action {
    constructor(scheduler, work) {
      super(scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
      this.pending = false;
    }
    schedule(state, delay = 0) {
      var _a;
      if (this.closed) {
        return this;
      }
      this.state = state;
      const id = this.id;
      const scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }
      this.pending = true;
      this.delay = delay;
      this.id =
        (_a = this.id) !== null && _a !== void 0
          ? _a
          : this.requestAsyncId(scheduler, this.id, delay);
      return this;
    }
    requestAsyncId(scheduler, _id, delay = 0) {
      return intervalProvider.setInterval(
        scheduler.flush.bind(scheduler, this),
        delay
      );
    }
    recycleAsyncId(_scheduler, id, delay = 0) {
      if (delay != null && this.delay === delay && this.pending === false) {
        return id;
      }
      if (id != null) {
        intervalProvider.clearInterval(id);
      }
      return undefined;
    }
    execute(state, delay) {
      if (this.closed) {
        return new Error('executing a cancelled action');
      }
      this.pending = false;
      const error = this._execute(state, delay);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    }
    _execute(state, _delay) {
      let errored = false;
      let errorValue;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = e ? e : new Error('Scheduled action threw falsy error');
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    }
    unsubscribe() {
      if (!this.closed) {
        const { id, scheduler } = this;
        const { actions } = scheduler;
        this.work = this.state = this.scheduler = null;
        this.pending = false;
        arrRemove(actions, this);
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
        super.unsubscribe();
      }
    }
  }

  const dateTimestampProvider = {
    now() {
      return (dateTimestampProvider.delegate || Date).now();
    },
    delegate: undefined,
  };

  class Scheduler {
    constructor(schedulerActionCtor, now = Scheduler.now) {
      this.schedulerActionCtor = schedulerActionCtor;
      this.now = now;
    }
    schedule(work, delay = 0, state) {
      return new this.schedulerActionCtor(this, work).schedule(state, delay);
    }
  }
  Scheduler.now = dateTimestampProvider.now;

  class AsyncScheduler extends Scheduler {
    constructor(SchedulerAction, now = Scheduler.now) {
      super(SchedulerAction, now);
      this.actions = [];
      this._active = false;
    }
    flush(action) {
      const { actions } = this;
      if (this._active) {
        actions.push(action);
        return;
      }
      let error;
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
    }
  }

  const asyncScheduler = new AsyncScheduler(AsyncAction);
  const async = asyncScheduler;

  function isScheduler(value) {
    return value && isFunction(value.schedule);
  }

  function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
  }

  function timer(dueTime = 0, intervalOrScheduler, scheduler = async) {
    let intervalDuration = -1;
    if (intervalOrScheduler != null) {
      if (isScheduler(intervalOrScheduler)) {
        scheduler = intervalOrScheduler;
      } else {
        intervalDuration = intervalOrScheduler;
      }
    }
    return new Observable((subscriber) => {
      let due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
      if (due < 0) {
        due = 0;
      }
      let n = 0;
      return scheduler.schedule(function () {
        if (!subscriber.closed) {
          subscriber.next(n++);
          if (0 <= intervalDuration) {
            this.schedule(undefined, intervalDuration);
          } else {
            subscriber.complete();
          }
        }
      }, due);
    });
  }

  function auditTime(duration, scheduler = asyncScheduler) {
    return audit(() => timer(duration, scheduler));
  }

  function buffer(closingNotifier) {
    return operate((source, subscriber) => {
      let currentBuffer = [];
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => currentBuffer.push(value),
          () => {
            subscriber.next(currentBuffer);
            subscriber.complete();
          }
        )
      );
      closingNotifier.subscribe(
        createOperatorSubscriber(
          subscriber,
          () => {
            const b = currentBuffer;
            currentBuffer = [];
            subscriber.next(b);
          },
          noop
        )
      );
      return () => {
        currentBuffer = null;
      };
    });
  }

  function bufferCount(bufferSize, startBufferEvery = null) {
    startBufferEvery =
      startBufferEvery !== null && startBufferEvery !== void 0
        ? startBufferEvery
        : bufferSize;
    return operate((source, subscriber) => {
      let buffers = [];
      let count = 0;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            let toEmit = null;
            if (count++ % startBufferEvery === 0) {
              buffers.push([]);
            }
            for (const buffer of buffers) {
              buffer.push(value);
              if (bufferSize <= buffer.length) {
                toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                toEmit.push(buffer);
              }
            }
            if (toEmit) {
              for (const buffer of toEmit) {
                arrRemove(buffers, buffer);
                subscriber.next(buffer);
              }
            }
          },
          () => {
            for (const buffer of buffers) {
              subscriber.next(buffer);
            }
            subscriber.complete();
          },
          undefined,
          () => {
            buffers = null;
          }
        )
      );
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

  function executeSchedule(
    parentSubscription,
    scheduler,
    work,
    delay = 0,
    repeat = false
  ) {
    const scheduleSubscription = scheduler.schedule(function () {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay));
      } else {
        this.unsubscribe();
      }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
      return scheduleSubscription;
    }
  }

  function bufferTime(bufferTimeSpan, ...otherArgs) {
    var _a, _b;
    const scheduler =
      (_a = popScheduler(otherArgs)) !== null && _a !== void 0
        ? _a
        : asyncScheduler;
    const bufferCreationInterval =
      (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    const maxBufferSize = otherArgs[1] || Infinity;
    return operate((source, subscriber) => {
      let bufferRecords = [];
      let restartOnEmit = false;
      const emit = (record) => {
        const { buffer, subs } = record;
        subs.unsubscribe();
        arrRemove(bufferRecords, record);
        subscriber.next(buffer);
        restartOnEmit && startBuffer();
      };
      const startBuffer = () => {
        if (bufferRecords) {
          const subs = new Subscription();
          subscriber.add(subs);
          const buffer = [];
          const record = {
            buffer,
            subs,
          };
          bufferRecords.push(record);
          executeSchedule(subs, scheduler, () => emit(record), bufferTimeSpan);
        }
      };
      if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
        executeSchedule(
          subscriber,
          scheduler,
          startBuffer,
          bufferCreationInterval,
          true
        );
      } else {
        restartOnEmit = true;
      }
      startBuffer();
      const bufferTimeSubscriber = createOperatorSubscriber(
        subscriber,
        (value) => {
          const recordsCopy = bufferRecords.slice();
          for (const record of recordsCopy) {
            const { buffer } = record;
            buffer.push(value);
            maxBufferSize <= buffer.length && emit(record);
          }
        },
        () => {
          while (
            bufferRecords === null || bufferRecords === void 0
              ? void 0
              : bufferRecords.length
          ) {
            subscriber.next(bufferRecords.shift().buffer);
          }
          bufferTimeSubscriber === null || bufferTimeSubscriber === void 0
            ? void 0
            : bufferTimeSubscriber.unsubscribe();
          subscriber.complete();
          subscriber.unsubscribe();
        },
        undefined,
        () => (bufferRecords = null)
      );
      source.subscribe(bufferTimeSubscriber);
    });
  }

  function bufferToggle(openings, closingSelector) {
    return operate((source, subscriber) => {
      const buffers = [];
      innerFrom(openings).subscribe(
        createOperatorSubscriber(
          subscriber,
          (openValue) => {
            const buffer = [];
            buffers.push(buffer);
            const closingSubscription = new Subscription();
            const emitBuffer = () => {
              arrRemove(buffers, buffer);
              subscriber.next(buffer);
              closingSubscription.unsubscribe();
            };
            closingSubscription.add(
              innerFrom(closingSelector(openValue)).subscribe(
                createOperatorSubscriber(subscriber, emitBuffer, noop)
              )
            );
          },
          noop
        )
      );
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            for (const buffer of buffers) {
              buffer.push(value);
            }
          },
          () => {
            while (buffers.length > 0) {
              subscriber.next(buffers.shift());
            }
            subscriber.complete();
          }
        )
      );
    });
  }

  function bufferWhen(closingSelector) {
    return operate((source, subscriber) => {
      let buffer = null;
      let closingSubscriber = null;
      const openBuffer = () => {
        closingSubscriber === null || closingSubscriber === void 0
          ? void 0
          : closingSubscriber.unsubscribe();
        const b = buffer;
        buffer = [];
        b && subscriber.next(b);
        innerFrom(closingSelector()).subscribe(
          (closingSubscriber = createOperatorSubscriber(
            subscriber,
            openBuffer,
            noop
          ))
        );
      };
      openBuffer();
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) =>
            buffer === null || buffer === void 0 ? void 0 : buffer.push(value),
          () => {
            buffer && subscriber.next(buffer);
            subscriber.complete();
          },
          undefined,
          () => (buffer = closingSubscriber = null)
        )
      );
    });
  }

  function catchError(selector) {
    return operate((source, subscriber) => {
      let innerSub = null;
      let syncUnsub = false;
      let handledResult;
      innerSub = source.subscribe(
        createOperatorSubscriber(subscriber, undefined, undefined, (err) => {
          handledResult = innerFrom(
            selector(err, catchError(selector)(source))
          );
          if (innerSub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
          } else {
            syncUnsub = true;
          }
        })
      );
      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      }
    });
  }

  const { isArray: isArray$2 } = Array;
  const { getPrototypeOf, prototype: objectProto, keys: getKeys } = Object;
  function argsArgArrayOrObject(args) {
    if (args.length === 1) {
      const first = args[0];
      if (isArray$2(first)) {
        return { args: first, keys: null };
      }
      if (isPOJO(first)) {
        const keys = getKeys(first);
        return {
          args: keys.map((key) => first[key]),
          keys,
        };
      }
    }
    return { args: args, keys: null };
  }
  function isPOJO(obj) {
    return (
      obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto
    );
  }

  function observeOn(scheduler, delay = 0) {
    return operate((source, subscriber) => {
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) =>
            executeSchedule(
              subscriber,
              scheduler,
              () => subscriber.next(value),
              delay
            ),
          () =>
            executeSchedule(
              subscriber,
              scheduler,
              () => subscriber.complete(),
              delay
            ),
          (err) =>
            executeSchedule(
              subscriber,
              scheduler,
              () => subscriber.error(err),
              delay
            )
        )
      );
    });
  }

  function subscribeOn(scheduler, delay = 0) {
    return operate((source, subscriber) => {
      subscriber.add(
        scheduler.schedule(() => source.subscribe(subscriber), delay)
      );
    });
  }

  function scheduleObservable(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  function schedulePromise(input, scheduler) {
    return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
  }

  function scheduleArray(input, scheduler) {
    return new Observable((subscriber) => {
      let i = 0;
      return scheduler.schedule(function () {
        if (i === input.length) {
          subscriber.complete();
        } else {
          subscriber.next(input[i++]);
          if (!subscriber.closed) {
            this.schedule();
          }
        }
      });
    });
  }

  function scheduleIterable(input, scheduler) {
    return new Observable((subscriber) => {
      let iterator$1;
      executeSchedule(subscriber, scheduler, () => {
        iterator$1 = input[iterator]();
        executeSchedule(
          subscriber,
          scheduler,
          () => {
            let value;
            let done;
            try {
              ({ value, done } = iterator$1.next());
            } catch (err) {
              subscriber.error(err);
              return;
            }
            if (done) {
              subscriber.complete();
            } else {
              subscriber.next(value);
            }
          },
          0,
          true
        );
      });
      return () =>
        isFunction(
          iterator$1 === null || iterator$1 === void 0
            ? void 0
            : iterator$1.return
        ) && iterator$1.return();
    });
  }

  function scheduleAsyncIterable(input, scheduler) {
    if (!input) {
      throw new Error('Iterable cannot be null');
    }
    return new Observable((subscriber) => {
      executeSchedule(subscriber, scheduler, () => {
        const iterator = input[Symbol.asyncIterator]();
        executeSchedule(
          subscriber,
          scheduler,
          () => {
            iterator.next().then((result) => {
              if (result.done) {
                subscriber.complete();
              } else {
                subscriber.next(result.value);
              }
            });
          },
          0,
          true
        );
      });
    });
  }

  function scheduleReadableStreamLike(input, scheduler) {
    return scheduleAsyncIterable(
      readableStreamLikeToAsyncGenerator(input),
      scheduler
    );
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
    return operate((source, subscriber) => {
      let index = 0;
      source.subscribe(
        createOperatorSubscriber(subscriber, (value) => {
          subscriber.next(project.call(thisArg, value, index++));
        })
      );
    });
  }

  const { isArray: isArray$1 } = Array;
  function callOrApply(fn, args) {
    return isArray$1(args) ? fn(...args) : fn(args);
  }
  function mapOneOrManyArgs(fn) {
    return map((args) => callOrApply(fn, args));
  }

  function createObject(keys, values) {
    return keys.reduce(
      (result, key, i) => ((result[key] = values[i]), result),
      {}
    );
  }

  function combineLatest$1(...args) {
    const scheduler = popScheduler(args);
    const resultSelector = popResultSelector(args);
    const { args: observables, keys } = argsArgArrayOrObject(args);
    if (observables.length === 0) {
      return from([], scheduler);
    }
    const result = new Observable(
      combineLatestInit(
        observables,
        scheduler,
        keys ? (values) => createObject(keys, values) : identity
      )
    );
    return resultSelector
      ? result.pipe(mapOneOrManyArgs(resultSelector))
      : result;
  }
  function combineLatestInit(
    observables,
    scheduler,
    valueTransform = identity
  ) {
    return (subscriber) => {
      maybeSchedule(
        scheduler,
        () => {
          const { length } = observables;
          const values = new Array(length);
          let active = length;
          let remainingFirstValues = length;
          for (let i = 0; i < length; i++) {
            maybeSchedule(
              scheduler,
              () => {
                const source = from(observables[i], scheduler);
                let hasFirstValue = false;
                source.subscribe(
                  createOperatorSubscriber(
                    subscriber,
                    (value) => {
                      values[i] = value;
                      if (!hasFirstValue) {
                        hasFirstValue = true;
                        remainingFirstValues--;
                      }
                      if (!remainingFirstValues) {
                        subscriber.next(valueTransform(values.slice()));
                      }
                    },
                    () => {
                      if (!--active) {
                        subscriber.complete();
                      }
                    }
                  )
                );
              },
              subscriber
            );
          }
        },
        subscriber
      );
    };
  }
  function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
      executeSchedule(subscription, scheduler, execute);
    } else {
      execute();
    }
  }

  function mergeInternals(
    source,
    subscriber,
    project,
    concurrent,
    onBeforeNext,
    expand,
    innerSubScheduler,
    additionalFinalizer
  ) {
    const buffer = [];
    let active = 0;
    let index = 0;
    let isComplete = false;
    const checkComplete = () => {
      if (isComplete && !buffer.length && !active) {
        subscriber.complete();
      }
    };
    const outerNext = (value) =>
      active < concurrent ? doInnerSub(value) : buffer.push(value);
    const doInnerSub = (value) => {
      expand && subscriber.next(value);
      active++;
      let innerComplete = false;
      innerFrom(project(value, index++)).subscribe(
        createOperatorSubscriber(
          subscriber,
          (innerValue) => {
            onBeforeNext === null || onBeforeNext === void 0
              ? void 0
              : onBeforeNext(innerValue);
            if (expand) {
              outerNext(innerValue);
            } else {
              subscriber.next(innerValue);
            }
          },
          () => {
            innerComplete = true;
          },
          undefined,
          () => {
            if (innerComplete) {
              try {
                active--;
                while (buffer.length && active < concurrent) {
                  const bufferedValue = buffer.shift();
                  if (innerSubScheduler) {
                    executeSchedule(subscriber, innerSubScheduler, () =>
                      doInnerSub(bufferedValue)
                    );
                  } else {
                    doInnerSub(bufferedValue);
                  }
                }
                checkComplete();
              } catch (err) {
                subscriber.error(err);
              }
            }
          }
        )
      );
    };
    source.subscribe(
      createOperatorSubscriber(subscriber, outerNext, () => {
        isComplete = true;
        checkComplete();
      })
    );
    return () => {
      additionalFinalizer === null || additionalFinalizer === void 0
        ? void 0
        : additionalFinalizer();
    };
  }

  function mergeMap(project, resultSelector, concurrent = Infinity) {
    if (isFunction(resultSelector)) {
      return mergeMap(
        (a, i) =>
          map((b, ii) => resultSelector(a, b, i, ii))(innerFrom(project(a, i))),
        concurrent
      );
    } else if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
    }
    return operate((source, subscriber) =>
      mergeInternals(source, subscriber, project, concurrent)
    );
  }

  function scanInternals(
    accumulator,
    seed,
    hasSeed,
    emitOnNext,
    emitBeforeComplete
  ) {
    return (source, subscriber) => {
      let hasState = hasSeed;
      let state = seed;
      let index = 0;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            const i = index++;
            state = hasState
              ? accumulator(state, value, i)
              : ((hasState = true), value);
            emitOnNext && subscriber.next(state);
          },
          emitBeforeComplete &&
            (() => {
              hasState && subscriber.next(state);
              subscriber.complete();
            })
        )
      );
    };
  }

  function reduce(accumulator, seed) {
    return operate(
      scanInternals(accumulator, seed, arguments.length >= 2, false, true)
    );
  }

  const arrReducer = (arr, value) => (arr.push(value), arr);
  function toArray() {
    return operate((source, subscriber) => {
      reduce(arrReducer, [])(source).subscribe(subscriber);
    });
  }

  function joinAllInternals(joinFn, project) {
    return pipe(
      toArray(),
      mergeMap((sources) => joinFn(sources)),
      project ? mapOneOrManyArgs(project) : identity
    );
  }

  function combineLatestAll(project) {
    return joinAllInternals(combineLatest$1, project);
  }

  const combineAll = combineLatestAll;

  const { isArray } = Array;
  function argsOrArgArray(args) {
    return args.length === 1 && isArray(args[0]) ? args[0] : args;
  }

  function combineLatest(...args) {
    const resultSelector = popResultSelector(args);
    return resultSelector
      ? pipe(combineLatest(...args), mapOneOrManyArgs(resultSelector))
      : operate((source, subscriber) => {
          combineLatestInit([source, ...argsOrArgArray(args)])(subscriber);
        });
  }

  function combineLatestWith(...otherSources) {
    return combineLatest(...otherSources);
  }

  function mergeAll(concurrent = Infinity) {
    return mergeMap(identity, concurrent);
  }

  function concatAll() {
    return mergeAll(1);
  }

  function concat$1(...args) {
    const scheduler = popScheduler(args);
    return operate((source, subscriber) => {
      concatAll()(from([source, ...args], scheduler)).subscribe(subscriber);
    });
  }

  function concatMap(project, resultSelector) {
    return isFunction(resultSelector)
      ? mergeMap(project, resultSelector, 1)
      : mergeMap(project, 1);
  }

  function concatMapTo(innerObservable, resultSelector) {
    return isFunction(resultSelector)
      ? concatMap(() => innerObservable, resultSelector)
      : concatMap(() => innerObservable);
  }

  function concatWith(...otherSources) {
    return concat$1(...otherSources);
  }

  const ObjectUnsubscribedError = createErrorClass(
    (_super) =>
      function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = 'ObjectUnsubscribedError';
        this.message = 'object unsubscribed';
      }
  );

  class Subject extends Observable {
    constructor() {
      super();
      this.closed = false;
      this.currentObservers = null;
      this.observers = [];
      this.isStopped = false;
      this.hasError = false;
      this.thrownError = null;
    }
    lift(operator) {
      const subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    }
    _throwIfClosed() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
    }
    next(value) {
      errorContext(() => {
        this._throwIfClosed();
        if (!this.isStopped) {
          if (!this.currentObservers) {
            this.currentObservers = Array.from(this.observers);
          }
          for (const observer of this.currentObservers) {
            observer.next(value);
          }
        }
      });
    }
    error(err) {
      errorContext(() => {
        this._throwIfClosed();
        if (!this.isStopped) {
          this.hasError = this.isStopped = true;
          this.thrownError = err;
          const { observers } = this;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    }
    complete() {
      errorContext(() => {
        this._throwIfClosed();
        if (!this.isStopped) {
          this.isStopped = true;
          const { observers } = this;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    }
    unsubscribe() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    }
    get observed() {
      var _a;
      return (
        ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) >
        0
      );
    }
    _trySubscribe(subscriber) {
      this._throwIfClosed();
      return super._trySubscribe(subscriber);
    }
    _subscribe(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    }
    _innerSubscribe(subscriber) {
      const { hasError, isStopped, observers } = this;
      if (hasError || isStopped) {
        return EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription(() => {
        this.currentObservers = null;
        arrRemove(observers, subscriber);
      });
    }
    _checkFinalizedStatuses(subscriber) {
      const { hasError, thrownError, isStopped } = this;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    }
    asObservable() {
      const observable = new Observable();
      observable.source = this;
      return observable;
    }
  }
  Subject.create = (destination, source) => {
    return new AnonymousSubject(destination, source);
  };
  class AnonymousSubject extends Subject {
    constructor(destination, source) {
      super();
      this.destination = destination;
      this.source = source;
    }
    next(value) {
      var _a, _b;
      (_b =
        (_a = this.destination) === null || _a === void 0
          ? void 0
          : _a.next) === null || _b === void 0
        ? void 0
        : _b.call(_a, value);
    }
    error(err) {
      var _a, _b;
      (_b =
        (_a = this.destination) === null || _a === void 0
          ? void 0
          : _a.error) === null || _b === void 0
        ? void 0
        : _b.call(_a, err);
    }
    complete() {
      var _a, _b;
      (_b =
        (_a = this.destination) === null || _a === void 0
          ? void 0
          : _a.complete) === null || _b === void 0
        ? void 0
        : _b.call(_a);
    }
    _subscribe(subscriber) {
      var _a, _b;
      return (_b =
        (_a = this.source) === null || _a === void 0
          ? void 0
          : _a.subscribe(subscriber)) !== null && _b !== void 0
        ? _b
        : EMPTY_SUBSCRIPTION;
    }
  }

  function fromSubscribable(subscribable) {
    return new Observable((subscriber) => subscribable.subscribe(subscriber));
  }

  const DEFAULT_CONFIG = {
    connector: () => new Subject(),
  };
  function connect(selector, config = DEFAULT_CONFIG) {
    const { connector } = config;
    return operate((source, subscriber) => {
      const subject = connector();
      innerFrom(selector(fromSubscribable(subject))).subscribe(subscriber);
      subscriber.add(source.subscribe(subject));
    });
  }

  function count(predicate) {
    return reduce(
      (total, value, i) =>
        !predicate || predicate(value, i) ? total + 1 : total,
      0
    );
  }

  function debounce(durationSelector) {
    return operate((source, subscriber) => {
      let hasValue = false;
      let lastValue = null;
      let durationSubscriber = null;
      const emit = () => {
        durationSubscriber === null || durationSubscriber === void 0
          ? void 0
          : durationSubscriber.unsubscribe();
        durationSubscriber = null;
        if (hasValue) {
          hasValue = false;
          const value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      };
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            durationSubscriber === null || durationSubscriber === void 0
              ? void 0
              : durationSubscriber.unsubscribe();
            hasValue = true;
            lastValue = value;
            durationSubscriber = createOperatorSubscriber(
              subscriber,
              emit,
              noop
            );
            innerFrom(durationSelector(value)).subscribe(durationSubscriber);
          },
          () => {
            emit();
            subscriber.complete();
          },
          undefined,
          () => {
            lastValue = durationSubscriber = null;
          }
        )
      );
    });
  }

  function debounceTime(dueTime, scheduler = asyncScheduler) {
    return operate((source, subscriber) => {
      let activeTask = null;
      let lastValue = null;
      let lastTime = null;
      const emit = () => {
        if (activeTask) {
          activeTask.unsubscribe();
          activeTask = null;
          const value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      };
      function emitWhenIdle() {
        const targetTime = lastTime + dueTime;
        const now = scheduler.now();
        if (now < targetTime) {
          activeTask = this.schedule(undefined, targetTime - now);
          subscriber.add(activeTask);
          return;
        }
        emit();
      }
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            lastValue = value;
            lastTime = scheduler.now();
            if (!activeTask) {
              activeTask = scheduler.schedule(emitWhenIdle, dueTime);
              subscriber.add(activeTask);
            }
          },
          () => {
            emit();
            subscriber.complete();
          },
          undefined,
          () => {
            lastValue = activeTask = null;
          }
        )
      );
    });
  }

  function defaultIfEmpty(defaultValue) {
    return operate((source, subscriber) => {
      let hasValue = false;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            hasValue = true;
            subscriber.next(value);
          },
          () => {
            if (!hasValue) {
              subscriber.next(defaultValue);
            }
            subscriber.complete();
          }
        )
      );
    });
  }

  function concat(...args) {
    return concatAll()(from(args, popScheduler(args)));
  }

  const EMPTY = new Observable((subscriber) => subscriber.complete());

  function take(count) {
    return count <= 0
      ? () => EMPTY
      : operate((source, subscriber) => {
          let seen = 0;
          source.subscribe(
            createOperatorSubscriber(subscriber, (value) => {
              if (++seen <= count) {
                subscriber.next(value);
                if (count <= seen) {
                  subscriber.complete();
                }
              }
            })
          );
        });
  }

  function ignoreElements() {
    return operate((source, subscriber) => {
      source.subscribe(createOperatorSubscriber(subscriber, noop));
    });
  }

  function mapTo(value) {
    return map(() => value);
  }

  function delayWhen(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
      return (source) =>
        concat(
          subscriptionDelay.pipe(take(1), ignoreElements()),
          source.pipe(delayWhen(delayDurationSelector))
        );
    }
    return mergeMap((value, index) =>
      delayDurationSelector(value, index).pipe(take(1), mapTo(value))
    );
  }

  function delay(due, scheduler = asyncScheduler) {
    const duration = timer(due, scheduler);
    return delayWhen(() => duration);
  }

  function of(...args) {
    const scheduler = popScheduler(args);
    return from(args, scheduler);
  }

  function throwError(errorOrErrorFactory, scheduler) {
    const errorFactory = isFunction(errorOrErrorFactory)
      ? errorOrErrorFactory
      : () => errorOrErrorFactory;
    const init = (subscriber) => subscriber.error(errorFactory());
    return new Observable(
      scheduler ? (subscriber) => scheduler.schedule(init, 0, subscriber) : init
    );
  }

  var NotificationKind;
  (function (NotificationKind) {
    NotificationKind['NEXT'] = 'N';
    NotificationKind['ERROR'] = 'E';
    NotificationKind['COMPLETE'] = 'C';
  })(NotificationKind || (NotificationKind = {}));
  class Notification {
    constructor(kind, value, error) {
      this.kind = kind;
      this.value = value;
      this.error = error;
      this.hasValue = kind === 'N';
    }
    observe(observer) {
      return observeNotification(this, observer);
    }
    do(nextHandler, errorHandler, completeHandler) {
      const { kind, value, error } = this;
      return kind === 'N'
        ? nextHandler === null || nextHandler === void 0
          ? void 0
          : nextHandler(value)
        : kind === 'E'
        ? errorHandler === null || errorHandler === void 0
          ? void 0
          : errorHandler(error)
        : completeHandler === null || completeHandler === void 0
        ? void 0
        : completeHandler();
    }
    accept(nextOrObserver, error, complete) {
      var _a;
      return isFunction(
        (_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next
      )
        ? this.observe(nextOrObserver)
        : this.do(nextOrObserver, error, complete);
    }
    toObservable() {
      const { kind, value, error } = this;
      const result =
        kind === 'N'
          ? of(value)
          : kind === 'E'
          ? throwError(() => error)
          : kind === 'C'
          ? EMPTY
          : 0;
      if (!result) {
        throw new TypeError(`Unexpected notification kind ${kind}`);
      }
      return result;
    }
    static createNext(value) {
      return new Notification('N', value);
    }
    static createError(err) {
      return new Notification('E', undefined, err);
    }
    static createComplete() {
      return Notification.completeNotification;
    }
  }
  Notification.completeNotification = new Notification('C');
  function observeNotification(notification, observer) {
    var _a, _b, _c;
    const { kind, value, error } = notification;
    if (typeof kind !== 'string') {
      throw new TypeError('Invalid notification, missing "kind"');
    }
    kind === 'N'
      ? (_a = observer.next) === null || _a === void 0
        ? void 0
        : _a.call(observer, value)
      : kind === 'E'
      ? (_b = observer.error) === null || _b === void 0
        ? void 0
        : _b.call(observer, error)
      : (_c = observer.complete) === null || _c === void 0
      ? void 0
      : _c.call(observer);
  }

  function dematerialize() {
    return operate((source, subscriber) => {
      source.subscribe(
        createOperatorSubscriber(subscriber, (notification) =>
          observeNotification(notification, subscriber)
        )
      );
    });
  }

  function distinct(keySelector, flushes) {
    return operate((source, subscriber) => {
      const distinctKeys = new Set();
      source.subscribe(
        createOperatorSubscriber(subscriber, (value) => {
          const key = keySelector ? keySelector(value) : value;
          if (!distinctKeys.has(key)) {
            distinctKeys.add(key);
            subscriber.next(value);
          }
        })
      );
      flushes === null || flushes === void 0
        ? void 0
        : flushes.subscribe(
            createOperatorSubscriber(
              subscriber,
              () => distinctKeys.clear(),
              noop
            )
          );
    });
  }

  function distinctUntilChanged(comparator, keySelector = identity) {
    comparator =
      comparator !== null && comparator !== void 0
        ? comparator
        : defaultCompare;
    return operate((source, subscriber) => {
      let previousKey;
      let first = true;
      source.subscribe(
        createOperatorSubscriber(subscriber, (value) => {
          const currentKey = keySelector(value);
          if (first || !comparator(previousKey, currentKey)) {
            first = false;
            previousKey = currentKey;
            subscriber.next(value);
          }
        })
      );
    });
  }
  function defaultCompare(a, b) {
    return a === b;
  }

  function distinctUntilKeyChanged(key, compare) {
    return distinctUntilChanged((x, y) =>
      compare ? compare(x[key], y[key]) : x[key] === y[key]
    );
  }

  const ArgumentOutOfRangeError = createErrorClass(
    (_super) =>
      function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = 'ArgumentOutOfRangeError';
        this.message = 'argument out of range';
      }
  );

  function filter(predicate, thisArg) {
    return operate((source, subscriber) => {
      let index = 0;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) =>
            predicate.call(thisArg, value, index++) && subscriber.next(value)
        )
      );
    });
  }

  const EmptyError = createErrorClass(
    (_super) =>
      function EmptyErrorImpl() {
        _super(this);
        this.name = 'EmptyError';
        this.message = 'no elements in sequence';
      }
  );

  function throwIfEmpty(errorFactory = defaultErrorFactory) {
    return operate((source, subscriber) => {
      let hasValue = false;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            hasValue = true;
            subscriber.next(value);
          },
          () =>
            hasValue ? subscriber.complete() : subscriber.error(errorFactory())
        )
      );
    });
  }
  function defaultErrorFactory() {
    return new EmptyError();
  }

  function elementAt(index, defaultValue) {
    if (index < 0) {
      throw new ArgumentOutOfRangeError();
    }
    const hasDefaultValue = arguments.length >= 2;
    return (source) =>
      source.pipe(
        filter((v, i) => i === index),
        take(1),
        hasDefaultValue
          ? defaultIfEmpty(defaultValue)
          : throwIfEmpty(() => new ArgumentOutOfRangeError())
      );
  }

  function endWith(...values) {
    return (source) => concat(source, of(...values));
  }

  function every(predicate, thisArg) {
    return operate((source, subscriber) => {
      let index = 0;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            if (!predicate.call(thisArg, value, index++, source)) {
              subscriber.next(false);
              subscriber.complete();
            }
          },
          () => {
            subscriber.next(true);
            subscriber.complete();
          }
        )
      );
    });
  }

  function exhaustMap(project, resultSelector) {
    if (resultSelector) {
      return (source) =>
        source.pipe(
          exhaustMap((a, i) =>
            innerFrom(project(a, i)).pipe(
              map((b, ii) => resultSelector(a, b, i, ii))
            )
          )
        );
    }
    return operate((source, subscriber) => {
      let index = 0;
      let innerSub = null;
      let isComplete = false;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (outerValue) => {
            if (!innerSub) {
              innerSub = createOperatorSubscriber(subscriber, undefined, () => {
                innerSub = null;
                isComplete && subscriber.complete();
              });
              innerFrom(project(outerValue, index++)).subscribe(innerSub);
            }
          },
          () => {
            isComplete = true;
            !innerSub && subscriber.complete();
          }
        )
      );
    });
  }

  function exhaustAll() {
    return exhaustMap(identity);
  }

  const exhaust = exhaustAll;

  function expand(project, concurrent = Infinity, scheduler) {
    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
    return operate((source, subscriber) =>
      mergeInternals(
        source,
        subscriber,
        project,
        concurrent,
        undefined,
        true,
        scheduler
      )
    );
  }

  function finalize(callback) {
    return operate((source, subscriber) => {
      try {
        source.subscribe(subscriber);
      } finally {
        subscriber.add(callback);
      }
    });
  }

  function find(predicate, thisArg) {
    return operate(createFind(predicate, thisArg, 'value'));
  }
  function createFind(predicate, thisArg, emit) {
    const findIndex = emit === 'index';
    return (source, subscriber) => {
      let index = 0;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            const i = index++;
            if (predicate.call(thisArg, value, i, source)) {
              subscriber.next(findIndex ? i : value);
              subscriber.complete();
            }
          },
          () => {
            subscriber.next(findIndex ? -1 : undefined);
            subscriber.complete();
          }
        )
      );
    };
  }

  function findIndex(predicate, thisArg) {
    return operate(createFind(predicate, thisArg, 'index'));
  }

  function first(predicate, defaultValue) {
    const hasDefaultValue = arguments.length >= 2;
    return (source) =>
      source.pipe(
        predicate ? filter((v, i) => predicate(v, i, source)) : identity,
        take(1),
        hasDefaultValue
          ? defaultIfEmpty(defaultValue)
          : throwIfEmpty(() => new EmptyError())
      );
  }

  function groupBy(keySelector, elementOrOptions, duration, connector) {
    return operate((source, subscriber) => {
      let element;
      if (!elementOrOptions || typeof elementOrOptions === 'function') {
        element = elementOrOptions;
      } else {
        ({ duration, element, connector } = elementOrOptions);
      }
      const groups = new Map();
      const notify = (cb) => {
        groups.forEach(cb);
        cb(subscriber);
      };
      const handleError = (err) => notify((consumer) => consumer.error(err));
      let activeGroups = 0;
      let teardownAttempted = false;
      const groupBySourceSubscriber = new OperatorSubscriber(
        subscriber,
        (value) => {
          try {
            const key = keySelector(value);
            let group = groups.get(key);
            if (!group) {
              groups.set(
                key,
                (group = connector ? connector() : new Subject())
              );
              const grouped = createGroupedObservable(key, group);
              subscriber.next(grouped);
              if (duration) {
                const durationSubscriber = createOperatorSubscriber(
                  group,
                  () => {
                    group.complete();
                    durationSubscriber === null || durationSubscriber === void 0
                      ? void 0
                      : durationSubscriber.unsubscribe();
                  },
                  undefined,
                  undefined,
                  () => groups.delete(key)
                );
                groupBySourceSubscriber.add(
                  innerFrom(duration(grouped)).subscribe(durationSubscriber)
                );
              }
            }
            group.next(element ? element(value) : value);
          } catch (err) {
            handleError(err);
          }
        },
        () => notify((consumer) => consumer.complete()),
        handleError,
        () => groups.clear(),
        () => {
          teardownAttempted = true;
          return activeGroups === 0;
        }
      );
      source.subscribe(groupBySourceSubscriber);
      function createGroupedObservable(key, groupSubject) {
        const result = new Observable((groupSubscriber) => {
          activeGroups++;
          const innerSub = groupSubject.subscribe(groupSubscriber);
          return () => {
            innerSub.unsubscribe();
            --activeGroups === 0 &&
              teardownAttempted &&
              groupBySourceSubscriber.unsubscribe();
          };
        });
        result.key = key;
        return result;
      }
    });
  }

  function isEmpty() {
    return operate((source, subscriber) => {
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          () => {
            subscriber.next(false);
            subscriber.complete();
          },
          () => {
            subscriber.next(true);
            subscriber.complete();
          }
        )
      );
    });
  }

  function takeLast(count) {
    return count <= 0
      ? () => EMPTY
      : operate((source, subscriber) => {
          let buffer = [];
          source.subscribe(
            createOperatorSubscriber(
              subscriber,
              (value) => {
                buffer.push(value);
                count < buffer.length && buffer.shift();
              },
              () => {
                for (const value of buffer) {
                  subscriber.next(value);
                }
                subscriber.complete();
              },
              undefined,
              () => {
                buffer = null;
              }
            )
          );
        });
  }

  function last(predicate, defaultValue) {
    const hasDefaultValue = arguments.length >= 2;
    return (source) =>
      source.pipe(
        predicate ? filter((v, i) => predicate(v, i, source)) : identity,
        takeLast(1),
        hasDefaultValue
          ? defaultIfEmpty(defaultValue)
          : throwIfEmpty(() => new EmptyError())
      );
  }

  function materialize() {
    return operate((source, subscriber) => {
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            subscriber.next(Notification.createNext(value));
          },
          () => {
            subscriber.next(Notification.createComplete());
            subscriber.complete();
          },
          (err) => {
            subscriber.next(Notification.createError(err));
            subscriber.complete();
          }
        )
      );
    });
  }

  function max(comparer) {
    return reduce(
      isFunction(comparer)
        ? (x, y) => (comparer(x, y) > 0 ? x : y)
        : (x, y) => (x > y ? x : y)
    );
  }

  function merge(...args) {
    const scheduler = popScheduler(args);
    const concurrent = popNumber(args, Infinity);
    args = argsOrArgArray(args);
    return operate((source, subscriber) => {
      mergeAll(concurrent)(from([source, ...args], scheduler)).subscribe(
        subscriber
      );
    });
  }

  const flatMap = mergeMap;

  function mergeMapTo(innerObservable, resultSelector, concurrent = Infinity) {
    if (isFunction(resultSelector)) {
      return mergeMap(() => innerObservable, resultSelector, concurrent);
    }
    if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
    }
    return mergeMap(() => innerObservable, concurrent);
  }

  function mergeScan(accumulator, seed, concurrent = Infinity) {
    return operate((source, subscriber) => {
      let state = seed;
      return mergeInternals(
        source,
        subscriber,
        (value, index) => accumulator(state, value, index),
        concurrent,
        (value) => {
          state = value;
        },
        false,
        undefined,
        () => (state = null)
      );
    });
  }

  function mergeWith(...otherSources) {
    return merge(...otherSources);
  }

  function min(comparer) {
    return reduce(
      isFunction(comparer)
        ? (x, y) => (comparer(x, y) < 0 ? x : y)
        : (x, y) => (x < y ? x : y)
    );
  }

  function refCount() {
    return operate((source, subscriber) => {
      let connection = null;
      source._refCount++;
      const refCounter = createOperatorSubscriber(
        subscriber,
        undefined,
        undefined,
        undefined,
        () => {
          if (!source || source._refCount <= 0 || 0 < --source._refCount) {
            connection = null;
            return;
          }
          const sharedConnection = source._connection;
          const conn = connection;
          connection = null;
          if (sharedConnection && (!conn || sharedConnection === conn)) {
            sharedConnection.unsubscribe();
          }
          subscriber.unsubscribe();
        }
      );
      source.subscribe(refCounter);
      if (!refCounter.closed) {
        connection = source.connect();
      }
    });
  }

  class ConnectableObservable extends Observable {
    constructor(source, subjectFactory) {
      super();
      this.source = source;
      this.subjectFactory = subjectFactory;
      this._subject = null;
      this._refCount = 0;
      this._connection = null;
      if (hasLift(source)) {
        this.lift = source.lift;
      }
    }
    _subscribe(subscriber) {
      return this.getSubject().subscribe(subscriber);
    }
    getSubject() {
      const subject = this._subject;
      if (!subject || subject.isStopped) {
        this._subject = this.subjectFactory();
      }
      return this._subject;
    }
    _teardown() {
      this._refCount = 0;
      const { _connection } = this;
      this._subject = this._connection = null;
      _connection === null || _connection === void 0
        ? void 0
        : _connection.unsubscribe();
    }
    connect() {
      let connection = this._connection;
      if (!connection) {
        connection = this._connection = new Subscription();
        const subject = this.getSubject();
        connection.add(
          this.source.subscribe(
            createOperatorSubscriber(
              subject,
              undefined,
              () => {
                this._teardown();
                subject.complete();
              },
              (err) => {
                this._teardown();
                subject.error(err);
              },
              () => this._teardown()
            )
          )
        );
        if (connection.closed) {
          this._connection = null;
          connection = Subscription.EMPTY;
        }
      }
      return connection;
    }
    refCount() {
      return refCount()(this);
    }
  }

  function multicast(subjectOrSubjectFactory, selector) {
    const subjectFactory = isFunction(subjectOrSubjectFactory)
      ? subjectOrSubjectFactory
      : () => subjectOrSubjectFactory;
    if (isFunction(selector)) {
      return connect(selector, {
        connector: subjectFactory,
      });
    }
    return (source) => new ConnectableObservable(source, subjectFactory);
  }

  function onErrorResumeNext(...sources) {
    const nextSources = argsOrArgArray(sources);
    return operate((source, subscriber) => {
      const remaining = [source, ...nextSources];
      const subscribeNext = () => {
        if (!subscriber.closed) {
          if (remaining.length > 0) {
            let nextSource;
            try {
              nextSource = innerFrom(remaining.shift());
            } catch (err) {
              subscribeNext();
              return;
            }
            const innerSub = createOperatorSubscriber(
              subscriber,
              undefined,
              noop,
              noop
            );
            nextSource.subscribe(innerSub);
            innerSub.add(subscribeNext);
          } else {
            subscriber.complete();
          }
        }
      };
      subscribeNext();
    });
  }

  function pairwise() {
    return operate((source, subscriber) => {
      let prev;
      let hasPrev = false;
      source.subscribe(
        createOperatorSubscriber(subscriber, (value) => {
          const p = prev;
          prev = value;
          hasPrev && subscriber.next([p, value]);
          hasPrev = true;
        })
      );
    });
  }

  function not(pred, thisArg) {
    return (value, index) => !pred.call(thisArg, value, index);
  }

  function partition(predicate, thisArg) {
    return (source) => [
      filter(predicate, thisArg)(source),
      filter(not(predicate, thisArg))(source),
    ];
  }

  function pluck(...properties) {
    const length = properties.length;
    if (length === 0) {
      throw new Error('list of properties cannot be empty.');
    }
    return map((x) => {
      let currentProp = x;
      for (let i = 0; i < length; i++) {
        const p =
          currentProp === null || currentProp === void 0
            ? void 0
            : currentProp[properties[i]];
        if (typeof p !== 'undefined') {
          currentProp = p;
        } else {
          return undefined;
        }
      }
      return currentProp;
    });
  }

  function publish(selector) {
    return selector
      ? (source) => connect(selector)(source)
      : (source) => multicast(new Subject())(source);
  }

  class BehaviorSubject extends Subject {
    constructor(_value) {
      super();
      this._value = _value;
    }
    get value() {
      return this.getValue();
    }
    _subscribe(subscriber) {
      const subscription = super._subscribe(subscriber);
      !subscription.closed && subscriber.next(this._value);
      return subscription;
    }
    getValue() {
      const { hasError, thrownError, _value } = this;
      if (hasError) {
        throw thrownError;
      }
      this._throwIfClosed();
      return _value;
    }
    next(value) {
      super.next((this._value = value));
    }
  }

  function publishBehavior(initialValue) {
    return (source) => {
      const subject = new BehaviorSubject(initialValue);
      return new ConnectableObservable(source, () => subject);
    };
  }

  class AsyncSubject extends Subject {
    constructor() {
      super(...arguments);
      this._value = null;
      this._hasValue = false;
      this._isComplete = false;
    }
    _checkFinalizedStatuses(subscriber) {
      const {
        hasError,
        _hasValue,
        _value,
        thrownError,
        isStopped,
        _isComplete,
      } = this;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped || _isComplete) {
        _hasValue && subscriber.next(_value);
        subscriber.complete();
      }
    }
    next(value) {
      if (!this.isStopped) {
        this._value = value;
        this._hasValue = true;
      }
    }
    complete() {
      const { _hasValue, _value, _isComplete } = this;
      if (!_isComplete) {
        this._isComplete = true;
        _hasValue && super.next(_value);
        super.complete();
      }
    }
  }

  function publishLast() {
    return (source) => {
      const subject = new AsyncSubject();
      return new ConnectableObservable(source, () => subject);
    };
  }

  class ReplaySubject extends Subject {
    constructor(
      _bufferSize = Infinity,
      _windowTime = Infinity,
      _timestampProvider = dateTimestampProvider
    ) {
      super();
      this._bufferSize = _bufferSize;
      this._windowTime = _windowTime;
      this._timestampProvider = _timestampProvider;
      this._buffer = [];
      this._infiniteTimeWindow = true;
      this._infiniteTimeWindow = _windowTime === Infinity;
      this._bufferSize = Math.max(1, _bufferSize);
      this._windowTime = Math.max(1, _windowTime);
    }
    next(value) {
      const {
        isStopped,
        _buffer,
        _infiniteTimeWindow,
        _timestampProvider,
        _windowTime,
      } = this;
      if (!isStopped) {
        _buffer.push(value);
        !_infiniteTimeWindow &&
          _buffer.push(_timestampProvider.now() + _windowTime);
      }
      this._trimBuffer();
      super.next(value);
    }
    _subscribe(subscriber) {
      this._throwIfClosed();
      this._trimBuffer();
      const subscription = this._innerSubscribe(subscriber);
      const { _infiniteTimeWindow, _buffer } = this;
      const copy = _buffer.slice();
      for (
        let i = 0;
        i < copy.length && !subscriber.closed;
        i += _infiniteTimeWindow ? 1 : 2
      ) {
        subscriber.next(copy[i]);
      }
      this._checkFinalizedStatuses(subscriber);
      return subscription;
    }
    _trimBuffer() {
      const { _bufferSize, _timestampProvider, _buffer, _infiniteTimeWindow } =
        this;
      const adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
      _bufferSize < Infinity &&
        adjustedBufferSize < _buffer.length &&
        _buffer.splice(0, _buffer.length - adjustedBufferSize);
      if (!_infiniteTimeWindow) {
        const now = _timestampProvider.now();
        let last = 0;
        for (let i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
          last = i;
        }
        last && _buffer.splice(0, last + 1);
      }
    }
  }

  function publishReplay(
    bufferSize,
    windowTime,
    selectorOrScheduler,
    timestampProvider
  ) {
    if (selectorOrScheduler && !isFunction(selectorOrScheduler)) {
      timestampProvider = selectorOrScheduler;
    }
    const selector = isFunction(selectorOrScheduler)
      ? selectorOrScheduler
      : undefined;
    return (source) =>
      multicast(
        new ReplaySubject(bufferSize, windowTime, timestampProvider),
        selector
      )(source);
  }

  function raceInit(sources) {
    return (subscriber) => {
      let subscriptions = [];
      for (
        let i = 0;
        subscriptions && !subscriber.closed && i < sources.length;
        i++
      ) {
        subscriptions.push(
          innerFrom(sources[i]).subscribe(
            createOperatorSubscriber(subscriber, (value) => {
              if (subscriptions) {
                for (let s = 0; s < subscriptions.length; s++) {
                  s !== i && subscriptions[s].unsubscribe();
                }
                subscriptions = null;
              }
              subscriber.next(value);
            })
          )
        );
      }
    };
  }

  function raceWith(...otherSources) {
    return !otherSources.length
      ? identity
      : operate((source, subscriber) => {
          raceInit([source, ...otherSources])(subscriber);
        });
  }

  function race(...args) {
    return raceWith(...argsOrArgArray(args));
  }

  function repeat(countOrConfig) {
    let count = Infinity;
    let delay;
    if (countOrConfig != null) {
      if (typeof countOrConfig === 'object') {
        ({ count = Infinity, delay } = countOrConfig);
      } else {
        count = countOrConfig;
      }
    }
    return count <= 0
      ? () => EMPTY
      : operate((source, subscriber) => {
          let soFar = 0;
          let sourceSub;
          const resubscribe = () => {
            sourceSub === null || sourceSub === void 0
              ? void 0
              : sourceSub.unsubscribe();
            sourceSub = null;
            if (delay != null) {
              const notifier =
                typeof delay === 'number'
                  ? timer(delay)
                  : innerFrom(delay(soFar));
              const notifierSubscriber = createOperatorSubscriber(
                subscriber,
                () => {
                  notifierSubscriber.unsubscribe();
                  subscribeToSource();
                }
              );
              notifier.subscribe(notifierSubscriber);
            } else {
              subscribeToSource();
            }
          };
          const subscribeToSource = () => {
            let syncUnsub = false;
            sourceSub = source.subscribe(
              createOperatorSubscriber(subscriber, undefined, () => {
                if (++soFar < count) {
                  if (sourceSub) {
                    resubscribe();
                  } else {
                    syncUnsub = true;
                  }
                } else {
                  subscriber.complete();
                }
              })
            );
            if (syncUnsub) {
              resubscribe();
            }
          };
          subscribeToSource();
        });
  }

  function repeatWhen(notifier) {
    return operate((source, subscriber) => {
      let innerSub;
      let syncResub = false;
      let completions$;
      let isNotifierComplete = false;
      let isMainComplete = false;
      const checkComplete = () =>
        isMainComplete && isNotifierComplete && (subscriber.complete(), true);
      const getCompletionSubject = () => {
        if (!completions$) {
          completions$ = new Subject();
          notifier(completions$).subscribe(
            createOperatorSubscriber(
              subscriber,
              () => {
                if (innerSub) {
                  subscribeForRepeatWhen();
                } else {
                  syncResub = true;
                }
              },
              () => {
                isNotifierComplete = true;
                checkComplete();
              }
            )
          );
        }
        return completions$;
      };
      const subscribeForRepeatWhen = () => {
        isMainComplete = false;
        innerSub = source.subscribe(
          createOperatorSubscriber(subscriber, undefined, () => {
            isMainComplete = true;
            !checkComplete() && getCompletionSubject().next();
          })
        );
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

  function retry(configOrCount = Infinity) {
    let config;
    if (configOrCount && typeof configOrCount === 'object') {
      config = configOrCount;
    } else {
      config = {
        count: configOrCount,
      };
    }
    const {
      count = Infinity,
      delay,
      resetOnSuccess: resetOnSuccess = false,
    } = config;
    return count <= 0
      ? identity
      : operate((source, subscriber) => {
          let soFar = 0;
          let innerSub;
          const subscribeForRetry = () => {
            let syncUnsub = false;
            innerSub = source.subscribe(
              createOperatorSubscriber(
                subscriber,
                (value) => {
                  if (resetOnSuccess) {
                    soFar = 0;
                  }
                  subscriber.next(value);
                },
                undefined,
                (err) => {
                  if (soFar++ < count) {
                    const resub = () => {
                      if (innerSub) {
                        innerSub.unsubscribe();
                        innerSub = null;
                        subscribeForRetry();
                      } else {
                        syncUnsub = true;
                      }
                    };
                    if (delay != null) {
                      const notifier =
                        typeof delay === 'number'
                          ? timer(delay)
                          : innerFrom(delay(err, soFar));
                      const notifierSubscriber = createOperatorSubscriber(
                        subscriber,
                        () => {
                          notifierSubscriber.unsubscribe();
                          resub();
                        },
                        () => {
                          subscriber.complete();
                        }
                      );
                      notifier.subscribe(notifierSubscriber);
                    } else {
                      resub();
                    }
                  } else {
                    subscriber.error(err);
                  }
                }
              )
            );
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
    return operate((source, subscriber) => {
      let innerSub;
      let syncResub = false;
      let errors$;
      const subscribeForRetryWhen = () => {
        innerSub = source.subscribe(
          createOperatorSubscriber(subscriber, undefined, undefined, (err) => {
            if (!errors$) {
              errors$ = new Subject();
              notifier(errors$).subscribe(
                createOperatorSubscriber(subscriber, () =>
                  innerSub ? subscribeForRetryWhen() : (syncResub = true)
                )
              );
            }
            if (errors$) {
              errors$.next(err);
            }
          })
        );
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
    return operate((source, subscriber) => {
      let hasValue = false;
      let lastValue = null;
      source.subscribe(
        createOperatorSubscriber(subscriber, (value) => {
          hasValue = true;
          lastValue = value;
        })
      );
      notifier.subscribe(
        createOperatorSubscriber(
          subscriber,
          () => {
            if (hasValue) {
              hasValue = false;
              const value = lastValue;
              lastValue = null;
              subscriber.next(value);
            }
          },
          noop
        )
      );
    });
  }

  function interval(period = 0, scheduler = asyncScheduler) {
    if (period < 0) {
      period = 0;
    }
    return timer(period, period, scheduler);
  }

  function sampleTime(period, scheduler = asyncScheduler) {
    return sample(interval(period, scheduler));
  }

  function scan(accumulator, seed) {
    return operate(
      scanInternals(accumulator, seed, arguments.length >= 2, true)
    );
  }

  function sequenceEqual(compareTo, comparator = (a, b) => a === b) {
    return operate((source, subscriber) => {
      const aState = createState();
      const bState = createState();
      const emit = (isEqual) => {
        subscriber.next(isEqual);
        subscriber.complete();
      };
      const createSubscriber = (selfState, otherState) => {
        const sequenceEqualSubscriber = createOperatorSubscriber(
          subscriber,
          (a) => {
            const { buffer, complete } = otherState;
            if (buffer.length === 0) {
              complete ? emit(false) : selfState.buffer.push(a);
            } else {
              !comparator(a, buffer.shift()) && emit(false);
            }
          },
          () => {
            selfState.complete = true;
            const { complete, buffer } = otherState;
            complete && emit(buffer.length === 0);
            sequenceEqualSubscriber === null ||
            sequenceEqualSubscriber === void 0
              ? void 0
              : sequenceEqualSubscriber.unsubscribe();
          }
        );
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

  function share(options = {}) {
    const {
      connector = () => new Subject(),
      resetOnError = true,
      resetOnComplete = true,
      resetOnRefCountZero = true,
    } = options;
    return (wrapperSource) => {
      let connection;
      let resetConnection;
      let subject;
      let refCount = 0;
      let hasCompleted = false;
      let hasErrored = false;
      const cancelReset = () => {
        resetConnection === null || resetConnection === void 0
          ? void 0
          : resetConnection.unsubscribe();
        resetConnection = undefined;
      };
      const reset = () => {
        cancelReset();
        connection = subject = undefined;
        hasCompleted = hasErrored = false;
      };
      const resetAndUnsubscribe = () => {
        const conn = connection;
        reset();
        conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
      };
      return operate((source, subscriber) => {
        refCount++;
        if (!hasErrored && !hasCompleted) {
          cancelReset();
        }
        const dest = (subject =
          subject !== null && subject !== void 0 ? subject : connector());
        subscriber.add(() => {
          refCount--;
          if (refCount === 0 && !hasErrored && !hasCompleted) {
            resetConnection = handleReset(
              resetAndUnsubscribe,
              resetOnRefCountZero
            );
          }
        });
        dest.subscribe(subscriber);
        if (!connection && refCount > 0) {
          connection = new SafeSubscriber({
            next: (value) => dest.next(value),
            error: (err) => {
              hasErrored = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnError, err);
              dest.error(err);
            },
            complete: () => {
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
  function handleReset(reset, on, ...args) {
    if (on === true) {
      reset();
      return;
    }
    if (on === false) {
      return;
    }
    const onSubscriber = new SafeSubscriber({
      next: () => {
        onSubscriber.unsubscribe();
        reset();
      },
    });
    return on(...args).subscribe(onSubscriber);
  }

  function shareReplay(configOrBufferSize, windowTime, scheduler) {
    let bufferSize;
    let refCount = false;
    if (configOrBufferSize && typeof configOrBufferSize === 'object') {
      ({
        bufferSize = Infinity,
        windowTime = Infinity,
        refCount = false,
        scheduler,
      } = configOrBufferSize);
    } else {
      bufferSize =
        configOrBufferSize !== null && configOrBufferSize !== void 0
          ? configOrBufferSize
          : Infinity;
    }
    return share({
      connector: () => new ReplaySubject(bufferSize, windowTime, scheduler),
      resetOnError: true,
      resetOnComplete: false,
      resetOnRefCountZero: refCount,
    });
  }

  const SequenceError = createErrorClass(
    (_super) =>
      function SequenceErrorImpl(message) {
        _super(this);
        this.name = 'SequenceError';
        this.message = message;
      }
  );

  const NotFoundError = createErrorClass(
    (_super) =>
      function NotFoundErrorImpl(message) {
        _super(this);
        this.name = 'NotFoundError';
        this.message = message;
      }
  );

  function single(predicate) {
    return operate((source, subscriber) => {
      let hasValue = false;
      let singleValue;
      let seenValue = false;
      let index = 0;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            seenValue = true;
            if (!predicate || predicate(value, index++, source)) {
              hasValue &&
                subscriber.error(new SequenceError('Too many matching values'));
              hasValue = true;
              singleValue = value;
            }
          },
          () => {
            if (hasValue) {
              subscriber.next(singleValue);
              subscriber.complete();
            } else {
              subscriber.error(
                seenValue
                  ? new NotFoundError('No matching values')
                  : new EmptyError()
              );
            }
          }
        )
      );
    });
  }

  function skip(count) {
    return filter((_, index) => count <= index);
  }

  function skipLast(skipCount) {
    return skipCount <= 0
      ? identity
      : operate((source, subscriber) => {
          let ring = new Array(skipCount);
          let seen = 0;
          source.subscribe(
            createOperatorSubscriber(subscriber, (value) => {
              const valueIndex = seen++;
              if (valueIndex < skipCount) {
                ring[valueIndex] = value;
              } else {
                const index = valueIndex % skipCount;
                const oldValue = ring[index];
                ring[index] = value;
                subscriber.next(oldValue);
              }
            })
          );
          return () => {
            ring = null;
          };
        });
  }

  function skipUntil(notifier) {
    return operate((source, subscriber) => {
      let taking = false;
      const skipSubscriber = createOperatorSubscriber(
        subscriber,
        () => {
          skipSubscriber === null || skipSubscriber === void 0
            ? void 0
            : skipSubscriber.unsubscribe();
          taking = true;
        },
        noop
      );
      innerFrom(notifier).subscribe(skipSubscriber);
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => taking && subscriber.next(value)
        )
      );
    });
  }

  function skipWhile(predicate) {
    return operate((source, subscriber) => {
      let taking = false;
      let index = 0;
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) =>
            (taking || (taking = !predicate(value, index++))) &&
            subscriber.next(value)
        )
      );
    });
  }

  function startWith(...values) {
    const scheduler = popScheduler(values);
    return operate((source, subscriber) => {
      (scheduler
        ? concat(values, source, scheduler)
        : concat(values, source)
      ).subscribe(subscriber);
    });
  }

  function switchMap(project, resultSelector) {
    return operate((source, subscriber) => {
      let innerSubscriber = null;
      let index = 0;
      let isComplete = false;
      const checkComplete = () =>
        isComplete && !innerSubscriber && subscriber.complete();
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            innerSubscriber === null || innerSubscriber === void 0
              ? void 0
              : innerSubscriber.unsubscribe();
            let innerIndex = 0;
            const outerIndex = index++;
            innerFrom(project(value, outerIndex)).subscribe(
              (innerSubscriber = createOperatorSubscriber(
                subscriber,
                (innerValue) =>
                  subscriber.next(
                    resultSelector
                      ? resultSelector(
                          value,
                          innerValue,
                          outerIndex,
                          innerIndex++
                        )
                      : innerValue
                  ),
                () => {
                  innerSubscriber = null;
                  checkComplete();
                }
              ))
            );
          },
          () => {
            isComplete = true;
            checkComplete();
          }
        )
      );
    });
  }

  function switchAll() {
    return switchMap(identity);
  }

  function switchMapTo(innerObservable, resultSelector) {
    return isFunction(resultSelector)
      ? switchMap(() => innerObservable, resultSelector)
      : switchMap(() => innerObservable);
  }

  function switchScan(accumulator, seed) {
    return operate((source, subscriber) => {
      let state = seed;
      switchMap(
        (value, index) => accumulator(state, value, index),
        (_, innerValue) => ((state = innerValue), innerValue)
      )(source).subscribe(subscriber);
      return () => {
        state = null;
      };
    });
  }

  function takeUntil(notifier) {
    return operate((source, subscriber) => {
      innerFrom(notifier).subscribe(
        createOperatorSubscriber(subscriber, () => subscriber.complete(), noop)
      );
      !subscriber.closed && source.subscribe(subscriber);
    });
  }

  function takeWhile(predicate, inclusive = false) {
    return operate((source, subscriber) => {
      let index = 0;
      source.subscribe(
        createOperatorSubscriber(subscriber, (value) => {
          const result = predicate(value, index++);
          (result || inclusive) && subscriber.next(value);
          !result && subscriber.complete();
        })
      );
    });
  }

  function tap(observerOrNext, error, complete) {
    const tapObserver =
      isFunction(observerOrNext) || error || complete
        ? { next: observerOrNext, error, complete }
        : observerOrNext;
    return tapObserver
      ? operate((source, subscriber) => {
          var _a;
          (_a = tapObserver.subscribe) === null || _a === void 0
            ? void 0
            : _a.call(tapObserver);
          let isUnsub = true;
          source.subscribe(
            createOperatorSubscriber(
              subscriber,
              (value) => {
                var _a;
                (_a = tapObserver.next) === null || _a === void 0
                  ? void 0
                  : _a.call(tapObserver, value);
                subscriber.next(value);
              },
              () => {
                var _a;
                isUnsub = false;
                (_a = tapObserver.complete) === null || _a === void 0
                  ? void 0
                  : _a.call(tapObserver);
                subscriber.complete();
              },
              (err) => {
                var _a;
                isUnsub = false;
                (_a = tapObserver.error) === null || _a === void 0
                  ? void 0
                  : _a.call(tapObserver, err);
                subscriber.error(err);
              },
              () => {
                var _a, _b;
                if (isUnsub) {
                  (_a = tapObserver.unsubscribe) === null || _a === void 0
                    ? void 0
                    : _a.call(tapObserver);
                }
                (_b = tapObserver.finalize) === null || _b === void 0
                  ? void 0
                  : _b.call(tapObserver);
              }
            )
          );
        })
      : identity;
  }

  const defaultThrottleConfig = {
    leading: true,
    trailing: false,
  };
  function throttle(durationSelector, config = defaultThrottleConfig) {
    return operate((source, subscriber) => {
      const { leading, trailing } = config;
      let hasValue = false;
      let sendValue = null;
      let throttled = null;
      let isComplete = false;
      const endThrottling = () => {
        throttled === null || throttled === void 0
          ? void 0
          : throttled.unsubscribe();
        throttled = null;
        if (trailing) {
          send();
          isComplete && subscriber.complete();
        }
      };
      const cleanupThrottling = () => {
        throttled = null;
        isComplete && subscriber.complete();
      };
      const startThrottle = (value) =>
        (throttled = innerFrom(durationSelector(value)).subscribe(
          createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling)
        ));
      const send = () => {
        if (hasValue) {
          hasValue = false;
          const value = sendValue;
          sendValue = null;
          subscriber.next(value);
          !isComplete && startThrottle(value);
        }
      };
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            hasValue = true;
            sendValue = value;
            !(throttled && !throttled.closed) &&
              (leading ? send() : startThrottle(value));
          },
          () => {
            isComplete = true;
            !(trailing && hasValue && throttled && !throttled.closed) &&
              subscriber.complete();
          }
        )
      );
    });
  }

  function throttleTime(
    duration,
    scheduler = asyncScheduler,
    config = defaultThrottleConfig
  ) {
    const duration$ = timer(duration, scheduler);
    return throttle(() => duration$, config);
  }

  function timeInterval(scheduler = asyncScheduler) {
    return operate((source, subscriber) => {
      let last = scheduler.now();
      source.subscribe(
        createOperatorSubscriber(subscriber, (value) => {
          const now = scheduler.now();
          const interval = now - last;
          last = now;
          subscriber.next(new TimeInterval(value, interval));
        })
      );
    });
  }
  class TimeInterval {
    constructor(value, interval) {
      this.value = value;
      this.interval = interval;
    }
  }

  const TimeoutError = createErrorClass(
    (_super) =>
      function TimeoutErrorImpl(info = null) {
        _super(this);
        this.message = 'Timeout has occurred';
        this.name = 'TimeoutError';
        this.info = info;
      }
  );
  function timeout(config, schedulerArg) {
    const {
      first,
      each,
      with: _with = timeoutErrorFactory,
      scheduler = schedulerArg !== null && schedulerArg !== void 0
        ? schedulerArg
        : asyncScheduler,
      meta = null,
    } = isValidDate(config)
      ? { first: config }
      : typeof config === 'number'
      ? { each: config }
      : config;
    if (first == null && each == null) {
      throw new TypeError('No timeout provided.');
    }
    return operate((source, subscriber) => {
      let originalSourceSubscription;
      let timerSubscription;
      let lastValue = null;
      let seen = 0;
      const startTimer = (delay) => {
        timerSubscription = executeSchedule(
          subscriber,
          scheduler,
          () => {
            try {
              originalSourceSubscription.unsubscribe();
              innerFrom(
                _with({
                  meta,
                  lastValue,
                  seen,
                })
              ).subscribe(subscriber);
            } catch (err) {
              subscriber.error(err);
            }
          },
          delay
        );
      };
      originalSourceSubscription = source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            timerSubscription === null || timerSubscription === void 0
              ? void 0
              : timerSubscription.unsubscribe();
            seen++;
            subscriber.next((lastValue = value));
            each > 0 && startTimer(each);
          },
          undefined,
          undefined,
          () => {
            if (
              !(timerSubscription === null || timerSubscription === void 0
                ? void 0
                : timerSubscription.closed)
            ) {
              timerSubscription === null || timerSubscription === void 0
                ? void 0
                : timerSubscription.unsubscribe();
            }
            lastValue = null;
          }
        )
      );
      !seen &&
        startTimer(
          first != null
            ? typeof first === 'number'
              ? first
              : +first - scheduler.now()
            : each
        );
    });
  }
  function timeoutErrorFactory(info) {
    throw new TimeoutError(info);
  }

  function timeoutWith(due, withObservable, scheduler) {
    let first;
    let each;
    let _with;
    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async;
    if (isValidDate(due)) {
      first = due;
    } else if (typeof due === 'number') {
      each = due;
    }
    if (withObservable) {
      _with = () => withObservable;
    } else {
      throw new TypeError('No observable provided to switch to');
    }
    if (first == null && each == null) {
      throw new TypeError('No timeout provided.');
    }
    return timeout({
      first,
      each,
      scheduler,
      with: _with,
    });
  }

  function timestamp(timestampProvider = dateTimestampProvider) {
    return map((value) => ({ value, timestamp: timestampProvider.now() }));
  }

  function window(windowBoundaries) {
    return operate((source, subscriber) => {
      let windowSubject = new Subject();
      subscriber.next(windowSubject.asObservable());
      const errorHandler = (err) => {
        windowSubject.error(err);
        subscriber.error(err);
      };
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) =>
            windowSubject === null || windowSubject === void 0
              ? void 0
              : windowSubject.next(value),
          () => {
            windowSubject.complete();
            subscriber.complete();
          },
          errorHandler
        )
      );
      windowBoundaries.subscribe(
        createOperatorSubscriber(
          subscriber,
          () => {
            windowSubject.complete();
            subscriber.next((windowSubject = new Subject()));
          },
          noop,
          errorHandler
        )
      );
      return () => {
        windowSubject === null || windowSubject === void 0
          ? void 0
          : windowSubject.unsubscribe();
        windowSubject = null;
      };
    });
  }

  function windowCount(windowSize, startWindowEvery = 0) {
    const startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
    return operate((source, subscriber) => {
      let windows = [new Subject()];
      let starts = [];
      let count = 0;
      subscriber.next(windows[0].asObservable());
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            for (const window of windows) {
              window.next(value);
            }
            const c = count - windowSize + 1;
            if (c >= 0 && c % startEvery === 0) {
              windows.shift().complete();
            }
            if (++count % startEvery === 0) {
              const window = new Subject();
              windows.push(window);
              subscriber.next(window.asObservable());
            }
          },
          () => {
            while (windows.length > 0) {
              windows.shift().complete();
            }
            subscriber.complete();
          },
          (err) => {
            while (windows.length > 0) {
              windows.shift().error(err);
            }
            subscriber.error(err);
          },
          () => {
            starts = null;
            windows = null;
          }
        )
      );
    });
  }

  function windowTime(windowTimeSpan, ...otherArgs) {
    var _a, _b;
    const scheduler =
      (_a = popScheduler(otherArgs)) !== null && _a !== void 0
        ? _a
        : asyncScheduler;
    const windowCreationInterval =
      (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    const maxWindowSize = otherArgs[1] || Infinity;
    return operate((source, subscriber) => {
      let windowRecords = [];
      let restartOnClose = false;
      const closeWindow = (record) => {
        const { window, subs } = record;
        window.complete();
        subs.unsubscribe();
        arrRemove(windowRecords, record);
        restartOnClose && startWindow();
      };
      const startWindow = () => {
        if (windowRecords) {
          const subs = new Subscription();
          subscriber.add(subs);
          const window = new Subject();
          const record = {
            window,
            subs,
            seen: 0,
          };
          windowRecords.push(record);
          subscriber.next(window.asObservable());
          executeSchedule(
            subs,
            scheduler,
            () => closeWindow(record),
            windowTimeSpan
          );
        }
      };
      if (windowCreationInterval !== null && windowCreationInterval >= 0) {
        executeSchedule(
          subscriber,
          scheduler,
          startWindow,
          windowCreationInterval,
          true
        );
      } else {
        restartOnClose = true;
      }
      startWindow();
      const loop = (cb) => windowRecords.slice().forEach(cb);
      const terminate = (cb) => {
        loop(({ window }) => cb(window));
        cb(subscriber);
        subscriber.unsubscribe();
      };
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            loop((record) => {
              record.window.next(value);
              maxWindowSize <= ++record.seen && closeWindow(record);
            });
          },
          () => terminate((consumer) => consumer.complete()),
          (err) => terminate((consumer) => consumer.error(err))
        )
      );
      return () => {
        windowRecords = null;
      };
    });
  }

  function windowToggle(openings, closingSelector) {
    return operate((source, subscriber) => {
      const windows = [];
      const handleError = (err) => {
        while (0 < windows.length) {
          windows.shift().error(err);
        }
        subscriber.error(err);
      };
      innerFrom(openings).subscribe(
        createOperatorSubscriber(
          subscriber,
          (openValue) => {
            const window = new Subject();
            windows.push(window);
            const closingSubscription = new Subscription();
            const closeWindow = () => {
              arrRemove(windows, window);
              window.complete();
              closingSubscription.unsubscribe();
            };
            let closingNotifier;
            try {
              closingNotifier = innerFrom(closingSelector(openValue));
            } catch (err) {
              handleError(err);
              return;
            }
            subscriber.next(window.asObservable());
            closingSubscription.add(
              closingNotifier.subscribe(
                createOperatorSubscriber(
                  subscriber,
                  closeWindow,
                  noop,
                  handleError
                )
              )
            );
          },
          noop
        )
      );
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => {
            const windowsCopy = windows.slice();
            for (const window of windowsCopy) {
              window.next(value);
            }
          },
          () => {
            while (0 < windows.length) {
              windows.shift().complete();
            }
            subscriber.complete();
          },
          handleError,
          () => {
            while (0 < windows.length) {
              windows.shift().unsubscribe();
            }
          }
        )
      );
    });
  }

  function windowWhen(closingSelector) {
    return operate((source, subscriber) => {
      let window;
      let closingSubscriber;
      const handleError = (err) => {
        window.error(err);
        subscriber.error(err);
      };
      const openWindow = () => {
        closingSubscriber === null || closingSubscriber === void 0
          ? void 0
          : closingSubscriber.unsubscribe();
        window === null || window === void 0 ? void 0 : window.complete();
        window = new Subject();
        subscriber.next(window.asObservable());
        let closingNotifier;
        try {
          closingNotifier = innerFrom(closingSelector());
        } catch (err) {
          handleError(err);
          return;
        }
        closingNotifier.subscribe(
          (closingSubscriber = createOperatorSubscriber(
            subscriber,
            openWindow,
            openWindow,
            handleError
          ))
        );
      };
      openWindow();
      source.subscribe(
        createOperatorSubscriber(
          subscriber,
          (value) => window.next(value),
          () => {
            window.complete();
            subscriber.complete();
          },
          handleError,
          () => {
            closingSubscriber === null || closingSubscriber === void 0
              ? void 0
              : closingSubscriber.unsubscribe();
            window = null;
          }
        )
      );
    });
  }

  function withLatestFrom(...inputs) {
    const project = popResultSelector(inputs);
    return operate((source, subscriber) => {
      const len = inputs.length;
      const otherValues = new Array(len);
      let hasValue = inputs.map(() => false);
      let ready = false;
      for (let i = 0; i < len; i++) {
        innerFrom(inputs[i]).subscribe(
          createOperatorSubscriber(
            subscriber,
            (value) => {
              otherValues[i] = value;
              if (!ready && !hasValue[i]) {
                hasValue[i] = true;
                (ready = hasValue.every(identity)) && (hasValue = null);
              }
            },
            noop
          )
        );
      }
      source.subscribe(
        createOperatorSubscriber(subscriber, (value) => {
          if (ready) {
            const values = [value, ...otherValues];
            subscriber.next(project ? project(...values) : values);
          }
        })
      );
    });
  }

  function zip$1(...args) {
    const resultSelector = popResultSelector(args);
    const sources = argsOrArgArray(args);
    return sources.length
      ? new Observable((subscriber) => {
          let buffers = sources.map(() => []);
          let completed = sources.map(() => false);
          subscriber.add(() => {
            buffers = completed = null;
          });
          for (
            let sourceIndex = 0;
            !subscriber.closed && sourceIndex < sources.length;
            sourceIndex++
          ) {
            innerFrom(sources[sourceIndex]).subscribe(
              createOperatorSubscriber(
                subscriber,
                (value) => {
                  buffers[sourceIndex].push(value);
                  if (buffers.every((buffer) => buffer.length)) {
                    const result = buffers.map((buffer) => buffer.shift());
                    subscriber.next(
                      resultSelector ? resultSelector(...result) : result
                    );
                    if (
                      buffers.some(
                        (buffer, i) => !buffer.length && completed[i]
                      )
                    ) {
                      subscriber.complete();
                    }
                  }
                },
                () => {
                  completed[sourceIndex] = true;
                  !buffers[sourceIndex].length && subscriber.complete();
                }
              )
            );
          }
          return () => {
            buffers = completed = null;
          };
        })
      : EMPTY;
  }

  function zip(...sources) {
    return operate((source, subscriber) => {
      zip$1(source, ...sources).subscribe(subscriber);
    });
  }

  function zipAll(project) {
    return joinAllInternals(zip$1, project);
  }

  function zipWith(...otherInputs) {
    return zip(...otherInputs);
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
});
