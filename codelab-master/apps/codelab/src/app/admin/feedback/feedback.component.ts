import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Message } from '@codelab/feedback/src/lib/message';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type Filter = 'all' | 'done' | 'notDone';
type Grouping = 'nothing' | 'href' | 'name';

function groupBy(feedback: Array<Message>, grouping: Grouping) {
  const result = feedback.reduce((comment, item) => {
    const groupName = item[grouping];
    comment[groupName] = comment[groupName] || [];
    comment[groupName].push(item);
    return comment;
  }, {});

  return Object.keys(result).map(key => ({ key, value: result[key] }));
}

function normalize(feedback: Array<any>) {
  return feedback.map(item => ({
    ...(item.payload && item.payload.val()),
    key: item.key
  }));
}

function group([feedback, grouping]) {
  if (grouping === 'nothing') {
    return [
      {
        key: 'Messages',
        value: feedback
      }
    ];
  }
  if (grouping === 'name' || grouping === 'href') {
    return groupBy(feedback, grouping);
  }
  throw new Error('Unknown grouping: ' + grouping);
}

function filter([feedback, filterName, [fromDate, toDate]]) {
  let result;
  if (filterName === 'all') {
    result = feedback;
  }

  if (filterName === 'done') {
    result = feedback.filter(message => message.isDone);
  }

  if (filterName === 'notDone') {
    result = feedback.filter(message => !message.isDone);
  }

  const fromMs = fromDate ? new Date(fromDate).getTime() : null;
  const toMs = toDate ? new Date(toDate).getTime() + 86400000 : null; // add 24hrs to include the day of upper bound

  result = result.filter(msg => {
    const timestampMs = new Date(msg.timestamp).getTime();
    return (
      (fromMs ? timestampMs >= fromMs : true) &&
      (toMs ? timestampMs <= toMs : true)
    );
  });
  return result;
}

@Component({
  selector: 'codelab-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackComponent implements OnInit {
  messages$: Observable<{ key: string; value: Message }[]>;
  filter$ = new BehaviorSubject<Filter>('notDone');
  dateFilter$ = new BehaviorSubject<[string, string]>(['', '']);
  group$ = new BehaviorSubject<Grouping>('nothing');

  datesForFilter = { dateFrom: '', dateTo: '' };

  constructor(private database: AngularFireDatabase) {}

  ngOnInit() {
    const feedback$: AngularFireList<any[]> = this.database.list('/feedback');

    const filteredMessages$ = combineLatest([
      feedback$.snapshotChanges().pipe(map(normalize)),
      this.filter$,
      this.dateFilter$
    ]).pipe(map(filter));

    this.messages$ = combineLatest([filteredMessages$, this.group$]).pipe(
      map(group)
    );
  }

  changeDate(clearDates = false) {
    if (clearDates) {
      this.datesForFilter = { dateFrom: '', dateTo: '' };
    }
    this.dateFilter$.next([
      this.datesForFilter.dateFrom || '',
      this.datesForFilter.dateTo || ''
    ]);
  }

  clearDate() {
    this.changeDate(true);
  }
}
