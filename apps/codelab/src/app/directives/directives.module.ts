import { NgModule } from '@angular/core';
import { IsLoggedInDirective } from './permissions/is-logged-in/is-loggen-in.directive';
import { CanLoadAdminDirective } from './permissions/can-load-admin/can-load-admin.directive';

@NgModule({
  declarations: [IsLoggedInDirective, CanLoadAdminDirective],
  exports: [IsLoggedInDirective, CanLoadAdminDirective]
})
export class DirectivesModule {}
