import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { RatingSummaryComponent } from './rating-summary.component';
import { SlidesModule } from '../../../../../../../libs/slides/src';

const routes = RouterModule.forChild(SlidesRoutes.get(RatingSummaryComponent));

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

@NgModule({
  imports: [
    routes,
    BrowserWindowModule,
    PresentationModule,
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
