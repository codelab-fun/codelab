/**
 * Created by kirjs on 11/25/16.
 */
export function assert(x) {
  if (x !== undefined) {
    return x;
  } else {
    debugger
    throw new Error('Assertion failed');
  }
}
