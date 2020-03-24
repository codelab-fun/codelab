import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { CodelabComponentsModule } from '../../components/codelab-components.module';
import { StagesComponent } from './stages/stages.component';

const routes = RouterModule.forChild(SlidesRoutes.get(AboutComponent));

@NgModule({
  declarations: [AboutComponent, StagesComponent],
  imports: [
    CommonModule,
    SlidesModule,
    routes,
    CodeDemoModule,
    FormsModule,
    CodelabComponentsModule
  ]
})
export class AboutModule {}
