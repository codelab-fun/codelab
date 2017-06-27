import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MyNgIfDirective } from './my-ng-if.directive';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, MyNgIfDirective],
  bootstrap: [AppComponent]
})
export class AppModule {
}
