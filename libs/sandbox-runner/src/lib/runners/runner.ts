import { Observable } from 'rxjs';

export interface Runner {
  run: (code: string) => void;
  destroy: () => void;
  result$: Observable<any>;
}
