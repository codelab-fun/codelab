import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsComponent } from '@codelab/utils/src/lib/sync/components/poll/common/stars/stars.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [StarsComponent],
  exports: [StarsComponent],
  imports: [CommonModule, MatIconModule]
})
export class StarsModule {}
