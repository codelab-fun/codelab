import { NgModule } from '@angular/core';
import { ReactComponent } from './react.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@angular-presentation/presentation/src/lib/slide-routes';
import { PresentationModule } from '@angular-presentation/presentation';
import { ExerciseModule } from '../../../../../../libs/exercise/src/lib/exercise.module';
import { BrowserWindowModule } from '@angular-presentation/browser';
import { SimpleEditorModule } from '../../../../../../libs/code-demos/src/lib/editor/simple-editor.module';
import { FormsModule } from '@angular/forms';
import { RunnersModule } from '../../../../../../libs/exercise/src/lib/runners/runners.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlidesModule } from '@angular-presentation/slides';


const routes = RouterModule.forChild(
  SlidesRoutes.get(ReactComponent)
);

@NgModule({
  imports: [
    routes,
    PresentationModule,
    SlidesModule,
    FormsModule,
    ExerciseModule,
    BrowserWindowModule,
    SimpleEditorModule,
    RunnersModule,
    FlexLayoutModule,
  ],
  declarations: [ReactComponent],
  exports: [ReactComponent],
  providers: []
})
export class ReactModule {

}
