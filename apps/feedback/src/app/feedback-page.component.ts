import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Message } from '@slides/feedback/src/message';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GithubService } from '../../../slides/src/app/github.service';


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
  return feedback.map(item => ({...(item.payload && item.payload.val()), key: item.key}));


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
  selector: 'slides-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent implements OnInit {
  messages$: Observable<{ key: string; value: Message; }[]>;
  filter$ = new BehaviorSubject<Filter>('notDone');
  group$ = new BehaviorSubject<Grouping>('href');
  githubAuth;
  private feedback$: AngularFireList<any[]>;

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth, private ghService: GithubService) {
    afAuth.authState.subscribe(authData => {
      if (authData === null) {
        this.login();
      } else {
        this.githubAuth = authData;
      }
    });

  }

  async login() {
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
  }

  isDone(message) {
    this.database.object(`feedback/${message.key}`).update({isDone: !message.isDone});
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

    this.ghService.createIssue({
      title: message.comment.substring(0, 150),
      body: this.generateIssueBody(message)
    }, this.githubAuth.credential.accessToken).subscribe(response => {
      if (response.ok) {
        const responseData = response.json();
        this.isDone(message);
        this.database.object(`feedback/${message.key}`).update({url: responseData.html_url});
        window.open(responseData.html_url);
      }
    });
  }

  async createClosedIssue(message, reason) {
    if (!this.githubAuth.credential) {
      await this.login();
    }

    this.ghService.createIssue({
      title: reason + ' ' + message.comment.substring(0, 150),
      body: this.generateIssueBody(message),
    }, this.githubAuth.credential.accessToken).subscribe(response => {
      if (response.ok) {
        const responseData = response.json();
        // Until we get a better UI
        console.log(responseData.html_url);
        this.database.object(`feedback/${message.key}`).update({url: responseData.html_url});
        this.ghService.closeIssue({state: 'closed'}, responseData.number, this.githubAuth.credential.accessToken)
          .subscribe((res) => {
            if (res.ok) {
              this.isDone(message);
            }
          });
      }
    });
  }

  ngOnInit() {
    this.feedback$ = this.database.list('/feedback');
    const filteredMessages$ = combineLatest(this.feedback$.snapshotChanges().map(normalize), this.filter$).map(filter)
    this.messages$ = combineLatest(filteredMessages$, this.group$).map(group);
  }
}
