import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GitHubService } from '../shared/services/github.service';
import { SnippetService } from '../shared/services/snippet.service';
// @ts-ignore
window.Buffer = {
  from() {
  }
};
// @ts-ignore
const matter = require('gray-matter');

function extractHeaders(str) {
  const match = ('\n' + str + '\n#')
    .match(/\n#+.*\n[\s\S]*?(?=\n#)/g);

  if (!match) {
    return {
      content: str,
    };
  }
  return match
    .reduce((result, a) => {
      const {groups} = a.match(/^\n(?<depth>#+)(?<header>.*)\n(?<content>[\s\S]*)$/);
      result[groups.header.trim().toLocaleLowerCase()] = groups.content.trim();
      return result;
    }, {});
}

function mdTextToJson(snippet: string) {
  const result = matter(snippet);
  // console.log({...extractHeaders(result.content), ...result.data}['content']);
  return {
    bonus: 'qweasd',
    content: '↵You can use markdown here.↵↵Highlight `important terms` with backticks.↵↵For examples use:↵```typescript↵const language = \'English\';↵function theLanguageISpeak(language) {↵  // English? No, only typescript!↵  return \'typescript\'↵}↵```',
    demo: {
      'app.component.ts': 'import { Component } from \'@angular/core\';↵↵@Component({↵  selector: \'my-app\',↵  template: `<h1>Edit me </h1>`↵})↵export class AppComponent {↵  asdddaaasdasd↵}',
      'app.module.ts': null,
      'index.html': '<my-app></my-app>↵asdasdqweq',
      'main.ts': null
    },
    level: 'advanced',
    links: 'https://angular.io/↵https://www.typescriptlang.org/',
    tags: ['tip', 'asdz', 'components'],
    title: 'test'
  };
}


@Component({
  selector: 'codelab-pull-requests-list',
  templateUrl: './pull-requests-list.component.html',
  styleUrls: ['./pull-requests-list.component.scss']
})
export class PullRequestsListComponent {

  displayedColumns: string[] = ['title', 'created_at', 'action'];

  private owner = 'nycJSorg';
  private repoName = '30-seconds-of-angular';
  private pullsList;

  constructor(
    private router: Router,
    private githubService: GitHubService,
    private snippetService: SnippetService
  ) {
    this.githubService.getPullRequests(this.owner, this.repoName)
      .subscribe(res => this.pullsList = res.filter(x => x['title'].indexOf('Add - new snippet') > -1));
  }

  editPull(e) {
    this.githubService.getPullFileByPullNumber(this.owner, this.repoName, e['number'])
      .subscribe(res => {
        const snippetFileInfo = {
          sha: res[0]['sha'],
          fileName: res[0]['filename'],
          snippet: mdTextToJson(res[0]['patch']),
          branchName: e['head']['ref']
        };
        this.snippetService.setSnippetToEdit(snippetFileInfo);
        this.router.navigate(['add-edit-snippet']);
      });
  }
}
