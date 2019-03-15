import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { FeedbackPageComponent } from './feedback-page.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserWindowModule } from '@codelab/browser';

import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { GithubService } from './github.service';

import { SlidesModule } from '@codelab/slides';
import { environment } from '../../../../environments/environment';
import { DateRangeComponent } from './date-range/date-range.component';

const routes = RouterModule.forChild(SlidesRoutes.get(FeedbackPageComponent));

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

@NgModule({
  imports: [
    routes,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserWindowModule,
    angularFire,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    SlidesModule
  ],
  declarations: [FeedbackPageComponent, DateRangeComponent],
  providers: [GithubService],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {}
