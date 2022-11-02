import { Component, OnDestroy, OnInit } from '@angular/core';
import { LiveService, LiveInfo } from '../live.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'kirjs-live-mock-component',
  templateUrl: './live-mock.component.html',
  styleUrls: ['./live-mock.component.css'],
})
export class LiveMockComponent implements OnInit, OnDestroy {
  data: LiveInfo;

  form: UntypedFormGroup = this.fb.group({
    user: this.fb.control(''),
    status: this.fb.control(''),
  });

  private onDestroy$: Subject<null> = new Subject<null>();

  constructor(private service: LiveService, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.form.valueChanges.subscribe((data) => {
      this.service.storeLiveInfo(data);
    });

    this.service.liveInfo.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.data = data;
      this.form.patchValue(data, { emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
