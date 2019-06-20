import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingDirective } from './tracking.directive';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../../../../apps/codelab/src/environments/environment';

export const angularFire = AngularFireModule.initializeApp(
  environment.firebaseConfig
);

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
export class TrackingModule {}
