import { RouterComponent } from './router.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { BrowserWindowModule } from '@codelab/browser';
import { CodeDemoModule } from '@codelab/code-demos';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';

const routes = RouterModule.forChild([...SlidesRoutes.get(RouterComponent)]);

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
  declarations: [RouterComponent],
  providers: [Ng2TsExercises],
  exports: [RouterComponent]
})
export class RouterCodelabModule {}
