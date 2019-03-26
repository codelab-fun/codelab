import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubscriptionLike } from 'rxjs/internal/types';
import * as firebase from 'firebase/app';
import { SnippetService } from '../../shared/services/snippet.service';

function getTagsStringList(tagsArray: Array<string>): string {
  let tagsStringList = '';
  tagsArray.forEach(x => {
    tagsStringList += `- ${x}\n`;
  });
  tagsStringList += `\n`;
  return tagsStringList;
}

function getSnippet(value): string {

  const result: Array<string> = [];

  result.push(`
---
title: ${value.title}

author: ${value.author || `*your github username will be added*`}

level: ${value.level}

tags:
${getTagsStringList(value.tags)}
---`);

  result.push(`
# Content
${value.content}`);

  if (value.bonus) {
    result.push(`
# Bonus
${value.bonus}`);
  }

  if (value.links) {
    result.push(`
# Links
${value.links}`
    );
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

  result.push(`---`);

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
  isPRCreating = false;

  snippet: string;

  constructor(
    private afAuth: AngularFireAuth,
    private snippetService: SnippetService,
    public dialogRef: MatDialogRef<SnippetOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {
  }

  ngOnInit() {
    this.snippet = getSnippet(this.data['formValue']);
  }

  ngOnDestroy() {
    if (this.createPRSubscription) {
      this.createPRSubscription.unsubscribe();
      this.createPRSubscription = null;
    }
  }

  async onSubmit() {
    console.log('You can copy the snippet here: ', this.snippet);

    if (!(this.githubAuth && this.githubAuth.credential)) {
      await this.login();
    }

    this.isPRCreating = true;
    this.createPRSubscription = this.snippetService.createPR(this.githubAuth, this.snippet, this.data['formValue'].title)
      .subscribe(
        (res) => {
          this.isPRCreating = false;
          window.open(res['html_url']);
        },
        (err) => {
          this.isPRCreating = false;
          console.error(err);
        }
      );
  }

  async login() {
    const provider = new firebase.auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
    this.data['formValue']['author'] = this.githubAuth.additionalUserInfo.profile.name;
    this.snippet = getSnippet(this.data['formValue']);
  }
}
