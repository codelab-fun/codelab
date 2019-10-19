import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineIndicatorComponent } from './online-indicator.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OnlineIndicatorComponent],
  exports: [OnlineIndicatorComponent],
  imports: [CommonModule, MatIconModule]
})
export class OnlineIndicatorModule {}
