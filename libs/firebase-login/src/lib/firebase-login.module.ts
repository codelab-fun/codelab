import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ButtonWithMenuModule } from '@codelab/utils';
import { LoginWidgetComponent } from './login-widget/login-widget.component';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule, ButtonWithMenuModule],
  declarations: [LoginWidgetComponent],
  exports: [LoginWidgetComponent, ButtonWithMenuModule]
})
export class FirebaseLoginModule {
}
