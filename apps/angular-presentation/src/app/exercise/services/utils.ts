export function assert(x, message = '') {
  if (x !== undefined) {
    return x;
  } else {
    // tslint:disable-next-line:no-debugger
    debugger;
    throw new Error('Assertion failed! ' + message);
  }
}
