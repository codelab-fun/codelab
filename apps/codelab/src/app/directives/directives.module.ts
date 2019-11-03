import { NgModule } from '@angular/core';
import { IsLoggedInDirective } from './permissions/is-logged-in/is-loggen-in.directive';
import { CanLoadAdminDirective } from './permissions/can-load-admin/can-load-admin.directive';
import { SwitchSlideDirective } from './switch-slide.directive';

@NgModule({
  declarations: [
    IsLoggedInDirective,
    CanLoadAdminDirective,
    SwitchSlideDirective
  ],
  exports: [IsLoggedInDirective, CanLoadAdminDirective, SwitchSlideDirective]
})
export class DirectivesModule {}
