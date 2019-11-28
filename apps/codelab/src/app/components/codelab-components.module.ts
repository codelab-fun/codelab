import { NgModule } from '@angular/core';
import { CodelabExerciseComponent } from './exercise/exercise.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../directives/directives.module';
import { SimpleTestsProgressComponent } from '@codelab/utils/src/lib/test-results/simple-tests-progress/simple-tests-progress.component';
import { TitleSlideComponent } from './slides/title-slide/title-slide.component';
import { CodelabClosingSlideComponent } from './slides/closing-slide/codelab-closing-slide.component';
import { CodelabExercisePreviewComponent } from './exercise-preview/exercise-preview.component';
import { CodelabExercisePlaygroundComponent } from './exercise-playground/codelab-exercise-playground.component';
import { CodelabProgressBarComponent } from './codelab-progress-bar/codelab-progress-bar.component';
import { BabelTestRunnerComponent } from './babel-test-runner/babel-test-runner.component';
import { CodelabRippleAnimationComponent } from './slides/title-slide/ripple-animation/codelab-ripple-animation.component';
import { SimpleAngularTestRunnerComponent } from './angular-test-runner/angular-test-runner.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { CodelabPreviewComponent } from './slides-preview/codelab-preview.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TestResultsModule } from '@codelab/utils/src/lib/test-results/test-results.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CodeDemoModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    TestResultsModule,
    DirectivesModule
  ],
  declarations: [
    SimpleAngularTestRunnerComponent,
    TitleSlideComponent,
    BabelTestRunnerComponent,
    BreadcrumbComponent,
    CodelabExerciseComponent,
    CodelabPreviewComponent,
    CodelabClosingSlideComponent,
    CodelabExercisePreviewComponent,
    CodelabExercisePlaygroundComponent,
    CodelabProgressBarComponent,
    CodelabRippleAnimationComponent,
    SimpleTestsProgressComponent
  ],
  exports: [
    SimpleAngularTestRunnerComponent,
    TitleSlideComponent,
    BabelTestRunnerComponent,
    BreadcrumbComponent,
    CodelabExerciseComponent,
    CodelabPreviewComponent,
    CodelabClosingSlideComponent,
    CodelabExercisePreviewComponent,
    CodelabExercisePlaygroundComponent,
    CodelabProgressBarComponent,
    CodelabRippleAnimationComponent,
    SimpleTestsProgressComponent
  ]
})
export class CodelabComponentsModule {}
