import { ChangeDetectionStrategy, Component } from '@angular/core';

import { QUIZ_DATA } from '@quiz-data';
import { Quiz } from '@shared/models/Quiz.model';


@Component({
  selector: 'codelab-quiz-intro',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroductionComponent {
  quizData: Quiz = QUIZ_DATA;
}
