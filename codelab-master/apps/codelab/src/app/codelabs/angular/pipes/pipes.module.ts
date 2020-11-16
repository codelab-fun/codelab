import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { FeedbackModule } from '@codelab/feedback';
import { BrowserWindowModule } from '@codelab/browser';
import { CodeDemoModule } from '@codelab/code-demos';
import { PipesComponent } from './pipes.component';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';

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
