import { parseSnippet } from './parse-snippet';
import {
  testSnippetEdgeCases,
  testSnippetMd,
  testSnippetMinimal,
  testSnippetParsed
} from './test-data/snippet';

describe('ParseSnippet', () => {
  it('parses a simple snippet', () => {
    const actual = parseSnippet(testSnippetMd);
    expect(actual).toEqual(testSnippetParsed);
  });

  it('testSnippetMinimal', () => {
    const actual = parseSnippet(testSnippetMinimal);
    expect(actual.bonus).toBe('');
    expect(actual.links).toEqual(undefined);
    expect(actual.demo).toEqual(undefined);
    expect(actual.content).toEqual('Content');
  });

  it('works when file names have spaces', () => {
    const actual = parseSnippet(testSnippetEdgeCases);

    expect(actual.demo).toEqual({
      'app.component.ts':
        "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'my-app',\n  template: `<h1>Edit me </h1>`\n})\nexport class AppComponent {}",
      'app.module.ts':
        "import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\nimport { AppComponent } from './app.component';\n" +
        '\n@NgModule({\n  imports: [BrowserModule],\n  declarations: [AppComponent],\n' +
        '  bootstrap: [AppComponent]\n})\nexport class AppModule {}',
      'main.ts':
        "import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';\nimport { AppModule } from './app.module';" +
        '\n\nplatformBrowserDynamic().bootstrapModule(AppModule);\n',
      'index.html': '<my-app></my-app>',
      'app.svg': '<circle r=100 fill=red></circle>'
    });
  });
});
