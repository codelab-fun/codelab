import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTestsProgressComponent } from "./simple-tests-progress.component";
import { LoadingIndicatorModule } from '../../loading-indicator';

@NgModule({
  declarations: [SimpleTestsProgressComponent],
  exports: [SimpleTestsProgressComponent],
  imports: [CommonModule, LoadingIndicatorModule],
})
export class SimpleTestsProgressModule {}
