import { NgModule } from '@angular/core';
import { NgxdModule } from '@ngxd/core';
import { DynamicRendererComponent } from './dynamic-renderer.component';

@NgModule({
  imports: [NgxdModule],
  declarations: [DynamicRendererComponent],
  exports: [DynamicRendererComponent]
})
export class DynamicRendererModule {
}
