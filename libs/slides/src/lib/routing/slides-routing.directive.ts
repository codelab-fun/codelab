import { ActivatedRoute, Router } from '@angular/router';
import { Directive, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SlidesDeckComponent } from '@angular-presentation/slides/src/lib/deck/deck.component';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[slidesRouting]'
})
export class SlidesRoutingDirective implements OnInit {
  activeSlideId: string;
  @Output() change = new EventEmitter();
  private ids: { [index: number]: string } = {};

  constructor(private router: Router,
              private route:
                ActivatedRoute, private deck: SlidesDeckComponent) {

  }

  @HostListener('onSlideAdded', ['$event']) slideAdded(value: { index: number, id?: string }) {
    // Add url mapping
    this.ids[value.index] = value.id;


    if (this.activeSlideId === value.index.toString() || value.id === this.activeSlideId) {
      // Maybe update route here
      this.slideChange(value.index);
      this.deck.activeSlideIndex = value.index;
    }
  }

  @HostListener('onSlideChange', ['$event']) slideChange(index) {
    const url = this.ids[index] || index;
    this.router.navigate(['../' + url], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.activeSlideId = id || '0';
  }
}
