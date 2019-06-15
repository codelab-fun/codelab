import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GitHubService } from '../shared/services/github.service';

@Component({
  selector: 'codelab-pull-requests-list',
  templateUrl: './pull-requests-list.component.html',
  styleUrls: ['./pull-requests-list.component.scss']
})
export class PullRequestsListComponent {

  isLoading = false;

  displayedColumns: string[] = ['title', 'created_at', 'action'];

  private pullsList;

  constructor(
    private router: Router,
    private githubService: GitHubService
  ) {
    this.getPullsList();
  }

  getPullsList() {
    this.isLoading = true;
    this.githubService.getPullsList('nycJSorg', '30-seconds-of-angular')
      .subscribe(res => {
          this.pullsList = res.filter(x => x['labels'].length && x['labels'][0]['name'] === 'snippet');
          this.isLoading = false;
        },
        () => this.isLoading = false
      );
  }
}
