import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'codelab-question-container',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() answer: string;
  @Input() formGroup: FormGroup;
  @Output() question: QuizQuestion;
  totalQuestions: number;
  completionTime: number;
  correctAnswersCount = 0;
  selectedOption: number;
  questionID = 0;
  currentQuestion = 0;
  questionIndex: number;
  correctAnswer: boolean;
  hasAnswer: boolean;
  disabled: boolean;
  quizIsOver: boolean;
  progressValue: number;
  timeLeft: number;
  timePerQuestion = 20;
  interval: any;
  elapsedTime: number;
  elapsedTimes = [];
  blueBorder = '2px solid #007aff';

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
      this.setindex(+params.get('index'));  // get the question ID and store it
      this.question = this.getQuestion;
    });
  }

  ngOnInit() {
    this.question = this.getQuestion;
    this.totalQuestions = this.allQuestions.length;
    this.timeLeft = this.timePerQuestion;
    this.progressValue = 100 * (this.currentQuestion + 1) / this.totalQuestions;
    this.countdown();
  }

  displayNextQuestion() {
    this.resetTimer();
    this.increaseProgressValue();

    this.questionIndex = this.questionID++;

    if (typeof document.getElementById('question') !== 'undefined' && this.getindex() <= this.totalQuestions) {
      document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex]['questionText'];
      document.getElementById('question').style.border = this.blueBorder;
    } else {
      this.navigateToResults();
    }
  }

  navigateToNextQuestion(): void {
    this.router.navigate(['/question', this.getindex() + 1]);
    this.displayNextQuestion();
  }

  navigateToResults(): void {
    this.router.navigate(['/results'], { state:
      {
        totalQuestions: this.totalQuestions,
        correctAnswersCount: this.correctAnswersCount,
        completionTime: this.completionTime,
        allQuestions: this.allQuestions
      }
    });
  }

  // checks whether the question is valid and is answered correctly
  checkIfAnsweredCorrectly() {
    if (this.isThereAnotherQuestion() && this.isCorrectAnswer()) {
      this.correctAnswer = true;
      this.hasAnswer = true;
      this.disabled = false;
      this.incrementCorrectAnswersCount();
      this.addElapsedTime();
      this.quizDelay(3000);

      if (this.getindex() < this.totalQuestions) {
        this.navigateToNextQuestion();
      } else {
        this.navigateToResults();
      }
    }
  }

  addElapsedTime() {
    this.elapsedTime = Math.ceil(this.timePerQuestion - this.timeLeft);
    if (this.getindex() < this.totalQuestions) {
      this.elapsedTimes = [...this.elapsedTimes, this.elapsedTime];
    } else {
      this.elapsedTimes = [...this.elapsedTimes, 0];
    }
    this.completionTime = this.calculateTotalElapsedTime(this.elapsedTimes);
  }

  incrementCorrectAnswersCount() {
    if (this.questionID <= this.totalQuestions && this.isCorrectAnswer()) {
      if (this.correctAnswersCount === this.totalQuestions) {
        return this.correctAnswersCount;
      } else {
        this.correctAnswer = true;
        this.hasAnswer = true;
        return this.correctAnswersCount++;
      }
    } else {
      this.correctAnswer = false;
      this.hasAnswer = false;
    }
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getindex() + 1) / this.totalQuestions).toFixed(1));
  }

  calculateTotalElapsedTime(elapsedTimes) {
    return this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

  /****************  public API  ***************/
  getindex() {
    return this.questionID;
  }

  setindex(id: number) {
    return this.questionID = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID <= this.allQuestions.length;
  }

  isFinalQuestion(): boolean {
    return this.currentQuestion === this.totalQuestions;
  }

  isCorrectAnswer(): boolean {
    return this.selectedOption === this.question.answer;
  }

  get getQuestion(): QuizQuestion {
    return this.allQuestions.filter(
      question => question.index === this.questionID
    )[0];
  }

  // countdown clock
  private countdown() {
    if (this.questionID <= this.totalQuestions) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.checkIfAnsweredCorrectly();

          if (this.correctAnswersCount <= this.totalQuestions) {
            this.calculateTotalElapsedTime(this.elapsedTimes);
          }
          if (this.timeLeft === 0 && !this.isFinalQuestion()) {
            this.navigateToNextQuestion();
          }
          if (this.timeLeft === 0 && this.isFinalQuestion()) {
            this.navigateToResults();
          }
          if (this.isFinalQuestion() && this.hasAnswer === true) {
            this.navigateToResults();
            this.quizIsOver = true;
          }

          // disable the next button until an option has been selected
          // this.selectedOption === '' ? this.disabled = true : this.disabled = false;
        }
      }, 1000);
    }
  }

  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
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
