import { ActivatedRoute, Router } from '@angular/router';
import { Directive, HostListener, Input } from '@angular/core';
import { Mode } from './../mode.enum';

@Directive({
  // tslint:disable-next-line:all TODO: Fix linter warnings on the selector and delete this comment.
  selector: '[app-mode-routing]'
})
export class ModeRoutingDirective {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Update url based on mode
  @HostListener('onModeChange', ['$event']) modeChange(mode: Mode) {
    let queryParams;

    if (mode !== Mode.none) {
      queryParams = {mode};
    }

    this.router.navigate([], {
       relativeTo: this.route,
       queryParams
    });
  }
}
