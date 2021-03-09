import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SlidesDynamicRendererComponent,
  EditDynamicComponentResolver,
  PreviewDynamicComponentResolver,
  ViewDynamicComponentResolver
} from './slides-dynamic-renderer.component';
import { NgxdModule } from '@ngxd/core';
import { BlankModule } from '../blank/blank.module';
import { CustomComponentEditorsModule } from '../../../wrappers/custom-component-editors/custom-component-editors.module';

@NgModule({
  declarations: [SlidesDynamicRendererComponent],
  providers: [
    PreviewDynamicComponentResolver,
    ViewDynamicComponentResolver,
    EditDynamicComponentResolver
  ],
  imports: [
    CommonModule,
    NgxdModule,
    BlankModule,
    CustomComponentEditorsModule
  ],
  exports: [SlidesDynamicRendererComponent]
})
export class SlidesDynamicRendererModule {}
