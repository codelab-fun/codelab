import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Howl } from 'howler';

import { QUIZ_DATA } from '@codelab-quiz/shared/quiz-data';
import { Quiz } from '@codelab-quiz/shared/models/Quiz.model';
import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';
import { Resource } from '@codelab-quiz/shared/models/Resource.model';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';


@Injectable({ providedIn: 'root' })
export class QuizService {
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  question: QuizQuestion;
  questions: QuizQuestion[];
  // resources: Resource[];
  answers: number[];
  totalQuestions: number;
  currentQuestionIndex = 1;
  correctAnswersForEachQuestion = [];
  correctAnswers = [];
  userAnswers = [];
  numberOfCorrectAnswers: number;
  correctAnswerOptions: number[] = [];
  correctOptions: string;
  explanation: string;
  explanationText: string;
  correctMessage: string;
  hasAnswer: boolean;
  correctAnswersCountSubject = new BehaviorSubject<number>(0);
  quizId: string;

  correctSound = new Howl({
    src: 'http://www.marvinrusinek.com/sound-correct.mp3',
    html5: true,
    format: ['mp3', 'aac']
  });
  incorrectSound = new Howl({
    src: 'http://www.marvinrusinek.com/sound-incorrect.mp3',
    html5: true,
    format: ['mp3', 'aac']
  });


  constructor(
    private timerService: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.hasAnswer = true;
  }

  getCorrectAnswers(question: QuizQuestion) {
    const identifiedCorrectAnswers = question.options.filter(item => item.correct);
    this.numberOfCorrectAnswers = identifiedCorrectAnswers.length;
    this.correctAnswerOptions = question.options.filter(option => option.correct)
                                                .map(option => question.options.indexOf(option) + 1);
    this.correctAnswersForEachQuestion.push(this.correctAnswerOptions);
    this.correctAnswers.push(this.correctAnswersForEachQuestion);
    this.setExplanationAndCorrectAnswerMessages(this.correctAnswersForEachQuestion.sort());

    return identifiedCorrectAnswers;
  }

  setExplanationAndCorrectAnswerMessages(correctAnswers: number[]): void {
    if (correctAnswers[0][0]) {
      this.explanation = ' was correct because ' + this.question.explanation + '.';
      this.correctOptions = correctAnswers[0][0];
      this.explanationText = 'Option ' + correctAnswers + this.explanation;
      this.correctMessage = 'The correct answer was Option ' + this.correctOptions + '.';
    }
    if (correctAnswers[0][0] && correctAnswers[0][1]) {
      this.explanation = ' were correct because ' + this.question.explanation + '.';
      this.correctOptions = correctAnswers[0][0].toString().concat(' and ', correctAnswers[0][1]);
      this.explanationText = 'Options ' + this.correctOptions + this.explanation;
      this.correctMessage = 'The correct answers were Options ' + this.correctOptions + '.';
    }
    if (correctAnswers[0][0] && correctAnswers[0][1] && correctAnswers[0][2]) {
      this.explanation = ' were correct because ' + this.question.explanation + '.';
      this.correctOptions = correctAnswers[0][0].toString().concat(', ', correctAnswers[0][1], ' and ', correctAnswers[0][2]);
      this.explanationText = 'Options ' + this.correctOptions + this.explanation;
      this.correctMessage = 'The correct answers were Options ' + this.correctOptions + '.';
    }
    if (correctAnswers[0][0] && correctAnswers[0][1] && correctAnswers[0][2] && correctAnswers[0][3]) {
      this.explanationText = 'All were correct!';
      this.correctMessage = 'All were correct!';
    }
  }

  setQuestion(question: QuizQuestion): void {
    this.question = question;
  }

  setQuestions(questions: QuizQuestion[]): void {
    this.questions = questions;
  }

  setQuizId(quizId: string): void {
    this.quizId = quizId;
  }

  /* setResources(resources: Resource[]): void {
    this.resources = resources;
  } */

  setTotalQuestions(totalQuestions: number): void {
    this.totalQuestions = totalQuestions;
  }

  sendCorrectCountToResults(value: number): void {
    this.correctAnswersCountSubject.next(value);
  }

  navigateToNextQuestion() {
    this.currentQuestionIndex++;
    const questionIndex = this.currentQuestionIndex;
    this.router.navigate(['/quiz/question', this.quizId, questionIndex]).then();
    this.resetAll();
    this.timerService.resetTimer();
  }

  navigateToPreviousQuestion() {
    this.router.navigate(['/quiz/question', this.quizId, this.currentQuestionIndex - 1]).then();
    this.resetAll();
  }

  navigateToResults() {
    this.router.navigate(['/quiz/results', this.quizId]).then();
  }

  resetAll() {
    this.answers = null;
    this.hasAnswer = false;
    this.correctAnswersForEachQuestion = [];
    this.correctAnswerOptions = [];
    this.correctMessage = '';
    this.explanationText = '';
    this.timerService.stopTimer();
    this.timerService.resetTimer();
  }

  resetQuestions() {
    this.quizData = JSON.parse(JSON.stringify(QUIZ_DATA));
  }
}
