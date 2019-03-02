import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'codelab-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent implements OnInit {
  from = new BehaviorSubject<string>('');
  to = new BehaviorSubject<string>('');
  @Output() range = new EventEmitter<[string, string]>();

  ngOnInit() {
    combineLatest(this.from, this.to).pipe(debounceTime(1000)).subscribe(([from, to]) => {
      this.range.emit([from, to]);
    });
  }

  clear() {
    this.from.next('');
    this.to.next('');
  }

}
