<<<<<<< HEAD
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Howl } from 'howler';
import cloneDeep from 'lodash.cloneDeep';

import { QUIZ_DATA, QUIZ_RESOURCES } from '@codelab-quiz/shared/data/*';
import { Option, Quiz, QuizQuestion, QuizResource, Resource } from '@codelab-quiz/shared/models/';
=======
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Howl } from 'howler';

import { QUIZ_DATA } from '@codelab-quiz/shared/quiz-data';
import { Option } from '@codelab-quiz/shared/models/Option.model';
import { Quiz } from '@codelab-quiz/shared/models/Quiz.model';
import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6


@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
export class QuizService implements OnDestroy {
  quizData: Quiz[];
  quizInitialState: Quiz[];
  quizResources: QuizResource[];
  question: QuizQuestion;
  questions: QuizQuestion[];
  currentQuestion: QuizQuestion;
  resources: Resource[];
  answers: number[];
  totalQuestions: number;
  currentQuestionIndex = 1;

  quizzes$: Observable<Quiz[]>;
  quizName$: Observable<string>;
  quizId: string;
  indexOfQuizId: number;

  startedQuizId: string;
  continueQuizId: string;
  completedQuizId: string;
=======
export class QuizService {
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  question: QuizQuestion;
  questions: QuizQuestion[];
  answers: number[];
  multipleAnswer: boolean;
  totalQuestions: number;
  currentQuestionIndex = 1;

  quizId: string;
  startedQuizId: string;
  continueQuizId: string;
  completedQuizId: string;
  indexOfQuizId: number;
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  quizCompleted: boolean;
  status: string;

  correctAnswers = [];
  correctAnswersForEachQuestion = [];
  correctAnswerOptions: number[] = [];
  numberOfCorrectAnswers: number;
<<<<<<< HEAD
  correctAnswersCountSubject = new BehaviorSubject<number>(0);
  userAnswers = [];

=======
  numberOfCorrectAnswersArray = [];
  correctAnswersCountSubject = new BehaviorSubject<number>(0);

  userAnswers = [];
  previousUserAnswers: any[] = [];
  previousUserAnswersText: any[] = [];
  previousUserAnswersInnerText = [];
  previousUserAnswersTextSingleAnswer: string[] = [];
  previousUserAnswersTextMultipleAnswer: string[] = [];

  explanation: string;
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  explanationText: string;
  correctOptions: string;
  correctMessage: string;

<<<<<<< HEAD
  multipleAnswer: boolean;
  checkedShuffle: boolean;

  unsubscribe$ = new Subject<void>();
  private url = "assets/data/quiz.json";

  correctSound = new Howl({
    src: "assets/audio/sound-correct.mp3"
  });
  incorrectSound = new Howl({
    src: "assets/audio/sound-incorrect.mp3"
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.quizData = QUIZ_DATA;
    this.quizInitialState = cloneDeep(QUIZ_DATA);
    this.quizResources = QUIZ_RESOURCES;

    this.quizName$ = this.activatedRoute.url.pipe(
      map((segments) => segments[1].toString())
    );

    this.activatedRoute.paramMap
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params) => this.quizId = params.get('quizId'));

    this.indexOfQuizId = this.quizData.findIndex(
      (elem) => elem.quizId === this.quizId
    );

    this.returnQuizSelectionParams();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /********* getter functions ***********/
  getQuiz(): Quiz[] {
    return this.quizData;
  }

  getResources(): QuizResource[] {
    return this.quizResources;
  }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.url}`);
  }

  getCorrectAnswers(question: QuizQuestion): Option[] {
    if (question) {
      const identifiedCorrectAnswers = question.options.filter((option) => option.correct);
      this.numberOfCorrectAnswers = identifiedCorrectAnswers.length;
      this.correctAnswerOptions = identifiedCorrectAnswers.map(
        option => question.options.indexOf(option) + 1
      );

      this.setCorrectAnswers(question);
      this.setCorrectMessage(this.correctAnswersForEachQuestion.sort());
      this.setExplanationText(question);
      return identifiedCorrectAnswers;
=======
  isAnswered: boolean;
  checkedShuffle: boolean;

  correctSound = new Howl({
    src: '../../../assets/audio/sound-correct.mp3',
    html5: true,
    format: ['mp3', 'aac']
  });
  incorrectSound = new Howl({
    src: '../../../assets/audio/sound-incorrect.mp3',
    html5: true,
    format: ['mp3', 'aac']
  });


  constructor(
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.quizId = this.activatedRoute.snapshot.paramMap.get('quizId');
    this.indexOfQuizId = this.quizData.findIndex(el => el.quizId === this.quizId);
  }

  getCorrectAnswers(question: QuizQuestion) {
    if (this.question) {
      const identifiedCorrectAnswers = question.options.filter((option) => option.correct);
      this.correctAnswerOptions = identifiedCorrectAnswers.map((option) => question.options.indexOf(option) + 1);

      this.numberOfCorrectAnswers = identifiedCorrectAnswers.length;
      this.numberOfCorrectAnswersArray.push(this.numberOfCorrectAnswers);

      this.correctAnswersForEachQuestion.push(this.correctAnswerOptions);
      this.correctAnswers.push(this.correctAnswersForEachQuestion);

      this.setCorrectAnswerMessagesAndExplanationText(this.correctAnswersForEachQuestion.sort());
      return identifiedCorrectAnswers;
    }
  }

  shuffledQuestions(questions: QuizQuestion[]): void {
    for (let i = questions.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  }

  shuffledAnswers(answers: Option[]): void {
    for (let i = answers.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    }
  }

  /********* setter functions ***********/
<<<<<<< HEAD
  setCorrectAnswers(question: QuizQuestion): void {
    if (question) {
      const correctAnswerAdded = this.correctAnswers.find(q => q.questionId === question.explanation) !== undefined;
      if (correctAnswerAdded === false) {
        this.correctAnswersForEachQuestion.push(this.correctAnswerOptions);
        this.correctAnswers.push({
          questionId: question.explanation,
          answers: this.correctAnswersForEachQuestion.sort()
        });
      }
    }
  }

  setCorrectMessage(correctAnswersArray: number[]): void {
    const correctAnswers = correctAnswersArray.flat();

    for (let i = 0; i < correctAnswersArray.length; i++) {
      if (correctAnswers[i]) {
        this.correctOptions = correctAnswers[i].toString().concat("");
        this.correctMessage = "The correct answer is Option " + this.correctOptions + ".";
      }

      if (correctAnswers[i] && correctAnswers[i + 1]) {
        this.correctOptions = correctAnswers[i].toString().concat(" and " + correctAnswers[i + 1]);
        this.correctMessage = "The correct answers are Options " + this.correctOptions + ".";
      }

      if (correctAnswers[i] && correctAnswers[i + 1] && correctAnswers[i + 2]) {
        this.correctOptions = correctAnswers[i].toString().concat(
                                ", ", correctAnswers[i + 1] + " and " + correctAnswers[i + 2]);
        this.correctMessage = "The correct answers are Options " + this.correctOptions + ".";
      }
      if (correctAnswers.length === this.question.options.length) {
        this.correctOptions = "ALL are correct!";
        this.correctMessage = "ALL are correct!";
      }
    }
  }

  setExplanationText(question: QuizQuestion): void {
    if (question) {
      this.explanationText = question.explanation;
=======
  setCorrectAnswerMessagesAndExplanationText(correctAnswers: number[]): void {
    if (correctAnswers[0][0]) {
      this.correctOptions = correctAnswers[0][0];
      this.correctMessage = 'The correct answer was Option ' + this.correctOptions + '.';
    }
    if (correctAnswers[0][0] && correctAnswers[0][1]) {
      this.correctOptions = correctAnswers[0][0].toString().concat(' and ', correctAnswers[0][1]);
      this.correctMessage = 'The correct answers were Options ' + this.correctOptions + '.';
    }
    if (correctAnswers[0][0] && correctAnswers[0][1] && correctAnswers[0][2]) {
      this.correctOptions = correctAnswers[0][0].toString().concat(', ', correctAnswers[0][1], ' and ', correctAnswers[0][2]);
      this.correctMessage = 'The correct answers were Options ' + this.correctOptions + '.';
    }
    if (correctAnswers[0][0] && correctAnswers[0][1] && correctAnswers[0][2] && correctAnswers[0][3]) {
      this.explanationText = 'All were correct!';
      this.correctMessage = 'All were correct!';
    }
    this.explanationText = this.question.explanation;
  }

  // set the text of the previous user answers in an array to show in the following quiz
  setPreviousUserAnswersText(previousAnswers, questions: QuizQuestion[]): void {
    for (let i = 0; i < previousAnswers.length; i++) {
      if (previousAnswers[i].length === 1) {
        const previousAnswersString = questions[i].options[previousAnswers[i] - 1].text;
        this.previousUserAnswersText.push(previousAnswersString);
      }
      if (previousAnswers[i].length > 1) {
        const previousAnswerOptionsInner = previousAnswers[i].slice();
        for (let j = 0; j < previousAnswerOptionsInner.length; j++) {
          const previousAnswersInnerString = questions[i].options[previousAnswerOptionsInner[j] - 1].text;
          this.previousUserAnswersInnerText.push(previousAnswersInnerString);
        }
        this.previousUserAnswersText.push(this.previousUserAnswersInnerText);
      }
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    }
  }

  setQuizStatus(value: string): void {
    this.status = value;
  }

  setQuizId(value: string): void {
    this.quizId = value;
  }

<<<<<<< HEAD
  setStartedQuizId(value: string) {
    this.startedQuizId = value;
  }

  setContinueQuizId(value: string) {
    this.continueQuizId = value;
  }

=======
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  setCompletedQuizId(value: string) {
    this.completedQuizId = value;
  }

  setQuestion(value: QuizQuestion): void {
    this.question = value;
  }

  setQuestions(value: QuizQuestion[]): void {
    this.questions = value;
  }

  setTotalQuestions(value: number): void {
    this.totalQuestions = value;
  }

<<<<<<< HEAD
=======
  setPreviousUserAnswers(value: any) {
    this.previousUserAnswers = value;
  }

>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  setChecked(value: boolean): void {
    this.checkedShuffle = value;
  }

  setMultipleAnswer(value: boolean): void {
    this.multipleAnswer = value;
  }

<<<<<<< HEAD
  setCurrentQuestion(value: QuizQuestion): void {
    this.currentQuestion = value;
  }

  setResources(value: Resource[]): void {
    this.resources = value;
=======
  setIsAnswered(value: boolean): void {
    this.isAnswered = value;
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  }

  sendCorrectCountToResults(value: number): void {
    this.correctAnswersCountSubject.next(value);
  }

<<<<<<< HEAD
  // generically shuffle arrays in-place using Durstenfeld's shuffling algorithm
  shuffle<T>(arg: T[]): void {
    for (let i = arg.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arg[i], arg[j]] = [arg[j], arg[i]];
    }
  }

  returnQuizSelectionParams(): Object {
    return new Object({
      startedQuizId: this.startedQuizId,
      continueQuizId: this.continueQuizId,
      completedQuizId: this.completedQuizId,
      quizCompleted: this.quizCompleted,
      status: this.status
    });
  }

  /********* navigation functions ***********/
  navigateToNextQuestion(): void {
    this.quizCompleted = false;
    this.currentQuestionIndex++;
    const questionIndex = this.currentQuestionIndex;
    this.router.navigate(["/quiz/question/", this.quizId, questionIndex]).then();
    this.resetAll();
  }

  navigateToPreviousQuestion(): void {
    this.quizCompleted = false;
    this.router.navigate(["/quiz/question/", this.quizId, this.currentQuestionIndex - 1]).then();
    this.resetAll();
  }

  navigateToResults(): void {
    this.quizCompleted = true;
    this.router.navigate(["/quiz/results/", this.quizId]).then();
  }

  /********* reset functions ***********/
  resetQuestions(): void {
    this.quizData = cloneDeep(this.quizInitialState);
  }

  resetAll(): void {
    this.answers = null;
    this.correctAnswersForEachQuestion = [];
    this.correctAnswerOptions = [];
    this.correctOptions = "";
    this.correctMessage = "";
    this.explanationText = "";
    this.currentQuestionIndex = 0;
=======
  /********* navigation functions ***********/
  navigateToNextQuestion() {
    this.quizCompleted = false;
    this.currentQuestionIndex++;
    const questionIndex = this.currentQuestionIndex;
    this.router.navigate(['/quiz/question/', this.quizId, questionIndex]).then();
    this.resetAll();
    this.timerService.resetTimer();
  }

  navigateToPreviousQuestion() {
    this.quizCompleted = false;
    this.router.navigate(['/quiz/question/', this.quizId, this.currentQuestionIndex - 1]).then();
    this.resetAll();
  }

  navigateToResults() {
    this.quizCompleted = true;
    this.router.navigate(['/quiz/results/', this.quizId]).then();
  }

  resetQuestions() {
    this.quizData = JSON.parse(JSON.stringify(QUIZ_DATA));
  }

  resetAll() {
    this.answers = null;
    this.correctAnswersForEachQuestion = [];
    this.correctAnswerOptions = [];
    this.correctOptions = '';
    this.correctMessage = '';
    this.explanationText = '';
    this.currentQuestionIndex = 0;
    this.timerService.stopTimer();
    this.timerService.resetTimer();
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  }
}
