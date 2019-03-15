import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'codelab-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeComponent implements OnInit {
  @Output() range = new EventEmitter<[string, string]>();

  rangeForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl('')
  });

  ngOnInit() {
    this.rangeForm.valueChanges.pipe(debounceTime(1000)).subscribe(({ from, to }) => {
      this.range.emit([from, to]);
    });
  }

  clear() {
    this.rangeForm.setValue({
      from: '',
      to: ''
    });
  }

}
