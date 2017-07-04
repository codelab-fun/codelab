import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MdTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert.component';
import { HideMeDirective } from './hideme.directive';

@NgModule({
  imports: [BrowserModule, MdTabsModule, NoopAnimationsModule],
  declarations: [AppComponent, AlertComponent, HideMeDirective],
  bootstrap: [AppComponent]
})
export class AppModule {
}
