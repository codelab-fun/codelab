import { Component, Input } from '@angular/core';
import { SlidesDeckComponent } from '@codelab/slides/src/lib/deck/deck.component';
import { MenuRouteService } from '../../../codelabs/angular/menu-route.service';
import { ActivatedRoute } from '@angular/router';

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
    private readonly activeRoute: ActivatedRoute,
    private readonly menuRouteService: MenuRouteService,
    private readonly presentation: SlidesDeckComponent
  ) {
    if (this.presentation != null) {
      const previousLink = this.menuRouteService.getPreviousLink(
        this.activeRoute
      );
      this.presentation.setPrevious(previousLink);
    }
  }
}
