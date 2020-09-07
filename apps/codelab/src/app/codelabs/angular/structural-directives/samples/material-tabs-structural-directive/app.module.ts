import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert.component';
import { HideMeDirective } from './hideme.directive';

@NgModule({
  imports: [BrowserModule, MatTabsModule, NoopAnimationsModule],
  declarations: [AppComponent, AlertComponent, HideMeDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
