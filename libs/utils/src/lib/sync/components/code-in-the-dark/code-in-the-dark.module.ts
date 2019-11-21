import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeInTheDarkComponent } from './code-in-the-dark.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { TestRunnerComponent } from '../../../sandbox-runner/test-runner.component';
import { MatIconModule } from '@angular/material/icon';
import { SimpleTestsProgressModule } from '@codelab/utils/src/lib/sandbox-runner/tests-progress/simple-tests-progress.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [CodeInTheDarkComponent, TestRunnerComponent],
  exports: [CodeInTheDarkComponent],
  imports: [
    CommonModule,
    CodeDemoModule,
    FormsModule,
    MatIconModule,
    SimpleTestsProgressModule,
    MatCheckboxModule,
    MatTabsModule
  ]
})
export class CodeInTheDarkModule {}
