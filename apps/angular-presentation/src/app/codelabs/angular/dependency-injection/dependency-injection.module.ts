import { NgModule } from '@angular/core';
import { DependencyInjectionComponent } from './dependency-injection.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';

import { CodelabExerciseModule } from '../../components/exercise.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { SimpleEditorModule } from '../../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { FormsModule } from '@angular/forms';

const routes = RouterModule.forChild(
  [
    {
      path: '',
      redirectTo: '/dependency-injection/intro',
      pathMatch: 'full'
    }, ...SlidesRoutes.get(DependencyInjectionComponent)
  ]
);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    FeedbackModule,
    BrowserWindowModule,

    CodelabExerciseModule,
    SimpleEditorModule,
    SlidesModule,
    FormsModule,
  ],
  providers: [Ng2TsExercises],
  declarations: [DependencyInjectionComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {

}

