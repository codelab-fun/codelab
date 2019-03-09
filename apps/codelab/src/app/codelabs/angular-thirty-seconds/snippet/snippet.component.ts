import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'codelab-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.css']
})
export class SnippetComponent implements OnInit {

  code = {
    'app.component.ts': `
import { Component } from '@angular/core';

// Just an empty component to make everything compile
@Component({
  selector: 'my-app',
  template: ''
})
export class AppComponent {}`,
    'app.module.ts': `
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}`,

    'main.ts': `
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
`,
    'index.html': '<my-app></my-app>'

  };
  title: string;
  content: string;

  constructor() {
  }

  @Input() set snippet(snippet) {
    this.title = snippet.title;
    this.content = snippet.content;
    this.code['app.component.ts'] = snippet.componentcode || this.code['app.component.ts'];
    this.code['app.module.ts'] = snippet.modulecode || this.code['app.module.ts'];

  }

  ngOnInit() {
  }

}
