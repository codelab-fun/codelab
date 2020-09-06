import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LoadingIndicatorComponent],
  exports: [LoadingIndicatorComponent],
  imports: [CommonModule, MatIconModule]
})
export class LoadingIndicatorModule {}
