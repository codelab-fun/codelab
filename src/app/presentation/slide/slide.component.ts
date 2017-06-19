import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, Input } from '@angular/core';
import { Mode } from '../mode.enum';
import { Observable } from 'rxjs/Observable';
import { PresentationComponent } from '../presentation/presentation.component';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'slides-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent {
  private slideId: number;
  private activeSubject = new BehaviorSubject<boolean>(false);

  public onActive: Observable<boolean>;

  @Input() milestone?: string;
  @Input() id: string;
  modeEnum = Mode;
  isExercise = false;

  constructor(public presentation: PresentationComponent) {
    this.onActive = this.activeSubject.distinctUntilChanged();
  }

  disableResize() {
    this.presentation.disableResize();
  }
}
