import { Component, Input } from '@angular/core';
import { GithubService } from '@codelab/utils';

@Component({
  selector: 'feedback-issue-dropdown',
  templateUrl: './feedback-issue-dropdown.component.html',
  styleUrls: ['./feedback-issue-dropdown.component.scss']
})
export class FeedbackIssueDropdownComponent {

  @Input() message: string | null = null;

  constructor(
    private ghService: GithubService,
  ) {
  }

  createIssue() {
    this.ghService.createIssue(this.message);
  }

  createClosedIssue(reason) {
    this.ghService.createClosedIssue(this.message, reason);
  }
}
