import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GitHubService } from '../shared/services/github.service';

const REPO_OWNER = 'nycJSorg';
const REPO_NAME = '30-seconds-of-angular';

@Component({
  selector: 'codelab-pull-requests-list',
  templateUrl: './pull-requests-list.component.html',
  styleUrls: ['./pull-requests-list.component.scss']
})
export class PullRequestsListComponent {
  repoOwner = REPO_OWNER;
  repoName = REPO_NAME;

  pullsList$ = this.githubService.getPullsList(this.repoOwner, this.repoName);

  displayedColumns = ['number', 'title', 'login', 'created_at', 'action'];

  constructor(private router: Router, private githubService: GitHubService) {}
}
