import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonsNavBarModule } from '../buttons-nav-bar/buttons-nav-bar.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [CommonModule, RouterModule, ButtonsNavBarModule],
  declarations: [NotFoundComponent]
})
export class NotFoundModule {}
