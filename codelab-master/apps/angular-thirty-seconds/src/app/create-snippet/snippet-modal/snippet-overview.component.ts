import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { auth } from 'firebase/app';
import { finalize, switchMap, take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { SnippetService } from '../../shared/services/snippet.service';
import { GitHubService } from '../../shared/services/github.service';
import { generateSnippet } from '../../shared/functions/generate-snippet';
import { SEPARATOR } from '../../shared/consts';

interface SnippetOverviewData {
  formValue: object;
  isEditing: boolean;
  fileInfo: {
    sha: string;
    fileName: string;
    branchName: string;
  };
  repoName: string;
  repoOwner: string;
}

function exportSnippet(snippet) {
  const result = { ...snippet };
  result.links = result.links ? result.links.split(SEPARATOR) : undefined;
  result.author = result.author || '** Your github username will be here **';
  result.bonus = result.bonus || undefined;
  return result;
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
    @Inject(MAT_DIALOG_DATA) public data: SnippetOverviewData
  ) {}

  ngOnInit() {
    this.isEditing = this.data.isEditing;
    this.snippet = generateSnippet(exportSnippet(this.data.formValue));
    // This is a temporary hack.
    // The version of markdown requires new lines between meta values, but github does not.
    this.snippetWithFormat = this.snippet.replace(
      /\n(title|author|twitter|level|tags|links):/g,
      '\n\n$1:'
    );
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
      this.snippetService
        .updatePR(
          this.githubAuth,
          this.snippet,
          this.data.fileInfo,
          this.data.repoName
        )
        .pipe(
          finalize(() => (this.isPRCreating = false)),
          takeUntil(this.destroy)
        )
        .subscribe(res =>
          this.navigateAndShowSnackBar(
            'Success',
            'Snippet updated',
            res['commit']['html_url']
          )
        );
    } else {
      this.snippetService
        .createPR(
          this.githubAuth,
          this.snippet,
          this.data.formValue['title'],
          this.data.repoName,
          this.data.repoOwner
        )
        .pipe(
          switchMap(res =>
            this.githubService.addLinkToEditForm(
              this.data.repoOwner,
              this.data.repoName,
              res['number']
            )
          ),
          switchMap(res =>
            this.githubService.addSnippetLabel(
              this.data.repoOwner,
              this.data.repoName,
              res['number']
            )
          ),
          finalize(() => (this.isPRCreating = false)),
          takeUntil(this.destroy)
        )
        .subscribe(res =>
          this.navigateAndShowSnackBar(
            'Pull request created',
            res['title'].replace('Add - new snippet: ', ''),
            res['html_url']
          )
        );
    }
  }

  navigateAndShowSnackBar(text: string, linkLabel: string, linkUrl: string) {
    this.dialogRef.close();
    this.router.navigate(['list']);
    const snakeBarRef = this._snackBar.open(text, linkLabel, {
      duration: 20000
    });
    snakeBarRef
      .onAction()
      .pipe(take(1))
      .subscribe(() => window.open(linkUrl));
  }

  async login() {
    const provider = new auth.GithubAuthProvider().addScope('repo');
    this.githubAuth = await this.afAuth.auth.signInWithPopup(provider);
    this.data.formValue['author'] = this.githubAuth.additionalUserInfo.username;
    this.snippet = generateSnippet(exportSnippet(this.data.formValue));
  }
}
