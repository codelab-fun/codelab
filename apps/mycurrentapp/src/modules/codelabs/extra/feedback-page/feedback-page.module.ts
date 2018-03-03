import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { FeedbackPageComponent } from './feedback-page.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@mycurrentapp/presentation/src/slide-routes';
import { FormsModule } from '@angular/forms';
import { BrowserWindowModule } from '@mycurrentapp/browser-window/src/browser-window.module';
import { PresentationModule } from '@mycurrentapp/presentation/src/presentation.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UtilsModule } from '@mycurrentapp/utils';

const routes = RouterModule.forChild(SlidesRoutes.get(FeedbackPageComponent));

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [
    routes,
    BrowserWindowModule,
    PresentationModule,
    angularFire,
    FormsModule,
    CommonModule,
    HttpClientModule,
    UtilsModule
  ],
  declarations: [FeedbackPageComponent],
  providers: [AngularFireDatabaseProvider, AngularFireAuthProvider],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {}
