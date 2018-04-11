import { Component } from '@angular/core';
import { Mode } from '../mode.enum';
import { PresentationComponent } from '../presentation/presentation.component';

@Component({
  selector: 'slides-mode-overview',
  templateUrl: './mode-overview.component.html',
  styleUrls: ['./mode-overview.css']
})
export class ModeOverviewComponent {

  private previousMode: Mode;
  modeEnum = Mode;
  onOverview = false;

  constructor(private presentation: PresentationComponent) {
  }

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

  static print() {
    // TODO(synnz) this bug will be fixed with 2.8.2 ts release
    // window.print();
    console.log("Check it out https://github.com/Microsoft/TypeScript/issues/22917")
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
