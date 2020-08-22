import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Howl } from 'howler';

import { QUIZ_DATA } from '@codelab-quiz/shared/quiz-data';
import { Option } from '@codelab-quiz/shared/models/Option.model';
import { Quiz } from '@codelab-quiz/shared/models/Quiz.model';
import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  question: QuizQuestion;
  questions: QuizQuestion[];
  answers: number[];
  multipleAnswer: boolean;
  totalQuestions: number;
  totalQuestionsAttempted: number;
  currentQuestionIndex = 1;

  quizId: string;
  startedQuizId: string;
  continueQuizId: string;
  completedQuizId: string;
  indexOfQuizId: number;
  quizCompleted: boolean;
  status: string;

  correctAnswers = [];
  correctAnswersForEachQuestion = [];
  correctAnswerOptions: number[] = [];
  numberOfCorrectAnswers: number;
  numberOfCorrectAnswersArray = [];
  correctAnswersCountSubject = new BehaviorSubject<number>(0);

  userAnswers = [];
  previousUserAnswers = [];
  previousUserAnswersTextSingleAnswer = [];
  previousUserAnswersTextMultipleAnswer = [];

  explanation: string;
  explanationText: string;
  correctOptions: string;
  correctMessage: string;

  // hasAnswer: boolean;
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
    // this.hasAnswer = true;
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

  // randomize questions array in-place using Durstenfeld shuffle algorithm
  shuffledQuestions(questions: QuizQuestion[]): void {
    for (let i = questions.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  }

  // randomize answers array in-place using Durstenfeld shuffle algorithm
  shuffledAnswers(answers: Option[]): void {
    for (let i = answers.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
  }

  // set the text of the previous answers in an array to show in the following quiz
  setPreviousUserAnswersText(previousAnswers, questions: QuizQuestion[]): void {
    for (let i = 0; i < previousAnswers.length; i++) {
      if (previousAnswers[i].length === 1) {
        const previousAnswersString = questions[i].options[previousAnswers[i] - 1].text;
        this.previousUserAnswersTextSingleAnswer.push(previousAnswersString);
      }
      if (previousAnswers[i].length > 1) {
        const previousAnswerOptionsInnerArray = previousAnswers[i].slice();
        for (let j = 0; j < previousAnswerOptionsInnerArray.length; j++) {
          const previousAnswersInnerString = questions[i].options[previousAnswerOptionsInnerArray[j] - 1].text;
          this.previousUserAnswersTextMultipleAnswer.push(previousAnswersInnerString);
        }
      }
    }
  }

  setQuizStatus(status: string): void {
    this.status = status;
  }

  setQuizId(quizId: string): void {
    this.quizId = quizId;
  }

  setStartedQuizId(quizId: string) {
    this.startedQuizId = quizId;
  }

  setContinueQuizId(quizId: string) {
    this.continueQuizId = quizId;
  }

  setCompletedQuizId(quizId: string) {
    this.completedQuizId = quizId;
  }

  setQuestion(question: QuizQuestion): void {
    this.question = question;
  }

  setQuestions(questions: QuizQuestion[]): void {
    this.questions = questions;
  }

  setTotalQuestions(totalQuestions: number): void {
    this.totalQuestions = totalQuestions;
  }

  setTotalQuestionsAttempted(totalQuestionsAttempted: number): void {
    this.totalQuestionsAttempted = totalQuestionsAttempted;
  }

  setUserAnswers(previousAnswers: []): void {
    this.previousUserAnswers = previousAnswers;
  }

  setChecked(checked: boolean): void {
    this.checkedShuffle = checked;
  }

  setMultipleAnswer(multipleAnswer: boolean): void {
    this.multipleAnswer = multipleAnswer;
  }

  sendCorrectCountToResults(value: number): void {
    this.correctAnswersCountSubject.next(value);
  }

  setIsAnswered(isAnswered: boolean): void {
    this.isAnswered = isAnswered;
  }

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

  resetAll() {
    this.answers = null;
    // this.hasAnswer = false;
    this.correctAnswersForEachQuestion = [];
    this.correctAnswerOptions = [];
    this.correctOptions = '';
    this.correctMessage = '';
    this.explanationText = '';
    this.currentQuestionIndex = 0;
    this.timerService.stopTimer();
    this.timerService.resetTimer();
  }

  resetQuestions() {
    this.quizData = JSON.parse(JSON.stringify(QUIZ_DATA));
  }
}
