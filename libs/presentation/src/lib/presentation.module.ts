import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from './presentation/presentation.component';
import { MenuShortcutComponent } from '../../../../apps/codelab/src/app/codelabs/components/menu-shortcut/menu-shortcut.component';
import { AnalyticsService } from './analytics.service';

@NgModule({
  declarations: [
    PresentationComponent,
    MenuShortcutComponent
  ],
  exports: [
    PresentationComponent,
    MenuShortcutComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    AnalyticsService
  ],
  bootstrap: []
})
export class PresentationModule {

}
