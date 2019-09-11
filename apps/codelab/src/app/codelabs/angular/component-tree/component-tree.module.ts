import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { SlidesModule } from '@codelab/slides';
import { CodeDemoModule } from '@codelab/code-demos';
import { FeedbackModule } from '@codelab/feedback';
import { BrowserWindowModule } from '@codelab/browser';
import { ComponentTreeComponent } from './component-tree.component';
import { ComponentsHierarchySvgComponent } from './components-hierarchy-svg';
import { Ng2TsExercises } from '../../../../../../../ng2ts/ng2ts';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';

const routes = RouterModule.forChild([
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
  declarations: [ComponentTreeComponent, ComponentsHierarchySvgComponent],
  exports: [ComponentTreeComponent]
})
export class ComponentTreeModule {}
