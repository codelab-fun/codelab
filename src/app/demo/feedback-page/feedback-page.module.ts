import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import {NgModule} from '@angular/core';
import {FeedbackPageComponent} from './feedback-page.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '../../browser/browser.module';
import {PresentationModule} from '../../presentation/presentation.module';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';


const routes = RouterModule.forChild(
  SlidesRoutes.get(FeedbackPageComponent)
);

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [routes, BrowserModule, PresentationModule, angularFire, FormsModule, CommonModule],
  declarations: [FeedbackPageComponent],
  providers: [AngularFireDatabaseProvider],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {

}
