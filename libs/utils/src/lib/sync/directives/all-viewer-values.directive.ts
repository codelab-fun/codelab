import { AfterViewInit, Directive, Input, OnDestroy, Optional } from '@angular/core';
import { SyncService} from '@codelab/utils/src/lib/sync/sync.service';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { SyncStatus } from '@codelab/utils/src/lib/sync/common';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[syncAllUserValues]',
  exportAs: 'allViewerValues'

})
export class AllViewerValuesDirective<T> implements AfterViewInit, OnDestroy {
  @Input() syncAllUserValues: string;
  values: {key: string, value: T}[];
  private onDestroy = new Subject();

  constructor(
    private readonly sync: SyncService<T>,
    @Optional() private readonly control: NgControl
  ) {

  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngAfterViewInit() {
    // this.sync.statusChange$.pipe(
    //   status => status === SyncStatus.PRESENTING
    // )
    // this.sync.whenPresenting$.subscribe(() => {
    //   this.sync.getAllViewersValues(this.syncAllUserValues).subscribe(values => {
    //     this.values = Object.entries(values || {}).map(([key, value]) => ({key, value}));
    //   });
    // });
  }


}
