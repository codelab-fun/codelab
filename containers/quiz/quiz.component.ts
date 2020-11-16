import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< HEAD
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

=======
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Animations } from '@codelab-quiz/animations';
import { QUIZ_DATA } from '@codelab-quiz/shared/quiz-data';
import { Quiz } from '@codelab-quiz/shared/models/Quiz.model';
import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';
import { QuizService } from '@codelab-quiz/shared/services/quiz.service';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';

type AnimationState = 'animationStarted' | 'none';

>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
@Component({
  selector: 'codelab-quiz-component',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
<<<<<<< HEAD
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
=======
  animations: [Animations.changeRoute],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit, OnDestroy {
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  quizName: String = '';
  question: QuizQuestion;
  questions: QuizQuestion[];
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  answers: number[] = [];
  questionIndex: number;
  totalQuestions: number;
  progressValue: number;
  correctCount: number;
<<<<<<< HEAD

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
=======
  quizId: string;
  indexOfQuizId: number;
  status: string;
  previousUserAnswers: any;
  checkedShuffle: boolean;
  private unsubscribe$ = new Subject<void>();
  animationState$ = new BehaviorSubject<AnimationState>('none');
  get explanationText(): string { return this.quizService.explanationText; }
  get correctOptions(): string { return this.quizService.correctOptions; }
  get numberOfCorrectAnswers(): number { return this.quizService.numberOfCorrectAnswers; }

  paging = {
    previousButtonPoints: "298.052,24 266.052,0 112.206,205.129 266.052,410.258 298.052,386.258 162.206,205.129 ",
    nextButtonPoints: "144.206,0 112.206,24 248.052,205.129 112.206,386.258 144.206,410.258 298.052,205.129 ",
    restartButtonPath: "M152.924,300.748c84.319,0,152.912-68.6,152.912-152.918c0-39.476-15.312-77.231-42.346-105.564 c0,0,3.938-8.857,8.814-19.783c4.864-10.926-2.138-18.636-15.648-17.228l-79.125,8.289c-13.511,1.411-17.999,11.467-10.021,22.461 l46.741,64.393c7.986,10.992,17.834,12.31,22.008,2.937l7.56-16.964c12.172,18.012,18.976,39.329,18.976,61.459 c0,60.594-49.288,109.875-109.87,109.875c-60.591,0-109.882-49.287-109.882-109.875c0-19.086,4.96-37.878,14.357-54.337 c5.891-10.325,2.3-23.467-8.025-29.357c-10.328-5.896-23.464-2.3-29.36,8.031C6.923,95.107,0,121.27,0,147.829 C0,232.148,68.602,300.748,152.924,300.748z"
  };
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
<<<<<<< HEAD
  ) { }

  ngOnInit(): void {
    this.initializeQuizVariables();
=======
  ) {
    this.quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    this.indexOfQuizId = this.quizData.findIndex(el => el.quizId === this.quizId);
  }

  ngOnInit(): void {
    this.getQuizNameFromRoute();
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    this.shuffleQuestionsAndAnswers();

    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
<<<<<<< HEAD
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
=======
        .subscribe(params => {
          this.totalQuestions = this.quizData[this.indexOfQuizId].questions.length;
          this.quizService.setTotalQuestions(this.totalQuestions);

        if (params.questionIndex) {
          this.questionIndex = parseInt(params.questionIndex, 0);
          this.quizService.currentQuestionIndex = this.questionIndex;

          if (this.questionIndex === 1) {
            this.progressValue = 0;
            this.quizData[this.indexOfQuizId].status = 'started';
          } else {
            this.progressValue = ((this.questionIndex - 1) / this.totalQuestions) * 100;
          }

          this.sendQuestionToQuizService();
          this.sendQuestionsToQuizService();
          this.sendQuizIdToQuizService();
          this.sendQuizStatusToQuizService();
          this.sendPreviousUserAnswersToQuizService();
          this.sendIsAnsweredToQuizService();
        }
    });
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6

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

<<<<<<< HEAD
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
=======
  isAnswered(): boolean {
    return this.answers && this.answers.length > 0;
  }

  sendIsAnsweredToQuizService(): void {
    this.quizService.setIsAnswered(this.isAnswered());
  }

  animationDoneHandler(): void {
    this.animationState$.next('none');
  }

  selectedAnswer(data): void {
    const correctAnswers = this.question.options.filter((options) => options.correct);
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    if (correctAnswers.length > 1 && this.answers.indexOf(data) === -1) {
      this.answers.push(data);
    } else {
      this.answers[0] = data;
    }
  }

<<<<<<< HEAD
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
=======
  shuffleQuestionsAndAnswers(): void {
    if (this.quizService.checkedShuffle) {
      this.quizService.shuffledQuestions(this.quizData[this.indexOfQuizId].questions);
      this.quizService.shuffledAnswers(
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
        this.quizData[this.indexOfQuizId].questions[this.quizService.currentQuestionIndex].options
      );
    }
  }

<<<<<<< HEAD
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
=======
  advanceToNextQuestion() {
    this.checkIfAnsweredCorrectly();
    this.answers = [];
    this.quizData[this.indexOfQuizId].status = 'continue';
    this.animationState$.next('animationStarted');
    this.quizService.navigateToNextQuestion();
  }

  advanceToPreviousQuestion() {
    this.answers = null;
    this.quizData[this.indexOfQuizId].status = 'continue';
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    this.animationState$.next('animationStarted');
    this.quizService.navigateToPreviousQuestion();
  }

<<<<<<< HEAD
  advanceToResults(): void {
    this.quizService.resetAll();
    this.timerService.stopTimer();
    this.timerService.resetTimer();
=======
  advanceToResults() {
    this.quizService.resetAll();
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    this.checkIfAnsweredCorrectly();
    this.quizService.navigateToResults();
  }

<<<<<<< HEAD
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
    this.sendQuizResourcesToQuizService();
    this.sendQuizIdToQuizService();
    this.sendQuizStatusToQuizService();
  }

  private sendQuizQuestionToQuizService(): void {
=======
  restartQuiz() {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.answers = null;
    this.router.navigate(['/quiz/intro/', this.quizId]).then();
  }

  checkIfAnsweredCorrectly(): void {
    if (this.question) {
      const correctAnswerFound = this.answers.find((answer) => {
        return this.question.options &&
          this.question.options[answer] &&
          this.question.options[answer]['selected'] &&
          this.question.options[answer]['correct'];
      });

      const answers = this.isAnswered() ? this.answers.map((answer) => answer + 1) : [];
      this.quizService.userAnswers.push(this.isAnswered() ? answers : this.answers);

      this.addUpScores(answers, correctAnswerFound);
    }
  }

  addUpScores(answers: number[], correctAnswerFound: number): void {
    // TODO: for multiple-answer questions, ALL correct answers should be marked correct for the score to increase
    if (correctAnswerFound > -1 && answers.length === this.quizService.numberOfCorrectAnswers) {
      this.sendCorrectCountToQuizService(this.correctCount + 1);
    }
  }

  getQuizNameFromRoute(): void {
    this.activatedRoute.url.subscribe(segments => {
      this.quizName = segments[1].toString();
    });
  }

  private sendQuestionToQuizService() {
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    this.question = this.quizData[this.indexOfQuizId].questions[this.questionIndex - 1];
    this.quizService.setQuestion(this.question);
  }

<<<<<<< HEAD
  private sendQuizQuestionsToQuizService(): void {
=======
  private sendQuestionsToQuizService() {
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    this.questions = this.quizData[this.indexOfQuizId].questions;
    this.quizService.setQuestions(this.questions);
  }

<<<<<<< HEAD
  private sendQuizResourcesToQuizService(): void {
    this.resources = this.quizResources[this.indexOfQuizId].resources;
    this.quizService.setResources(this.resources);
  }

  private sendQuizIdToQuizService(): void {
=======
  private sendQuizIdToQuizService() {
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    this.quizService.setQuizId(this.quizId);
  }

  private sendQuizStatusToQuizService(): void {
<<<<<<< HEAD
    this.quizService.setQuizStatus(this.status);
  }

  private sendStartedQuizIdToQuizService(): void {
    this.quizService.setStartedQuizId(this.quizId);
  }

  private sendContinueQuizIdToQuizService(): void {
    this.quizService.setContinueQuizId(this.quizId);
=======
    this.status = this.quizData[this.indexOfQuizId].status;
    this.quizService.setQuizStatus(this.status);
  }

  private sendPreviousUserAnswersToQuizService(): void {
    this.questions = this.quizData[this.indexOfQuizId].questions;
    this.quizService.setPreviousUserAnswersText(this.quizService.previousUserAnswers, this.questions);
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  }

  private sendCorrectCountToQuizService(value: number): void {
    this.correctCount = value;
    this.quizService.sendCorrectCountToResults(this.correctCount);
  }
}
