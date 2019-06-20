import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { BrowserWindowModule } from '@codelab/browser';

import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackModule } from '@codelab/feedback';
import { RatingSummaryComponent } from './rating-summary.component';
import { SlidesModule } from '@codelab/slides';

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
