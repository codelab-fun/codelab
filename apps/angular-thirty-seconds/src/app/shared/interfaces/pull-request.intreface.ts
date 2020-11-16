export interface CreatePullRequest {
  title: string;
  body: string;
  branchName: string;
  labels?: Array<string>;
}

export interface PullRequest {
  title: string;
  html_url: string;
}
