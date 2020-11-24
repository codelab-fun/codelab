import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ChangeRouteAnimation } from '@codelab-quiz/animations/';
import { Quiz, QuizQuestion, QuizResource, Resource } from '@codelab-quiz/shared/models/';
import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';

type AnimationState = 'animationStarted' | 'none';

enum Status {
  Started = 'Started',
  Continue = 'Continue',
  Completed = 'Completed'
}

@Component({
  selector: 'codelab-quiz-component',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [ChangeRouteAnimation.changeRoute],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit, OnDestroy {
  quizData: Quiz[];
  quizResources: QuizResource[];
  quizzes$: Observable<Quiz[]>;
  question: QuizQuestion;
  questions: QuizQuestion[];
  resources: Resource[];
  answers: number[] = [];
  questionIndex: number;
  totalQuestions: number;
  progressValue: number;
  correctCount: number;

  quizId: string;
  quizName$: Observable<string>;
  indexOfQuizId: number;
  status: Status;
  checkedShuffle: boolean;

  get multipleAnswer(): boolean {
    return this.quizService.multipleAnswer;
  }
  get correctOptions(): string {
    return this.quizService.correctOptions;
  }
  get explanationText(): string {
    return this.quizService.explanationText;
  }
  get numberOfCorrectAnswers(): number {
    return this.quizService.numberOfCorrectAnswers;
  }

  animationState$ = new BehaviorSubject<AnimationState>('none');
  unsubscribe$ = new Subject<void>();

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeQuizVariables();
    this.shuffleQuestionsAndAnswers();

    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params) => {
          this.totalQuestions = this.quizData[this.indexOfQuizId].questions.length;
          this.quizService.setTotalQuestions(this.totalQuestions);

          if (params.questionIndex) {
            this.questionIndex = parseInt(params.questionIndex, 0);
            this.quizService.currentQuestionIndex = this.questionIndex;

            if (this.questionIndex === 1) {
              this.status = Status.Started;
              this.sendStartedQuizIdToQuizService();
              this.progressValue = 0;
            } else {
              this.status = Status.Continue;
              this.sendContinueQuizIdToQuizService();
              this.progressValue = Math.ceil((this.questionIndex - 1) / this.totalQuestions * 100);
            }

            this.sendValuesToQuizService();
          }
      });

    if (this.questionIndex === 1) {
      this.quizService.correctAnswersCountSubject.next(0);
    }

    this.correctCount = this.quizService.correctAnswersCountSubject.getValue();
    this.sendCorrectCountToQuizService(this.correctCount);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeQuizVariables(): void {
    this.quizData = this.quizService.getQuiz();
    this.quizResources = this.quizService.getResources();
    this.quizzes$ = this.quizService.getQuizzes();
    this.quizName$ = this.activatedRoute.url.pipe(map((segments) => segments[1].toString()));
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params) => this.quizId = params.get('quizId'));
    this.indexOfQuizId = this.quizData.findIndex((elem) => elem.quizId === this.quizId);
  }

  animationDoneHandler(): void {
    this.animationState$.next('none');
  }

  isAnswered(): boolean {
    return this.answers && this.answers.length > 0;
  }

  selectedAnswer(data): void {
    const correctAnswers = this.question.options.filter((option) => option.correct);
    if (correctAnswers.length > 1 && this.answers.indexOf(data) === -1) {
      this.answers.push(data);
    } else {
      this.answers[0] = data;
    }
  }

  checkIfAnsweredCorrectly(): void {
    if (this.question) {
      const correctAnswerFound = this.answers.find((answer) => {
        return this.question.options &&
          this.question.options[answer] &&
          this.question.options[answer]["selected"] &&
          this.question.options[answer]["correct"];
      });

      const answers = this.isAnswered() ? this.answers.map((answer) => answer + 1) : [];
      this.quizService.userAnswers.push(this.isAnswered() ? answers : this.answers);

      this.incrementScore(answers, correctAnswerFound);
    }
  }

  incrementScore(answers: number[], correctAnswerFound: number): void {
    if (correctAnswerFound > -1 && answers.length === this.quizService.numberOfCorrectAnswers) {
      this.sendCorrectCountToQuizService(this.correctCount + 1);
    }
  }

  shuffleQuestionsAndAnswers(): void {
    if (this.quizService.checkedShuffle) {
      this.quizService.shuffle(this.quizData[this.indexOfQuizId].questions);
      this.quizService.shuffle(
        this.quizData[this.indexOfQuizId].questions[this.quizService.currentQuestionIndex].options
      );
    }
  }

  /************************ paging functions *********************/
  advanceToNextQuestion(): void {
    this.checkIfAnsweredCorrectly();
    this.answers = [];
    this.status = Status.Continue;
    this.animationState$.next('animationStarted');
    this.quizService.navigateToNextQuestion();
    this.timerService.resetTimer();
  }

  advanceToPreviousQuestion(): void {
    this.answers = [];
    this.status = Status.Continue;
    this.animationState$.next('animationStarted');
    this.quizService.navigateToPreviousQuestion();
  }

  advanceToResults(): void {
    this.quizService.resetAll();
    this.timerService.stopTimer();
    this.timerService.resetTimer();
    this.checkIfAnsweredCorrectly();
    this.quizService.navigateToResults();
  }

  restartQuiz(): void {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.stopTimer();
    this.timerService.resetTimer();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.answers = null;
    this.router.navigate(["/quiz/intro/", this.quizId]).then();
  }

  /************** functions that send values to quiz service *****************/
  private sendValuesToQuizService(): void {
    this.sendQuizQuestionToQuizService();
    this.sendQuizQuestionsToQuizService();
    this.sendQuizIdToQuizService();
    this.sendQuizResourcesToQuizService();
    this.sendQuizStatusToQuizService();
  }

  private sendQuizQuestionToQuizService(): void {
    this.question = this.quizData[this.indexOfQuizId].questions[this.questionIndex - 1];
    this.quizService.setQuestion(this.question);
  }

  private sendQuizQuestionsToQuizService(): void {
    this.questions = this.quizData[this.indexOfQuizId].questions;
    this.quizService.setQuestions(this.questions);
  }

  private sendQuizResourcesToQuizService(): void {
    this.resources = this.quizResources[this.indexOfQuizId].resources;
    this.quizService.setResources(this.resources);
  }

  private sendQuizIdToQuizService(): void {
    this.quizService.setQuizId(this.quizId);
  }

  private sendQuizStatusToQuizService(): void {
    this.quizService.setQuizStatus(this.status);
  }

  private sendStartedQuizIdToQuizService(): void {
    this.quizService.setStartedQuizId(this.quizId);
  }

  private sendContinueQuizIdToQuizService(): void {
    this.quizService.setContinueQuizId(this.quizId);
  }

  private sendCorrectCountToQuizService(value: number): void {
    this.correctCount = value;
    this.quizService.sendCorrectCountToResults(this.correctCount);
  }
}
