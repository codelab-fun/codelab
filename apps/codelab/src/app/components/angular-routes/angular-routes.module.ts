import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularRoutesComponent } from './angular-routes.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AngularRoutesComponent],
  exports: [AngularRoutesComponent]
})
export class AngularRoutesModule {}
