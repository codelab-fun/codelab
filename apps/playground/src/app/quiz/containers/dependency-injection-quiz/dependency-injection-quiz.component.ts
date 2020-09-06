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
