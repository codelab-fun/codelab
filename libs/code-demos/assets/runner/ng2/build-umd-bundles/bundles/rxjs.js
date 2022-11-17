(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.rxjs = {})));
})(this, function (exports) {
  'use strict';

  function isFunction(x) {
    return typeof x === 'function';
  }

  let _enable_super_gross_mode_that_will_cause_bad_things = false;
  const config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
      if (value) {
        const error = new Error();
        console.warn(
          'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' +
            error.stack
        );
      } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
        console.log('RxJS: Back to a better error behavior. Thank you. <3');
      }
      _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
      return _enable_super_gross_mode_that_will_cause_bad_things;
    },
  };

  function hostReportError(err) {
    setTimeout(() => {
      throw err;
    }, 0);
  }

  const empty$1 = {
    closed: true,
    next(value) {},
    error(err) {
      if (config.useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        hostReportError(err);
      }
    },
    complete() {},
  };

  const isArray = (() =>
    Array.isArray || ((x) => x && typeof x.length === 'number'))();

  function isObject(x) {
    return x !== null && typeof x === 'object';
  }

  const UnsubscriptionErrorImpl = (() => {
    function UnsubscriptionErrorImpl(errors) {
      Error.call(this);
      this.message = errors
        ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join('\n  ')}`
        : '';
      this.name = 'UnsubscriptionError';
      this.errors = errors;
      return this;
    }
    UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
    return UnsubscriptionErrorImpl;
  })();
  const UnsubscriptionError = UnsubscriptionErrorImpl;

  class Subscription {
    constructor(unsubscribe) {
      this.closed = false;
      this._parentOrParents = null;
      this._subscriptions = null;
      if (unsubscribe) {
        this._ctorUnsubscribe = true;
        this._unsubscribe = unsubscribe;
      }
    }
    unsubscribe() {
      let errors;
      if (this.closed) {
        return;
      }
      let { _parentOrParents, _ctorUnsubscribe, _unsubscribe, _subscriptions } =
        this;
      this.closed = true;
      this._parentOrParents = null;
      this._subscriptions = null;
      if (_parentOrParents instanceof Subscription) {
        _parentOrParents.remove(this);
      } else if (_parentOrParents !== null) {
        for (let index = 0; index < _parentOrParents.length; ++index) {
          const parent = _parentOrParents[index];
          parent.remove(this);
        }
      }
      if (isFunction(_unsubscribe)) {
        if (_ctorUnsubscribe) {
          this._unsubscribe = undefined;
        }
        try {
          _unsubscribe.call(this);
        } catch (e) {
          errors =
            e instanceof UnsubscriptionError
              ? flattenUnsubscriptionErrors(e.errors)
              : [e];
        }
      }
      if (isArray(_subscriptions)) {
        let index = -1;
        let len = _subscriptions.length;
        while (++index < len) {
          const sub = _subscriptions[index];
          if (isObject(sub)) {
            try {
              sub.unsubscribe();
            } catch (e) {
              errors = errors || [];
              if (e instanceof UnsubscriptionError) {
                errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
              } else {
                errors.push(e);
              }
            }
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
    add(teardown) {
      let subscription = teardown;
      if (!teardown) {
        return Subscription.EMPTY;
      }
      switch (typeof teardown) {
        case 'function':
          subscription = new Subscription(teardown);
        case 'object':
          if (
            subscription === this ||
            subscription.closed ||
            typeof subscription.unsubscribe !== 'function'
          ) {
            return subscription;
          } else if (this.closed) {
            subscription.unsubscribe();
            return subscription;
          } else if (!(subscription instanceof Subscription)) {
            const tmp = subscription;
            subscription = new Subscription();
            subscription._subscriptions = [tmp];
          }
          break;
        default: {
          throw new Error(
            'unrecognized teardown ' + teardown + ' added to Subscription.'
          );
        }
      }
      let { _parentOrParents } = subscription;
      if (_parentOrParents === null) {
        subscription._parentOrParents = this;
      } else if (_parentOrParents instanceof Subscription) {
        if (_parentOrParents === this) {
          return subscription;
        }
        subscription._parentOrParents = [_parentOrParents, this];
      } else if (_parentOrParents.indexOf(this) === -1) {
        _parentOrParents.push(this);
      } else {
        return subscription;
      }
      const subscriptions = this._subscriptions;
      if (subscriptions === null) {
        this._subscriptions = [subscription];
      } else {
        subscriptions.push(subscription);
      }
      return subscription;
    }
    remove(subscription) {
      const subscriptions = this._subscriptions;
      if (subscriptions) {
        const subscriptionIndex = subscriptions.indexOf(subscription);
        if (subscriptionIndex !== -1) {
          subscriptions.splice(subscriptionIndex, 1);
        }
      }
    }
  }
  Subscription.EMPTY = (function (empty) {
    empty.closed = true;
    return empty;
  })(new Subscription());
  function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(
      (errs, err) =>
        errs.concat(err instanceof UnsubscriptionError ? err.errors : err),
      []
    );
  }

  const rxSubscriber = (() =>
    typeof Symbol === 'function'
      ? Symbol('rxSubscriber')
      : '@@rxSubscriber_' + Math.random())();

  class Subscriber extends Subscription {
    constructor(destinationOrNext, error, complete) {
      super();
      this.syncErrorValue = null;
      this.syncErrorThrown = false;
      this.syncErrorThrowable = false;
      this.isStopped = false;
      switch (arguments.length) {
        case 0:
          this.destination = empty$1;
          break;
        case 1:
          if (!destinationOrNext) {
            this.destination = empty$1;
            break;
          }
          if (typeof destinationOrNext === 'object') {
            if (destinationOrNext instanceof Subscriber) {
              this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
              this.destination = destinationOrNext;
              destinationOrNext.add(this);
            } else {
              this.syncErrorThrowable = true;
              this.destination = new SafeSubscriber(this, destinationOrNext);
            }
            break;
          }
        default:
          this.syncErrorThrowable = true;
          this.destination = new SafeSubscriber(
            this,
            destinationOrNext,
            error,
            complete
          );
          break;
      }
    }
    [rxSubscriber]() {
      return this;
    }
    static create(next, error, complete) {
      const subscriber = new Subscriber(next, error, complete);
      subscriber.syncErrorThrowable = false;
      return subscriber;
    }
    next(value) {
      if (!this.isStopped) {
        this._next(value);
      }
    }
    error(err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this._error(err);
      }
    }
    complete() {
      if (!this.isStopped) {
        this.isStopped = true;
        this._complete();
      }
    }
    unsubscribe() {
      if (this.closed) {
        return;
      }
      this.isStopped = true;
      super.unsubscribe();
    }
    _next(value) {
      this.destination.next(value);
    }
    _error(err) {
      this.destination.error(err);
      this.unsubscribe();
    }
    _complete() {
      this.destination.complete();
      this.unsubscribe();
    }
    _unsubscribeAndRecycle() {
      const { _parentOrParents } = this;
      this._parentOrParents = null;
      this.unsubscribe();
      this.closed = false;
      this.isStopped = false;
      this._parentOrParents = _parentOrParents;
      return this;
    }
  }
  class SafeSubscriber extends Subscriber {
    constructor(_parentSubscriber, observerOrNext, error, complete) {
      super();
      this._parentSubscriber = _parentSubscriber;
      let next;
      let context = this;
      if (isFunction(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;
        if (observerOrNext !== empty$1) {
          context = Object.create(observerOrNext);
          if (isFunction(context.unsubscribe)) {
            this.add(context.unsubscribe.bind(context));
          }
          context.unsubscribe = this.unsubscribe.bind(this);
        }
      }
      this._context = context;
      this._next = next;
      this._error = error;
      this._complete = complete;
    }
    next(value) {
      if (!this.isStopped && this._next) {
        const { _parentSubscriber } = this;
        if (
          !config.useDeprecatedSynchronousErrorHandling ||
          !_parentSubscriber.syncErrorThrowable
        ) {
          this.__tryOrUnsub(this._next, value);
        } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
          this.unsubscribe();
        }
      }
    }
    error(err) {
      if (!this.isStopped) {
        const { _parentSubscriber } = this;
        const { useDeprecatedSynchronousErrorHandling } = config;
        if (this._error) {
          if (
            !useDeprecatedSynchronousErrorHandling ||
            !_parentSubscriber.syncErrorThrowable
          ) {
            this.__tryOrUnsub(this._error, err);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, this._error, err);
            this.unsubscribe();
          }
        } else if (!_parentSubscriber.syncErrorThrowable) {
          this.unsubscribe();
          if (useDeprecatedSynchronousErrorHandling) {
            throw err;
          }
          hostReportError(err);
        } else {
          if (useDeprecatedSynchronousErrorHandling) {
            _parentSubscriber.syncErrorValue = err;
            _parentSubscriber.syncErrorThrown = true;
          } else {
            hostReportError(err);
          }
          this.unsubscribe();
        }
      }
    }
    complete() {
      if (!this.isStopped) {
        const { _parentSubscriber } = this;
        if (this._complete) {
          const wrappedComplete = () => this._complete.call(this._context);
          if (
            !config.useDeprecatedSynchronousErrorHandling ||
            !_parentSubscriber.syncErrorThrowable
          ) {
            this.__tryOrUnsub(wrappedComplete);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, wrappedComplete);
            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    }
    __tryOrUnsub(fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        this.unsubscribe();
        if (config.useDeprecatedSynchronousErrorHandling) {
          throw err;
        } else {
          hostReportError(err);
        }
      }
    }
    __tryOrSetError(parent, fn, value) {
      if (!config.useDeprecatedSynchronousErrorHandling) {
        throw new Error('bad call');
      }
      try {
        fn.call(this._context, value);
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          parent.syncErrorValue = err;
          parent.syncErrorThrown = true;
          return true;
        } else {
          hostReportError(err);
          return true;
        }
      }
      return false;
    }
    _unsubscribe() {
      const { _parentSubscriber } = this;
      this._context = null;
      this._parentSubscriber = null;
      _parentSubscriber.unsubscribe();
    }
  }

  function canReportError(observer) {
    while (observer) {
      const { closed, destination, isStopped } = observer;
      if (closed || isStopped) {
        return false;
      } else if (destination && destination instanceof Subscriber) {
        observer = destination;
      } else {
        observer = null;
      }
    }
    return true;
  }

  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
      if (nextOrObserver instanceof Subscriber) {
        return nextOrObserver;
      }
      if (nextOrObserver[rxSubscriber]) {
        return nextOrObserver[rxSubscriber]();
      }
    }
    if (!nextOrObserver && !error && !complete) {
      return new Subscriber(empty$1);
    }
    return new Subscriber(nextOrObserver, error, complete);
  }

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
      this._isScalar = false;
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
      const { operator } = this;
      const sink = toSubscriber(observerOrNext, error, complete);
      if (operator) {
        sink.add(operator.call(sink, this.source));
      } else {
        sink.add(
          this.source ||
            (config.useDeprecatedSynchronousErrorHandling &&
              !sink.syncErrorThrowable)
            ? this._subscribe(sink)
            : this._trySubscribe(sink)
        );
      }
      if (config.useDeprecatedSynchronousErrorHandling) {
        if (sink.syncErrorThrowable) {
          sink.syncErrorThrowable = false;
          if (sink.syncErrorThrown) {
            throw sink.syncErrorValue;
          }
        }
      }
      return sink;
    }
    _trySubscribe(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          sink.syncErrorThrown = true;
          sink.syncErrorValue = err;
        }
        if (canReportError(sink)) {
          sink.error(err);
        } else {
          console.warn(err);
        }
      }
    }
    forEach(next, promiseCtor) {
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor((resolve, reject) => {
        let subscription;
        subscription = this.subscribe(
          (value) => {
            try {
              next(value);
            } catch (err) {
              reject(err);
              if (subscription) {
                subscription.unsubscribe();
              }
            }
          },
          reject,
          resolve
        );
      });
    }
    _subscribe(subscriber) {
      const { source } = this;
      return source && source.subscribe(subscriber);
    }
    [observable]() {
      return this;
    }
    pipe(...operations) {
      if (operations.length === 0) {
        return this;
      }
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
    if (!promiseCtor) {
      promiseCtor = config.Promise || Promise;
    }
    if (!promiseCtor) {
      throw new Error('no Promise impl found');
    }
    return promiseCtor;
  }

  const ObjectUnsubscribedErrorImpl = (() => {
    function ObjectUnsubscribedErrorImpl() {
      Error.call(this);
      this.message = 'object unsubscribed';
      this.name = 'ObjectUnsubscribedError';
      return this;
    }
    ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype);
    return ObjectUnsubscribedErrorImpl;
  })();
  const ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

  class SubjectSubscription extends Subscription {
    constructor(subject, subscriber) {
      super();
      this.subject = subject;
      this.subscriber = subscriber;
      this.closed = false;
    }
    unsubscribe() {
      if (this.closed) {
        return;
      }
      this.closed = true;
      const subject = this.subject;
      const observers = subject.observers;
      this.subject = null;
      if (
        !observers ||
        observers.length === 0 ||
        subject.isStopped ||
        subject.closed
      ) {
        return;
      }
      const subscriberIndex = observers.indexOf(this.subscriber);
      if (subscriberIndex !== -1) {
        observers.splice(subscriberIndex, 1);
      }
    }
  }

  class SubjectSubscriber extends Subscriber {
    constructor(destination) {
      super(destination);
      this.destination = destination;
    }
  }
  class Subject extends Observable {
    constructor() {
      super();
      this.observers = [];
      this.closed = false;
      this.isStopped = false;
      this.hasError = false;
      this.thrownError = null;
    }
    [rxSubscriber]() {
      return new SubjectSubscriber(this);
    }
    lift(operator) {
      const subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    }
    next(value) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
      if (!this.isStopped) {
        const { observers } = this;
        const len = observers.length;
        const copy = observers.slice();
        for (let i = 0; i < len; i++) {
          copy[i].next(value);
        }
      }
    }
    error(err) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
      this.hasError = true;
      this.thrownError = err;
      this.isStopped = true;
      const { observers } = this;
      const len = observers.length;
      const copy = observers.slice();
      for (let i = 0; i < len; i++) {
        copy[i].error(err);
      }
      this.observers.length = 0;
    }
    complete() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
      this.isStopped = true;
      const { observers } = this;
      const len = observers.length;
      const copy = observers.slice();
      for (let i = 0; i < len; i++) {
        copy[i].complete();
      }
      this.observers.length = 0;
    }
    unsubscribe() {
      this.isStopped = true;
      this.closed = true;
      this.observers = null;
    }
    _trySubscribe(subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else {
        return super._trySubscribe(subscriber);
      }
    }
    _subscribe(subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else if (this.hasError) {
        subscriber.error(this.thrownError);
        return Subscription.EMPTY;
      } else if (this.isStopped) {
        subscriber.complete();
        return Subscription.EMPTY;
      } else {
        this.observers.push(subscriber);
        return new SubjectSubscription(this, subscriber);
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
      const { destination } = this;
      if (destination && destination.next) {
        destination.next(value);
      }
    }
    error(err) {
      const { destination } = this;
      if (destination && destination.error) {
        this.destination.error(err);
      }
    }
    complete() {
      const { destination } = this;
      if (destination && destination.complete) {
        this.destination.complete();
      }
    }
    _subscribe(subscriber) {
      const { source } = this;
      if (source) {
        return this.source.subscribe(subscriber);
      } else {
        return Subscription.EMPTY;
      }
    }
  }

  function refCount() {
    return function refCountOperatorFunction(source) {
      return source.lift(new RefCountOperator(source));
    };
  }
  class RefCountOperator {
    constructor(connectable) {
      this.connectable = connectable;
    }
    call(subscriber, source) {
      const { connectable } = this;
      connectable._refCount++;
      const refCounter = new RefCountSubscriber(subscriber, connectable);
      const subscription = source.subscribe(refCounter);
      if (!refCounter.closed) {
        refCounter.connection = connectable.connect();
      }
      return subscription;
    }
  }
  class RefCountSubscriber extends Subscriber {
    constructor(destination, connectable) {
      super(destination);
      this.connectable = connectable;
    }
    _unsubscribe() {
      const { connectable } = this;
      if (!connectable) {
        this.connection = null;
        return;
      }
      this.connectable = null;
      const refCount = connectable._refCount;
      if (refCount <= 0) {
        this.connection = null;
        return;
      }
      connectable._refCount = refCount - 1;
      if (refCount > 1) {
        this.connection = null;
        return;
      }
      const { connection } = this;
      const sharedConnection = connectable._connection;
      this.connection = null;
      if (
        sharedConnection &&
        (!connection || sharedConnection === connection)
      ) {
        sharedConnection.unsubscribe();
      }
    }
  }

  class ConnectableObservable extends Observable {
    constructor(source, subjectFactory) {
      super();
      this.source = source;
      this.subjectFactory = subjectFactory;
      this._refCount = 0;
      this._isComplete = false;
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
    connect() {
      let connection = this._connection;
      if (!connection) {
        this._isComplete = false;
        connection = this._connection = new Subscription();
        connection.add(
          this.source.subscribe(
            new ConnectableSubscriber(this.getSubject(), this)
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
  (() => {
    const connectableProto = ConnectableObservable.prototype;
    return {
      operator: { value: null },
      _refCount: { value: 0, writable: true },
      _subject: { value: null, writable: true },
      _connection: { value: null, writable: true },
      _subscribe: { value: connectableProto._subscribe },
      _isComplete: { value: connectableProto._isComplete, writable: true },
      getSubject: { value: connectableProto.getSubject },
      connect: { value: connectableProto.connect },
      refCount: { value: connectableProto.refCount },
    };
  })();
  class ConnectableSubscriber extends SubjectSubscriber {
    constructor(destination, connectable) {
      super(destination);
      this.connectable = connectable;
    }
    _error(err) {
      this._unsubscribe();
      super._error(err);
    }
    _complete() {
      this.connectable._isComplete = true;
      this._unsubscribe();
      super._complete();
    }
    _unsubscribe() {
      const connectable = this.connectable;
      if (connectable) {
        this.connectable = null;
        const connection = connectable._connection;
        connectable._refCount = 0;
        connectable._subject = null;
        connectable._connection = null;
        if (connection) {
          connection.unsubscribe();
        }
      }
    }
  }

  class GroupedObservable extends Observable {
    constructor(key, groupSubject, refCountSubscription) {
      super();
      this.key = key;
      this.groupSubject = groupSubject;
      this.refCountSubscription = refCountSubscription;
    }
    _subscribe(subscriber) {
      const subscription = new Subscription();
      const { refCountSubscription, groupSubject } = this;
      if (refCountSubscription && !refCountSubscription.closed) {
        subscription.add(new InnerRefCountSubscription(refCountSubscription));
      }
      subscription.add(groupSubject.subscribe(subscriber));
      return subscription;
    }
  }
  class InnerRefCountSubscription extends Subscription {
    constructor(parent) {
      super();
      this.parent = parent;
      parent.count++;
    }
    unsubscribe() {
      const parent = this.parent;
      if (!parent.closed && !this.closed) {
        super.unsubscribe();
        parent.count -= 1;
        if (parent.count === 0 && parent.attemptedToUnsubscribe) {
          parent.unsubscribe();
        }
      }
    }
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
      if (subscription && !subscription.closed) {
        subscriber.next(this._value);
      }
      return subscription;
    }
    getValue() {
      if (this.hasError) {
        throw this.thrownError;
      } else if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else {
        return this._value;
      }
    }
    next(value) {
      super.next((this._value = value));
    }
  }

  class Action extends Subscription {
    constructor(scheduler, work) {
      super();
    }
    schedule(state, delay = 0) {
      return this;
    }
  }

  class AsyncAction extends Action {
    constructor(scheduler, work) {
      super(scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
      this.pending = false;
    }
    schedule(state, delay = 0) {
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
      this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
      return this;
    }
    requestAsyncId(scheduler, id, delay = 0) {
      return setInterval(scheduler.flush.bind(scheduler, this), delay);
    }
    recycleAsyncId(scheduler, id, delay = 0) {
      if (delay !== null && this.delay === delay && this.pending === false) {
        return id;
      }
      clearInterval(id);
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
    _execute(state, delay) {
      let errored = false;
      let errorValue = undefined;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = (!!e && e) || new Error(e);
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    }
    _unsubscribe() {
      const id = this.id;
      const scheduler = this.scheduler;
      const actions = scheduler.actions;
      const index = actions.indexOf(this);
      this.work = null;
      this.state = null;
      this.pending = false;
      this.scheduler = null;
      if (index !== -1) {
        actions.splice(index, 1);
      }
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
    }
  }

  class QueueAction extends AsyncAction {
    constructor(scheduler, work) {
      super(scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
    }
    schedule(state, delay = 0) {
      if (delay > 0) {
        return super.schedule(state, delay);
      }
      this.delay = delay;
      this.state = state;
      this.scheduler.flush(this);
      return this;
    }
    execute(state, delay) {
      return delay > 0 || this.closed
        ? super.execute(state, delay)
        : this._execute(state, delay);
    }
    requestAsyncId(scheduler, id, delay = 0) {
      if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
        return super.requestAsyncId(scheduler, id, delay);
      }
      return scheduler.flush(this);
    }
  }

  class Scheduler {
    constructor(SchedulerAction, now = Scheduler.now) {
      this.SchedulerAction = SchedulerAction;
      this.now = now;
    }
    schedule(work, delay = 0, state) {
      return new this.SchedulerAction(this, work).schedule(state, delay);
    }
  }
  Scheduler.now = () => Date.now();

  class AsyncScheduler extends Scheduler {
    constructor(SchedulerAction, now = Scheduler.now) {
      super(SchedulerAction, () => {
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
          return AsyncScheduler.delegate.now();
        } else {
          return now();
        }
      });
      this.actions = [];
      this.active = false;
      this.scheduled = undefined;
    }
    schedule(work, delay = 0, state) {
      if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
        return AsyncScheduler.delegate.schedule(work, delay, state);
      } else {
        return super.schedule(work, delay, state);
      }
    }
    flush(action) {
      const { actions } = this;
      if (this.active) {
        actions.push(action);
        return;
      }
      let error;
      this.active = true;
      do {
        if ((error = action.execute(action.state, action.delay))) {
          break;
        }
      } while ((action = actions.shift()));
      this.active = false;
      if (error) {
        while ((action = actions.shift())) {
          action.unsubscribe();
        }
        throw error;
      }
    }
  }

  class QueueScheduler extends AsyncScheduler {}

  const queueScheduler = new QueueScheduler(QueueAction);
  const queue = queueScheduler;

  const EMPTY = new Observable((subscriber) => subscriber.complete());
  function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : EMPTY;
  }
  function emptyScheduled(scheduler) {
    return new Observable((subscriber) =>
      scheduler.schedule(() => subscriber.complete())
    );
  }

  function isScheduler(value) {
    return value && typeof value.schedule === 'function';
  }

  const subscribeToArray = (array) => (subscriber) => {
    for (let i = 0, len = array.length; i < len && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  };

  function scheduleArray(input, scheduler) {
    return new Observable((subscriber) => {
      const sub = new Subscription();
      let i = 0;
      sub.add(
        scheduler.schedule(function () {
          if (i === input.length) {
            subscriber.complete();
            return;
          }
          subscriber.next(input[i++]);
          if (!subscriber.closed) {
            sub.add(this.schedule());
          }
        })
      );
      return sub;
    });
  }

  function fromArray(input, scheduler) {
    if (!scheduler) {
      return new Observable(subscribeToArray(input));
    } else {
      return scheduleArray(input, scheduler);
    }
  }

  function of(...args) {
    let scheduler = args[args.length - 1];
    if (isScheduler(scheduler)) {
      args.pop();
      return scheduleArray(args, scheduler);
    } else {
      return fromArray(args);
    }
  }

  function throwError(error, scheduler) {
    if (!scheduler) {
      return new Observable((subscriber) => subscriber.error(error));
    } else {
      return new Observable((subscriber) =>
        scheduler.schedule(dispatch$7, 0, { error, subscriber })
      );
    }
  }
  function dispatch$7({ error, subscriber }) {
    subscriber.error(error);
  }

  exports.NotificationKind = void 0;
  (function (NotificationKind) {
    NotificationKind['NEXT'] = 'N';
    NotificationKind['ERROR'] = 'E';
    NotificationKind['COMPLETE'] = 'C';
  })(exports.NotificationKind || (exports.NotificationKind = {}));
  class Notification {
    constructor(kind, value, error) {
      this.kind = kind;
      this.value = value;
      this.error = error;
      this.hasValue = kind === 'N';
    }
    observe(observer) {
      switch (this.kind) {
        case 'N':
          return observer.next && observer.next(this.value);
        case 'E':
          return observer.error && observer.error(this.error);
        case 'C':
          return observer.complete && observer.complete();
      }
    }
    do(next, error, complete) {
      const kind = this.kind;
      switch (kind) {
        case 'N':
          return next && next(this.value);
        case 'E':
          return error && error(this.error);
        case 'C':
          return complete && complete();
      }
    }
    accept(nextOrObserver, error, complete) {
      if (nextOrObserver && typeof nextOrObserver.next === 'function') {
        return this.observe(nextOrObserver);
      } else {
        return this.do(nextOrObserver, error, complete);
      }
    }
    toObservable() {
      const kind = this.kind;
      switch (kind) {
        case 'N':
          return of(this.value);
        case 'E':
          return throwError(this.error);
        case 'C':
          return empty();
      }
      throw new Error('unexpected notification kind value');
    }
    static createNext(value) {
      if (typeof value !== 'undefined') {
        return new Notification('N', value);
      }
      return Notification.undefinedValueNotification;
    }
    static createError(err) {
      return new Notification('E', undefined, err);
    }
    static createComplete() {
      return Notification.completeNotification;
    }
  }
  Notification.completeNotification = new Notification('C');
  Notification.undefinedValueNotification = new Notification('N', undefined);

  class ObserveOnSubscriber extends Subscriber {
    constructor(destination, scheduler, delay = 0) {
      super(destination);
      this.scheduler = scheduler;
      this.delay = delay;
    }
    static dispatch(arg) {
      const { notification, destination } = arg;
      notification.observe(destination);
      this.unsubscribe();
    }
    scheduleMessage(notification) {
      const destination = this.destination;
      destination.add(
        this.scheduler.schedule(
          ObserveOnSubscriber.dispatch,
          this.delay,
          new ObserveOnMessage(notification, this.destination)
        )
      );
    }
    _next(value) {
      this.scheduleMessage(Notification.createNext(value));
    }
    _error(err) {
      this.scheduleMessage(Notification.createError(err));
      this.unsubscribe();
    }
    _complete() {
      this.scheduleMessage(Notification.createComplete());
      this.unsubscribe();
    }
  }
  class ObserveOnMessage {
    constructor(notification, destination) {
      this.notification = notification;
      this.destination = destination;
    }
  }

  class ReplaySubject extends Subject {
    constructor(
      bufferSize = Number.POSITIVE_INFINITY,
      windowTime = Number.POSITIVE_INFINITY,
      scheduler
    ) {
      super();
      this.scheduler = scheduler;
      this._events = [];
      this._infiniteTimeWindow = false;
      this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
      this._windowTime = windowTime < 1 ? 1 : windowTime;
      if (windowTime === Number.POSITIVE_INFINITY) {
        this._infiniteTimeWindow = true;
        this.next = this.nextInfiniteTimeWindow;
      } else {
        this.next = this.nextTimeWindow;
      }
    }
    nextInfiniteTimeWindow(value) {
      if (!this.isStopped) {
        const _events = this._events;
        _events.push(value);
        if (_events.length > this._bufferSize) {
          _events.shift();
        }
      }
      super.next(value);
    }
    nextTimeWindow(value) {
      if (!this.isStopped) {
        this._events.push(new ReplayEvent(this._getNow(), value));
        this._trimBufferThenGetEvents();
      }
      super.next(value);
    }
    _subscribe(subscriber) {
      const _infiniteTimeWindow = this._infiniteTimeWindow;
      const _events = _infiniteTimeWindow
        ? this._events
        : this._trimBufferThenGetEvents();
      const scheduler = this.scheduler;
      const len = _events.length;
      let subscription;
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else if (this.isStopped || this.hasError) {
        subscription = Subscription.EMPTY;
      } else {
        this.observers.push(subscriber);
        subscription = new SubjectSubscription(this, subscriber);
      }
      if (scheduler) {
        subscriber.add(
          (subscriber = new ObserveOnSubscriber(subscriber, scheduler))
        );
      }
      if (_infiniteTimeWindow) {
        for (let i = 0; i < len && !subscriber.closed; i++) {
          subscriber.next(_events[i]);
        }
      } else {
        for (let i = 0; i < len && !subscriber.closed; i++) {
          subscriber.next(_events[i].value);
        }
      }
      if (this.hasError) {
        subscriber.error(this.thrownError);
      } else if (this.isStopped) {
        subscriber.complete();
      }
      return subscription;
    }
    _getNow() {
      return (this.scheduler || queue).now();
    }
    _trimBufferThenGetEvents() {
      const now = this._getNow();
      const _bufferSize = this._bufferSize;
      const _windowTime = this._windowTime;
      const _events = this._events;
      const eventsCount = _events.length;
      let spliceCount = 0;
      while (spliceCount < eventsCount) {
        if (now - _events[spliceCount].time < _windowTime) {
          break;
        }
        spliceCount++;
      }
      if (eventsCount > _bufferSize) {
        spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
      }
      if (spliceCount > 0) {
        _events.splice(0, spliceCount);
      }
      return _events;
    }
  }
  class ReplayEvent {
    constructor(time, value) {
      this.time = time;
      this.value = value;
    }
  }

  class AsyncSubject extends Subject {
    constructor() {
      super(...arguments);
      this.value = null;
      this.hasNext = false;
      this.hasCompleted = false;
    }
    _subscribe(subscriber) {
      if (this.hasError) {
        subscriber.error(this.thrownError);
        return Subscription.EMPTY;
      } else if (this.hasCompleted && this.hasNext) {
        subscriber.next(this.value);
        subscriber.complete();
        return Subscription.EMPTY;
      }
      return super._subscribe(subscriber);
    }
    next(value) {
      if (!this.hasCompleted) {
        this.value = value;
        this.hasNext = true;
      }
    }
    error(error) {
      if (!this.hasCompleted) {
        super.error(error);
      }
    }
    complete() {
      this.hasCompleted = true;
      if (this.hasNext) {
        super.next(this.value);
      }
      super.complete();
    }
  }

  let nextHandle = 1;
  const RESOLVED = (() => Promise.resolve())();
  const activeHandles = {};
  function findAndClearHandle(handle) {
    if (handle in activeHandles) {
      delete activeHandles[handle];
      return true;
    }
    return false;
  }
  const Immediate = {
    setImmediate(cb) {
      const handle = nextHandle++;
      activeHandles[handle] = true;
      RESOLVED.then(() => findAndClearHandle(handle) && cb());
      return handle;
    },
    clearImmediate(handle) {
      findAndClearHandle(handle);
    },
  };

  class AsapAction extends AsyncAction {
    constructor(scheduler, work) {
      super(scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
    }
    requestAsyncId(scheduler, id, delay = 0) {
      if (delay !== null && delay > 0) {
        return super.requestAsyncId(scheduler, id, delay);
      }
      scheduler.actions.push(this);
      return (
        scheduler.scheduled ||
        (scheduler.scheduled = Immediate.setImmediate(
          scheduler.flush.bind(scheduler, null)
        ))
      );
    }
    recycleAsyncId(scheduler, id, delay = 0) {
      if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
        return super.recycleAsyncId(scheduler, id, delay);
      }
      if (scheduler.actions.length === 0) {
        Immediate.clearImmediate(id);
        scheduler.scheduled = undefined;
      }
      return undefined;
    }
  }

  class AsapScheduler extends AsyncScheduler {
    flush(action) {
      this.active = true;
      this.scheduled = undefined;
      const { actions } = this;
      let error;
      let index = -1;
      let count = actions.length;
      action = action || actions.shift();
      do {
        if ((error = action.execute(action.state, action.delay))) {
          break;
        }
      } while (++index < count && (action = actions.shift()));
      this.active = false;
      if (error) {
        while (++index < count && (action = actions.shift())) {
          action.unsubscribe();
        }
        throw error;
      }
    }
  }

  const asapScheduler = new AsapScheduler(AsapAction);
  const asap = asapScheduler;

  const asyncScheduler = new AsyncScheduler(AsyncAction);
  const async = asyncScheduler;

  class AnimationFrameAction extends AsyncAction {
    constructor(scheduler, work) {
      super(scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
    }
    requestAsyncId(scheduler, id, delay = 0) {
      if (delay !== null && delay > 0) {
        return super.requestAsyncId(scheduler, id, delay);
      }
      scheduler.actions.push(this);
      return (
        scheduler.scheduled ||
        (scheduler.scheduled = requestAnimationFrame(() =>
          scheduler.flush(null)
        ))
      );
    }
    recycleAsyncId(scheduler, id, delay = 0) {
      if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
        return super.recycleAsyncId(scheduler, id, delay);
      }
      if (scheduler.actions.length === 0) {
        cancelAnimationFrame(id);
        scheduler.scheduled = undefined;
      }
      return undefined;
    }
  }

  class AnimationFrameScheduler extends AsyncScheduler {
    flush(action) {
      this.active = true;
      this.scheduled = undefined;
      const { actions } = this;
      let error;
      let index = -1;
      let count = actions.length;
      action = action || actions.shift();
      do {
        if ((error = action.execute(action.state, action.delay))) {
          break;
        }
      } while (++index < count && (action = actions.shift()));
      this.active = false;
      if (error) {
        while (++index < count && (action = actions.shift())) {
          action.unsubscribe();
        }
        throw error;
      }
    }
  }

  const animationFrameScheduler = new AnimationFrameScheduler(
    AnimationFrameAction
  );
  const animationFrame = animationFrameScheduler;

  class VirtualTimeScheduler extends AsyncScheduler {
    constructor(
      SchedulerAction = VirtualAction,
      maxFrames = Number.POSITIVE_INFINITY
    ) {
      super(SchedulerAction, () => this.frame);
      this.maxFrames = maxFrames;
      this.frame = 0;
      this.index = -1;
    }
    flush() {
      const { actions, maxFrames } = this;
      let error, action;
      while ((action = actions[0]) && action.delay <= maxFrames) {
        actions.shift();
        this.frame = action.delay;
        if ((error = action.execute(action.state, action.delay))) {
          break;
        }
      }
      if (error) {
        while ((action = actions.shift())) {
          action.unsubscribe();
        }
        throw error;
      }
    }
  }
  VirtualTimeScheduler.frameTimeFactor = 10;
  class VirtualAction extends AsyncAction {
    constructor(scheduler, work, index = (scheduler.index += 1)) {
      super(scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
      this.index = index;
      this.active = true;
      this.index = scheduler.index = index;
    }
    schedule(state, delay = 0) {
      if (!this.id) {
        return super.schedule(state, delay);
      }
      this.active = false;
      const action = new VirtualAction(this.scheduler, this.work);
      this.add(action);
      return action.schedule(state, delay);
    }
    requestAsyncId(scheduler, id, delay = 0) {
      this.delay = scheduler.frame + delay;
      const { actions } = scheduler;
      actions.push(this);
      actions.sort(VirtualAction.sortActions);
      return true;
    }
    recycleAsyncId(scheduler, id, delay = 0) {
      return undefined;
    }
    _execute(state, delay) {
      if (this.active === true) {
        return super._execute(state, delay);
      }
    }
    static sortActions(a, b) {
      if (a.delay === b.delay) {
        if (a.index === b.index) {
          return 0;
        } else if (a.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.delay > b.delay) {
        return 1;
      } else {
        return -1;
      }
    }
  }

  function noop() {}

  function isObservable(obj) {
    return (
      !!obj &&
      (obj instanceof Observable ||
        (typeof obj.lift === 'function' && typeof obj.subscribe === 'function'))
    );
  }

  const ArgumentOutOfRangeErrorImpl = (() => {
    function ArgumentOutOfRangeErrorImpl() {
      Error.call(this);
      this.message = 'argument out of range';
      this.name = 'ArgumentOutOfRangeError';
      return this;
    }
    ArgumentOutOfRangeErrorImpl.prototype = Object.create(Error.prototype);
    return ArgumentOutOfRangeErrorImpl;
  })();
  const ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

  const EmptyErrorImpl = (() => {
    function EmptyErrorImpl() {
      Error.call(this);
      this.message = 'no elements in sequence';
      this.name = 'EmptyError';
      return this;
    }
    EmptyErrorImpl.prototype = Object.create(Error.prototype);
    return EmptyErrorImpl;
  })();
  const EmptyError = EmptyErrorImpl;

  const TimeoutErrorImpl = (() => {
    function TimeoutErrorImpl() {
      Error.call(this);
      this.message = 'Timeout has occurred';
      this.name = 'TimeoutError';
      return this;
    }
    TimeoutErrorImpl.prototype = Object.create(Error.prototype);
    return TimeoutErrorImpl;
  })();
  const TimeoutError = TimeoutErrorImpl;

  function map(project, thisArg) {
    return function mapOperation(source) {
      if (typeof project !== 'function') {
        throw new TypeError(
          'argument is not a function. Are you looking for `mapTo()`?'
        );
      }
      return source.lift(new MapOperator(project, thisArg));
    };
  }
  class MapOperator {
    constructor(project, thisArg) {
      this.project = project;
      this.thisArg = thisArg;
    }
    call(subscriber, source) {
      return source.subscribe(
        new MapSubscriber(subscriber, this.project, this.thisArg)
      );
    }
  }
  class MapSubscriber extends Subscriber {
    constructor(destination, project, thisArg) {
      super(destination);
      this.project = project;
      this.count = 0;
      this.thisArg = thisArg || this;
    }
    _next(value) {
      let result;
      try {
        result = this.project.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    }
  }

  function bindCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
      if (isScheduler(resultSelector)) {
        scheduler = resultSelector;
      } else {
        return (...args) =>
          bindCallback(
            callbackFunc,
            scheduler
          )(...args).pipe(
            map((args) =>
              isArray(args) ? resultSelector(...args) : resultSelector(args)
            )
          );
      }
    }
    return function (...args) {
      const context = this;
      let subject;
      const params = {
        context,
        subject,
        callbackFunc,
        scheduler,
      };
      return new Observable((subscriber) => {
        if (!scheduler) {
          if (!subject) {
            subject = new AsyncSubject();
            const handler = (...innerArgs) => {
              subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
              subject.complete();
            };
            try {
              callbackFunc.apply(context, [...args, handler]);
            } catch (err) {
              if (canReportError(subject)) {
                subject.error(err);
              } else {
                console.warn(err);
              }
            }
          }
          return subject.subscribe(subscriber);
        } else {
          const state = {
            args,
            subscriber,
            params,
          };
          return scheduler.schedule(dispatch$6, 0, state);
        }
      });
    };
  }
  function dispatch$6(state) {
    const { args, subscriber, params } = state;
    const { callbackFunc, context, scheduler } = params;
    let { subject } = params;
    if (!subject) {
      subject = params.subject = new AsyncSubject();
      const handler = (...innerArgs) => {
        const value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
        this.add(scheduler.schedule(dispatchNext$1, 0, { value, subject }));
      };
      try {
        callbackFunc.apply(context, [...args, handler]);
      } catch (err) {
        subject.error(err);
      }
    }
    this.add(subject.subscribe(subscriber));
  }
  function dispatchNext$1(state) {
    const { value, subject } = state;
    subject.next(value);
    subject.complete();
  }

  function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
      if (isScheduler(resultSelector)) {
        scheduler = resultSelector;
      } else {
        return (...args) =>
          bindNodeCallback(
            callbackFunc,
            scheduler
          )(...args).pipe(
            map((args) =>
              isArray(args) ? resultSelector(...args) : resultSelector(args)
            )
          );
      }
    }
    return function (...args) {
      const params = {
        subject: undefined,
        args,
        callbackFunc,
        scheduler,
        context: this,
      };
      return new Observable((subscriber) => {
        const { context } = params;
        let { subject } = params;
        if (!scheduler) {
          if (!subject) {
            subject = params.subject = new AsyncSubject();
            const handler = (...innerArgs) => {
              const err = innerArgs.shift();
              if (err) {
                subject.error(err);
                return;
              }
              subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
              subject.complete();
            };
            try {
              callbackFunc.apply(context, [...args, handler]);
            } catch (err) {
              if (canReportError(subject)) {
                subject.error(err);
              } else {
                console.warn(err);
              }
            }
          }
          return subject.subscribe(subscriber);
        } else {
          return scheduler.schedule(dispatch$5, 0, {
            params,
            subscriber,
            context,
          });
        }
      });
    };
  }
  function dispatch$5(state) {
    const { params, subscriber, context } = state;
    const { callbackFunc, args, scheduler } = params;
    let subject = params.subject;
    if (!subject) {
      subject = params.subject = new AsyncSubject();
      const handler = (...innerArgs) => {
        const err = innerArgs.shift();
        if (err) {
          this.add(scheduler.schedule(dispatchError, 0, { err, subject }));
        } else {
          const value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
          this.add(scheduler.schedule(dispatchNext, 0, { value, subject }));
        }
      };
      try {
        callbackFunc.apply(context, [...args, handler]);
      } catch (err) {
        this.add(scheduler.schedule(dispatchError, 0, { err, subject }));
      }
    }
    this.add(subject.subscribe(subscriber));
  }
  function dispatchNext(arg) {
    const { value, subject } = arg;
    subject.next(value);
    subject.complete();
  }
  function dispatchError(arg) {
    const { err, subject } = arg;
    subject.error(err);
  }

  class OuterSubscriber extends Subscriber {
    notifyNext(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(innerValue);
    }
    notifyError(error, innerSub) {
      this.destination.error(error);
    }
    notifyComplete(innerSub) {
      this.destination.complete();
    }
  }

  class InnerSubscriber extends Subscriber {
    constructor(parent, outerValue, outerIndex) {
      super();
      this.parent = parent;
      this.outerValue = outerValue;
      this.outerIndex = outerIndex;
      this.index = 0;
    }
    _next(value) {
      this.parent.notifyNext(
        this.outerValue,
        value,
        this.outerIndex,
        this.index++,
        this
      );
    }
    _error(error) {
      this.parent.notifyError(error, this);
      this.unsubscribe();
    }
    _complete() {
      this.parent.notifyComplete(this);
      this.unsubscribe();
    }
  }

  const subscribeToPromise = (promise) => (subscriber) => {
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
      .then(null, hostReportError);
    return subscriber;
  };

  function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
      return '@@iterator';
    }
    return Symbol.iterator;
  }
  const iterator = getSymbolIterator();

  const subscribeToIterable = (iterable) => (subscriber) => {
    const iterator$1 = iterable[iterator]();
    do {
      let item;
      try {
        item = iterator$1.next();
      } catch (err) {
        subscriber.error(err);
        return subscriber;
      }
      if (item.done) {
        subscriber.complete();
        break;
      }
      subscriber.next(item.value);
      if (subscriber.closed) {
        break;
      }
    } while (true);
    if (typeof iterator$1.return === 'function') {
      subscriber.add(() => {
        if (iterator$1.return) {
          iterator$1.return();
        }
      });
    }
    return subscriber;
  };

  const subscribeToObservable = (obj) => (subscriber) => {
    const obs = obj[observable]();
    if (typeof obs.subscribe !== 'function') {
      throw new TypeError(
        'Provided object does not correctly implement Symbol.observable'
      );
    } else {
      return obs.subscribe(subscriber);
    }
  };

  const isArrayLike = (x) =>
    x && typeof x.length === 'number' && typeof x !== 'function';

  function isPromise(value) {
    return (
      !!value &&
      typeof value.subscribe !== 'function' &&
      typeof value.then === 'function'
    );
  }

  const subscribeTo = (result) => {
    if (!!result && typeof result[observable] === 'function') {
      return subscribeToObservable(result);
    } else if (isArrayLike(result)) {
      return subscribeToArray(result);
    } else if (isPromise(result)) {
      return subscribeToPromise(result);
    } else if (!!result && typeof result[iterator] === 'function') {
      return subscribeToIterable(result);
    } else {
      const value = isObject(result) ? 'an invalid object' : `'${result}'`;
      const msg =
        `You provided ${value} where a stream was expected.` +
        ' You can provide an Observable, Promise, Array, or Iterable.';
      throw new TypeError(msg);
    }
  };

  function subscribeToResult(
    outerSubscriber,
    result,
    outerValue,
    outerIndex,
    innerSubscriber = new InnerSubscriber(
      outerSubscriber,
      outerValue,
      outerIndex
    )
  ) {
    if (innerSubscriber.closed) {
      return undefined;
    }
    if (result instanceof Observable) {
      return result.subscribe(innerSubscriber);
    }
    return subscribeTo(result)(innerSubscriber);
  }

  const NONE = {};
  function combineLatest(...observables) {
    let resultSelector = undefined;
    let scheduler = undefined;
    if (isScheduler(observables[observables.length - 1])) {
      scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
      resultSelector = observables.pop();
    }
    if (observables.length === 1 && isArray(observables[0])) {
      observables = observables[0];
    }
    return fromArray(observables, scheduler).lift(
      new CombineLatestOperator(resultSelector)
    );
  }
  class CombineLatestOperator {
    constructor(resultSelector) {
      this.resultSelector = resultSelector;
    }
    call(subscriber, source) {
      return source.subscribe(
        new CombineLatestSubscriber(subscriber, this.resultSelector)
      );
    }
  }
  class CombineLatestSubscriber extends OuterSubscriber {
    constructor(destination, resultSelector) {
      super(destination);
      this.resultSelector = resultSelector;
      this.active = 0;
      this.values = [];
      this.observables = [];
    }
    _next(observable) {
      this.values.push(NONE);
      this.observables.push(observable);
    }
    _complete() {
      const observables = this.observables;
      const len = observables.length;
      if (len === 0) {
        this.destination.complete();
      } else {
        this.active = len;
        this.toRespond = len;
        for (let i = 0; i < len; i++) {
          const observable = observables[i];
          this.add(subscribeToResult(this, observable, undefined, i));
        }
      }
    }
    notifyComplete(unused) {
      if ((this.active -= 1) === 0) {
        this.destination.complete();
      }
    }
    notifyNext(_outerValue, innerValue, outerIndex) {
      const values = this.values;
      const oldVal = values[outerIndex];
      const toRespond = !this.toRespond
        ? 0
        : oldVal === NONE
        ? --this.toRespond
        : this.toRespond;
      values[outerIndex] = innerValue;
      if (toRespond === 0) {
        if (this.resultSelector) {
          this._tryResultSelector(values);
        } else {
          this.destination.next(values.slice());
        }
      }
    }
    _tryResultSelector(values) {
      let result;
      try {
        result = this.resultSelector.apply(this, values);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    }
  }

  function scheduleObservable(input, scheduler) {
    return new Observable((subscriber) => {
      const sub = new Subscription();
      sub.add(
        scheduler.schedule(() => {
          const observable$1 = input[observable]();
          sub.add(
            observable$1.subscribe({
              next(value) {
                sub.add(scheduler.schedule(() => subscriber.next(value)));
              },
              error(err) {
                sub.add(scheduler.schedule(() => subscriber.error(err)));
              },
              complete() {
                sub.add(scheduler.schedule(() => subscriber.complete()));
              },
            })
          );
        })
      );
      return sub;
    });
  }

  function schedulePromise(input, scheduler) {
    return new Observable((subscriber) => {
      const sub = new Subscription();
      sub.add(
        scheduler.schedule(() =>
          input.then(
            (value) => {
              sub.add(
                scheduler.schedule(() => {
                  subscriber.next(value);
                  sub.add(scheduler.schedule(() => subscriber.complete()));
                })
              );
            },
            (err) => {
              sub.add(scheduler.schedule(() => subscriber.error(err)));
            }
          )
        )
      );
      return sub;
    });
  }

  function scheduleIterable(input, scheduler) {
    if (!input) {
      throw new Error('Iterable cannot be null');
    }
    return new Observable((subscriber) => {
      const sub = new Subscription();
      let iterator$1;
      sub.add(() => {
        if (iterator$1 && typeof iterator$1.return === 'function') {
          iterator$1.return();
        }
      });
      sub.add(
        scheduler.schedule(() => {
          iterator$1 = input[iterator]();
          sub.add(
            scheduler.schedule(function () {
              if (subscriber.closed) {
                return;
              }
              let value;
              let done;
              try {
                const result = iterator$1.next();
                value = result.value;
                done = result.done;
              } catch (err) {
                subscriber.error(err);
                return;
              }
              if (done) {
                subscriber.complete();
              } else {
                subscriber.next(value);
                this.schedule();
              }
            })
          );
        })
      );
      return sub;
    });
  }

  function isInteropObservable(input) {
    return input && typeof input[observable] === 'function';
  }

  function isIterable(input) {
    return input && typeof input[iterator] === 'function';
  }

  function scheduled(input, scheduler) {
    if (input != null) {
      if (isInteropObservable(input)) {
        return scheduleObservable(input, scheduler);
      } else if (isPromise(input)) {
        return schedulePromise(input, scheduler);
      } else if (isArrayLike(input)) {
        return scheduleArray(input, scheduler);
      } else if (isIterable(input) || typeof input === 'string') {
        return scheduleIterable(input, scheduler);
      }
    }
    throw new TypeError(
      ((input !== null && typeof input) || input) + ' is not observable'
    );
  }

  function from(input, scheduler) {
    if (!scheduler) {
      if (input instanceof Observable) {
        return input;
      }
      return new Observable(subscribeTo(input));
    } else {
      return scheduled(input, scheduler);
    }
  }

  class SimpleInnerSubscriber extends Subscriber {
    constructor(parent) {
      super();
      this.parent = parent;
    }
    _next(value) {
      this.parent.notifyNext(value);
    }
    _error(error) {
      this.parent.notifyError(error);
      this.unsubscribe();
    }
    _complete() {
      this.parent.notifyComplete();
      this.unsubscribe();
    }
  }
  class SimpleOuterSubscriber extends Subscriber {
    notifyNext(innerValue) {
      this.destination.next(innerValue);
    }
    notifyError(err) {
      this.destination.error(err);
    }
    notifyComplete() {
      this.destination.complete();
    }
  }
  function innerSubscribe(result, innerSubscriber) {
    if (innerSubscriber.closed) {
      return undefined;
    }
    if (result instanceof Observable) {
      return result.subscribe(innerSubscriber);
    }
    let subscription;
    try {
      subscription = subscribeTo(result)(innerSubscriber);
    } catch (error) {
      innerSubscriber.error(error);
    }
    return subscription;
  }

  function mergeMap(
    project,
    resultSelector,
    concurrent = Number.POSITIVE_INFINITY
  ) {
    if (typeof resultSelector === 'function') {
      return (source) =>
        source.pipe(
          mergeMap(
            (a, i) =>
              from(project(a, i)).pipe(
                map((b, ii) => resultSelector(a, b, i, ii))
              ),
            concurrent
          )
        );
    } else if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
    }
    return (source) => source.lift(new MergeMapOperator(project, concurrent));
  }
  class MergeMapOperator {
    constructor(project, concurrent = Number.POSITIVE_INFINITY) {
      this.project = project;
      this.concurrent = concurrent;
    }
    call(observer, source) {
      return source.subscribe(
        new MergeMapSubscriber(observer, this.project, this.concurrent)
      );
    }
  }
  class MergeMapSubscriber extends SimpleOuterSubscriber {
    constructor(destination, project, concurrent = Number.POSITIVE_INFINITY) {
      super(destination);
      this.project = project;
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
      this.index = 0;
    }
    _next(value) {
      if (this.active < this.concurrent) {
        this._tryNext(value);
      } else {
        this.buffer.push(value);
      }
    }
    _tryNext(value) {
      let result;
      const index = this.index++;
      try {
        result = this.project(value, index);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.active++;
      this._innerSub(result);
    }
    _innerSub(ish) {
      const innerSubscriber = new SimpleInnerSubscriber(this);
      const destination = this.destination;
      destination.add(innerSubscriber);
      const innerSubscription = innerSubscribe(ish, innerSubscriber);
      if (innerSubscription !== innerSubscriber) {
        destination.add(innerSubscription);
      }
    }
    _complete() {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
      this.unsubscribe();
    }
    notifyNext(innerValue) {
      this.destination.next(innerValue);
    }
    notifyComplete() {
      const buffer = this.buffer;
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    }
  }

  function mergeAll(concurrent = Number.POSITIVE_INFINITY) {
    return mergeMap(identity, concurrent);
  }

  function concatAll() {
    return mergeAll(1);
  }

  function concat(...observables) {
    return concatAll()(of(...observables));
  }

  function defer(observableFactory) {
    return new Observable((subscriber) => {
      let input;
      try {
        input = observableFactory();
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
      const source = input ? from(input) : empty();
      return source.subscribe(subscriber);
    });
  }

  function forkJoin(...sources) {
    if (sources.length === 1) {
      const first = sources[0];
      if (isArray(first)) {
        return forkJoinInternal(first, null);
      }
      if (
        isObject(first) &&
        Object.getPrototypeOf(first) === Object.prototype
      ) {
        const keys = Object.keys(first);
        return forkJoinInternal(
          keys.map((key) => first[key]),
          keys
        );
      }
    }
    if (typeof sources[sources.length - 1] === 'function') {
      const resultSelector = sources.pop();
      sources =
        sources.length === 1 && isArray(sources[0]) ? sources[0] : sources;
      return forkJoinInternal(sources, null).pipe(
        map((args) => resultSelector(...args))
      );
    }
    return forkJoinInternal(sources, null);
  }
  function forkJoinInternal(sources, keys) {
    return new Observable((subscriber) => {
      const len = sources.length;
      if (len === 0) {
        subscriber.complete();
        return;
      }
      const values = new Array(len);
      let completed = 0;
      let emitted = 0;
      for (let i = 0; i < len; i++) {
        const source = from(sources[i]);
        let hasValue = false;
        subscriber.add(
          source.subscribe({
            next: (value) => {
              if (!hasValue) {
                hasValue = true;
                emitted++;
              }
              values[i] = value;
            },
            error: (err) => subscriber.error(err),
            complete: () => {
              completed++;
              if (completed === len || !hasValue) {
                if (emitted === len) {
                  subscriber.next(
                    keys
                      ? keys.reduce(
                          (result, key, i) => (
                            (result[key] = values[i]), result
                          ),
                          {}
                        )
                      : values
                  );
                }
                subscriber.complete();
              }
            },
          })
        );
      }
    });
  }

  function fromEvent(target, eventName, options, resultSelector) {
    if (isFunction(options)) {
      resultSelector = options;
      options = undefined;
    }
    if (resultSelector) {
      return fromEvent(target, eventName, options).pipe(
        map((args) =>
          isArray(args) ? resultSelector(...args) : resultSelector(args)
        )
      );
    }
    return new Observable((subscriber) => {
      function handler(e) {
        if (arguments.length > 1) {
          subscriber.next(Array.prototype.slice.call(arguments));
        } else {
          subscriber.next(e);
        }
      }
      setupSubscription(target, eventName, handler, subscriber, options);
    });
  }
  function setupSubscription(
    sourceObj,
    eventName,
    handler,
    subscriber,
    options
  ) {
    let unsubscribe;
    if (isEventTarget(sourceObj)) {
      const source = sourceObj;
      sourceObj.addEventListener(eventName, handler, options);
      unsubscribe = () =>
        source.removeEventListener(eventName, handler, options);
    } else if (isJQueryStyleEventEmitter(sourceObj)) {
      const source = sourceObj;
      sourceObj.on(eventName, handler);
      unsubscribe = () => source.off(eventName, handler);
    } else if (isNodeStyleEventEmitter(sourceObj)) {
      const source = sourceObj;
      sourceObj.addListener(eventName, handler);
      unsubscribe = () => source.removeListener(eventName, handler);
    } else if (sourceObj && sourceObj.length) {
      for (let i = 0, len = sourceObj.length; i < len; i++) {
        setupSubscription(
          sourceObj[i],
          eventName,
          handler,
          subscriber,
          options
        );
      }
    } else {
      throw new TypeError('Invalid event target');
    }
    subscriber.add(unsubscribe);
  }
  function isNodeStyleEventEmitter(sourceObj) {
    return (
      sourceObj &&
      typeof sourceObj.addListener === 'function' &&
      typeof sourceObj.removeListener === 'function'
    );
  }
  function isJQueryStyleEventEmitter(sourceObj) {
    return (
      sourceObj &&
      typeof sourceObj.on === 'function' &&
      typeof sourceObj.off === 'function'
    );
  }
  function isEventTarget(sourceObj) {
    return (
      sourceObj &&
      typeof sourceObj.addEventListener === 'function' &&
      typeof sourceObj.removeEventListener === 'function'
    );
  }

  function fromEventPattern(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
      return fromEventPattern(addHandler, removeHandler).pipe(
        map((args) =>
          isArray(args) ? resultSelector(...args) : resultSelector(args)
        )
      );
    }
    return new Observable((subscriber) => {
      const handler = (...e) => subscriber.next(e.length === 1 ? e[0] : e);
      let retValue;
      try {
        retValue = addHandler(handler);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
      if (!isFunction(removeHandler)) {
        return undefined;
      }
      return () => removeHandler(handler, retValue);
    });
  }

  function generate(
    initialStateOrOptions,
    condition,
    iterate,
    resultSelectorOrObservable,
    scheduler
  ) {
    let resultSelector;
    let initialState;
    if (arguments.length == 1) {
      const options = initialStateOrOptions;
      initialState = options.initialState;
      condition = options.condition;
      iterate = options.iterate;
      resultSelector = options.resultSelector || identity;
      scheduler = options.scheduler;
    } else if (
      resultSelectorOrObservable === undefined ||
      isScheduler(resultSelectorOrObservable)
    ) {
      initialState = initialStateOrOptions;
      resultSelector = identity;
      scheduler = resultSelectorOrObservable;
    } else {
      initialState = initialStateOrOptions;
      resultSelector = resultSelectorOrObservable;
    }
    return new Observable((subscriber) => {
      let state = initialState;
      if (scheduler) {
        return scheduler.schedule(dispatch$4, 0, {
          subscriber,
          iterate,
          condition,
          resultSelector,
          state,
        });
      }
      do {
        if (condition) {
          let conditionResult;
          try {
            conditionResult = condition(state);
          } catch (err) {
            subscriber.error(err);
            return undefined;
          }
          if (!conditionResult) {
            subscriber.complete();
            break;
          }
        }
        let value;
        try {
          value = resultSelector(state);
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }
        subscriber.next(value);
        if (subscriber.closed) {
          break;
        }
        try {
          state = iterate(state);
        } catch (err) {
          subscriber.error(err);
          return undefined;
        }
      } while (true);
      return undefined;
    });
  }
  function dispatch$4(state) {
    const { subscriber, condition } = state;
    if (subscriber.closed) {
      return undefined;
    }
    if (state.needIterate) {
      try {
        state.state = state.iterate(state.state);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
    } else {
      state.needIterate = true;
    }
    if (condition) {
      let conditionResult;
      try {
        conditionResult = condition(state.state);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
      if (!conditionResult) {
        subscriber.complete();
        return undefined;
      }
      if (subscriber.closed) {
        return undefined;
      }
    }
    let value;
    try {
      value = state.resultSelector(state.state);
    } catch (err) {
      subscriber.error(err);
      return undefined;
    }
    if (subscriber.closed) {
      return undefined;
    }
    subscriber.next(value);
    if (subscriber.closed) {
      return undefined;
    }
    return this.schedule(state);
  }

  function iif(condition, trueResult = EMPTY, falseResult = EMPTY) {
    return defer(() => (condition() ? trueResult : falseResult));
  }

  function isNumeric(val) {
    return !isArray(val) && val - parseFloat(val) + 1 >= 0;
  }

  function interval(period = 0, scheduler = async) {
    if (!isNumeric(period) || period < 0) {
      period = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
      scheduler = async;
    }
    return new Observable((subscriber) => {
      subscriber.add(
        scheduler.schedule(dispatch$3, period, {
          subscriber,
          counter: 0,
          period,
        })
      );
      return subscriber;
    });
  }
  function dispatch$3(state) {
    const { subscriber, counter, period } = state;
    subscriber.next(counter);
    this.schedule({ subscriber, counter: counter + 1, period }, period);
  }

  function merge(...observables) {
    let concurrent = Number.POSITIVE_INFINITY;
    let scheduler = null;
    let last = observables[observables.length - 1];
    if (isScheduler(last)) {
      scheduler = observables.pop();
      if (
        observables.length > 1 &&
        typeof observables[observables.length - 1] === 'number'
      ) {
        concurrent = observables.pop();
      }
    } else if (typeof last === 'number') {
      concurrent = observables.pop();
    }
    if (
      scheduler === null &&
      observables.length === 1 &&
      observables[0] instanceof Observable
    ) {
      return observables[0];
    }
    return mergeAll(concurrent)(fromArray(observables, scheduler));
  }

  const NEVER = new Observable(noop);
  function never() {
    return NEVER;
  }

  function onErrorResumeNext(...sources) {
    if (sources.length === 0) {
      return EMPTY;
    }
    const [first, ...remainder] = sources;
    if (sources.length === 1 && isArray(first)) {
      return onErrorResumeNext(...first);
    }
    return new Observable((subscriber) => {
      const subNext = () =>
        subscriber.add(onErrorResumeNext(...remainder).subscribe(subscriber));
      return from(first).subscribe({
        next(value) {
          subscriber.next(value);
        },
        error: subNext,
        complete: subNext,
      });
    });
  }

  function pairs(obj, scheduler) {
    if (!scheduler) {
      return new Observable((subscriber) => {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length && !subscriber.closed; i++) {
          const key = keys[i];
          if (obj.hasOwnProperty(key)) {
            subscriber.next([key, obj[key]]);
          }
        }
        subscriber.complete();
      });
    } else {
      return new Observable((subscriber) => {
        const keys = Object.keys(obj);
        const subscription = new Subscription();
        subscription.add(
          scheduler.schedule(dispatch$2, 0, {
            keys,
            index: 0,
            subscriber,
            subscription,
            obj,
          })
        );
        return subscription;
      });
    }
  }
  function dispatch$2(state) {
    const { keys, index, subscriber, subscription, obj } = state;
    if (!subscriber.closed) {
      if (index < keys.length) {
        const key = keys[index];
        subscriber.next([key, obj[key]]);
        subscription.add(
          this.schedule({
            keys,
            index: index + 1,
            subscriber,
            subscription,
            obj,
          })
        );
      } else {
        subscriber.complete();
      }
    }
  }

  function not(pred, thisArg) {
    function notPred() {
      return !notPred.pred.apply(notPred.thisArg, arguments);
    }
    notPred.pred = pred;
    notPred.thisArg = thisArg;
    return notPred;
  }

  function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
      return source.lift(new FilterOperator(predicate, thisArg));
    };
  }
  class FilterOperator {
    constructor(predicate, thisArg) {
      this.predicate = predicate;
      this.thisArg = thisArg;
    }
    call(subscriber, source) {
      return source.subscribe(
        new FilterSubscriber(subscriber, this.predicate, this.thisArg)
      );
    }
  }
  class FilterSubscriber extends Subscriber {
    constructor(destination, predicate, thisArg) {
      super(destination);
      this.predicate = predicate;
      this.thisArg = thisArg;
      this.count = 0;
    }
    _next(value) {
      let result;
      try {
        result = this.predicate.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        this.destination.next(value);
      }
    }
  }

  function partition(source, predicate, thisArg) {
    return [
      filter(predicate, thisArg)(new Observable(subscribeTo(source))),
      filter(not(predicate, thisArg))(new Observable(subscribeTo(source))),
    ];
  }

  function race(...observables) {
    if (observables.length === 1) {
      if (isArray(observables[0])) {
        observables = observables[0];
      } else {
        return observables[0];
      }
    }
    return fromArray(observables, undefined).lift(new RaceOperator());
  }
  class RaceOperator {
    call(subscriber, source) {
      return source.subscribe(new RaceSubscriber(subscriber));
    }
  }
  class RaceSubscriber extends OuterSubscriber {
    constructor(destination) {
      super(destination);
      this.hasFirst = false;
      this.observables = [];
      this.subscriptions = [];
    }
    _next(observable) {
      this.observables.push(observable);
    }
    _complete() {
      const observables = this.observables;
      const len = observables.length;
      if (len === 0) {
        this.destination.complete();
      } else {
        for (let i = 0; i < len && !this.hasFirst; i++) {
          const observable = observables[i];
          const subscription = subscribeToResult(
            this,
            observable,
            undefined,
            i
          );
          if (this.subscriptions) {
            this.subscriptions.push(subscription);
          }
          this.add(subscription);
        }
        this.observables = null;
      }
    }
    notifyNext(_outerValue, innerValue, outerIndex) {
      if (!this.hasFirst) {
        this.hasFirst = true;
        for (let i = 0; i < this.subscriptions.length; i++) {
          if (i !== outerIndex) {
            let subscription = this.subscriptions[i];
            subscription.unsubscribe();
            this.remove(subscription);
          }
        }
        this.subscriptions = null;
      }
      this.destination.next(innerValue);
    }
  }

  function range(start = 0, count, scheduler) {
    return new Observable((subscriber) => {
      if (count === undefined) {
        count = start;
        start = 0;
      }
      let index = 0;
      let current = start;
      if (scheduler) {
        return scheduler.schedule(dispatch$1, 0, {
          index,
          count,
          start,
          subscriber,
        });
      } else {
        do {
          if (index++ >= count) {
            subscriber.complete();
            break;
          }
          subscriber.next(current++);
          if (subscriber.closed) {
            break;
          }
        } while (true);
      }
      return undefined;
    });
  }
  function dispatch$1(state) {
    const { start, index, count, subscriber } = state;
    if (index >= count) {
      subscriber.complete();
      return;
    }
    subscriber.next(start);
    if (subscriber.closed) {
      return;
    }
    state.index = index + 1;
    state.start = start + 1;
    this.schedule(state);
  }

  function timer(dueTime = 0, periodOrScheduler, scheduler) {
    let period = -1;
    if (isNumeric(periodOrScheduler)) {
      period =
        (Number(periodOrScheduler) < 1 && 1) || Number(periodOrScheduler);
    } else if (isScheduler(periodOrScheduler)) {
      scheduler = periodOrScheduler;
    }
    if (!isScheduler(scheduler)) {
      scheduler = async;
    }
    return new Observable((subscriber) => {
      const due = isNumeric(dueTime) ? dueTime : +dueTime - scheduler.now();
      return scheduler.schedule(dispatch, due, {
        index: 0,
        period,
        subscriber,
      });
    });
  }
  function dispatch(state) {
    const { index, period, subscriber } = state;
    subscriber.next(index);
    if (subscriber.closed) {
      return;
    } else if (period === -1) {
      return subscriber.complete();
    }
    state.index = index + 1;
    this.schedule(state, period);
  }

  function using(resourceFactory, observableFactory) {
    return new Observable((subscriber) => {
      let resource;
      try {
        resource = resourceFactory();
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
      let result;
      try {
        result = observableFactory(resource);
      } catch (err) {
        subscriber.error(err);
        return undefined;
      }
      const source = result ? from(result) : EMPTY;
      const subscription = source.subscribe(subscriber);
      return () => {
        subscription.unsubscribe();
        if (resource) {
          resource.unsubscribe();
        }
      };
    });
  }

  function zip(...observables) {
    const resultSelector = observables[observables.length - 1];
    if (typeof resultSelector === 'function') {
      observables.pop();
    }
    return fromArray(observables, undefined).lift(
      new ZipOperator(resultSelector)
    );
  }
  class ZipOperator {
    constructor(resultSelector) {
      this.resultSelector = resultSelector;
    }
    call(subscriber, source) {
      return source.subscribe(
        new ZipSubscriber(subscriber, this.resultSelector)
      );
    }
  }
  class ZipSubscriber extends Subscriber {
    constructor(destination, resultSelector, values = Object.create(null)) {
      super(destination);
      this.resultSelector = resultSelector;
      this.iterators = [];
      this.active = 0;
      this.resultSelector =
        typeof resultSelector === 'function' ? resultSelector : undefined;
    }
    _next(value) {
      const iterators = this.iterators;
      if (isArray(value)) {
        iterators.push(new StaticArrayIterator(value));
      } else if (typeof value[iterator] === 'function') {
        iterators.push(new StaticIterator(value[iterator]()));
      } else {
        iterators.push(new ZipBufferIterator(this.destination, this, value));
      }
    }
    _complete() {
      const iterators = this.iterators;
      const len = iterators.length;
      this.unsubscribe();
      if (len === 0) {
        this.destination.complete();
        return;
      }
      this.active = len;
      for (let i = 0; i < len; i++) {
        let iterator = iterators[i];
        if (iterator.stillUnsubscribed) {
          const destination = this.destination;
          destination.add(iterator.subscribe());
        } else {
          this.active--;
        }
      }
    }
    notifyInactive() {
      this.active--;
      if (this.active === 0) {
        this.destination.complete();
      }
    }
    checkIterators() {
      const iterators = this.iterators;
      const len = iterators.length;
      const destination = this.destination;
      for (let i = 0; i < len; i++) {
        let iterator = iterators[i];
        if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
          return;
        }
      }
      let shouldComplete = false;
      const args = [];
      for (let i = 0; i < len; i++) {
        let iterator = iterators[i];
        let result = iterator.next();
        if (iterator.hasCompleted()) {
          shouldComplete = true;
        }
        if (result.done) {
          destination.complete();
          return;
        }
        args.push(result.value);
      }
      if (this.resultSelector) {
        this._tryresultSelector(args);
      } else {
        destination.next(args);
      }
      if (shouldComplete) {
        destination.complete();
      }
    }
    _tryresultSelector(args) {
      let result;
      try {
        result = this.resultSelector.apply(this, args);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    }
  }
  class StaticIterator {
    constructor(iterator) {
      this.iterator = iterator;
      this.nextResult = iterator.next();
    }
    hasValue() {
      return true;
    }
    next() {
      const result = this.nextResult;
      this.nextResult = this.iterator.next();
      return result;
    }
    hasCompleted() {
      const nextResult = this.nextResult;
      return Boolean(nextResult && nextResult.done);
    }
  }
  class StaticArrayIterator {
    constructor(array) {
      this.array = array;
      this.index = 0;
      this.length = 0;
      this.length = array.length;
    }
    [iterator]() {
      return this;
    }
    next(value) {
      const i = this.index++;
      const array = this.array;
      return i < this.length
        ? { value: array[i], done: false }
        : { value: null, done: true };
    }
    hasValue() {
      return this.array.length > this.index;
    }
    hasCompleted() {
      return this.array.length === this.index;
    }
  }
  class ZipBufferIterator extends SimpleOuterSubscriber {
    constructor(destination, parent, observable) {
      super(destination);
      this.parent = parent;
      this.observable = observable;
      this.stillUnsubscribed = true;
      this.buffer = [];
      this.isComplete = false;
    }
    [iterator]() {
      return this;
    }
    next() {
      const buffer = this.buffer;
      if (buffer.length === 0 && this.isComplete) {
        return { value: null, done: true };
      } else {
        return { value: buffer.shift(), done: false };
      }
    }
    hasValue() {
      return this.buffer.length > 0;
    }
    hasCompleted() {
      return this.buffer.length === 0 && this.isComplete;
    }
    notifyComplete() {
      if (this.buffer.length > 0) {
        this.isComplete = true;
        this.parent.notifyInactive();
      } else {
        this.destination.complete();
      }
    }
    notifyNext(innerValue) {
      this.buffer.push(innerValue);
      this.parent.checkIterators();
    }
    subscribe() {
      return innerSubscribe(this.observable, new SimpleInnerSubscriber(this));
    }
  }

  exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
  exports.AsyncSubject = AsyncSubject;
  exports.BehaviorSubject = BehaviorSubject;
  exports.ConnectableObservable = ConnectableObservable;
  exports.EMPTY = EMPTY;
  exports.EmptyError = EmptyError;
  exports.GroupedObservable = GroupedObservable;
  exports.NEVER = NEVER;
  exports.Notification = Notification;
  exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
  exports.Observable = Observable;
  exports.ReplaySubject = ReplaySubject;
  exports.Scheduler = Scheduler;
  exports.Subject = Subject;
  exports.Subscriber = Subscriber;
  exports.Subscription = Subscription;
  exports.TimeoutError = TimeoutError;
  exports.UnsubscriptionError = UnsubscriptionError;
  exports.VirtualAction = VirtualAction;
  exports.VirtualTimeScheduler = VirtualTimeScheduler;
  exports.animationFrame = animationFrame;
  exports.animationFrameScheduler = animationFrameScheduler;
  exports.asap = asap;
  exports.asapScheduler = asapScheduler;
  exports.async = async;
  exports.asyncScheduler = asyncScheduler;
  exports.bindCallback = bindCallback;
  exports.bindNodeCallback = bindNodeCallback;
  exports.combineLatest = combineLatest;
  exports.concat = concat;
  exports.config = config;
  exports.defer = defer;
  exports.empty = empty;
  exports.forkJoin = forkJoin;
  exports.from = from;
  exports.fromEvent = fromEvent;
  exports.fromEventPattern = fromEventPattern;
  exports.generate = generate;
  exports.identity = identity;
  exports.iif = iif;
  exports.interval = interval;
  exports.isObservable = isObservable;
  exports.merge = merge;
  exports.never = never;
  exports.noop = noop;
  exports.observable = observable;
  exports.of = of;
  exports.onErrorResumeNext = onErrorResumeNext;
  exports.pairs = pairs;
  exports.partition = partition;
  exports.pipe = pipe;
  exports.queue = queue;
  exports.queueScheduler = queueScheduler;
  exports.race = race;
  exports.range = range;
  exports.scheduled = scheduled;
  exports.throwError = throwError;
  exports.timer = timer;
  exports.using = using;
  exports.zip = zip;

  Object.defineProperty(exports, '__esModule', { value: true });
});
