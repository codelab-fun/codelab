import { Injectable } from '@angular/core';
import { GitHub } from 'github-api';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GithubService {

  repo = 'AngularNYC/angular-presentation';

  constructor(private http: HttpClient) {
  }


  createIssue(issueData, accessToken) {
    const headers = {'Authorization': 'token ' + accessToken};
    const options = {headers};
    return this.http.post(`https://api.github.com/repos/${this.repo}/issues`, issueData, options);
  }

  closeIssue(changes, issueId, accessToken) {
    const headers = {'Authorization': 'token ' + accessToken};
    const options = {headers};
    return this.http.patch(`https://api.github.com/repos/${this.repo}/issues/${issueId}`, changes, options);
  }
}
