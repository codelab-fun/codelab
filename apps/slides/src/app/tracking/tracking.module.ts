import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingDirective } from './tracking.directive';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    angularFire
  ],
  declarations: [TrackingDirective],
  providers: [AngularFireDatabaseProvider, AngularFireAuthProvider],
  exports: [TrackingDirective]
})
export class TrackingModule {
}
