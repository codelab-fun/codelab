import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CodeDemoModule } from '@codelab/code-demos';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';
import { AboutComponent } from './about.component';

const routes = RouterModule.forChild(SlidesRoutes.get(AboutComponent));

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, SlidesModule, routes, CodeDemoModule, FormsModule]
})
export class AboutModule {}
