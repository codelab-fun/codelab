import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexComponent } from './regex.component';
import { SlidesModule } from '@codelab/slides';
import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/presentation/src/lib/slide-routes';

const routes = RouterModule.forChild(
  SlidesRoutes.get(RegexComponent)
);


@NgModule({
  declarations: [RegexComponent],
  imports: [
    routes,
    CommonModule,
    SlidesModule
  ]
})
export class RegexModule { }
