import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { CommonModule } from '@angular/common';
import { CreateFirstAppComponent } from './create-first-app.component';

import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';

import { FormsModule } from '@angular/forms';
import { ModeComponent } from './mode/mode.component';
import { CodeDemoModule } from '../../../../../../../libs/code-demos/src';
import { OutputsComponent } from './outputs.component';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/create-first-app/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(CreateFirstAppComponent)
]);

@NgModule({
  imports: [
    routes,

    FeedbackModule,
    CommonModule,
    CodeDemoModule,
    BrowserWindowModule,
    CodelabComponentsModule,

    SlidesModule,
    FormsModule
  ],
  entryComponents:[OutputsComponent],
  declarations: [CreateFirstAppComponent, ModeComponent, OutputsComponent],
  exports: [CreateFirstAppComponent]
})
export class CreateFirstAppModule {}
