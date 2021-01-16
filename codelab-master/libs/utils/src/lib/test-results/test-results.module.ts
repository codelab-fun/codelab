import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRunResultsComponent } from './test-run-results/test-run-results.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TestResultsComponent } from './test-results/test-results.component';
import { SimpleTestsProgressModule } from '@codelab/utils/src/lib/test-results/simple-tests-progress/simple-tests-progress.module';
import { FileAwareDescriptionComponent } from './file-aware-description/file-aware-description.component';

@NgModule({
  declarations: [
    TestRunResultsComponent,
    TestResultsComponent,
    FileAwareDescriptionComponent
  ],
  exports: [TestResultsComponent, TestRunResultsComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    SimpleTestsProgressModule
  ]
})
export class TestResultsModule {}
