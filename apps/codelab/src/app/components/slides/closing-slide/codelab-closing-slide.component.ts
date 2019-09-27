import { Component, Input, OnInit, Inject, Optional } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MENU_ROUTES } from '../../../common';

@Component({
  selector: 'codelab-closing-slide',
  templateUrl: './codelab-closing-slide.component.html',
  styleUrls: ['./codelab-closing-slide.component.css']
})
export class CodelabClosingSlideComponent implements OnInit {
  @Input() header: String;
  @Input() body: String;
  @Input() footer: String;

  constructor(
    @Optional() private readonly presentation: SlidesDeckComponent,
    @Optional() @Inject(MENU_ROUTES) readonly menuRoutes
  ) {
    if (this.presentation != null) {
      this.presentation.setupPreviousNext(menuRoutes.map(p => p.path));
    }

  }



  ngOnInit() {}
}
