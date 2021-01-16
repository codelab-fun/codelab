import { WebworkerRunner } from '@codelab/utils/src/lib/sandbox-runner/runners/webworker';
import { Observable } from 'rxjs';

function listenToObservable<T>(obs: Observable<T>) {
  const value: Array<T> = [];
  let error: T | undefined;
  let isComplete = false;
  const sub = obs.subscribe(
    a => value.push(a),
    e => (error = e),
    () => (isComplete = true)
  );

  return {
    unsubscribe: () => sub.unsubscribe(),
    value,
    error,
    isComplete
  };
}

describe('Test runner', () => {
  it('sets initial state', () => {
    const runner = new WebworkerRunner();
    const listener = listenToObservable(runner.result$);
    runner.run('console.log("hey");');
    expect(listener.value).toEqual([]);
    listener.unsubscribe();
  });

  it('handles errors', () => {
    const runner = new WebworkerRunner();
    const listener = listenToObservable(runner.result$);
    runner.run('debugger; throw "lol";');
    expect(listener.value).toEqual([]);
    expect(listener.error).toEqual(undefined);
    listener.unsubscribe();
  });
});
