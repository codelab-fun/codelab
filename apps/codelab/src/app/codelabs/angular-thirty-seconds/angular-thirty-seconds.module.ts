import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesModule } from '@codelab/slides';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';
import { RouterModule } from '@angular/router';
import { AngularThirtySecondsComponent } from './angular-thirty-seconds.component';
import { SnippetComponent } from './snippet/snippet.component';
import { CodeDemoModule } from '@codelab/code-demos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlugifyPipe } from './slugify.pipe';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';

const routes = RouterModule.forChild(
  [
    {path: 'new', component: CreateSnippetComponent},
    ...SlidesRoutes.get(AngularThirtySecondsComponent)
  ]
);


@NgModule({
  declarations: [AngularThirtySecondsComponent, SnippetComponent, SlugifyPipe, CreateSnippetComponent],
  imports: [
    CodeDemoModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    SlidesModule,
    routes
  ]
})
export class AngularThirtySecondsModule {
}


