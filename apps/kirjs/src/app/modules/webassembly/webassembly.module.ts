import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { WebassemblyComponent } from './webassembly.component';
import { WebassemblyPlaygroundComponent } from './webassembly-playground/webassembly-playground.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { WebassemblyRunnerComponent } from './webassembly-playground/webassembly-runner/webassembly-runner.component';

const routes = RouterModule.forChild(
  SlidesRoutes.get(WebassemblyComponent)
);


@NgModule({
  declarations: [WebassemblyComponent, WebassemblyPlaygroundComponent, WebassemblyRunnerComponent],
  imports: [
    CommonModule,
    SlidesModule,
    CodeDemoModule,
    FormsModule,
    routes
  ]
})
export class WebassemblyModule { }
