import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncFireStoreDirective } from './sync-fire-store.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SyncFireStoreDirective]
})
export class FirebaseModule {}
