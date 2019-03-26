import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { SlugifyPipe } from '../../slugify.pipe';

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

interface CreateCommit {
  message: string;
  content: string;
  branchName: string;
}

interface Commit {
}

interface CreatePullRequest {
  title: string;
  body: string;
  branch: string;
}

interface PullRequest {
}

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

  getMyRepos(user: User): Observable<Repo[]> {
    requires(user, 'User is required');

    return this.http.get<Repo[]>(user.repos_url, this.options).pipe(
      catchError(() => throwError(new Error(`Can't fetch user repos`)))
    );
  }

  forkRepo(repoName: string): Observable<Repo> {
    requires(repoName, 'Repository name is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repoName}/forks`;
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

  createCommit(repo: Repo, commit: CreateCommit, filePath: string): Observable<Commit> {
    requires(repo, 'Repository is required');
    requires(commit, 'Commit is required');
    requires(filePath, 'File path is required');

    const requestUrl = `${this.apiGithubUrl}/repos/${repo.full_name}/${filePath}`;
    const requestData = {...commit};

    return this.http.post(requestUrl, requestData, this.options).pipe(
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
      head: `${user.login}:${pullRequest.branch}`,
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
  protected apiGithubUrl = 'https://api.github.com';

  private githubAuth;
  private globalRepo = 'nycJSorg/30-seconds-of-angular';
  private myRepo: string | null = null;
  private options;
  private snippetData;
  private title: string | null = null;

  constructor(
    private github: GitHubService,
    private slugify: SlugifyPipe
  ) {
  }

  createPR(githubAuth: GithubAuth, snippetData: string, title: string): Observable<PullRequest> {
    requires(githubAuth, 'Github auth is required');
    requires(snippetData, 'Snippet is required');
    requires(title, 'Snippet title is required');

    this.github.setToken(githubAuth.credential.accessToken);

    const branchName = `new_snippet_${this.toLowerCaseAndSlugify(title)}`;
    const filePath = `contents/snippets/${this.toLowerCaseAndSlugify(title)}.md`;

    const user: User = githubAuth.additionalUserInfo.profile;
    return this.github.getMyRepos(user).pipe(
      switchMap((repos: Repo[]) => {
        const repoName = '30-seconds-of-angular';
        const repo = repos.find((r) => r.name === repoName);
        return repo ? of(repo) : this.github.forkRepo(this.globalRepo);
      }),
      switchMap((repo: Repo) => {
        return this.github.getMasterBranch(repo).pipe(
          switchMap((masterBranch: Branch) => {
            return this.github.createBranch(repo, masterBranch, branchName);
          }),
          switchMap((branch: Branch) => {
            const commit: CreateCommit = {
              message: 'I have added awesome snippet. Look at my awesome snippet!',
              content: btoa(snippetData),
              branchName: branchName
            };
            return this.github.createCommit(repo, commit, filePath);
          }),
          switchMap((commit: Commit) => {
            const pullRequest: CreatePullRequest = {
              title: `Add - new snippet: ${title}`,
              body: 'Here is a new snippet. Hope you like it :)',
              branch: branchName
            };
            return this.github.createPullRequest(repo, user, pullRequest);
          })
        );
      })
    );
  }

  private toLowerCaseAndSlugify(str: string) {
    return this.slugify.transform(str.toLowerCase());
  }
}

function requires(expression: any, message: string) {
  if (!expression) {
    throw new Error(message);
  }
}
