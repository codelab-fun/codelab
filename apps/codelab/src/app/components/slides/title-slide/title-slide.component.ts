import { Component, Input, Optional, Inject } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MENU_ROUTES } from '../../../codelabs/angular/common';

@Component({
  selector: 'codelab-title-slide',
  templateUrl: './title-slide.component.html',
  styleUrls: ['./title-slide.component.css']
})
export class TitleSlideComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() prereqs: string;

  constructor(
    private readonly presentation: SlidesDeckComponent,
    @Optional() @Inject(MENU_ROUTES) readonly menuRoutes
  ) {
    if (this.presentation != null) {
      this.presentation.setupPreviousNext(menuRoutes.map(p => p.path));
    }

  }
}
