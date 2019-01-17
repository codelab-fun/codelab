import { NgModule } from '@angular/core';
import { ReactComponent } from './react.component';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/presentation/src/lib/slide-routes';
import { PresentationModule } from '@codelab/presentation';
import { ExerciseModule } from '../../../../../../libs/exercise/src/lib/exercise.module';
import { BrowserWindowModule } from '@codelab/browser';

import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SlidesModule } from '@codelab/slides';


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
    

    FlexLayoutModule,
  ],
  declarations: [ReactComponent],
  exports: [ReactComponent],
  providers: []
})
export class ReactModule {

}
