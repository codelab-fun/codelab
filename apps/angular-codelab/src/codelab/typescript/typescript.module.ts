import { NgModule } from '@angular/core';
import { TypescriptComponent } from './typescript.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../libs/slides/src/slide-routes';
import { ExerciseModule } from '../../../../slides/src/app/exercise/exercise.module';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../../slides/src/app/exercise/runners/runners.module';

const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/typescript/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(TypescriptComponent)]
);

@NgModule({
  imports: [routes, SlidesModule, ExerciseModule, FeedbackModule, CommonModule, BrowserWindowModule, RunnersModule],
  declarations: [TypescriptComponent],
  exports: [TypescriptComponent]
})
export class TypescriptModule {

}
