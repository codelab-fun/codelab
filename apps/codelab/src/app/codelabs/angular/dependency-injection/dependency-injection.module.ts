import { NgModule } from '@angular/core';
import { DependencyInjectionComponent } from './dependency-injection.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';

import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';

import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';

import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '../../../../../../../libs/code-demos/src';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/dependency-injection/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(DependencyInjectionComponent)
]);

@NgModule({
  imports: [
    routes,

    FeedbackModule,
    BrowserWindowModule,
    CodeDemoModule,
    CodelabComponentsModule,

    SlidesModule,
    FormsModule
  ],
  providers: [Ng2TsExercises],
  declarations: [DependencyInjectionComponent],
  exports: [DependencyInjectionComponent]
})
export class DependencyInjectionModule {}
