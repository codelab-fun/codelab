import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TypeScriptComponent } from './typescript/typescript.component';
import { FullLayoutComponent } from '../../../containers/full-layout';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';

const routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [...SlidesRoutes.get(TypeScriptComponent)]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeScriptRoutingModule {}
