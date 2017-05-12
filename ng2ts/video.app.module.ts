import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {VideoWrapperComponent} from './video/video-wrapper.component';
import {VideoComponent} from './video/video.component';


@NgModule({
  imports: [BrowserModule],
  declarations: [VideoWrapperComponent, VideoComponent],
  bootstrap: [VideoWrapperComponent]
})
export class AppModule {
}
