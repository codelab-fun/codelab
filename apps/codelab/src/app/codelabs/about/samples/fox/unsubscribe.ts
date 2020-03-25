import { takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: '🦊',
  templateUrl: '🦊.html'
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() readonly request: Observable<void>;
  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  ngOnInit() {
    this.request.pipe(takeUntil(this.destroy)).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next(null);
  }
}
