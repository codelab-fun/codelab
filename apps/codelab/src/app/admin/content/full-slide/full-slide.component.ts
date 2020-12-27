import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Input
} from '@angular/core';
import { CodelabExercisePlaygroundComponent } from '../../../components/exercise-playground/codelab-exercise-playground.component';

@Component({
  selector: 'slides-full-slide',
  templateUrl: './full-slide.component.html',
  styleUrls: ['./full-slide.component.scss']
})
export class FullSlideComponent implements AfterViewInit {
  @Input() slide;

  constructor(
    private readonly el: ElementRef,
    private readonly cfr: ComponentFactoryResolver
  ) {}

  ngAfterViewInit(): void {
    const exercise = this.el.nativeElement.querySelector('exercise');
    if (exercise) {
      const factory = this.cfr.resolveComponentFactory(
        CodelabExercisePlaygroundComponent
      );
    }
  }
}
