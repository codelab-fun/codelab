export interface CreatePullRequest {
  title: string;
  body: string;
  branchName: string;
  labels?: Array<string>;
}
