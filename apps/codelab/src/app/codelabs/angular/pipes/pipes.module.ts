import { NgModule } from '@angular/core';
import { PipesComponent } from './pipes.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { FeedbackModule } from '@codelab/feedback';
import { BrowserWindowModule } from '@codelab/browser';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from '@codelab/slides';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';

const routes = RouterModule.forChild(SlidesRoutes.get(PipesComponent));

@NgModule({
  imports: [
    routes,
    CodeDemoModule,
    BrowserWindowModule,
    FeedbackModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule
  ],
  declarations: [PipesComponent],
  exports: [PipesComponent]
})
export class PipesModule {}
