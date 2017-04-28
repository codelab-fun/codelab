/**
 * Created by kirjs on 11/25/16.
 */
export function assert(x) {
  if (x !== undefined) {
    return x;
  } else {
    // tslint:disable-next-line:no-debugger
    debugger;
    throw new Error('Assertion failed');
  }
}
