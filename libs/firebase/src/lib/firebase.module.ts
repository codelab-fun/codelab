import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncFireStoreDirective } from './sync-fire-store.directive';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [CommonModule, AngularFirestoreModule],
  exports: [SyncFireStoreDirective],
  declarations: [SyncFireStoreDirective]
})
export class FirebaseModule {}
