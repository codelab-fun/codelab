import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import slugify from 'slugify';

interface User {
  login: string;
  repos_url: string;
}

interface Repo {
  name: string;
  full_name: string;
  sha: string;
  url: string;
  git_refs_url: string;
}

interface Branch {
  ref: string;
  node_id: string;
  url: string;
  object: {
    type: string;
    sha: string;
    url: string;
  };
}

interface CommitInfo {
  message: string;
  content: string;
  branchName: string;
  filePath: string;
}

type Commit = any;

interface CreatePullRequest {
  title: string;
  body: string;
  branchName: string;
}

type PullRequest = any;

interface GithubAuth {
  additionalUserInfo: {
    profile: User;
  };
  credential: {
    accessToken: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  private apiGithubUrl = 'https://api.github.com';
  private options: object;

  constructor(
    private http: HttpClient
  ) {
  }

  setToken(token: string) {
    this.options = {
      headers: {
        Authorization: `token ${token}`
      }
    };
  }

  getRepo(owner: string, repoName: string): Observable<Repo> {
    requires(owner, 'Owner is required');
    requires(repoName, 'Repo name is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${owner}/${repoName}`;
    return this.http.get<Repo>(requestUrl, this.options).pipe(
      catchError(() => throwError(new Error(`Can't get repo`)))
    );
  }

  getMyRepos(user: User): Observable<Repo[]> {
    requires(user, 'User is required');

    return this.http.get<Repo[]>(user.repos_url, this.options).pipe(
      catchError(() => throwError(new Error(`Can't fetch user repos`)))
    );
  }

  forkRepo(repo: Repo): Observable<Repo> {
    requires(repo, 'Repository is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/forks`;
    return this.http.post<Repo>(requestUrl, {}, this.options).pipe(
      catchError(() => throwError(new Error(`Can't fork 30 secs repo`)))
    );
  }

  getMasterBranch(repo: Repo): Observable<Branch> {
    requires(repo, 'Repository is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/git/refs/heads/master`;
    return this.http.get<Branch>(requestUrl, this.options).pipe(
      catchError(() => throwError(new Error(`Can't fetch master branch of ${repo.full_name}`)))
    );
  }

  createBranch(repo: Repo, baseBranch: Branch, branchName: string): Observable<Branch> {
    requires(repo, 'Repository is required');
    requires(baseBranch, 'Base branch is required');
    requires(branchName, 'Branch name is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/git/refs`;
    const branchRef = `refs/heads/${branchName}`;
    const requestData = {
      ref: branchRef,
      sha: baseBranch.object.sha
    };

    return this.http.post<Branch>(requestUrl, requestData, this.options).pipe(
      catchError(() => throwError(new Error(`Can't create branch ${branchName} of base branch ${baseBranch.object.url}`)))
    );
  }

  createCommit(repo: Repo, commitInfo: CommitInfo): Observable<Commit> {
    requires(repo, 'Repository is required');
    requires(commitInfo, 'Commit is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/${commitInfo.filePath}`;
    const requestData = {
      message: commitInfo.message,
      branch: commitInfo.branchName,
      content: commitInfo.content
    };

    return this.http.put(requestUrl, requestData, this.options).pipe(
      catchError(() => throwError(new Error(`Can't create commit`)))
    );
  }

  createPullRequest(repo: Repo, user: User, pullRequest: CreatePullRequest): Observable<PullRequest> {
    requires(repo, 'Repository is required');
    requires(user, 'User is required');
    requires(pullRequest, 'Pull request is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/pulls`;
    const requestData = {
      title: pullRequest.title,
      head: `${user.login}:${pullRequest.branchName}`,
      base: 'master',
      body: pullRequest.body
    };

    return this.http.post(requestUrl, requestData, this.options).pipe(
      catchError(() => throwError(new Error(`Can't create pull request`)))
    );
  }

}

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  private owner = 'nycJSorg';
  private repoName = '30-seconds-of-angular';

  constructor(
    private github: GitHubService,
  ) {
  }

  createPR(githubAuth: GithubAuth, snippetData: string, title: string): Observable<PullRequest> {
    requires(githubAuth, 'Github auth is required');
    requires(snippetData, 'Snippet is required');
    requires(title, 'Snippet title is required');

    this.github.setToken(githubAuth.credential.accessToken);

    const branchName = `new_snippet_${this.toLowerCaseAndSlugify(title)}`;
    const filePath = `contents/new_snippet_${this.toLowerCaseAndSlugify(title)}.md`;

    const user: User = githubAuth.additionalUserInfo.profile;
    return this.github.getRepo(this.owner, this.repoName).pipe(
      switchMap((baseRepo: Repo) => {
        return this.github.getMyRepos(user).pipe(
          switchMap((repos: Repo[]) => {
            const repo = repos.find((r) => r.name === this.repoName);
            return repo ? of(repo) : this.github.forkRepo(baseRepo).pipe(debounceTime(5000));
          }),
          switchMap((userRepo: Repo) => {
            return this.github.getMasterBranch(userRepo).pipe(
              switchMap((masterBranch: Branch) => {
                return this.github.createBranch(userRepo, masterBranch, branchName);
              }),
              switchMap(() => {
                const commit: CommitInfo = {
                  message: 'I have added awesome snippet. Look at my awesome snippet!',
                  content: btoa(snippetData),
                  branchName: branchName,
                  filePath: filePath
                };
                return this.github.createCommit(userRepo, commit);
              }),
              switchMap(() => {
                const pullRequest: CreatePullRequest = {
                  title: `Add - new snippet: ${title}`,
                  body: 'Here is a new snippet. Hope you like it :)',
                  branchName: branchName
                };
                return this.github.createPullRequest(baseRepo, user, pullRequest);
              })
            );
          })
        );
      })
    );
  }

  private toLowerCaseAndSlugify(str: string) {
    return slugify(str.toLowerCase());
  }
}

function requires(expression: any, message: string) {
  if (!expression) {
    throw new Error(message);
  }
}
