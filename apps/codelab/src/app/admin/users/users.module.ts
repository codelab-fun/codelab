import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, MatTableModule, MatCardModule],
})
export class UsersModule {}
