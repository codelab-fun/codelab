import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SyncSessionsComponent } from './sync-sessions.component';

@NgModule({
  declarations: [SyncSessionsComponent],
  entryComponents: [SyncSessionsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class SyncSessionsModule {}
