import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Message } from '@codelab/feedback/src/lib/message';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GithubService } from '@codelab/utils';

type Filter = 'all' | 'done' | 'notDone';
type Grouping = 'nothing' | 'href' | 'name';

function groupBy(feedback: Array<Message>, grouping: Grouping) {
  const result = feedback.reduce((comment, item) => {
    const groupName = item[grouping];
    comment[groupName] = comment[groupName] || [];
    comment[groupName].push(item);
    return comment;
  }, {});

  return Object.keys(result).map(key => ({key, value: result[key]}));
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

function filter([feedback, filterName]) {
  if (filterName === 'all') {
    return feedback;
  }

  if (filterName === 'done') {
    return feedback.filter(message => message.isDone);
  }

  if (filterName === 'notDone') {
    return feedback.filter(message => !message.isDone);
  }
}

@Component({
  selector: 'codelab-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {

  feedback$: AngularFireList<any[]> = this.database.list('/feedback');
  filter$ = new BehaviorSubject<Filter>('notDone');
  group$ = new BehaviorSubject<Grouping>('href');

  // TODO make it more understandable
  messages$: Observable<{ key: string; value: Message }[]> = combineLatest(
    combineLatest(
      this.feedback$.snapshotChanges().pipe(map(normalize)),
      this.filter$
    ).pipe(map(filter)), this.group$)
    .pipe(map(group));

  constructor(
    private database: AngularFireDatabase,
    private ghService: GithubService
  ) {
  }

  createIssue(message) {
    this.ghService.createIssue(message);
  }

  createClosedIssue(message, reason) {
    this.ghService.createClosedIssue(message, reason);
  }
}
