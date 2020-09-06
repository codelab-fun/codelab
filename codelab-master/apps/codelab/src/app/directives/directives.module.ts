import { NgModule } from '@angular/core';
import { IsLoggedInDirective } from './permissions/is-logged-in/is-loggef-in.directive';
import { CanLoadAdminDirective } from './permissions/can-load-admin/can-load-admin.directive';
import { NextSlideDirective } from './nextSlide.directive';
import { PreviousSlideDirective } from './previousSlide.directive';

@NgModule({
  declarations: [
    IsLoggedInDirective,
    CanLoadAdminDirective,
    NextSlideDirective,
    PreviousSlideDirective
  ],
  exports: [
    IsLoggedInDirective,
    CanLoadAdminDirective,
    NextSlideDirective,
    PreviousSlideDirective
  ]
})
export class DirectivesModule {}
