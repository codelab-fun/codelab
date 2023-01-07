import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAVIGATION_BASE_URL } from './services/navigation.service';
import { ContentComponent } from './content.component';
import { PresentationListComponent, PresentationListModule } from './pages/presentation-list';
import { PresentationPreviewComponent, PresentationPreviewModule } from './pages/presentation-preview';
import { PresentationEditorComponent, PresentationEditorModule } from './pages/presentation-editor';

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
