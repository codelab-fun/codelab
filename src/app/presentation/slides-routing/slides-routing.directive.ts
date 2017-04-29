import {OnInit, Directive, HostListener, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {PresentationComponent} from "../presentation/presentation.component";

@Directive({
  selector: '[app-slides-routing]'
})
export class SlidesRoutingDirective implements OnInit {
  @Input() activeSlideId;
  @Output() change = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pres: PresentationComponent){}

  @HostListener('onSlideChange', ['$event']) slideChange(newId){
    let milestone = this.route.snapshot.params['milestone'];

    if (milestone) {
      this.router.navigate(['milestone', milestone, newId], {skipLocationChange: false});
    } else {
      this.router.navigate(['', newId]);
    }
  }

  ngOnInit() {
    let id = Number(this.route.snapshot.params['id']);
    if(id){
      this.pres.activeSlideId = id;
    }
  }
}
