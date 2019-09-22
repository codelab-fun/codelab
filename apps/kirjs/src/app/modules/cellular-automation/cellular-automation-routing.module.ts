import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SlidesRoutes } from '@codelab/slides/src/lib/routing/slide-routes';

import { CellularAutomationComponent } from './cellular-automation.component';
import { CellularAutomationModule } from './cellular-automation.module';

const routes = RouterModule.forChild(
  SlidesRoutes.get(CellularAutomationComponent)
);

@NgModule({
  imports: [routes, CellularAutomationModule],
  declarations: [],
  exports: []
})
export class CellularAutomationRoutingModule {}
