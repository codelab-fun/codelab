import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Message } from '../message';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { GithubService } from '@codelab/github';

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.scss']
})
export class FeedbackWidgetComponent implements OnInit, OnDestroy {
  messages$: Observable<Message[]>;

  formGroup: FormGroup;
  statusMessage = '';
  error = false;

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  githubAuth;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private feedbackService: FeedbackService,
    private afAuth: AngularFireAuth,
    private ghService: GithubService,
    private database: AngularFireDatabase,
    private router: Router
  ) {
    this.router.events
      .pipe(takeUntil(this.destroy))
      .subscribe(
        () =>
          (this.messages$ = this.feedbackService.getMessages(
            this.activatedRoute
          ))
      );

    afAuth.authState.subscribe(authData => {
      if (authData === null) {
        this.login();
      } else {
        this.githubAuth = authData;
      }
    });

  }

  ngOnInit() {
    // TODO: Consider the possibility to transfer logic to it's service.
    let value = localStorage[`feedback-${this.router.url}-comment`] || '';
    value = value === 'null' ? '' : value;
    this.formGroup = this.fb.group({
      comment: [value, Validators.required],
      name: [localStorage.getItem('userName') || '', Validators.required],
      email: [localStorage.getItem('userEmail') || '', []]
    });

    this.formGroup.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy)
      )
      .subscribe(data => {
        localStorage[`feedback-${this.router.url}-comment`] = data.comment;
      });
  }

  submit() {
    const formValues: any = this.formGroup.getRawValue();
    localStorage.setItem('userName', formValues.name);
    localStorage.setItem('userEmail', formValues.email);
    this.feedbackService
      .addMessage(
        formValues.name,
        formValues.email,
        formValues.comment,
        this.getHeaderText()
      )
      .then(() => {
        this.formGroup.get('comment').reset();
      })
      .catch(() => {
        this.statusMessage = 'Error while sending feedback';
        this.error = true;
      });
  }

  private getHeaderText(): string {
    const el = document.body.querySelector('h1');
    return el ? el.innerHTML : '';
  }


  async login() {
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
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
          .update({url: responseData.html_url});
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

  generateIssueBody(message) {
    return `${message.comment}
Author: ${message.name}
Slide: [Local](http://localhost:4200${
      message.href
      }),[Public](https://angular-presentation.firebaseapp.com${message.href})`;
  }

  isDone(message) {
    this.database
      .object(`feedback/${message.key}`)
      .update({isDone: !message.isDone});
  }


  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
