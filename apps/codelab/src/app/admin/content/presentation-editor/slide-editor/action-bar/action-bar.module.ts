import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

@NgModule({
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class ActionBarModule {}
