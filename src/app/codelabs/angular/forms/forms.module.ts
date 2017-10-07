
import { NgModule } from '@angular/core';
import { SlidesRoutes } from '../../../presentation/slide-routes';
import { ExerciseModule } from '../../../exercise/exercise.module';
import { PresentationModule } from 'app/presentation/presentation.module';
import { FeedbackModule } from '../../../feedback/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../browser/browser.module';
import { RunnersModule } from '../../../exercise/runners/runners.module';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/forms/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(FormsComponent)]
);

@NgModule({
  imports: [routes, PresentationModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule],
  declarations: [FormsComponent],
  exports: [FormsComponent]
})
export class FormsCodelabModule {
}
