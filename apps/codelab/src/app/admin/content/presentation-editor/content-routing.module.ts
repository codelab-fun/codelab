import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentWrapperComponent } from "./content-wrapper/content-wrapper.component";
import { PresentationListComponent } from "../presentation-list/presentation-list.component";
import { PreviewComponent } from "./preview/preview.component";
import { ContentComponent } from "./content.component";
import { CommonModule } from "@angular/common";
import { NAVIGATION_BASE_URL } from "./services/navigation.service";


const routes = [
  {
    path: '',
    component: ContentWrapperComponent,
    children: [
      {
        path: '',
        component: PresentationListComponent,
      },
      {
        path: ':presentation/:slide/preview',
        component: PreviewComponent,
      },
      {
        path: ':presentation/:slide',
        component: ContentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [
    {provide: NAVIGATION_BASE_URL, useValue: 'admin/content'},
  ],
  exports: [RouterModule],
})
export class ContentRoutingModule {
}
