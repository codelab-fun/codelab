import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
  declarations: [LoginButtonComponent, LoginPanelComponent],
  entryComponents: [
    LoginPanelComponent
  ],
  exports: [LoginButtonComponent]
})
export class FirebaseLoginModule {}
