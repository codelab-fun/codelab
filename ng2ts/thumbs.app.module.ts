import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ThumbsComponent} from './thumbs/thumbs.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [ThumbsComponent],
  bootstrap: [ThumbsComponent]
})
export class AppModule {
}
