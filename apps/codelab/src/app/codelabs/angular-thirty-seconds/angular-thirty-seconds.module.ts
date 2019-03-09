import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { AngularThirtySecondsComponent } from './angular-thirty-seconds.component';
import { SnippetComponent } from './snippet/snippet.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule } from '@angular/forms';
import { NgxMdModule } from 'ngx-md';
import 'prismjs/components/prism-typescript';
import { SlugifyPipe } from './slugify.pipe';

const routes = RouterModule.forChild(
  SlidesRoutes.get(AngularThirtySecondsComponent)
);


@NgModule({
  declarations: [AngularThirtySecondsComponent, SnippetComponent, SlugifyPipe],
  imports: [
    CodeDemoModule,
    FormsModule,
    CommonModule,
    NgxMdModule.forRoot(),
    SlidesModule,
    routes
  ]
})
export class AngularThirtySecondsModule {
}
