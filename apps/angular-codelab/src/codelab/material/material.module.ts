import { MaterialComponent } from './material.component';
import { NgModule } from '@angular/core';
import { SlidesRoutes } from '../../../../../libs/slides/src/slide-routes';
import { ExerciseModule } from '../../../../../libs/exercise/src/exercise.module';
import { SlidesModule } from '../../../../../libs/slides/src/slides.module';
import { FeedbackModule } from '../../../../../libs/feedback/src/feedback.module';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '../../../../../libs/browser-window/src/browser-window.module';
import { RunnersModule } from '../../../../../libs/exercise/src/runners/runners.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { Ng2TsExercises } from '../../../../../ng2ts/ng2ts';



const routes = RouterModule.forChild(
  [{
    path: '',
    redirectTo: '/material/intro',
    pathMatch: 'full'
  }, ...SlidesRoutes.get(MaterialComponent)]
);

@NgModule({
  imports: [
    routes,
    SlidesModule,
    ExerciseModule,
    FeedbackModule,
    CommonModule,
    BrowserWindowModule,
    RunnersModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [MaterialComponent],
  exports: [MaterialComponent],
  providers: [Ng2TsExercises],
})
export class MaterialCodelabModule {
}
