import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginWidgetComponent } from './login-widget/login-widget.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ButtonWithMenuModule } from '../../../../apps/codelab/src/app/components/buttons-nav-bar/button-with-menu/button-with-menu.module';


@NgModule({
  imports: [CommonModule, AngularFireAuthModule, ButtonWithMenuModule],
  declarations: [LoginWidgetComponent],
  exports: [LoginWidgetComponent, ButtonWithMenuModule]
})
export class FirebaseLoginModule {
}
