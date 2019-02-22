import { NgModule } from '@angular/core';
import { CodelabExerciseComponent } from './exercise/exercise.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';


import { SimpleTestsProgressComponent } from './tests-progress/simple-tests-progress.component';
import { SimpleTestsComponent } from './tests/simple-tests.component';
import { SimpleTestDescriptionComponent } from './test-description/simple-test-description.component';

import { TitleSlideComponent } from './slides/title-slide/title-slide.component';

import { CodelabClosingSlideComponent } from './slides/closing-slide/codelab-closing-slide.component';
import { CodelabExercisePreviewComponent } from './exercise-preview/exercise-preview.component';
import { CodelabExercisePlaygroundComponent } from './exercise-playground/codelab-exercise-playground.component';
import { CodelabProgressBarComponent } from './codelab-progress-bar/codelab-progress-bar.component';
import { BabelTestRunnerComponent } from './babel-test-runner/babel-test-runner.component';
import { CodelabRippleAnimationComponent } from './slides/title-slide/ripple-animation/codelab-ripple-animation.component';
import { SimpleAngularTestRunnerComponent } from './angular-test-runner/angular-test-runner.component';
import { MenuShortcutComponent } from './menu-shortcut/menu-shortcut.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { CodelabPreviewComponent } from './slides-preview/codelab-preview.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
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
    CodelabPreviewComponent,
    CodelabClosingSlideComponent,
    CodelabExercisePreviewComponent,
    CodelabExercisePlaygroundComponent,
    CodelabProgressBarComponent,
    BabelTestRunnerComponent,
    CodelabRippleAnimationComponent,
    SimpleAngularTestRunnerComponent,
    MenuShortcutComponent,
    BreadcrumbComponent
  ],
  exports: [
    CodelabExerciseComponent,
    SimpleAngularTestRunnerComponent,
    TitleSlideComponent,
    CodelabPreviewComponent,
    CodelabClosingSlideComponent,
    CodelabExercisePreviewComponent,
    CodelabExercisePlaygroundComponent,
    CodelabProgressBarComponent,
    BabelTestRunnerComponent,
    MenuShortcutComponent,
    BreadcrumbComponent
  ]
})
export class CodelabComponentsModule {
}
