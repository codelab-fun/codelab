import { NgModule } from '@angular/core';
import { PipesComponent } from './pipes.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '../../../../../../../libs/presentation/src/lib/slide-routes';
import { PresentationModule } from '../../../../../../../libs/presentation/src/lib/presentation.module';
import { FeedbackModule } from '../../../../../../../libs/feedback/src/lib/feedback.module';
import { BrowserWindowModule } from '../../../../../../../libs/browser/src/lib/browser.module';
import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { SlidesModule } from '../../../../../../../libs/slides/src';
import { SimpleEditorModule } from '../../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { FormsModule } from '@angular/forms';


const routes = RouterModule.forChild(
  SlidesRoutes.get(PipesComponent)
);

@NgModule({
  imports: [
    routes,
    PresentationModule,

    BrowserWindowModule,
    FeedbackModule,
    CodelabComponentsModule,
    SlidesModule,
    SimpleEditorModule,
    FormsModule,
  ],
  declarations: [PipesComponent],
  exports: [PipesComponent]
})
export class PipesModule {

}
