import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActionBarComponent } from './action-bar.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent],
})
export class ActionBarModule {}
