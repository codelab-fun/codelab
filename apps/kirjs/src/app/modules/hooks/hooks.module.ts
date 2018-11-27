import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@angular-presentation/presentation/src/lib/slide-routes';
import { HooksComponent } from './hooks.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlidesModule } from '@angular-presentation/slides';
import { ExerciseModule } from '@angular-presentation/exercise/src';
import { SimpleEditorModule } from '@angular-presentation/code-demos/src/lib/editor/simple-editor.module';
import { FormsModule } from '@angular/forms';
import { CodeDemosModule } from '@angular-presentation/code-demos';
import { UseStateModule } from './use-state/use-state.module';


const routes = RouterModule.forChild(
  SlidesRoutes.get(HooksComponent)
);

@NgModule({
  imports: [
    routes,
    CommonModule,
    SlidesModule,
    ExerciseModule,
    SimpleEditorModule,
    FormsModule,
    CodeDemosModule,
    UseStateModule
  ],
  declarations: [
    HooksComponent,
  ],
  entryComponents: [
    HooksComponent
  ],
  exports: [HooksComponent]
})
export class BinaryModule {

}
