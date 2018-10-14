import { Component, Input } from '@angular/core';
import { ExerciseBase } from '../exercise/exercise.base';
import { MonacoConfigService } from '../services/monaco-config.service';
import { SlideComponent } from '../../../../../../libs/presentation/src/lib/slide/slide.component';
import { AnalyticsService } from '../../../../../../libs/presentation/src/lib/analytics.service';
import { ActivatedRoute } from '@angular/router';
import { PresentationComponent } from '../../../../../../libs/presentation/src/lib/presentation/presentation.component';


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
  @Input() url = 'about:blank';

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
