import { Component, Input } from '@angular/core';
import { ExerciseBase } from './exercise.base';
import { FileConfig } from '../interfaces/file-config';
import { MonacoConfigService } from '../services/monaco-config.service';
import { SlideComponent } from '../../presentation/slide/slide.component';
import { AnalyticsService } from '../../presentation/analytics.service';
import { PresentationComponent } from '../../presentation/presentation/presentation.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'slides-exercise',
  templateUrl: 'exercise.component.html',
  styleUrls: ['exercise.component.css']
})
export class ExerciseComponent extends ExerciseBase {
  @Input() milestone;
  @Input() config;
  currentFile: FileConfig;

  constructor(private presentation: PresentationComponent,
              slide: SlideComponent,
              monacoConfig: MonacoConfigService, analyticsService: AnalyticsService, route: ActivatedRoute) {
    super(slide, monacoConfig, analyticsService, route);
    this.slide.isExercise = true;
  }

  onSelectFile(fileConfig: FileConfig): void {
    this.currentFile = fileConfig;
  }

  goToNextSlide() {
    this.presentation.nextSlide();
  }
}
