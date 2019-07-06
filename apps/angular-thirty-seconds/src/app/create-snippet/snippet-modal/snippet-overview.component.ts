import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { SnippetService } from '../../shared/services/snippet.service';
import { GitHubService } from '../../shared/services/github.service';

interface SnippetInfo {
  formValue: object;
  isEditing: boolean;
  fileInfo: {
    sha: string,
    fileName: string,
    branchName: string
  };
  repoName: string;
  repoOwner: string;
}


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

  Object.keys(value['demo']).forEach(fileName => {
    if (value['demo'][fileName]) {
      result.push(`
# file:${fileName}
\`\`\`${getFileCodeType(fileName)}
${value.demo[fileName]}
\`\`\``);
    }
  });

  return result.join(`\n`);

  function getFileCodeType(fileName) {
    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    const fileTypeMap = {'ts': 'typescript'};
    return fileTypeMap[fileExtension] || fileExtension;
  }
}


@Component({
  selector: 'codelab-snippet-overview',
  templateUrl: './snippet-overview.component.html',
  styleUrls: ['./snippet-overview.component.scss']
})
export class SnippetOverviewComponent implements OnInit, OnDestroy {

  destroy = new ReplaySubject<void>(1);

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
    @Inject(MAT_DIALOG_DATA) public data: SnippetInfo
  ) {
  }

  ngOnInit() {
    this.isEditing = this.data.isEditing;
    this.snippet = getSnippet(this.data.formValue);
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
      this.snippetService.updatePR(this.githubAuth, this.snippet, this.data.fileInfo, this.data.repoName)
        .pipe(finalize(() => this.isPRCreating = false), takeUntil(this.destroy))
        .subscribe(res => this.navigateAndShowSnackBar('Success', 'Snippet updated', res['commit']['html_url']));
    } else {
      this.snippetService.createPR(this.githubAuth, this.snippet, this.data.formValue['title'], this.data.repoName, this.data.repoOwner)
        .pipe(
          switchMap(res => this.githubService.addLinkToEditForm(this.data.repoOwner, this.data.repoName, res['number'])),
          switchMap(res => this.githubService.addSnippetLabel(this.data.repoOwner, this.data.repoName, res['number'])),
          finalize(() => this.isPRCreating = false),
          takeUntil(this.destroy)
        )
        .subscribe(res => this.navigateAndShowSnackBar('Pull request created', res['title'].replace('Add - new snippet: ', ''), res['html_url']));
    }
  }

  navigateAndShowSnackBar(text: string, linkLabel: string, linkUrl: string) {
    this.dialogRef.close();
    this.router.navigate(['list']);
    const snakeBarRef = this._snackBar.open(text, linkLabel, {duration: 20000});
    snakeBarRef.onAction().subscribe(() => window.open(linkUrl));
  }

  async login() {
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
    this.data.formValue['author'] = this.githubAuth.additionalUserInfo.username;
    this.snippet = getSnippet(this.data.formValue);
  }
}
