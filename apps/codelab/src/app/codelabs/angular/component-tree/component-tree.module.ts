import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';

import { ComponentTreeComponent } from './component-tree.component';
import { ComponentsHierarchySvgComponent } from './components-hierarchy-svg';

import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';

import { CodelabComponentsModule } from '../../../components/codelab-components.module';

import { SlidesModule } from '../../../../../../../libs/slides/src';
import { CodeDemoModule } from '../../../../../../../libs/code-demos/src';

const routes = RouterModule.forChild([
  {
    path: '',
    redirectTo: '/component-tree/intro',
    pathMatch: 'full'
  },
  ...SlidesRoutes.get(ComponentTreeComponent)
]);

@NgModule({
  imports: [
    routes,

    BrowserWindowModule,
    CodeDemoModule,
    FeedbackModule,
    CodelabComponentsModule,

    SlidesModule,
    FormsModule
  ],
  providers: [Ng2TsExercises],
  declarations: [
    ComponentTreeComponent,
    ComponentsHierarchySvgComponent
  ],
  exports: [ComponentTreeComponent]
})
export class ComponentTreeModule {
}
