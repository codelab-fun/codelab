import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  repo = 'codelab-fun/codelab';
  githubAuth;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase
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
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
  }

  // TODO clean up 'createIssue' and 'createClosedIssue' methods as 60% of code is the same

  async createIssue(message) {
    if (!this.githubAuth.credential) {
      await this.login();
    }

    const issueData = {
      title: message.comment,
      body: this.generateIssueBody(message)
    };
    const accessToken = this.githubAuth.credential.accessToken;

    const headers = { Authorization: 'token ' + accessToken };
    const options = { headers };
    this.http
      .post(
        `https://api.github.com/repos/${this.repo}/issues`,
        issueData,
        options
      )
      .subscribe((responseData: any) => {
        this.markAsDone(message);
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

    const issueData = {
      title: reason + ' ' + message.comment,
      body: this.generateIssueBody(message)
    };
    const accessToken = this.githubAuth.credential.accessToken;

    const headers = { Authorization: 'token ' + accessToken };
    const options = { headers };
    this.http
      .post(
        `https://api.github.com/repos/${this.repo}/issues`,
        issueData,
        options
      )
      .subscribe((responseData: any) => {
        console.log(responseData.html_url);
        this.database
          .object(`feedback/${message.key}`)
          .update({ url: responseData.html_url });

        const changes = { state: 'closed' };
        const issueId = responseData.number;

        const headers = { Authorization: 'token ' + accessToken };
        const options = { headers };
        this.http
          .patch(
            `https://api.github.com/repos/${this.repo}/issues/${issueId}`,
            changes,
            options
          )
          .subscribe(res => {
            if (res) {
              this.markAsDone(message);
            }
          });
      });
  }

  generateIssueBody(message) {
    return `# What the issue is about
${message.comment}

# Where to start?
Start with reproducing [Locally](http://localhost:4200${message.href})

# Metadata:
This was filed through the feedback form.
Author: ${message.name}
Date: ${message.timestamp}
Slide: [Local](http://localhost:4200${message.href}),[Prod](https://codelab.fun${message.href})`;
  }

  markAsDone(message) {
    this.database
      .object(`feedback/${message.key}`)
      .update({ isDone: !message.isDone });
  }
}
