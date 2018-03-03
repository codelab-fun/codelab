import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpModule } from '@angular/http';
import { FeedbackModule } from '@mycurrentapp/feedback/src/feedback.module';
import { RatingSummaryComponent } from './rating-summary.component';

const routes = RouterModule.forChild(SlidesRoutes.get(RatingSummaryComponent));

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [routes, BrowserWindowModule, PresentationModule, angularFire, CommonModule, HttpModule, FeedbackModule],
  declarations: [RatingSummaryComponent],
  providers: [AngularFireDatabaseProvider, AngularFireAuthProvider],
  exports: [RatingSummaryComponent]
})
export class RatingSummaryModule {}
