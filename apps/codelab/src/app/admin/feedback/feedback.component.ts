import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Message } from '@codelab/feedback/src/lib/message';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GithubService } from './github.service';

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
  githubAuth;
  datesForFilter = { dateFrom: '', dateTo: '' };

  constructor(
    private database: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private ghService: GithubService
  ) {
    afAuth.authState.subscribe(authData => {
      if (authData === null) {
        this.login();
      } else {
        this.githubAuth = authData;
      }
    });
  }

  async login() {
    const provider = new auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
  }

  isDone(message) {
    this.database
      .object(`feedback/${message.key}`)
      .update({ isDone: !message.isDone });
  }

  generateIssueBody(message) {
    return `${message.comment}
Author: ${message.name}
Slide: [Local](http://localhost:4200${message.href}),[Public](https://angular-presentation.firebaseapp.com${message.href})`;
  }

  async createAnIssue(message) {
    if (!this.githubAuth.credential) {
      await this.login();
    }

    this.ghService
      .createIssue(
        {
          title: message.comment.substring(0, 150),
          body: this.generateIssueBody(message)
        },
        this.githubAuth.credential.accessToken
      )
      .subscribe((responseData: any) => {
        this.isDone(message);
        this.database
          .object(`feedback/${message.key}`)
          .update({ url: responseData.html_url });
        window.open(responseData.html_url);
      });
  }

  async createClosedIssue(message, reason) {
    if (!this.githubAuth.credential) {
      await this.login();
    }

    this.ghService
      .createIssue(
        {
          title: reason + ' ' + message.comment.substring(0, 150),
          body: this.generateIssueBody(message)
        },
        this.githubAuth.credential.accessToken
      )
      .subscribe((responseData: any) => {
        // Until we get a better UI
        console.log(responseData.html_url);
        this.database
          .object(`feedback/${message.key}`)
          .update({ url: responseData.html_url });
        this.ghService
          .closeIssue(
            { state: 'closed' },
            responseData.number,
            this.githubAuth.credential.accessToken
          )
          .subscribe(res => {
            if (res) {
              this.isDone(message);
            }
          });
      });
  }

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

  closeMessage(e) {
    this.createClosedIssue(e.message, e.reason);
  }

  takeMessage(e) {
    this.createAnIssue(e.message);
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
