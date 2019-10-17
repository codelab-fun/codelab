import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule]
})
export class LoginModule {}
