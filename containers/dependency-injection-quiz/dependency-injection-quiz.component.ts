import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { QUIZ_DATA } from '@quiz-data';
import { Quiz } from '@shared/models/Quiz.model';
import { QuizQuestion } from '@shared/models/QuizQuestion.model';
import { QuizService } from '@shared/services/quiz.service';
import { TimerService } from '@shared/services/timer.service';

type AnimationState = 'animationStarted' | 'none';

@Component({
  selector: 'codelab-dependency-injection-quiz-component',
  templateUrl: './dependency-injection-quiz.component.html',
  styleUrls: ['./dependency-injection-quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('changeRoute', [
      transition('* => animationStarted', [
        animate('1s', keyframes([
          style({ transform: 'scale(1.0)' }),
          style({ transform: 'scale(1.3)' }),
          style({ transform: 'scale(1.0)' })
        ]))
      ]),
    ])
  ]
})
export class DependencyInjectionQuizComponent implements OnInit {
  quizData: Quiz = QUIZ_DATA;
  question: QuizQuestion;
  answer: number[] = [];
  questionIndex: number;
  totalQuestions: number;
  progressValue: number;
  correctCount: number;
  get explanationText(): string { return this.quizService.explanationText; }
  get numberOfCorrectOptions(): number { return this.quizService.numberOfCorrectOptions; }
  animationState$ = new BehaviorSubject<AnimationState>('none');

  constructor(
    private quizService: QuizService,
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.totalQuestions = this.quizService.numberOfQuestions();

      if (params.questionIndex) {
        this.questionIndex = parseInt(params.questionIndex, 0);
        this.quizService.currentQuestionIndex = this.questionIndex;
        this.getQuestion();

        if (this.questionIndex === 1) {
          this.progressValue = 0;
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

  private getQuestion() {
    this.question = this.quizService.getQuestions().questions[this.questionIndex - 1];
  }

  selectedAnswer(data) {
    const correctAnswers = this.question.options.filter((options) => options.correct);
    if (correctAnswers.length > 1 && this.answer.indexOf(data) === -1) {
      this.answer.push(data);
    } else {
      this.answer[0] = data;
    }
  }

  previousQuestion() {
    this.answer = null;
    this.animationState$.next('animationStarted');
    this.quizService.previousQuestion();
  }

  restart() {
    this.quizService.resetAll();
    this.quizService.resetQuestions();
    this.timerService.elapsedTimes = [];
    this.timerService.completionTime = 0;
    this.answer = null;
    this.router.navigate(['/quiz/intro']).then();
  }

  nextQuestion() {
    this.checkIfAnsweredCorrectly();
    this.answer = [];
    this.animationState$.next('animationStarted');
    this.quizService.nextQuestion();
  }

  results() {
    this.quizService.resetAll();
    this.checkIfAnsweredCorrectly();
    this.quizService.navigateToResults();
  }

  checkIfAnsweredCorrectly() {
    if (this.question) {
      const incorrectAnswerFound = this.answer.find((answer) => {
        return this.question.options &&
          this.question.options[answer] &&
          this.question.options[answer]['selected'] &&
          !this.question.options[answer]['correct'];
      });
      if (!incorrectAnswerFound) {
        this.sendCorrectCountToQuizService(this.correctCount + 1);
      }
      const answers = this.answer && this.answer.length > 0 ? this.answer.map((answer) => answer + 1) : [];
      this.quizService.userAnswers.push(this.answer && this.answer.length > 0 ? answers : this.answer);
    }
  }

  sendCorrectCountToQuizService(value: number): void {
    this.correctCount = value;
    this.quizService.sendCorrectCountToResults(this.correctCount);
  }
}
