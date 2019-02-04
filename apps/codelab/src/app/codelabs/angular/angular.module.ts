import { NgModule } from '@angular/core';

import { AngularRoutingModule } from './angular-routing.module';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [AngularRoutingModule, SharedModule]
})
export class AngularModule {}
