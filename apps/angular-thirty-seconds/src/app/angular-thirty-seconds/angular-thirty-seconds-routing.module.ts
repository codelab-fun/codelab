import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { AngularThirtySecondsComponent } from './angular-thirty-seconds.component';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';

const routes = RouterModule.forChild(
  [
    {path: 'new', component: CreateSnippetComponent},
    ...SlidesRoutes.get(AngularThirtySecondsComponent)
  ]
);

@NgModule({
  imports: [routes],
  exports: [RouterModule]
})

export class AngularThirtySecondsRoutingModule {
}
