import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import slugify from 'slugify';
import { GitHubService } from './github.service';
import {
  Branch,
  CommitInfo,
  CreatePullRequest,
  GithubAuth,
  PullRequest,
  Repo,
  User
} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  constructor(private githubService: GitHubService) {}

  fetchPR(repoName: string, repoOwner: string, pullNumber: number) {
    // todo move it to service later
    const pr$ = this.githubService.getPullByPullNumber(
      repoOwner,
      repoName,
      pullNumber
    );
    const file$ = this.githubService
      .getPullFileByPullNumber(repoOwner, repoName, pullNumber)
      .pipe(
        switchMap(([file]) => {
          return this.githubService.getSnippetBody(file['contents_url']).pipe(
            map(res => {
              const body = atob(res.content);
              return {
                ...res[0],
                body,
                sha: file['sha'],
                fileName: file['filename']
              };
            })
          );
        })
      );

    return combineLatest([file$, pr$]).pipe(
      map(([file, pr]) => {
        return {
          sha: file['sha'],
          fileName: file['fileName'],
          snippet: file['body'] as string,
          branchName: pr['head']['ref']
        };
      })
    );
  }

  updatePR(
    githubAuth: GithubAuth,
    snippetData: string,
    fileInfo: object,
    repoName: string
  ): Observable<any> {
    this.githubService.setToken(githubAuth.credential.accessToken);
    const user: User = githubAuth.additionalUserInfo.profile;

    return this.githubService.getMyRepos(user).pipe(
      switchMap((repos: Repo[]) => {
        const repo = repos.find(r => r.name === repoName);
        return this.githubService.updateFile(
          repo.full_name,
          snippetData,
          fileInfo
        );
      })
    );
  }

  createPR(
    githubAuth: GithubAuth,
    snippetData: string,
    title: string,
    repoName: string,
    repoOwner: string
  ): Observable<PullRequest> {
    requires(githubAuth, 'Github auth is required');
    requires(snippetData, 'Snippet is required');
    requires(title, 'Snippet title is required');

    this.githubService.setToken(githubAuth.credential.accessToken);

    const branchName = `new_snippet_${this.toLowerCaseAndSlugify(title)}`;
    const filePath = `contents/snippets/${this.toLowerCaseAndSlugify(
      title
    )}.md`;

    const user: User = githubAuth.additionalUserInfo.profile;
    return this.githubService.getRepo(repoOwner, repoName).pipe(
      switchMap((baseRepo: Repo) => {
        return this.githubService.getMyRepos(user).pipe(
          switchMap((repos: Repo[]) => {
            const repo = repos.find(r => r.name === repoName);
            return repo
              ? of(repo)
              : this.githubService.forkRepo(baseRepo).pipe(debounceTime(5000));
          }),
          switchMap((userRepo: Repo) => {
            return this.githubService.getMasterBranch(userRepo).pipe(
              switchMap((masterBranch: Branch) => {
                return this.githubService.createBranch(
                  userRepo,
                  masterBranch,
                  branchName
                );
              }),
              switchMap(() => {
                const commit: CommitInfo = {
                  message:
                    'I have added awesome snippet. Look at my awesome snippet!',
                  content: btoa(snippetData),
                  branchName: branchName,
                  filePath: filePath
                };
                return this.githubService.createCommit(userRepo, commit);
              }),
              switchMap(() => {
                const pullRequest: CreatePullRequest = {
                  title: `Add - new snippet: ${title}`,
                  body: 'Here is a new snippet. Hope you like it :)',
                  labels: ['snippet'],
                  branchName: branchName
                };
                return this.githubService.createPullRequest(
                  baseRepo,
                  user,
                  pullRequest
                );
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
