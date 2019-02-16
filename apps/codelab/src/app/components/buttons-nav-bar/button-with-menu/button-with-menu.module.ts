import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonWithMenuComponent } from './button-with-menu.component';
import { ButtonWithMenuModalDirective } from './button-with-menu-modal.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [ButtonWithMenuComponent, ButtonWithMenuModalDirective],
  exports: [ButtonWithMenuComponent, ButtonWithMenuModalDirective]
})
export class ButtonWithMenuModule {
}
