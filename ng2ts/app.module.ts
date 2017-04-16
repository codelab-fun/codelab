import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
/*d:thumbsComponentUse/trimLeading*/
import {ThumbsComponent} from './thumbs/thumbs.component';
/*/d*//*d:togglePanelComponentUse/trimLeading*/
import {TogglePanelComponent} from './toggle-panel/toggle-panel.component';
/*/d*//*d:diInjectService/trimLeading*/
import {VideoService} from './video/video.service';
/*/d*//*d:videoComponentUse/trimLeading*/
import {VideoComponent} from './video/video.component';
/*/d*//*d:contextComponentUse/trimLeading*/
import {ContextComponent} from './context/context.component';
/*/d*//*d:fuzzyPipeUse/trimLeading*/
import {FuzzyPipe} from './fuzzy-pipe/fuzzy.pipe';
/*/d*//*d:createModuleSolved/trimTrailing*/
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent
    /*/d*//*d:videoComponentUseSolved/trimBoth*/, VideoComponent
    /*/d*//*d:thumbsComponentUseSolved/trimBoth*/, ThumbsComponent
    /*/d*//*d:togglePanelComponentUseSolved/trimBoth*/, TogglePanelComponent
    /*/d*//*d:contextComponentUse/trimBoth*/, ContextComponent
    /*/d*//*d:fuzzyPipeUseSolved/trimBoth*/, FuzzyPipe
    /*/d*//*d:createModuleSolved/trimBoth*/
  ],
  bootstrap: [AppComponent]/*/d*//*d:diInjectServiceSolved/trimTrailing*/,
  providers: [VideoService]
  /*/d*//*d:createModuleSolved/trimTrailing*/
})
export class AppModule {
  /*/d*//*d:createModuleSolved*/
}/*/d*/
