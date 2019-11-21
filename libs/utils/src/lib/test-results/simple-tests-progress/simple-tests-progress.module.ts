import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTestsProgressComponent } from '@codelab/utils/src/lib/test-results/simple-tests-progress/simple-tests-progress.component';

@NgModule({
  declarations: [SimpleTestsProgressComponent],
  exports: [SimpleTestsProgressComponent],
  imports: [CommonModule]
})
export class SimpleTestsProgressModule {}
