<<<<<<< HEAD
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
=======
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'codelab-dependency-injection-quiz-component',
  templateUrl: './dependency-injection-quiz.component.html',
  styleUrls: ['./dependency-injection-quiz.component.scss']
})
export class CodelabDependencyInjectionQuizComponent implements OnInit {
  @Output() question: QuizQuestion;
  @ViewChild("questionElem") questionElem: ElementRef;
  answer: number;

  totalQuestions: number;
  completionTime: number;
  correctAnswersCount = 0;
  percentage: number;

  currentQuestion = 1;
  questionIndex: number;
  badgeQuestionNumber: number;
  correctAnswer: boolean;
  @Output() hasAnswer: boolean;
  answered: boolean;
  disabled: boolean;
  quizIsOver: boolean;
  progressValue: number;
  timeLeft: number;
  timePerQuestion = 20;
  interval: any;
  elapsedTime = 0;
  elapsedTimes = [];
  finalAnswers = [];
  showExplanation: boolean;

  allQuestions: QuizQuestion[] = [
    {
      index: 1,
      questionText: 'What is the objective of dependency injection?',
      options: [
        { optionValue: 1, text: 'Pass the service to the client.' },
        { optionValue: 2, text: 'Allow the client to find service.' },
        { optionValue: 3, text: 'Allow the client to build service.' },
        { optionValue: 4, text: 'Give the client part service.' }
      ],
      answer: 1,
      explanation: 'a service gets passed to the client during DI'
    },
    {
      index: 2,
      questionText: 'Which of the following benefit from dependency injection?',
      options: [
        { optionValue: 1, text: 'Programming' },
        { optionValue: 2, text: 'Testability' },
        { optionValue: 3, text: 'Software design' },
        { optionValue: 4, text: 'All of the above.' },
      ],
      answer: 4,
      explanation: 'DI simplifies both programming and testing as well as being a popular design pattern'
    },
    {
      index: 3,
      questionText: 'Which of the following is the first step in setting up dependency injection?',
      options: [
        { optionValue: 1, text: 'Require in the component.' },
        { optionValue: 2, text: 'Provide in the module.' },
        { optionValue: 3, text: 'Mark dependency as @Injectable().' },
        { optionValue: 4, text: 'Declare an object.' }
      ],
      answer: 3,
      explanation: 'the first step is marking the class as @Injectable()'
    },
    {
      index: 4,
      questionText: 'In which of the following does dependency injection occur?',
      options: [
        { optionValue: 1, text: '@Injectable()' },
        { optionValue: 2, text: 'constructor' },
        { optionValue: 3, text: 'function' },
        { optionValue: 4, text: 'NgModule' },
      ],
      answer: 2,
      explanation: 'object instantiations are taken care of by the constructor in Angular'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.setQuestionIndex(+params.get('index'));  // get the question ID and store it
      this.question = this.getQuestion;
    });
  }

  ngOnInit() {
    this.question = this.getQuestion;
    this.badgeQuestionNumber = this.question.index;
    this.totalQuestions = this.allQuestions.length;
    this.timeLeft = this.timePerQuestion;
    this.progressValue = (this.currentQuestion / this.totalQuestions) * 100;
    this.countdown();
  }

  answerChanged($event) {
    this.answer = $event;
  }

  // checks whether the question is valid and is answered correctly
  checkIfAnsweredCorrectly() {
    this.answered = true;
    this.hasAnswer = true;

    if (this.answer === this.allQuestions[this.questionIndex - 1]["answer"]) {
      this.showExplanation = true;
      this.stopTimer();               // if correct answer selected, stop the timer
      this.correctAnswer = true;      // then set the correct answer as true
      this.correctAnswersCount++;     // increment the correctAnswersCount
      this.quizDelay(3000); // add quiz delay of 3 seconds in between questions when correct answer chosen
      this.addElapsedTimeToElapsedTimes();  // add the elapsed time to array
      this.addFinalAnswerToFinalAnswers();  // add the final answer to array
      this.resetTimer();                    // then reset the timer
      this.answer = null; // set the answer to null (is this the equiv of using onsubmit???)
      this.navigateToNextQuestion();  // navigate to the next question
    } else {
      this.showExplanation = true;
      this.answered = false;  // set answered as false
      this.hasAnswer = false;
      this.correctAnswer = false;
    }
  }

  navigateToNextQuestion(): void {
    this.answer = null;
    this.router.navigate(['/quiz/question', this.getQuestionIndex() + 1]);
    this.displayNextQuestion();
  }

  displayNextQuestion() {
    this.resetTimer();                          // reset the timer
    this.increaseProgressValue();               // increase the progress value
    this.questionIndex++;                       // increase the question index by 1

    if (this.questionIndex <= this.totalQuestions) {
      this.badgeQuestionNumber++;               // increase the question number for the badge by 1
    }

    if (this.isThereAnotherQuestion()) {
      this.displayNextQuestionText();     // display the text for the next question
    } else {
      this.navigateToResults();           // navigate to the results page
    }
  }

  displayNextQuestionText() {
    if (this.questionIndex < this.totalQuestions) {
      this.questionElem.nativeElement.innerHTML = this.allQuestions[this.questionIndex++]["questionText"];
    }
    else {
      this.navigateToResults();           // navigate to results
    }
  }

  navigateToResults(): void {
    if (this.questionIndex > this.totalQuestions) {
      this.router.navigate(['/results'], {
        state:
          {
            allQuestions: this.allQuestions,
            totalQuestions: this.totalQuestions,
            completionTime: this.completionTime,
            correctAnswersCount: this.correctAnswersCount,
            percentage: this.percentage
          }
      });
    }
  }

  addElapsedTimeToElapsedTimes() {
    if (this.getQuestionIndex() <= this.totalQuestions) {
      this.elapsedTimes = [...this.elapsedTimes, this.elapsedTime];
    } else {
      this.elapsedTimes = [...this.elapsedTimes, 0];
    }
    this.completionTime = this.calculateTotalElapsedTime(this.elapsedTimes);
  }

  addFinalAnswerToFinalAnswers() {
    this.finalAnswers = [...this.finalAnswers, this.answer];
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getQuestionIndex() + 1) / this.totalQuestions).toFixed(1));
  }

  calculateTotalElapsedTime(elapsedTimes) {
    return this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

  calculateQuizPercentage() {
    this.percentage = Math.round(100 * this.correctAnswersCount / this.totalQuestions);
  }

  /****************  public API  ***************/
  getQuestionIndex() {
    return this.questionIndex;
  }

  setQuestionIndex(idx: number) {
    return this.questionIndex = idx;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionIndex <= this.allQuestions.length;
  }

  isFinalQuestion(): boolean {
    return this.questionIndex === this.totalQuestions;
  }

  isCorrectAnswer(): boolean {
    return this.answer === this.question.answer;
  }

  get getQuestion(): QuizQuestion {
    return this.allQuestions.filter(
      question => question.index === this.questionIndex
    )[0];
  }

  // countdown clock
  private countdown() {
    if (this.isThereAnotherQuestion()) {
      this.interval = setInterval(() => {
        this.showExplanation = false;

        if (this.timeLeft > 0) {
          this.timeLeft--;

          if (this.answer !== null) {
            this.showExplanation = true;
            this.elapsedTime = Math.ceil(this.timePerQuestion - this.timeLeft);
            this.calculateTotalElapsedTime(this.elapsedTimes);
            this.checkIfAnsweredCorrectly();
          }

          if (this.timeLeft === 0 && !this.isFinalQuestion()) {
            this.navigateToNextQuestion();
          }
          if (this.timeLeft === 0 && this.isFinalQuestion()) {
            this.calculateQuizPercentage();
            this.navigateToResults();
          }
          if (this.isFinalQuestion() && this.hasAnswer === true) {
            this.calculateQuizPercentage();
            this.navigateToResults();
            this.quizIsOver = true;
          }

          // disable the next button until an option has been selected
          this.answer === null ? this.disabled = true : this.disabled = false;
        }
      }, 1000);
    }
  }

  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }

  private stopTimer() {
    this.timeLeft = this.timePerQuestion - this.elapsedTime;
  }

  quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }
}
>>>>>>> 970bc9feaf1792343871197b517f495f0567e967
