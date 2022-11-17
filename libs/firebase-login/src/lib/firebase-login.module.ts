import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginWidgetComponent } from './login-widget/login-widget.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule, MatMenuModule],
  declarations: [LoginWidgetComponent],
  exports: [LoginWidgetComponent],
})
export class FirebaseLoginModule {}
