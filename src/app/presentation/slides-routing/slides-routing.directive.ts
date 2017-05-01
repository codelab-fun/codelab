import {ActivatedRoute, Router} from '@angular/router';
import {Directive, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[app-slides-routing]'
})
export class SlidesRoutingDirective implements OnInit {
  activeSlideId: string;

  private ids: { [index: number]: string } = {};


  @Output() change = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute, private  presentation: PresentationComponent) {

  }

  @HostListener('onSlideAdded', ['$event']) slideAdded(value: { index: number, id?: string }) {
    // Add url mapping
    this.ids[value.index] = value.id;


    if (this.activeSlideId === value.index.toString() || value.id === this.activeSlideId) {
      // Maybe update route here
      this.slideChange(value.index);
      this.presentation.activeSlideIndex = value.index;
    }
  }

  @HostListener('onSlideChange', ['$event']) slideChange(index) {
    const url = this.ids[index] || index;
    this.router.navigate(['../' + url], {relativeTo: this.route, preserveQueryParams: true});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.activeSlideId = id || '0';

  }
}
