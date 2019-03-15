import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpClient } from '@angular/common/http';
import { SlugifyPipe } from '../../slugify.pipe';

@Injectable({
  providedIn: 'root',
})
export class SnippetService {

  protected apiGithubUrl = 'https://api.github.com';

  private githubAuth;
  private globalRepo = 'nycJSorg/30-seconds-of-angular';
  private myRepo: string | null = null;
  private options;
  private snippetData;
  private title: string | null = null;

  constructor(
    private http: HttpClient,
    private slugify: SlugifyPipe
  ) {
  }

  createPR(githubAuth, snippetData, title): Observable<object> {

    this.githubAuth = githubAuth;
    const headers = {Authorization: 'token ' + githubAuth.credential.accessToken};
    this.options = {headers};
    this.title = title;

    this.snippetData = snippetData;
    return this.getRepositories()
      .pipe(
        switchMap(() => this.getMasterBranchSha()),
        switchMap((masterSha) => this.createSnippetBranch(masterSha)),
        switchMap(() => this.createSnippetCommit()),
        switchMap(() => this.createSnippetPullRequest())
      );
  }

  getRepositories(): Observable<object> {
    return this.http.get(
      this.githubAuth.additionalUserInfo.profile.repos_url,
      this.options
    ).pipe(
      catchError(() => throwError(new Error(`Cannot get user repos list`))),
      map((response: any) => this.myRepo = response.filter(x => x['name'] === '30-seconds-of-angular')[0]['full_name'])
    );
  }

  getMasterBranchSha(): Observable<string> {
    return this.http.get(
      `${this.apiGithubUrl}/repos/${this.myRepo}/git/refs/heads/master`,
      this.options
    ).pipe(
      catchError(() => throwError(new Error(`Cannot get user master branch sha`))),
      map((response) => response['object']['sha'])
    );
  }

  createSnippetBranch(masterSha: string): Observable<object> {
    return this.http.post(
      `${this.apiGithubUrl}/repos/${this.myRepo}/git/refs`,
      {
        ref: `refs/heads/new_snippet_${this.toLowerCaseAndSlugify(this.title)}`,
        sha: masterSha
      },
      this.options
    ).pipe(
      catchError(() => throwError(new Error(`Try to change snippet name, cannot get create a new snippet branch`)))
    );
  }

  createSnippetCommit(): Observable<object> {
    const requestBody = {
      message: 'I have added awesome snippet. Look at my awesome snippet!',
      content: btoa(this.snippetData['snippetBody']),
      branch: `new_snippet_${this.toLowerCaseAndSlugify(this.title)}`
    };

    return this.http.put(
      `${this.apiGithubUrl}/repos/${this.myRepo}/contents/snippets/${this.toLowerCaseAndSlugify(this.title)}.md`,
      requestBody,
      this.options
    ).pipe(
      catchError(() => throwError(new Error(`Cannot create commit with new md file`)))
    );
  }

  createSnippetPullRequest(): Observable<object> {
    const requestBody = {
      title: `Add - new snippet: ${this.snippetData['snippetTitle']}`,
      head: `${this.githubAuth.additionalUserInfo.username}:new_snippet_${this.toLowerCaseAndSlugify(this.title)}`,
      base: 'master',
      body: 'Here is a new snippet. Hope you like it :)'
    };

    return this.http.post(
      `${this.apiGithubUrl}/repos/${this.globalRepo}/pulls`,
      requestBody,
      this.options
    ).pipe(
      catchError(() => throwError(new Error(`Cannot add new pull request`)))
    );
  }

  toLowerCaseAndSlugify(str: string) {
    return this.slugify.transform(str.toLowerCase());
  }
}
