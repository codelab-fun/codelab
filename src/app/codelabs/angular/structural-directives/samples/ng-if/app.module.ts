import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MyNgIfDirective } from './my-ng-if.directive';
import { AlertComponent } from './alert.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, MyNgIfDirective, AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
