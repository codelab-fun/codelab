import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@angular-presentation/presentation/src/lib/slide-routes';
import { HooksComponent } from './hooks.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlidesModule } from '@angular-presentation/slides';
import { HooksTestComponent } from './hooks-test/hooks-test.component';
import { HooksDirective } from './hooks-directive/hooks.directive';
import { ExerciseModule } from '@angular-presentation/exercise/src';
import { SimpleEditorModule } from '@angular-presentation/code-demos/src/lib/editor/simple-editor.module';
import { FormsModule } from '@angular/forms';

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
  ],
  declarations: [
    HooksComponent,
    HooksTestComponent,
    HooksDirective
  ],
  entryComponents: [
    HooksComponent
  ],
  exports: [HooksComponent]
})
export class BinaryModule {

}
