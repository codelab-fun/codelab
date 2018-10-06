import { BehaviorSubject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PresentationComponent } from '../presentation/presentation.component';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'slides-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css'],
  // TODO(kirjs): changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideComponent {
  public onActive: Observable<boolean>;
  @Input() milestone?: string;
  @Input() id: string;
  isExercise = false;
  private slideId: number;
  private activeSubject = new BehaviorSubject<boolean>(false);

  constructor(public presentation: PresentationComponent) {
    this.onActive = this.activeSubject.pipe(distinctUntilChanged());
  }

  disableResize() {
    this.presentation.disableResize();
  }
}
