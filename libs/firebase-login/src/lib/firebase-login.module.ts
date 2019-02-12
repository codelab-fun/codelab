import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginWidgetComponent } from './login-widget/login-widget.component';
import { LoginContentComponent } from './login-content/login-content.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [CommonModule, AngularFireAuthModule],
  declarations: [LoginWidgetComponent, LoginContentComponent],
  entryComponents: [LoginContentComponent],
  exports: [LoginWidgetComponent]
})
export class FirebaseLoginModule {
}
