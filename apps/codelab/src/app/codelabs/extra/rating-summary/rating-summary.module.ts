import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { BrowserWindowModule } from '@codelab/browser';
import { RatingSummaryComponent } from './rating-summary.component';
import { environment } from '../../../../environments/environment';

const routes = RouterModule.forChild(SlidesRoutes.get(RatingSummaryComponent));

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

@NgModule({
  imports: [
    routes,
    BrowserWindowModule,

    angularFire,
    CommonModule,
    HttpClientModule,
    FeedbackModule,
    SlidesModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  declarations: [RatingSummaryComponent],
  providers: [],
  exports: [RatingSummaryComponent]
})
export class RatingSummaryModule {}
