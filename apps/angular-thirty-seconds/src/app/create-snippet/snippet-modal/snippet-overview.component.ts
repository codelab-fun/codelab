import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubscriptionLike } from 'rxjs/internal/types';
import * as firebase from 'firebase';
import { SnippetService } from '../../shared/services/snippet.service';
import { Router } from '@angular/router';


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

  githubAuth;
  createPRSubscription: SubscriptionLike;
  updatePRSubscription: SubscriptionLike;
  isPRCreating = false;

  isSnippetEdit: boolean;
  snippet: string;
  snippetWithFormat: string;

  constructor(
    private afAuth: AngularFireAuth,
    private snippetService: SnippetService,
    public dialogRef: MatDialogRef<SnippetOverviewComponent>,
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
    if (this.createPRSubscription) {
      this.createPRSubscription.unsubscribe();
      this.createPRSubscription = null;
    }
    if (this.updatePRSubscription) {
      this.updatePRSubscription.unsubscribe();
      this.updatePRSubscription = null;
    }
  }

  async onSubmit() {
    console.log('You can copy the snippet here: ', this.snippet);

    if (!(this.githubAuth && this.githubAuth.credential)) {
      await this.login();
    }

    this.isPRCreating = true;
    if (this.isSnippetEdit) {
      this.updatePRSubscription = this.snippetService.updatePR(this.githubAuth, this.snippet, this.data['fileInfo'])
        .subscribe(
          (res) => {
            this.isPRCreating = false;
            window.open(res['commit']['html_url']);
          },
          (err) => {
            this.isPRCreating = false;
            console.error(err);
          }
        );
    } else {
      this.createPRSubscription = this.snippetService.createPR(this.githubAuth, this.snippet, this.data['formValue'].title)
        .subscribe(
          (res) => {
            this.isPRCreating = false;
            window.open(res['html_url']);
            this.router.navigate(['list']);
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
