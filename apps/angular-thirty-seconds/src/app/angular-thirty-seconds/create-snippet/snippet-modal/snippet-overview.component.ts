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
  return `
---
title: ${value.title}\n
author: ${value.author || `*your github username will be added*`}\n
level: ${value.level}\n
tags:
${getTagsStringList(value.tags)}
---
# Content
${value.content}
${value.bonus ? `\n
# Bonus
${value.bonus}` : ``}
${value.links ? `\n
# Links
${value.links}` : ``}
${value.demo['app.component.ts'] ? `\n
# ComponentCode
\`\`\`typescript
${value.demo['app.component.ts']}
\`\`\`` : ``}
${value.demo['app.module.ts'] ? `\n
# ModuleCode
\`\`\`typescript
${value.demo['app.module.ts']}
\`\`\`` : ``}
${value.demo['main.ts'] ? `\n
# MainCode
\`\`\`typescript
${value.demo['main.ts']}
\`\`\`` : ``}
---`;
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
