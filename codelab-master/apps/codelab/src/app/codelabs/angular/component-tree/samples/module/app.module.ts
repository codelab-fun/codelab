import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoxComponent } from './box.component';
import { CircleComponent } from './circle.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [BoxComponent, CircleComponent],
  bootstrap: [BoxComponent]
})
export class AppModule {}
