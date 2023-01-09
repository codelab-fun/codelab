import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [CommonModule, MatTableModule],
  declarations: [UsersComponent],
})
export class UsersModule {}
