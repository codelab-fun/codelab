import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { FeedbackPageComponent } from './feedback-page.component';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '@slides/browser-window';
import { SlidesModule } from '@slides/slides';
import { CommonModule } from '@angular/common';


import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { GithubService } from './github.service';



export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [BrowserWindowModule, SlidesModule, angularFire, FormsModule, CommonModule, HttpModule],
  declarations: [FeedbackPageComponent],
  providers: [AngularFireDatabaseProvider, AngularFireAuthProvider, GithubService],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {

}
