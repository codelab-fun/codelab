import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { PresentationModule } from '../../../presentation/presentation.module';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { CommonModule } from '@angular/common';
import { CreateFirstAppComponent } from './create-first-app.component';


const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/create-first-app/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(CreateFirstAppComponent)]
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule],
  declarations: [CreateFirstAppComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {

}
