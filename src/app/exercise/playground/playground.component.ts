import { Component, Input } from '@angular/core';
import { ExerciseBase } from '../exercise/exercise.base';
import { MonacoConfigService } from '../services/monaco-config.service';
import { SlideComponent } from '../../presentation/slide/slide.component';
import { AnalyticsService } from '../../presentation/analytics.service';
import { ActivatedRoute } from '@angular/router';
import { PresentationComponent } from '../../presentation/presentation/presentation.component';


@Component({
  selector: 'slides-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent extends ExerciseBase {
  @Input() browserUseConsole: boolean;
  @Input() browserWidth: string;
  @Input() browserHeight: string;
  @Input() openFilesIndex = [0];

  // tslint:disable-next-line:all TODO: Fix linter warnings on the next line and delete this comment.
  @Input('focus-highlight-match') highlightMatches = [];

  constructor(slide: SlideComponent,
              monacoConfig: MonacoConfigService,
              analyticsService: AnalyticsService,
              route: ActivatedRoute,
              presentation: PresentationComponent) {
    super(slide, monacoConfig, analyticsService, route, presentation);
  }

  onCodeChange(code, file) {
    this.onCodeChanges({file, code});
  }
}
