import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { StructuralDirectivesComponent } from './structural-directives.component';

import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';

import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '../../../../../../../libs/code-demos/src';

const routes = RouterModule.forChild(
  SlidesRoutes.get(StructuralDirectivesComponent)
);

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
  declarations: [StructuralDirectivesComponent],
  exports: [StructuralDirectivesComponent]
})
export class StructuralDirectivesModule {}
