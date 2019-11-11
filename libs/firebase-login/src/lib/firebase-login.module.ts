import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginWidgetComponent } from './login-widget/login-widget.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule, MatMenuModule],
  declarations: [LoginWidgetComponent],
  exports: [LoginWidgetComponent]
})
export class FirebaseLoginModule {}
