import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTestsProgressComponent } from '@codelab/utils/src/lib/test-results/simple-tests-progress/simple-tests-progress.component';
import { LoadingIndicatorModule } from '@codelab/utils/src/lib/loading-indicator/loading-indicator.module';

@NgModule({
  declarations: [SimpleTestsProgressComponent],
  exports: [SimpleTestsProgressComponent],
  imports: [CommonModule, LoadingIndicatorModule]
})
export class SimpleTestsProgressModule {}
