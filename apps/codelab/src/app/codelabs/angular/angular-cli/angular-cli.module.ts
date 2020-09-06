import { AngularCliComponent } from './angular-cli.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedbackModule } from '@codelab/feedback';
import { CommonModule } from '@angular/common';
import { BrowserWindowModule } from '@codelab/browser';
import { CodelabComponentsModule } from '../../../components/codelab-components.module';
import { FormsModule } from '@angular/forms';
import { ExternalLinkDirectiveDirective } from '../../../components/external-link-directive/external-link-directive.directive';
import { SlidesModule, SlidesRoutes } from '@ng360/slides';

const routes = RouterModule.forChild([
  ...SlidesRoutes.get(AngularCliComponent)
]);

@NgModule({
  imports: [
    routes,
    FeedbackModule,
    CommonModule,
    BrowserWindowModule,
    CodelabComponentsModule,
    SlidesModule,
    FormsModule
  ],
  declarations: [AngularCliComponent, ExternalLinkDirectiveDirective],
  exports: [AngularCliComponent]
})
export class AngularCliModule {}
