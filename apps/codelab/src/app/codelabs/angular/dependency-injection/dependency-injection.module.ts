import { NgModule } from '@angular/core';
import { DependencyInjectionComponent } from './dependency-injection.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from 'ng-slides';
import { FeedbackModule } from '@codelab/feedback';

import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { BrowserWindowModule } from '@codelab/browser';

import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from 'ng-slides';

import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/angular/dependency-injection/intro',
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
