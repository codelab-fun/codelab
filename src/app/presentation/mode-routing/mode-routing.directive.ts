import { ActivatedRoute, Router } from '@angular/router';
import { Directive, HostListener, OnInit } from '@angular/core';
import { Mode } from './../mode.enum';
import { PresentationComponent } from './../presentation/presentation.component';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[app-mode-routing]'
})
export class ModeRoutingDirective implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private presentation: PresentationComponent) { }

  ngOnInit() {
    // Initialize mode based on url on load
    if (!!this.route.snapshot.queryParams['mode']) {
      this.presentation.mode = this.route.snapshot.queryParams['mode'];
    }
  }
  // Update url based on mode
  @HostListener('onModeChange', ['$event']) modeChange(mode: Mode) {
    let queryParams;
    if (mode !== Mode.none) {
      queryParams = {mode};
    }
    this.router.navigate([],
    {
       relativeTo: this.route,
       queryParams
    });
  }
}
