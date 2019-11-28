import { Runner } from '@codelab/utils/src/lib/sandbox-runner/runners/runner';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

function run(code) {
  return new Observable(function(subscriber) {
    const file = new Blob([code], { type: 'text/javascript' });
    const worker = new Worker(window.URL.createObjectURL(file), {
      name: Math.random().toString(36)
    });

    worker.onerror = e => {
      subscriber.next({
        type: 'error',
        data: e
      });
      subscriber.complete();
      worker.terminate();
    };

    worker.onmessage = function(a) {
      const data = a.data;
      if (data.type === 'complete') {
        worker.terminate();
      }
      subscriber.next(data);
    };

    return () => {
      worker.terminate();
    };
  });
}

export class WebworkerRunner<E> implements Runner {
  private readonly executeSubject = new ReplaySubject(1);
  result$ = this.executeSubject.asObservable().pipe(switchMap(run));

  destroy() {
    this.executeSubject.complete();
  }

  run(code: string) {
    this.executeSubject.next(code);
  }
}
