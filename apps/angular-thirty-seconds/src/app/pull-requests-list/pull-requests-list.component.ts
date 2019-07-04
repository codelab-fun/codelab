import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GitHubService } from '../shared/services/github.service';

@Component({
  selector: 'codelab-pull-requests-list',
  templateUrl: './pull-requests-list.component.html',
  styleUrls: ['./pull-requests-list.component.scss']
})
export class PullRequestsListComponent {

  REPO_OWNER = 'nycJSorg';
  REPO_NAME = '30-seconds-of-angular';

  isLoading = true;

  displayedColumns = ['number', 'title', 'login', 'created_at', 'action'];

  private pullsList;

  constructor(
    private router: Router,
    private githubService: GitHubService
  ) {
    this.getPullsList();
  }

  getPullsList() {
    this.githubService.getPullsList(this.REPO_OWNER, this.REPO_NAME)
      .subscribe(res => this.pullsList = res.filter(x => x['labels'].length && x['labels'].map(y => y['name']).indexOf('snippet') > -1))
      .add(() => this.isLoading = false);
  }
}
