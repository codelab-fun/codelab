import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingDirective } from './tracking.directive';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

export const angularFire = AngularFireModule.initializeApp(environment.firebaseConfig);

@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    angularFire
  ],
  declarations: [TrackingDirective],
  exports: [TrackingDirective]
})
export class TrackingModule {
}
