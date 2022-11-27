import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { V2Component } from './v2.component';
import { PresentationComponent } from './presentation/presentation.component';

@Component({ template: 'LOL I am broken' })
class EmptyComponent {}

const routes: Routes = [
  {
    path: '',
    component: V2Component,
  },
  {
    path: ':presentation/:id',
    component: PresentationComponent,
  },
  { path: '**', component: EmptyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class V2RoutingModule {}
