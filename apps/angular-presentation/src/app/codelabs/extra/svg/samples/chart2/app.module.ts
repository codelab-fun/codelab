import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TicksComponent } from './ticks.component';
import { AppComponentSolved } from './app.component.solved';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, TicksComponent, AppComponentSolved],
  bootstrap: [AppComponent]
})
export class AppModule {
}
