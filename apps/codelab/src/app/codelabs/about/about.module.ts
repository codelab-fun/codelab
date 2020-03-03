import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';

const routes = RouterModule.forChild(SlidesRoutes.get(AboutComponent));

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, SlidesModule, routes, CodeDemoModule, FormsModule]
})
export class AboutModule {}
