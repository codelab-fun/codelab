import {Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PresentationComponent} from '../presentation/presentation.component';

@Directive({
  selector: '[app-slides-routing]'
})
export class SlidesRoutingDirective implements OnInit {
  @Input() activeSlideId;
  @Output() change = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute, private  pres: PresentationComponent) {
  }

  @HostListener('onSlideChange', ['$event']) slideChange(newId) {
    this.router.navigate(['../' + newId], {relativeTo: this.route});
  }

  ngOnInit() {
    let id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.pres.activeSlideId = id;
    }
  }
}
