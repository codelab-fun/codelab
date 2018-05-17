import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { FeedbackPageComponent } from './feedback-page.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { GithubService } from 'app/github.service';
import { HttpModule } from '@angular/http';


const routes = RouterModule.forChild(
  SlidesRoutes.get(FeedbackPageComponent)
);

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [routes,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserWindowModule, PresentationModule, angularFire, FormsModule, CommonModule, HttpModule],
  declarations: [FeedbackPageComponent],
  providers: [GithubService],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {

}
