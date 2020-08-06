import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { QUIZ_DATA } from '@codelab-quiz/shared/quiz-data';
import { Quiz } from '@codelab-quiz/shared/models/Quiz.model';
import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';
import { QuizService } from '@codelab-quiz/shared/services/quiz.service';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';
import { Animations } from '@codelab-quiz/animations';

type AnimationState = 'animationStarted' | 'none';

@Component({
  selector: 'codelab-quiz-component',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [Animations.changeRoute],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit {
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  quizName = '';
  question: QuizQuestion;
  questions: QuizQuestion[];
  answers: number[] = [];
  questionIndex: number;
  totalQuestions: number;
  progressValue: number;
  correctCount: number;
  quizId: string;
  indexOfQuizId: number;
  status: string;
  animationState$ = new BehaviorSubject<AnimationState>('none');
  get explanationText(): string { return this.quizService.explanationText; }
  get numberOfCorrectAnswers(): number { return this.quizService.numberOfCorrectAnswers; }
  previousUserAnswers: any;
  checked: boolean;

  paging = {
    previousButtonPoints: "298.052,24 266.052,0 112.206,205.129 266.052,410.258 298.052,386.258 162.206,205.129 ",
    nextButtonPoints: "144.206,0 112.206,24 248.052,205.129 112.206,386.258 144.206,410.258 298.052,205.129 ",
    restartButtonPath: "M152.924,300.748c84.319,0,152.912-68.6,152.912-152.918c0-39.476-15.312-77.231-42.346-105.564 c0,0,3.938-8.857,8.814-19.783c4.864-10.926-2.138-18.636-15.648-17.228l-79.125,8.289c-13.511,1.411-17.999,11.467-10.021,22.461 l46.741,64.393c7.986,10.992,17.834,12.31,22.008,2.937l7.56-16.964c12.172,18.012,18.976,39.329,18.976,61.459 c0,60.594-49.288,109.875-109.87,109.875c-60.591,0-109.882-49.287-109.882-109.875c0-19.086,4.96-37.878,14.357-54.337 c5.891-10.325,2.3-23.467-8.025-29.357c-10.328-5.896-23.464-2.3-29.36,8.031C6.923,95.107,0,121.27,0,147.829 C0,232.148,68.602,300.748,152.924,300.748z"
  };

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    this.indexOfQuizId = this.quizData.findIndex(el => el.quizId === this.quizId);

    this.getPreviousUserAnswersText(this.quizService.previousUserAnswers);
  }

  ngOnInit() {
    if (this.quizService.checked) {
      this.quizService.shuffledQuestions(this.quizData[this.indexOfQuizId].questions);
      this.quizService.shuffledAnswers(
        this.quizData[this.indexOfQuizId].questions[this.quizService.currentQuestionIndex].options
      );
    }

    this.activatedRoute.url.subscribe(segments => {
      this.quizName = segments[1].toString();
    });

    this.activatedRoute.params.subscribe(params => {
      this.totalQuestions = this.quizData[this.indexOfQuizId].questions.length;
      this.quizService.setTotalQuestions(this.totalQuestions);

      if (params.questionIndex) {
        this.questionIndex = parseInt(params.questionIndex, 0);
        this.quizService.currentQuestionIndex = this.questionIndex;

        this.getQuestion();
        this.getQuestions();
        this.getQuizId();
        this.getQuizStatus();

        if (this.questionIndex === 1) {
          this.progressValue = 0;
          this.quizData[this.indexOfQuizId].status = 'started';
        } else {
          this.progressValue = ((this.questionIndex - 1) / this.totalQuestions) * 100;
        }
      }
    });

    if (this.questionIndex === 1) {
      this.quizService.correctAnswersCountSubject.next(0);
    }

    this.correctCount = this.quizService.correctAnswersCountSubject.getValue();
    this.sendCorrectCountToQuizService(this.correctCount);
  }

  animationDoneHandler(): void {
    this.animationState$.next('none');
  }

  selectedAnswer(data) {
    const correctAnswers = this.question.options.filter((options) => options.correct);
    if (correctAnswers.length > 1 && this.answers.indexOf(data) === -1) {
      this.answers.push(data);
    } else {
      this.answers[0] = data;
    }
  }

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
    this.animationState$.next('animationStarted');
    this.quizService.navigateToPreviousQuestion();
  }

  advanceToResults() {
    this.quizService.resetAll();
    this.checkIfAnsweredCorrectly();
    this.quizService.navigateToResults();
  }

  restartQuiz() {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.answers = null;
    this.router.navigate(['/quiz/question/', this.quizId, 1]).then();
  }

  checkIfAnsweredCorrectly() {
    if (this.question) {
      const correctAnswerFound = this.answers.find((answer) => {
        return this.question.options &&
          this.question.options[answer] &&
          this.question.options[answer]['selected'] &&
          this.question.options[answer]['correct'];
      });
      if (correctAnswerFound > -1) {
        this.sendCorrectCountToQuizService(this.correctCount + 1);
      } // for multiple-answer questions, ALL correct answers should be marked correct for the score to increase

      const answers = this.answers && this.answers.length > 0 ? this.answers.map((answer) => answer + 1) : [];
      this.quizService.userAnswers.push(this.answers && this.answers.length > 0 ? answers : this.answers);
    }
  }

  private getQuestion(): void {
    this.question = this.quizData[this.indexOfQuizId].questions[this.questionIndex - 1];
    this.quizService.setQuestion(this.question);
  }

  private getQuestions(): void {
    this.questions = this.quizData[this.indexOfQuizId].questions;
    this.quizService.setQuestions(this.questions);
  }

  private getQuizId(): void {
    this.quizService.setQuizId(this.quizId);
  }

  private getQuizStatus(): void {
    this.status = this.quizData[this.indexOfQuizId].status;
    this.quizService.setQuizStatus(this.status);
  }

  private getPreviousUserAnswersText(previousAnswers): void {
    this.questions = this.quizData[this.indexOfQuizId].questions;
    this.quizService.setPreviousUserAnswersText(previousAnswers, this.questions);
  }

  sendCorrectCountToQuizService(value: number): void {
    this.correctCount = value;
    this.quizService.sendCorrectCountToResults(this.correctCount);
  }
}
