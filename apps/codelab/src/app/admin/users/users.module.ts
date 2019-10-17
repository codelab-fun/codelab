import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatCardModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [UsersComponent],
  entryComponents: [UsersComponent],
  imports: [CommonModule, MatTableModule, MatCardModule]
})
export class UsersModule {}
