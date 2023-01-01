import { importProvidersFrom, ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TrackingDirective } from './tracking.directive';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FirebaseOptions } from "@angular/fire/app";
@NgModule({
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  declarations: [TrackingDirective],
  exports: [TrackingDirective],
})
export class TrackingModule {
  static forRoot(firebaseConfig: FirebaseOptions): ModuleWithProviders<TrackingModule> {
    return {
      ngModule: TrackingModule,
      providers: [
        importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig))
      ]
    }
  }
}
