export const angularSampleCode = {
  'app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: \`<h1>Edit me </h1>\`
})
export class AppComponent {}`,
  'app.module.ts': `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}`,

  'main.ts': `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
`,
  'index.html': '<my-app></my-app>'
};
