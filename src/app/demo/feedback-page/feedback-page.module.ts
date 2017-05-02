import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import {NgModule} from '@angular/core';
import {FeedbackPageComponent} from './feedback-page.component';
import {RouterModule} from '@angular/router';
import {SlidesRoutes} from '../../presentation/slide-routes';
import {FormsModule} from '@angular/forms';
import {BrowserWindowModule} from '../../browser-window/browser-window.module';
import {PresentationModule} from '../../presentation/presentation.module';
import { CommonModule } from '@angular/common';


const routes = RouterModule.forChild(
  SlidesRoutes.get(FeedbackPageComponent)
);


const firebaseConfig = {
  apiKey: 'AIzaSyBDg_JEXDrn7iuvGR-xrcU1bmjWc-uxmgA',
  authDomain: 'ng2-codelab.firebaseapp.com',
  databaseURL: 'https://ng2-codelab.firebaseio.com',
  storageBucket: 'ng2-codelab.appspot.com'
};

export const angularFire = AngularFireModule.initializeApp(firebaseConfig);

@NgModule({
  imports: [routes, BrowserWindowModule, PresentationModule, angularFire, FormsModule, CommonModule],
  declarations: [FeedbackPageComponent],
  providers:[AngularFireDatabaseProvider],
  exports: [FeedbackPageComponent]
})
export class FeedbackPageModule {

}
