import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { QUIZ_DATA } from '../quiz';
import { Quiz } from '../models/quiz';
import { QuizQuestion } from '../models/QuizQuestion';
import { TimerService } from './timer.service';


@Injectable({ providedIn: 'root' })
export class QuizService {
  quizData: Quiz = { ...QUIZ_DATA };
  question: QuizQuestion;
  answer: number;
  explanation: string;

  public correctAnswersCount = new BehaviorSubject<number>(0);
  public correctAnswer$ = this.correctAnswersCount.asObservable();
  totalQuestions: number;
  completionTime: number;

  currentQuestionIndex = 1;
  finalAnswers = [];
  correctAnswerStr: string;
  correctAnswers = [];
  explanationOptions: string;
  explanationOptionsText: string;
  correctAnswerMessage: string;
  questionIndex = 0;

  constructor(private timerService: TimerService,
              private router: Router) {}

  getQuestions() {
    return { ...this.quizData };
  }

  resetAll() {
    this.correctAnswersCount.next(0);
    this.currentQuestionIndex = 1;
    this.correctAnswers = [];
    this.correctAnswerMessage = undefined;
  }

  addCorrectIndexesToCorrectAnswerOptionsArray(optionIndex: number): void {
    if (this.question && optionIndex &&
        this.question.options && this.question.options[optionIndex]['correct'] === true) {
      this.correctAnswers = [...this.correctAnswers, optionIndex + 1];
    } else {
      console.log('else');
    }
  }

  setExplanationOptionsAndCorrectAnswerMessages(correctAnswers) {
    // this.question = this.getQuestion;
    if (this.question) {
      this.explanation = ' is correct because ' + this.question.explanation + '.';
    }

    if (this.correctAnswers && this.correctAnswers.length === 1 &&
      correctAnswers && correctAnswers.length > 0) {
      const correctAnswersText = correctAnswers[0];
      this.explanationOptionsText = 'Option ' + correctAnswersText + this.explanation;
      this.correctAnswerMessage = 'The correct answer is Option ' + correctAnswers[0] + '.';
    }

    if (this.correctAnswers && this.correctAnswers.length > 1 &&
      correctAnswers && correctAnswers.length > 0) {
      if (correctAnswers[0] && correctAnswers[1]) {
        const correctAnswersText = correctAnswers[0].concat(
          ' and ',
          correctAnswers[1]
        );
        this.explanationOptionsText = 'Options ' + correctAnswersText + this.explanation;
        this.correctAnswerMessage = 'The correct answers are Options ' + correctAnswersText + '.';
      }
      if (correctAnswers[0] && correctAnswers[1] && correctAnswers[2]) {
        const correctAnswersText = correctAnswers[0].concat(
          ', ',
          correctAnswers[1],
          ' and ',
          correctAnswers[2]
        );
        this.explanationOptionsText = 'Options ' + correctAnswersText + this.explanation + '.';
        this.correctAnswerMessage = 'The correct answers are Options ' + correctAnswersText + '.';
      }
      if (correctAnswers[0] && correctAnswers[1] && correctAnswers[2] && correctAnswers[3]) {
        const correctAnswersText = correctAnswers[0].concat(
          ', ',
          correctAnswers[1],
          ', ',
          correctAnswers[2],
          ' and ',
          correctAnswers[3]
        );
        this.explanationOptionsText = 'Options ' + correctAnswersText + this.explanation;
        this.correctAnswerMessage = 'The correct answers are Options ' + correctAnswersText + '.';
      }
    }
  }

  addFinalAnswerToFinalAnswers() {
    this.finalAnswers = [...this.finalAnswers, this.answer];
  }

  /*
 *  public API for service
 */
  getQuiz() {
    return this.quizData;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionIndex <= this.numberOfQuestions();
  }

  /* getQuestionIndex() {
    return this.questionIndex;
  }

  setQuestionIndex(idx: number) {
    return (this.questionIndex = idx);
  }

  isThereAnotherQuestion(): boolean {
    return this.questionIndex <= this.numberOfQuestions();
  }

   get getQuestion(): QuizQuestion {
    return this.quizData.questions[this.questionIndex];
  }
   */

  numberOfQuestions() {
    if (this.quizData && this.quizData.questions) {
      return this.quizData.questions.length;
    } else {
      return 0;
    }
  }


  // if the question has a single answer, use mat-radio-button in the form, else use mat-checkbox in the form
  getQuestionType(): boolean {
    return (this.correctAnswers && this.correctAnswers.length === 1);
  }

  isFinalQuestion() {
    return this.quizData.questions.length === this.currentQuestionIndex;
  }

  nextQuestion() {
    let questionIndex = this.currentQuestionIndex + 1;
    this.router.navigate(['/quiz/question', questionIndex]);
  }

  navigateToResults() {
    this.router.navigate(['/results'], {
      state: {
        questions: this.quizData,
        results: {
          correctAnswers: this.correctAnswers,
          completionTime: 20
          // totalQuestions: this.totalQuestions,
          // correctAnswersCount: this.correctAnswers ? this.correctAnswers.length : 0
        }
      }
    });
  }
}
