import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncComponent } from './sync.component';
import { SyncButtonComponent } from './sync-button/sync-button.component';
import { MatButtonModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
  ],
  declarations: [SyncComponent, SyncButtonComponent],
  exports: [SyncComponent, SyncButtonComponent],
})
export class SyncModule {
}
