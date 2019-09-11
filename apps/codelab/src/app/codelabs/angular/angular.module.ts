import { NgModule } from '@angular/core';
import { AngularRoutingModule } from './angular-routing.module';
import { FullLayoutModule } from '../../containers/full-layout/full-layout.module';
import { AngularRoutesModule } from '../../components/angular-routes/angular-routes.module';

@NgModule({
  imports: [AngularRoutingModule, FullLayoutModule, AngularRoutesModule]
})
export class AngularModule {}
