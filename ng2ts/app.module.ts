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
import { MatCardModule} from '@angular/material/card'; /*/d*//*d:forms*/
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
 /*/d*//*d:material*/
import { MatToolbarModule} from '@angular/material/toolbar';
/*/d*//*d:forms/trimLeading*/
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/*/d*//*d:createModuleSolved*/
@NgModule({
  imports: [
    BrowserModule,
    /*/d*//*d:materialSolved/trimLeading*/
    MatToolbarModule,
    MatCardModule,
    /*/d*//*d:formsSolved/trimLeading*/
    MatButtonModule,
    MatInputModule,
    FormsModule,
    /*/d*//*d:formsPre/trimLeading*/
    NoopAnimationsModule,
    /*/d*//*d:routerSolved/trimLeading*/
    RouterModule.forRoot([
      {path: '', component: SearchComponent},
      {path: 'upload', component: UploadComponent}
  ]) /*/d*//*d:createModuleSolved/trimTrailing*/
],
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
