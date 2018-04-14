import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { FeedbackPageComponent } from './feedback-page.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/slides/src/slide-routes';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { SlidesModule } from '../../../../../../../libs/slides/src/slides.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { GithubService } from 'app/github.service';
import { HttpModule } from '@angular/http';


const routes = RouterModule.forChild(
  SlidesRoutes.get(FeedbackPageComponent)
);

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [routes, BrowserWindowModule, SlidesModule, angularFire, FormsModule, CommonModule, HttpModule],
  declarations: [FeedbackPageComponent],
  providers: [AngularFireDatabaseProvider, AngularFireAuthProvider, GithubService],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {

}
