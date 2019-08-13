import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncComponent } from './sync.component';

@NgModule({
  declarations: [SyncComponent],
  exports: [SyncComponent],
  imports: [
    CommonModule,
  ]
})
export class SyncModule {
}
