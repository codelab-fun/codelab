import { Component, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'hello-world',
  template: `
    <h1>Hello I'm an Angular app!</h1>
    <h2>Very soon you will learn how to create and bootstrap me!</h2>
  `
})
export class AppComponent {}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
