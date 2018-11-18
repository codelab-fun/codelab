import { NgModule } from '@angular/core';
import { AngularPreviewRunnerComponent } from './angular-preview-runner/angular-preview-runner.component';
import { AngularTestRunnerComponent } from './angular-test-runner/angular-test-runner.component';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests/tests.component';
import { TestDescriptionComponent } from './test-description/test-description.component';
import { BrowserWindowModule } from '../../../../browser/src/lib/browser.module';
import { TestsProgressComponent } from './tests-progress/tests-progress.component';
import { BabelTestRunnerComponent } from './ts-code-test-runner/babel-test-runner.component';
import { ReactRunnerComponent } from './react-runner/react-runner.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserWindowModule
  ],
  declarations: [
    AngularPreviewRunnerComponent,
    AngularTestRunnerComponent,
    TestsComponent,
    BabelTestRunnerComponent,
    TestDescriptionComponent,
    TestsProgressComponent,
    ReactRunnerComponent,
  ],
  exports: [
    AngularPreviewRunnerComponent,
    BabelTestRunnerComponent,
    AngularTestRunnerComponent,
    TestsComponent,
    TestDescriptionComponent,
    ReactRunnerComponent,
  ]
})
export class RunnersModule {
}
