import { Injectable } from '@angular/core';
import { GitHub } from 'github-api';
import { Http, Headers, RequestOptions } from "@angular/http";

@Injectable()
export class GithubService {

  repo = 'AngularNYC/angular-presentation';

  constructor(private http: Http) {
  }


  createIssue(issueData, accessToken){
    let headers = new Headers({ 'Authorization': 'token ' + accessToken });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`https://api.github.com/repos/${this.repo}/issues`, issueData, options);
  }

  closeIssue(changes, issueId, accessToken){
    let headers = new Headers({ 'Authorization': 'token ' + accessToken });
    let options = new RequestOptions({ headers: headers });
    return this.http.patch(`https://api.github.com/repos/${this.repo}/issues/${issueId}`, changes, options);
  }
}
