import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Howl } from 'howler';

import { QUIZ_DATA } from '@quiz-data';
import { Quiz } from '@shared/models/Quiz.model';
import { QuizQuestion } from '@shared/models/QuizQuestion.model';
import { TimerService } from '@shared/services/timer.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizData: Quiz = JSON.parse(JSON.stringify(QUIZ_DATA));
  formGroup: FormGroup;
  question: QuizQuestion;
  answer: number;
  totalQuestions: number;
  currentQuestionIndex = 1;
  correctAnswersForEachQuestion = [];
  correctAnswers = [];
  userAnswers = [];
  numberOfCorrectOptions: number;
  correctAnswerOptions: number[] = [];
  correctOptions: string;
  explanation: string;
  explanationText: string;
  correctMessage: string;
  hasAnswer: boolean;
  correctAnswersCountSubject = new BehaviorSubject<number>(0);

  correctSound = new Howl({
    src: 'http://www.marvinrusinek.com/sound-correct.mp3',
    html5: true
  });
  incorrectSound = new Howl({
    src: 'http://www.marvinrusinek.com/sound-incorrect.mp3',
    html5: true
  });


  constructor(
    private timerService: TimerService,
    private router: Router
  ) {
    this.totalQuestions = this.numberOfQuestions();
    this.hasAnswer = true;
  }

  resetAll() {
    this.answer = null;
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

  getCorrectAnswers(question: QuizQuestion) {
    const identifiedCorrectAnswers = question.options.filter(item => item.correct);
    this.correctAnswerOptions = identifiedCorrectAnswers.map(option => question.options.indexOf(option) + 1);
    this.numberOfCorrectOptions = identifiedCorrectAnswers.length;

    this.correctAnswersForEachQuestion.push(this.correctAnswerOptions);
    this.correctAnswers.push(this.correctAnswersForEachQuestion);
    this.setExplanationAndCorrectAnswerMessages(this.correctAnswersForEachQuestion.sort());

    return identifiedCorrectAnswers;
  }

  setExplanationAndCorrectAnswerMessages(correctAnswers: number[]): void {
    this.question = this.getQuestions().questions[this.currentQuestionIndex - 1];
    this.hasAnswer = true;
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
      this.correctOptions = correctAnswers[0][0].toString().concat(', ', correctAnswers[0][1],
                                                                   ' and ', correctAnswers[0][2]);
      this.explanationText = 'Options ' + this.correctOptions + this.explanation;
      this.correctMessage = 'The correct answers were Options ' + this.correctOptions + '.';
    }
    if (correctAnswers[0][0] && correctAnswers[0][1] && correctAnswers[0][2] && correctAnswers[0][3]) {
      this.explanationText = 'All were correct!';
      this.correctMessage = 'All were correct!';
    }
  }

  /*
   * public API
   */
  getQuestions() {
    return { ...this.quizData };
  }

  numberOfQuestions(): number {
    if (this.quizData && this.quizData.questions) {
      return this.quizData.questions.length;
    } else {
      return 0;
    }
  }

  previousQuestion() {
    this.router.navigate(['/quiz/question', this.currentQuestionIndex - 1]).then();
    this.resetAll();
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    const questionIndex = this.currentQuestionIndex;
    this.router.navigate(['/quiz/question', questionIndex]).then();
    this.resetAll();
    this.timerService.resetTimer();
  }

  navigateToResults() {
    this.router.navigate(['/quiz/results']).then();
  }

  sendCorrectCountToResults(value: number): void {
    this.correctAnswersCountSubject.next(value);
  }
}
