import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { FeedbackPageComponent } from './feedback-page.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { PresentationModule } from '../../../presentation/presentation.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { GithubService } from '../../../github.service';


const routes = RouterModule.forChild(
  SlidesRoutes.get(FeedbackPageComponent)
);

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [
    routes,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserWindowModule, PresentationModule, angularFire, FormsModule, CommonModule, HttpClientModule
  ],
  declarations: [FeedbackPageComponent],
  providers: [GithubService],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {

}
