import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
export class QuizSelectionComponent implements OnInit, OnDestroy {
  quizzes$: Observable<Quiz[]>;
  quizId: string;
  currentQuestionIndex: number;
  totalQuestions: number;

  selectionParams: Object;
  animationState$ = new BehaviorSubject<AnimationState>('none');
  unsubscribe$ = new Subject<void>();
  imagePath = "assets/images/milestones/";

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizzes$ = this.quizService.getQuizzes();
    this.quizId = this.quizService.quizId;
    this.currentQuestionIndex = this.quizService.currentQuestionIndex;
    this.totalQuestions = this.quizService.totalQuestions;
    this.selectionParams = this.quizService.returnQuizSelectionParams();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  animationDoneHandler(): void {
    this.animationState$.next('none');
  }
}
