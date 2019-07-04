import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
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
# file:app.component.ts
\`\`\`typescript
${value.demo['app.component.ts']}
\`\`\``);
  }

  if (value.demo['app.module.ts']) {
    result.push(`
# file:app.module.ts
\`\`\`typescript
${value.demo['app.module.ts']}
\`\`\``);
  }

  if (value.demo['main.ts']) {
    result.push(`
# file:main.ts
\`\`\`typescript
${value.demo['main.ts']}
\`\`\``);
  }

  if (value.demo['index.html']) {
    result.push(`
# file:index.html
\`\`\`html
${value.demo['index.html']}
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

  isEditing: boolean;
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
    this.isEditing = this.data['isEditing'];
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
    console.log('You can copy the snippet here:\n', this.snippet);
    this.isPRCreating = true;

    if (!(this.githubAuth && this.githubAuth.credential)) {
      await this.login();
    }

    if (this.isEditing) {
      this.snippetService.updatePR(this.githubAuth, this.snippet, this.data['fileInfo'], this.data['REPO_NAME'])
        .pipe(takeUntil(this.destroy))
        .subscribe(res => this.navigateAndShowSnakeBar('Success', 'Snippet updated', res['commit']['html_url']))
        .add(() => this.isPRCreating = false);
    } else {
      this.snippetService.createPR(this.githubAuth, this.snippet, this.data['formValue'].title, this.data['REPO_NAME'], this.data['REPO_OWNER'])
        .pipe(
          takeUntil(this.destroy),
          switchMap(res => this.githubService.addLinkToEditForm(this.data['REPO_OWNER'], this.data['REPO_NAME'], res['number'])),
          switchMap(res => this.githubService.addSnippetLabel(this.data['REPO_OWNER'], this.data['REPO_NAME'], res['number'])),
        )
        .subscribe(res => this.navigateAndShowSnakeBar('Pull request created', res['title'].replace('Add - new snippet: ', ''), res['html_url']))
        .add(() => this.isPRCreating = false);
    }
  }

  navigateAndShowSnakeBar(text: string, linkLabel: string, linkUrl: string) {
    this.dialogRef.close();
    this.router.navigate(['list']);
    const snakeBarRef: MatSnackBarRef<SimpleSnackBar> = this._snackBar.open(text, linkLabel, {duration: 20000});
    snakeBarRef.onAction().subscribe(() => window.open(linkUrl));
  }

  async login() {
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
    this.data['formValue']['author'] = this.githubAuth.additionalUserInfo.username;
    this.snippet = getSnippet(this.data['formValue']);
  }
}
