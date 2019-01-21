import { NgModule } from '@angular/core';
import { CodelabExerciseComponent } from './exercise/exercise.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatSelectModule } from '@angular/material';

import { CodeDemoModule } from '../../../../../libs/code-demos/src';
import { SimpleTestsProgressComponent } from './tests-progress/simple-tests-progress.component';
import { SimpleTestsComponent } from './tests/simple-tests.component';
import { SimpleTestDescriptionComponent } from './test-description/simple-test-description.component';

import { TitleSlideComponent } from './slides/title-slide/title-slide.component';
import { CodelabSlidesPreviewComponent } from './slides-preview/codelab-slides-preview.component';
import { CodelabClosingSlideComponent } from './slides/closing-slide/codelab-closing-slide.component';
import { CodelabExercisePreviewComponent } from './exercise-preview/exercise-preview.component';
import { CodelabExercisePlayground } from './exercise-playground/codelab-exercise-playground.component';
import { CodelabProgressBarComponent } from './codelab-progress-bar/codelab-progress-bar.component';
import { BabelTestRunnerComponent } from './babel-test-runner/babel-test-runner.component';
import { CodelabRippleAnimationComponent } from './slides/title-slide/ripple-animation/codelab-ripple-animation.component';
import { SimpleAngularTestRunnerComponent } from './angular-test-runner/angular-test-runner.component';
import { MenuShortcutComponent } from './menu-shortcut/menu-shortcut.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    CodeDemoModule
  ],
  declarations: [
    CodelabExerciseComponent,
    SimpleTestsProgressComponent,
    SimpleTestsComponent,
    SimpleTestDescriptionComponent,
    TitleSlideComponent,
    CodelabSlidesPreviewComponent,
    CodelabClosingSlideComponent,
    CodelabExercisePreviewComponent,
    CodelabExercisePlayground,
    CodelabProgressBarComponent,
    BabelTestRunnerComponent,
    CodelabRippleAnimationComponent,
    SimpleAngularTestRunnerComponent,
    MenuShortcutComponent
  ],
  exports: [
    CodelabExerciseComponent,
    SimpleAngularTestRunnerComponent,
    TitleSlideComponent,
    CodelabSlidesPreviewComponent,
    CodelabClosingSlideComponent,
    CodelabExercisePreviewComponent,
    CodelabExercisePlayground,
    CodelabProgressBarComponent,
    BabelTestRunnerComponent,
    MenuShortcutComponent
  ]
})
export class CodelabComponentsModule {}
