import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
/*d:thumbsComponentUse/trimLeading*/
import { ThumbsComponent } from './thumbs/thumbs.component';
/*/d*//*d:togglePanelComponentUse/trimLeading*/
import { TogglePanelComponent } from './toggle-panel/toggle-panel.component';
/*/d*//*d:diInjectService/trimLeading*/
import { VideoService } from './video/video.service';
/*/d*//*d:videoComponentUse/trimLeading*/
import { VideoComponent } from './video/video.component';
/*/d*//*d:contextComponentUse/trimLeading*/
import { ContextComponent } from './context/context.component';
/*/d*//*d:fuzzyPipeUse/trimLeading*/
import { FuzzyPipe } from './fuzzy-pipe/fuzzy.pipe';
/*/d*//*d:router/trimLeading*/
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
/*/d*//*d:material/trimLeading*/
import { MatCardModule, /*/d*//*d:forms*/ MatInputModule, MatButtonModule, /*/d*//*d:material*/ MatToolbarModule } from '@angular/material';
/*/d*//*d:forms/trimLeading*/
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/*/d*//*d:createModuleSolved/trimTrailing*/

@NgModule({
  imports: [
    BrowserModule,
    /*/d*//*d:material*/
    MatToolbarModule,
    MatCardModule,
    /*/d*//*d:forms/trimLeading*/
    MatButtonModule,
    MatInputModule,
    NoopAnimationsModule,
    FormsModule,
    /*/d*//*d:router/trimBoth*/
    RouterModule.forRoot([
      {path: '', component: UploadComponent},
      {path: 'upload', component: UploadComponent}
    ]) /*/d*//*d:createModuleSolved/trimBoth*/ ],
  declarations: [AppComponent
    /*/d*//*d:videoComponentUseSolved/trimBoth*/, VideoComponent
    /*/d*//*d:thumbsComponentUseSolved/trimBoth*/, ThumbsComponent
    /*/d*//*d:togglePanelComponentUseSolved/trimBoth*/, TogglePanelComponent
    /*/d*//*d:contextComponentUse/trimBoth*/, ContextComponent
    /*/d*//*d:router/trimBoth*/, SearchComponent, UploadComponent
    /*/d*//*d:fuzzyPipeUseSolved/trimBoth*/, FuzzyPipe
    /*/d*//*d:createModuleSolved/trimBoth*/
  ],
  bootstrap: [AppComponent]/*/d*//*d:diInjectServiceSolved/trimTrailing*/,
  providers: [VideoService]
  /*/d*//*d:createModuleSolved/trimTrailing*/
})
export class AppModule {
  /*/d*//*d:createModuleSolved*/
}

/*/d*//*d:neverShow*/
// Needed for type checking
export function evalJs(param) { return param; }
/*/d*/
