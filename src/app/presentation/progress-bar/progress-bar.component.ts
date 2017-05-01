import {Component} from '@angular/core';
import {PresentationComponent} from '../presentation/presentation.component';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  get progress() {
    return 100 * (this.presentation.activeSlideIndex + 1) / this.presentation.totalSlides;
  }

  constructor(public presentation: PresentationComponent) {
  }
}
