import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncSessionsComponent } from './sync-sessions.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [
    SyncSessionsComponent
  ],
  entryComponents: [SyncSessionsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class SyncSessionsModule {
}
