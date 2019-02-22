import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsNavBarComponent } from './buttons-nav-bar.component';
import { FeedbackModule } from '@codelab/feedback';
import { FirebaseLoginModule } from '@codelab/firebase-login';
import { MenuGithubWidgetModule } from './menu-github-widget/menu-github-widget.module';
import { MenuShortcutWidgetModule } from './menu-shortcut-widget/menu-shortcut-widget.module';

@NgModule({
  imports: [
    CommonModule,
    FeedbackModule,
    FirebaseLoginModule,
    MenuGithubWidgetModule,
    MenuShortcutWidgetModule
  ],
  declarations: [ButtonsNavBarComponent],
  exports: [
    ButtonsNavBarComponent,
    FeedbackModule,
    FirebaseLoginModule,
    MenuGithubWidgetModule,
    MenuShortcutWidgetModule
  ]
})
export class ButtonsNavBarModule {}
