import { NgModule } from '@angular/core';
import { DependencyInjectionComponent } from './dependency-injection.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { BrowserWindowModule } from '@codelab/browser';
import { CodeDemoModule } from '@codelab/code-demos';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

const routes = RouterModule.forChild([
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
