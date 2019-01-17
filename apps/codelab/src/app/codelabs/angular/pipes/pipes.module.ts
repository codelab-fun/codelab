import { NgModule } from '@angular/core';
import { PipesComponent } from './pipes.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';

import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '../../../../../../../libs/code-demos/src';


const routes = RouterModule.forChild(
  SlidesRoutes.get(PipesComponent)
);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    CodeDemoModule,
    BrowserWindowModule,
    FeedbackModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule,
  ],
  declarations: [PipesComponent],
  exports: [PipesComponent]
})
export class PipesModule {

}
