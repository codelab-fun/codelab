import { Component, Input, OnInit } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MenuRouteService } from '../../../codelabs/angular/menu-route.service';

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
    private readonly menuRouteService: MenuRouteService,
    private readonly presentation: SlidesDeckComponent
  ) {
    if (this.presentation != null) {
      const nextLink = this.menuRouteService.getPreviousLink();
      this.presentation.setNext(nextLink);
    }
  }

  ngOnInit() {}
}
