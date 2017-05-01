import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mode } from './../mode.enum';
import { PresentationComponent } from './../presentation/presentation.component';

@Component({
  selector: 'app-mode-overview',
  templateUrl: './mode-overview.component.html',
  styleUrls: ['./mode-overview.css']
})
export class ModeOverviewComponent {

  private previousMode:Mode;
  modeEnum = Mode;
  onOverview = false;

  constructor(
    private presentation: PresentationComponent,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  get buttonLabel(): string {
    switch (this.presentation.mode) {
      case Mode.overview:
        return 'Back';
      default:
        return 'Overview';
    }
  }

  /* Returns true if in presentation is in overview mode */
  get shouldShowPrintButton(): boolean {
    return this.presentation.mode === Mode.overview;
  }

  print() {
    window.print();
  }

  toggle(mode: Mode) {
    this.onOverview = !this.onOverview;
    if (this.presentation.mode !== mode) {
      this.previousMode = this.presentation.mode;
      this.presentation.mode = mode;
    } else {
      // Go to last mode before this mode
      this.presentation.mode = this.previousMode;
    }
  }
}
