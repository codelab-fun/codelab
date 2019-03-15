import { Component, Inject, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubscriptionLike } from 'rxjs/internal/types';
import * as firebase from 'firebase/app';
import { SnippetService } from '../../shared/services/snippet.service';

@Component({
  selector: 'codelab-snippet-overview',
  templateUrl: './snippet-overview.component.html',
  styleUrls: ['./snippet-overview.component.scss']
})
export class SnippetOverviewComponent implements OnDestroy {

  githubAuth;
  createPRSubscription: SubscriptionLike;
  isPRCreating = false;

  constructor(
    private afAuth: AngularFireAuth,
    private snippetService: SnippetService,
    public dialogRef: MatDialogRef<SnippetOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {
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
    this.createPRSubscription = this.snippetService.createPR(this.githubAuth, this.data)
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
    const authorName = this.githubAuth.additionalUserInfo.profile.name;
    this.addAuthorToSnippet(authorName);
  }

  addAuthorToSnippet(authorName) {
    this.data['snippetBody'] = this.data['snippetBody'].replace(
      `

                ---

                `
      ,
      `

                ## __Author:__ ${authorName}

                ---

                `
    );
  }
}
