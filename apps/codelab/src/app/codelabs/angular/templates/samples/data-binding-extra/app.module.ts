import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BirthdayCardComponent } from './birthday-card';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, BirthdayCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
