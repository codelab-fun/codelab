import { NgModule } from '@angular/core';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';
import { RouterModule } from '@angular/router';
import { FormsComponent } from './forms.component';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from '@codelab/slides';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';

const routes = RouterModule.forChild([...SlidesRoutes.get(FormsComponent)]);

@NgModule({
  imports: [
    routes,
    FeedbackModule,
    CommonModule,
    BrowserWindowModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule,
    CodeDemoModule
  ],
  declarations: [FormsComponent],
  exports: [FormsComponent],
  providers: [Ng2TsExercises]
})
export class FormsCodelabModule {}
