export function assert(x, message = '') {
  if (x || x === 0) {
    return x;
  } else {
    // tslint:disable-next-line:no-debugger
    debugger;
    throw new Error('Assertion failed! ' + message);
  }
}

export function assertObject(x: Object, message = '') {
  return assert(typeof x === 'object' && x !== null, message);
}
