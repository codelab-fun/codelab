import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, MatCardModule, RouterModule],
  declarations: [LoginComponent]
})
export class LoginModule {
}
