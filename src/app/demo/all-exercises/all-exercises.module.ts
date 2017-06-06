import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AllExercisesComponent } from './all-exercises.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../presentation/slide-routes';
import { FeedbackModule } from '../../feedback/feedback.module';
import { ExerciseModule } from '../../exercise/exercise.module';
import { PresentationModule } from '../../presentation/presentation.module';
import { Ng2TsExercises } from '../../../../ng2ts/ng2ts';
import { BrowserModule } from '../../browser/browser.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/all-exercises/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(AllExercisesComponent)]
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, BrowserModule, CommonModule],
  providers: [Ng2TsExercises],
  declarations: [AllExercisesComponent],
  exports: [AllExercisesComponent]
})
export class AllExercisesModule {
  
}

