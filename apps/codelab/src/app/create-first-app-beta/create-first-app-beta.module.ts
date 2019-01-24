import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFirstAppBetaComponent } from './create-first-app-beta.component';
import { SlidesModule } from '@codelab/slides';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/presentation/src/lib/slide-routes';

const routes = RouterModule.forChild(
  SlidesRoutes.get(CreateFirstAppBetaComponent)
);


@NgModule({
  declarations: [CreateFirstAppBetaComponent],
  imports: [
    CommonModule,
    SlidesModule
  ]
})
export class CreateFirstAppBetaModule { }
