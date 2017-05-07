import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Message} from '../../feedback/message';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {combineLatest} from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

type Filter = 'all' | 'done' | 'notDone';
type Grouping = 'nothing' | 'href' | 'name';

function groupBy(feedback: Array<Message>, grouping: Grouping) {
  const result = feedback.reduce((comment, item) => {
    const group = item[grouping];
    comment[group] = comment[group] || [];
    comment[group].push(item);
    return comment;
  }, {});

  return Object.keys(result).map(key => ({key, value: result[key]}));
}

function group([feedback, grouping]) {
  if (grouping === 'nothing') {
    return [{
      key: 'Messages',
      value: feedback
    }];
  }
  if (grouping === 'name' || grouping === 'href') {
    return groupBy(feedback, grouping);
  }
  throw new Error('Unknown grouping: ' + grouping);
}

function filter([feedback, filter]) {
  if (filter === 'all') {
    return feedback;
  }

  if (filter === 'done') {
    return feedback.filter(message => message.isDone);
  }

  if (filter === 'notDone') {
    return feedback.filter(message => !message.isDone);
  }
}

@Component({
  selector: 'slides-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  messages$: Observable<{ key: string; value: Message; }[]>;
  filter$ = new BehaviorSubject<Filter>('notDone');
  group$ = new BehaviorSubject<Grouping>('href');
  private feedback$: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
  }

  isDone(message) {
    this.database.object(`feedback/${message.$key}`).update({isDone: !message.isDone});

  }

  ngOnInit() {
    this.feedback$ = this.database.list('/feedback');
    const filteredMessages$ = combineLatest(this.feedback$, this.filter$).map(filter);
    this.messages$ = combineLatest(filteredMessages$, this.group$).map(group);
  }


}
