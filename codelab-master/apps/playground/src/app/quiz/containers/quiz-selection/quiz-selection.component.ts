import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SlideLeftToRightAnimation } from '@codelab-quiz/animations/*';
import { Quiz } from '@codelab-quiz/shared/models/';
import { QuizService } from '@codelab-quiz/shared/services/*';

type AnimationState = 'animationStarted' | 'none';

@Component({
  selector: 'codelab-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss'],
  animations: [SlideLeftToRightAnimation.slideLeftToRight],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizSelectionComponent implements OnInit {
  quizzes$: Observable<Quiz[]>;
  currentQuestionIndex: number;
  selectionParams: Object;
  animationState$ = new BehaviorSubject<AnimationState>('none');
  imagePath = "assets/images/milestones/";

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizzes$ = this.quizService.getQuizzes();
    this.currentQuestionIndex = this.quizService.currentQuestionIndex;
    this.selectionParams = this.quizService.returnQuizSelectionParams();
  }

  animationDoneHandler(): void {
    this.animationState$.next('none');
  }
}
