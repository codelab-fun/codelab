import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ActionBarComponent],
  exports: [ActionBarComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule]
})
export class ActionBarModule {}
