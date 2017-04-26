import { ActivatedRoute, Router } from '@angular/router';
import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { PresentationComponent } from '../presentation/presentation.component';

@Directive({
  selector: '[app-slides-routing]'
})
export class SlidesRoutingDirective implements OnInit {
  
  private ids:{[index:number]:string} = {};

  @Input() activeSlideId;
  @Output() change = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute, private  pres: PresentationComponent) {
  }

  @HostListener('onSlideAdded', ['$event']) slideAdded(value: { index: number, id?: string }) {
    // Add url mapping
    this.ids[value.index] = value.id;
    if(this.pres.activeSlideId === value.index) {
      // Maybe update route here
      this.slideChange(value.index);
    }
  }

  @HostListener('onSlideChange', ['$event']) slideChange(index) {
    const url = this.ids[index] || index;
    this.router.navigate(['../' + url], {relativeTo: this.route});
  }

  ngOnInit() {
    let id = Number(this.route.snapshot.params['id']);
    if (id) {
      this.pres.activeSlideId = id;
    }
  }
}
