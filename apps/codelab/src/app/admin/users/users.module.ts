import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatCardModule } from '@angular/materal/card';
import { MatTableModule } from '@angular/materal/table';

@NgModule({
  declarations: [UsersComponent],
  entryComponents: [UsersComponent],
  imports: [CommonModule, MatTableModule, MatCardModule]
})
export class UsersModule {}
