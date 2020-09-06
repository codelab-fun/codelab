import { NgModule } from '@angular/core';
import { SafeHtml } from './safeHtml.pipe';

@NgModule({
  declarations: [SafeHtml],
  exports: [SafeHtml]
})
export class SharedPipeModule {}
