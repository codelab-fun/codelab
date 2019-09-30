import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
/*d:thumbsComponentUse/trimLeading*/
import { ThumbsComponent } from './thumbs/thumbs.component'; /*d:togglePanelComponentUse/trimLeading*/
/*/d*/ import { TogglePanelComponent } from './toggle-panel/toggle-panel.component'; /*d:diInjectService/trimLeading*/
/*/d*/ import { VideoService } from './video/video.service'; /*d:videoComponentUse/trimLeading*/
/*/d*/ import { VideoComponent } from './video/video.component'; /*d:contextComponentUse/trimLeading*/
/*/d*/ import { ContextComponent } from './context/context.component'; /*d:fuzzyPipeUse/trimLeading*/
/*/d*/ import { FuzzyPipe } from './fuzzy-pipe/fuzzy.pipe'; /*d:router/trimLeading*/
/*/d*/ import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component'; /*d:material/trimLeading*/
/*/d*/ import {
  MatCardModule,
  /*/d*/ /*d:forms*/ MatInputModule,
  MatButtonModule,
  /*/d*/ /*d:material*/ MatToolbarModule
} from '@angular/material'; /*d:forms/trimLeading*/
/*/d*/ import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; /*d:createModuleSolved*/
/*/d*/ @NgModule({
  imports: [
    BrowserModule /*d:materialSolved/trimLeading*/,
    /*/d*/ MatToolbarModule,
    MatCardModule /*d:formsSolved/trimLeading*/,
    /*/d*/ MatButtonModule,
    MatInputModule,
    FormsModule /*d:formsPre/trimLeading*/,
    /*/d*/ NoopAnimationsModule /*d:routerSolved/trimLeading*/,
    /*/d*/ RouterModule.forRoot([
      { path: '', component: SearchComponent },
      { path: 'upload', component: UploadComponent }
    ]) /*/d*/ /*d:createModuleSolved/trimTrailing*/
  ],
  declarations: [
    AppComponent /*d:videoComponentUseSolved/trimBoth*/,
    /*/d*/ VideoComponent /*d:thumbsComponentUseSolved/trimBoth*/,
    /*/d*/ ThumbsComponent /*d:togglePanelComponentUseSolved/trimBoth*/,
    /*/d*/ TogglePanelComponent /*d:contextComponentUse/trimBoth*/,
    /*/d*/ ContextComponent /*d:router/trimBoth*/,
    /*/d*/ SearchComponent,
    UploadComponent /*d:fuzzyPipeUseSolved/trimBoth*/,
    /*/d*/ FuzzyPipe /*d:createModuleSolved/trimBoth*/
    /*/d*/
  ],
  bootstrap: [AppComponent] /*/d*/ /*d:diInjectServiceSolved/trimTrailing*/,
  providers: [VideoService] /*d:createModuleSolved/trimTrailing*/
  /*/d*/
})
export class AppModule {
  /*/d*/
  /*d:createModuleSolved*/
} /*d:neverShow*/ // Needed for type checking

/*/d*/ export function evalJs(param) {
  return param;
}
/*/d*/
