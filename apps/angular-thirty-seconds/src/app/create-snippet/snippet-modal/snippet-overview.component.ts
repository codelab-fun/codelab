import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { SubscriptionLike } from 'rxjs/internal/types';
import * as firebase from 'firebase';
import { SnippetService } from '../../shared/services/snippet.service';
import { Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { GitHubService } from '../../shared/services/github.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';


function arrayToMarkdownList(tagsArray: Array<string>): string {
  return tagsArray.filter(a => a).map(x => `- ${x}`).join(`\n`);
}

function getSnippet(value): string {

  const result: Array<string> = [];

  result.push(`---
title: ${value.title}
author: ${value.author || `*your github username will be added*`}`);
  if (value.twitter) {
    result.push(`twitter: ` + value.twitter);
  }
  result.push(`level: ${value.level}
tags:
${arrayToMarkdownList(value.tags)}`);


  if (value.links) {
    result.push(`
links:
${arrayToMarkdownList(value.links.split('\n'))}`);
  }

  result.push(`---`);

  result.push(`
# Content
${value.content}`);

  if (value.bonus) {
    result.push(`
# Bonus
${value.bonus}`);
  }

  if (value.demo['app.component.ts']) {
    result.push(`
# ComponentCode
\`\`\`typescript
${value.demo['app.component.ts']}
\`\`\``);
  }

  if (value.demo['app.module.ts']) {
    result.push(`
# ModuleCode
\`\`\`typescript
${value.demo['app.module.ts']}
\`\`\``);
  }

  if (value.demo['main.ts']) {
    result.push(`
# MainCode
\`\`\`typescript
${value.demo['main.ts']}
\`\`\``);
  }

  return result.join(`\n`);
}


@Component({
  selector: 'codelab-snippet-overview',
  templateUrl: './snippet-overview.component.html',
  styleUrls: ['./snippet-overview.component.scss']
})
export class SnippetOverviewComponent implements OnInit, OnDestroy {

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  githubAuth;
  isPRCreating = false;

  isSnippetEdit: boolean;
  snippet: string;
  snippetWithFormat: string;

  constructor(
    public dialogRef: MatDialogRef<SnippetOverviewComponent>,
    private afAuth: AngularFireAuth,
    private snippetService: SnippetService,
    private githubService: GitHubService,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {
  }

  ngOnInit() {
    this.isSnippetEdit = this.data['isSnippetEdit'];
    this.snippet = getSnippet(this.data['formValue']);
    // This is a temporary hack.
    // The version of markdown requires new lines between meta values, but github does not.
    this.snippetWithFormat = this.snippet.replace(/\n(title|author|twitter|level|tags|links):/g, '\n\n$1:');
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  async onSubmit() {
    console.log('You can copy the snippet here: ', this.snippet);
    this.isPRCreating = true;

    if (!(this.githubAuth && this.githubAuth.credential)) {
      await this.login();
    }

    if (this.isSnippetEdit) {
      this.snippetService.updatePR(this.githubAuth, this.snippet, this.data['fileInfo'])
        .pipe(takeUntil(this.destroy))
        .subscribe(
          (res) => {
            this.dialogRef.close();
            this.isPRCreating = false;
            this.router.navigate(['list']);
            const snakeBarRef: MatSnackBarRef<SimpleSnackBar> = this._snackBar.open('Here is link to PR changes:', 'Check it now', {duration: 20000});
            snakeBarRef.onAction().subscribe(() => window.open(res['commit']['html_url']));
          },
          (err) => {
            this.isPRCreating = false;
            console.error(err);
          }
        );
    } else {
      this.snippetService.createPR(this.githubAuth, this.snippet, this.data['formValue'].title)
        .pipe(
          takeUntil(this.destroy),
          switchMap(res => this.githubService.updatePullByPullNumber('nycJSorg', '30-seconds-of-angular', res['number'])),
          switchMap(res => this.githubService.updateIssueByIssueNumber('nycJSorg', '30-seconds-of-angular', res['number'])),
        )
        .subscribe(
          (res) => {
            this.dialogRef.close();
            this.isPRCreating = false;
            this.router.navigate(['list']);
            const snakeBarRef: MatSnackBarRef<SimpleSnackBar> = this._snackBar.open('Here is link to your pull request:', 'Check it now', {duration: 20000});
            snakeBarRef.onAction().subscribe(() => window.open(res['html_url']));
          },
          (err) => {
            this.isPRCreating = false;
            console.error(err);
          }
        );
    }
  }

  async login() {
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
    this.data['formValue']['author'] = this.githubAuth.additionalUserInfo.username;
    this.snippet = getSnippet(this.data['formValue']);
  }
}
