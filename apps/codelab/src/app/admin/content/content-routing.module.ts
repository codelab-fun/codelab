import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATION_BASE_URL } from './services/navigation.service';
import { ContentComponent } from './content.component';
import { PresentationEditorComponent, PresentationEditorModule } from './views/presentation-editor';
import { PresentationListComponent, PresentationListModule } from './views/presentation-list';
import { PresentationPreviewComponent, PresentationPreviewModule } from './views/presentation-preview';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {path: '', component: PresentationListComponent},
      {path: ':presentation/:slide/preview', component: PresentationPreviewComponent},
      {path: ':presentation/:slide', component: PresentationEditorComponent}
    ]
  }
];

const RoutesModules = [
  PresentationListModule,
  PresentationPreviewModule,
  PresentationEditorModule
];

@NgModule({
  imports: [RouterModule.forChild(routes), RoutesModules],
  providers: [{provide: NAVIGATION_BASE_URL, useValue: 'admin/content'}],
  exports: [RouterModule, RoutesModules]
})
export class ContentRoutingModule {
}
