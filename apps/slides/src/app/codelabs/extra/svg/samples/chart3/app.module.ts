import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TicksComponent } from './ticks.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, TicksComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
