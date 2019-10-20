import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, MatCardModule, RouterModule, MatButtonModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
