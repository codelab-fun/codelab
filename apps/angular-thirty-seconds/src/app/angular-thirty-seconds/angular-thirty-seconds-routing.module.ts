import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { AngularThirtySecondsComponent } from './angular-thirty-seconds.component';

const routes: Routes = [
  {path: '', component: AngularThirtySecondsComponent},
  {path: 'new', component: CreateSnippetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AngularThirtySecondsRoutingModule {
}
