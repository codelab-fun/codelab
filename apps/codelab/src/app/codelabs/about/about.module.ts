import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const routes = RouterModule.forChild(SlidesRoutes.get(AboutComponent));

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, SlidesModule, routes]
})
export class AboutModule {}
