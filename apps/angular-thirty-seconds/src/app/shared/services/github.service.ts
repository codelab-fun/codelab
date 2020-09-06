import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { MonoTypeOperatorFunction } from 'rxjs/internal/types';
import {
  Branch,
  CommitInfo,
  CreatePullRequest,
  Repo,
  User
} from '../interfaces';

// TODO work on github api names
// Here is an example link: https://github.com/github-tools/github

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private apiGithubUrl = 'https://api.github.com';
  private options: object;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  showSnackbarOnError<T>(message: string): MonoTypeOperatorFunction<T> {
    return catchError(() => {
      this._snackBar.open(message, '', { duration: 10000 });
      return throwError(new Error(message));
    });
  }

  setToken(token: string) {
    this.options = { headers: { Authorization: `token ${token}` } };
  }

  getRepo(owner: string, repoName: string): Observable<Repo> {
    requires(owner, 'Owner is required');
    requires(repoName, 'Repo name is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${owner}/${repoName}`;
    return this.http
      .get<Repo>(requestUrl, this.options)
      .pipe(this.showSnackbarOnError("Can't get repo"));
  }

  getMyRepos(user: User): Observable<Repo[]> {
    requires(user, 'User is required');

    return this.http
      .get<Repo[]>(user.repos_url, this.options)
      .pipe(this.showSnackbarOnError("Can't fetch user repos"));
  }

  forkRepo(repo: Repo): Observable<Repo> {
    requires(repo, 'Repository is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/forks`;
    return this.http
      .post<Repo>(requestUrl, {}, this.options)
      .pipe(this.showSnackbarOnError("Can't fork 30 secs repo"));
  }

  getMasterBranch(repo: Repo): Observable<Branch> {
    requires(repo, 'Repository is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/git/refs/heads/master`;
    return this.http
      .get<Branch>(requestUrl, this.options)
      .pipe(
        this.showSnackbarOnError(
          `Can't fetch master branch of ${repo.full_name}`
        )
      );
  }

  createBranch(
    repo: Repo,
    baseBranch: Branch,
    branchName: string
  ): Observable<Branch> {
    requires(repo, 'Repository is required');
    requires(baseBranch, 'Base branch is required');
    requires(branchName, 'Branch name is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/git/refs`;
    const branchRef = `refs/heads/${branchName}`;
    const requestData = {
      ref: branchRef,
      sha: baseBranch.object.sha
    };

    return this.http
      .post<Branch>(requestUrl, requestData, this.options)
      .pipe(
        this.showSnackbarOnError(
          `Can't create branch ${branchName} of base branch ${baseBranch.object.url}`
        )
      );
  }

  createCommit(repo: Repo, commitInfo: CommitInfo): Observable<any> {
    requires(repo, 'Repository is required');
    requires(commitInfo, 'Commit is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/${commitInfo.filePath}`;
    const requestData = {
      message: commitInfo.message,
      branch: commitInfo.branchName,
      content: commitInfo.content
    };

    return this.http
      .put(requestUrl, requestData, this.options)
      .pipe(this.showSnackbarOnError("Can't create commit"));
  }

  createPullRequest(
    repo: Repo,
    user: User,
    pullRequest: CreatePullRequest
  ): Observable<any> {
    requires(repo, 'Repository is required');
    requires(user, 'User is required');
    requires(pullRequest, 'Pull request is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/pulls`;
    const requestData = {
      title: pullRequest.title,
      head: `${user.login}:${pullRequest.branchName}`,
      base: 'master',
      body: pullRequest.body,
      labels: pullRequest.labels
    };

    return this.http
      .post(requestUrl, requestData, this.options)
      .pipe(this.showSnackbarOnError("Can't create pull request"));
  }

  getPullsList(owner: string, repoName: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiGithubUrl}/repos/${owner}/${repoName}/pulls`,
        this.options
      )
      .pipe(
        map(res =>
          res.filter(
            x =>
              x['labels'].length &&
              x['labels'].map(y => y['name']).indexOf('snippet') > -1
          )
        ),
        this.showSnackbarOnError("Can't fetch user repos")
      );
  }

  getPullByPullNumber(
    owner: string,
    repoName: string,
    pullNumber: number
  ): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiGithubUrl}/repos/${owner}/${repoName}/pulls/${pullNumber}`,
        this.options
      )
      .pipe(this.showSnackbarOnError("Can't get pull request"));
  }

  addLinkToEditForm(
    owner: string,
    repoName: string,
    pullNumber: number
  ): Observable<any> {
    return this.http
      .patch<any>(
        `${this.apiGithubUrl}/repos/${owner}/${repoName}/pulls/${pullNumber}`,
        {
          body: `Here you can edit snippet content: https://30.codelab.fun/new/${pullNumber}`
        },
        this.options
      )
      .pipe(this.showSnackbarOnError("Can't update pull request"));
  }

  addSnippetLabel(owner: string, repoName: string, issueNumber: number) {
    return this.http
      .patch<any>(
        `${this.apiGithubUrl}/repos/${owner}/${repoName}/issues/${issueNumber}`,
        { labels: ['snippet'] },
        this.options
      )
      .pipe(this.showSnackbarOnError("Can't get issues list"));
  }

  getPullFileByPullNumber(
    owner: string,
    repoName: string,
    pullNumber: number
  ): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiGithubUrl}/repos/${owner}/${repoName}/pulls/${pullNumber}/files`,
        this.options
      )
      .pipe(this.showSnackbarOnError("Can't get pull request file"));
  }

  getSnippetBody(url) {
    return this.http
      .get<any>(url, this.options)
      .pipe(this.showSnackbarOnError("Can't get snippet body"));
  }

  updateFile(repoFullName, snippetData, fileInfo): Observable<any> {
    const requestUrl = `${this.apiGithubUrl}/repos/${repoFullName}/contents/${fileInfo['fileName']}`;
    const requestPayload = {
      message: `Snippet Update`,
      content: btoa(snippetData),
      sha: fileInfo['sha'],
      branch: fileInfo['branchName']
    };
    return this.http
      .put<any>(requestUrl, requestPayload, this.options)
      .pipe(this.showSnackbarOnError('Cannot update file'));
  }
}

function requires(expression: any, message: string) {
  if (!expression) {
    throw new Error(message);
  }
}
