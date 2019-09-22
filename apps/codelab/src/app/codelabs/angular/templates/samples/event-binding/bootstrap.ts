import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { CoffeeMakerComponent } from './coffee-maker';
import { AppComponent } from './app.component';
import { ResourceLoader } from '@angular/compiler';
import * as code from './code';

class MyResourceLoader extends ResourceLoader {
  get(url: string): Promise<string> {
    const templateId = Object.keys(code).find(key =>
      key.includes(url.replace(/[\/\.-]/gi, '_'))
    );
    const template = code[templateId];
    if (!template) {
      console.log(template);
      // tslint:disable-next-line:no-debugger
      debugger;
    }
    return Promise.resolve(template);
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, CoffeeMakerComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule, [
  {
    providers: [
      {
        provide: ResourceLoader,
        useFactory: () => new MyResourceLoader(),
        deps: []
      }
    ]
  }
]);
