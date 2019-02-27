import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { FeedbackPageComponent } from './feedback-page.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '@codelab/browser';

import { CommonModule } from '@angular/common';

import { SlidesModule } from '@codelab/slides';
import { environment } from '../../../../environments/environment';

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
    CommonModule,
    SlidesModule
  ],
  declarations: [FeedbackPageComponent],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {}
