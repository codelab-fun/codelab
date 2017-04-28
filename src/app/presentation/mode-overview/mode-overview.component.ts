import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mode } from './../mode.enum';
import { PresentationComponent } from './../presentation/presentation.component';
import { SlideComponent } from './../slide/slide.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-mode-overview',
  templateUrl: './mode-overview.component.html',
  styleUrls: ['./mode-overview.css']
})
export class ModeOverviewComponent {
  
  private previousMode:Mode;
  modeEnum = Mode;

  constructor(
    private presentation:PresentationComponent,
    private router: Router,
    private activatedRoute:ActivatedRoute) { }

  get buttonLabel(): string {
    switch (this.presentation.mode) {
      case Mode.overview:
        return 'Back';
      default:
        return 'Overview';
    }
  }
  
  // Show print button when in overview mode
  get shouldShowPrintButton():boolean {
    return this.presentation.mode === Mode.overview;
  }

  print() {
    window.print();
  }

  toggle(mode: Mode) {
    if (this.presentation.mode !== mode) {
      this.previousMode = this.presentation.mode;
      this.presentation.mode = mode;
    } else {
      // Go to last mode before this mode
      this.presentation.mode = this.previousMode;
    }
  }
}
