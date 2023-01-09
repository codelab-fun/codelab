import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SlideMetaEditorComponent } from './slide-meta-editor.component';

@NgModule({
  imports: [
    MatMenuModule,
    MatIconModule
  ],
  declarations: [SlideMetaEditorComponent],
  exports: [SlideMetaEditorComponent],
})
export class SlideMetaEditorModule {
}
