import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Howl } from 'howler';
import cloneDeep from 'lodash.cloneDeep';

import { QUIZ_DATA, QUIZ_RESOURCES } from '@codelab-quiz/shared/data/*';
import { Option, Quiz, QuizQuestion, QuizResource, Resource, Score } from '@codelab-quiz/shared/models/';

@Injectable({
  providedIn: 'root'
})
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
  quizCompleted: boolean;
  status: string;

  correctAnswers = [];
  correctAnswersForEachQuestion = [];
  correctAnswerOptions: number[] = [];
  numberOfCorrectAnswers: number;
  correctAnswersCountSubject = new BehaviorSubject<number>(0);
  userAnswers = [];

  explanationText: string;
  correctOptions: string;
  correctMessage: string;

  multipleAnswer: boolean;
  checkedShuffle: boolean;

  score: Score;
  highScores: Score[];
  highScoresLocal = JSON.parse(localStorage.getItem("highScoresLocal")) || [];

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

  getQuizzes(): Observable <Quiz[]> {
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
    }
  }

  calculatePercentageOfCorrectlyAnsweredQuestions(): number {
    return Math.ceil((this.correctAnswersCountSubject.getValue() / this.totalQuestions) * 100);
  }

  saveHighScores(): void {
    this.score = {
      quizId: this.quizId,
      attemptDateTime: new Date(),
      score: this.calculatePercentageOfCorrectlyAnsweredQuestions(),
      totalQuestions: this.totalQuestions
    };

    const MAX_HIGH_SCORES = 10; // show results of the last 10 quizzes
    this.highScoresLocal.push(this.score);
    this.highScoresLocal.sort((a, b) => b.attemptDateTime - a.attemptDateTime);
    this.highScoresLocal.reverse(); // show high scores from most recent to latest
    this.highScoresLocal.splice(MAX_HIGH_SCORES);
    localStorage.setItem("highScoresLocal", JSON.stringify(this.highScoresLocal));
    this.highScores = this.highScoresLocal;
  }

  /********* setter functions ***********/
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
        this.correctOptions = correctAnswers[i];
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
        this.correctOptions = "All are correct!";
        this.correctMessage = "All are correct!";
      }
    }
  }

  setExplanationText(question: QuizQuestion): void {
    if (question) {
      this.explanationText = question.explanation;
    }
  }

  setQuizStatus(value: string): void {
    this.status = value;
  }

  setQuizId(value: string): void {
    this.quizId = value;
  }

  setStartedQuizId(value: string) {
    this.startedQuizId = value;
  }

  setContinueQuizId(value: string) {
    this.continueQuizId = value;
  }

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

  setChecked(value: boolean): void {
    this.checkedShuffle = value;
  }

  setMultipleAnswer(value: boolean): void {
    this.multipleAnswer = value;
  }

  setCurrentQuestion(value: QuizQuestion): void {
    this.currentQuestion = value;
  }

  setResources(value: Resource[]): void {
    this.resources = value;
  }

  sendCorrectCountToResults(value: number): void {
    this.correctAnswersCountSubject.next(value);
  }

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
  }
}
