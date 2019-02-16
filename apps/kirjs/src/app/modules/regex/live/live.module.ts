import { NgModule } from '@angular/core';

import { LiveMockModule } from './live-mock';
import { PollModule } from './poll';

@NgModule({
  exports: [LiveMockModule, PollModule]
})
export class LiveModule {}
