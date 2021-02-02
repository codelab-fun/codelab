import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationListComponent } from './presentation-list.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PresentationListComponent],
  imports: [CommonModule, MatButtonModule, RouterModule]
})
export class PresentationListModule {}
