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
  @Output() totalQuestions: number;
  @Output() correctAnswersCount = 0;
  @Output() percentage = 0;
  @Output() completionTime: number;

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

  @Output() allQuestions: QuizQuestion[] = [
    {
      questionId: 1,
      questionText: 'What is the objective of dependency injection?',
      options: [
        { optionValue: '1', optionText: 'Pass the service to the client.' },
        { optionValue: '2', optionText: 'Allow the client to find service.' },
        { optionValue: '3', optionText: 'Allow the client to build service.' },
        { optionValue: '4', optionText: 'Give the client part service.' }
      ],
      answer: '1',
      explanation: 'a service gets passed to the client during DI',
      selectedOption: ''
    },
    {
      questionId: 2,
      questionText: 'Which of the following benefit from dependency injection?',
      options: [
        { optionValue: '1', optionText: 'Programming' },
        { optionValue: '2', optionText: 'Testability' },
        { optionValue: '3', optionText: 'Software design' },
        { optionValue: '4', optionText: 'All of the above.' },
      ],
      answer: '4',
      explanation: 'DI simplifies both programming and testing as well as being a popular design pattern',
      selectedOption: ''
    },
    {
      questionId: 3,
      questionText: 'Which of the following is the first step in setting up dependency injection?',
      options: [
        { optionValue: '1', optionText: 'Require in the component.' },
        { optionValue: '2', optionText: 'Provide in the module.' },
        { optionValue: '3', optionText: 'Mark dependency as @Injectable().' },
        { optionValue: '4', optionText: 'Declare an object.' }
      ],
      answer: '3',
      explanation: 'the first step is marking the class as @Injectable()',
      selectedOption: ''
    },
    {
      questionId: 4,
      questionText: 'In which of the following does dependency injection occur?',
      options: [
        { optionValue: '1', optionText: '@Injectable()' },
        { optionValue: '2', optionText: 'constructor' },
        { optionValue: '3', optionText: 'function' },
        { optionValue: '4', optionText: 'NgModule' },
      ],
      answer: '2',
      explanation: 'object instantiations are taken care of by the constructor in Angular',
      selectedOption: ''
    }/* ,
    {
      questionId: 5,
      questionText: 'Which access modifier is typically used in DI to make a service accessible within a class?',
      options: [
        { optionValue: '1', optionText: 'public' },
        { optionValue: '2', optionText: 'protected' },
        { optionValue: '3', optionText: 'private' },
        { optionValue: '4', optionText: 'static' },
      ],
      answer: '3',
      explanation: 'the private keyword indicates to Angular that the service is accessible across the class',
      selectedOption: ''
    },
    {
      questionId: 6,
      questionText: 'How does Angular know that a service is available?',
      options: [
        { optionValue: '1', optionText: 'If listed in the constructor.' },
        { optionValue: '2', optionText: 'If listed in the providers section of NgModule.' },
        { optionValue: '3', optionText: 'If the service is declared as an interface.' },
        { optionValue: '4', optionText: 'If the service is lazy-loaded.' },
      ],
      answer: '2',
      explanation: 'Angular looks at the providers section of NgModule to locate services that are available',
      selectedOption: ''
    },
    {
      questionId: 7,
      questionText: 'How does Angular avoid conflicts caused by using hardcoded strings as tokens?',
      options: [
        { optionValue: '1', optionText: 'Use an InjectionToken class' },
        { optionValue: '2', optionText: 'Use @Inject()' },
        { optionValue: '3', optionText: 'Use useFactory' },
        { optionValue: '4', optionText: 'Use useValue' },
      ],
      answer: '1',
      explanation: 'an InjectionToken class is preferable to using strings',
      selectedOption: ''
    },
    {
      questionId: 8,
      questionText: 'Which is the preferred method for getting necessary data from a backend?',
      options: [
        { optionValue: '1', optionText: 'HttpClient' },
        { optionValue: '2', optionText: 'WebSocket' },
        { optionValue: '3', optionText: 'NgRx' },
        { optionValue: '4', optionText: 'JSON' }
      ],
      answer: '1',
      explanation: 'a server makes an HTTP request using the HttpClient service',
      selectedOption: ''
    },
    {
      questionId: 9,
      questionText: 'In which of the following can Angular use services?',
      options: [
        { optionValue: '1', optionText: 'Lazy-loaded modules' },
        { optionValue: '2', optionText: 'Eagerly loaded modules' },
        { optionValue: '3', optionText: 'Feature modules' },
        { optionValue: '4', optionText: 'All of the above.' },
      ],
      answer: '4',
      explanation: 'Angular can utilize services with any of these methods',
      selectedOption: ''
    },
    {
      questionId: 10,
      questionText: 'Which of the following is true concerning dependency injection?',
      options: [
        { optionValue: '1', optionText: 'It is a software design pattern.' },
        { optionValue: '2', optionText: 'Injectors form a hierarchy.' },
        { optionValue: '3', optionText: 'Providers register objects for future injection.' },
        { optionValue: '4', optionText: 'All of the above.' }
      ],
      answer: '4',
      explanation: 'all of these are correct statements about dependency injection',
      selectedOption: ''
    } */
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.setQuestionID(+params.get('questionId'));  // get the question ID and store it
      this.question = this.getQuestion;
    });
  }

  ngOnInit() {
    this.question = this.getQuestion;
    this.totalQuestions = this.allQuestions.length;
    this.timeLeft = this.timePerQuestion;
    this.progressValue = 100 * (this.currentQuestion + 1) / this.totalQuestions;
    this.countDown();
  }

  displayNextQuestion() {
    this.resetTimer();
    this.increaseProgressValue();
    this.questionIndex = this.questionID++;

    if (typeof document.getElementById('question') !== 'undefined') {
      document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex]['questionText'];
      document.getElementById('question').style.border = this.blueBorder;
    }
  }

  navigateToNextQuestion(): void {
    if (this.isThereAnotherQuestion()) {
      this.currentQuestion++;
      this.router.navigate(['/quiz/question', this.getQuestionID() + 1]);
      this.displayNextQuestion();
    }
  }

  navigateToResults(): void {
    this.router.navigateByUrl('/quiz/results');   // todo: pass data here!
  }

  // increase the correct answer count when the correct answer is selected
  incrementCorrectAnswersCount() {
    if (this.question && this.question.selectedOption === this.question.answer) {
      this.correctAnswersCount++;
      this.correctAnswer = true;
      this.hasAnswer = true;
    } else {
      this.correctAnswer = false;
      this.hasAnswer = false;
    }
  }

  // checks whether the question is a valid question and is answered correctly
  checkIfAnsweredCorrectly(): void {
    if (this.isThereAnotherQuestion() && this.question.selectedOption === this.question.answer) {
      this.correctAnswer = true;
      this.hasAnswer = true;
      this.incrementCorrectAnswersCount();
      this.disabled = false;
      this.elapsedTime = Math.floor(this.timePerQuestion - this.timeLeft);
      this.elapsedTimes.push(this.elapsedTime);
      this.quizDelay(3000);
      this.navigateToNextQuestion();
    }
  }

  // increase the progress value when the user presses the next button
  increaseProgressValue() {
    this.progressValue = 100 * (this.getQuestionID() + 1) / this.totalQuestions;
  }

  // determine the percentage from amount of correct answers given and the total number of questions
  calculateQuizPercentage() {
    this.percentage = 100 * this.correctAnswersCount / this.totalQuestions;
  }

  /****************  public API  ***************/
  getQuestionID() {
    return this.questionID;
  }

  setQuestionID(id: number) {
    return this.questionID = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID <= this.allQuestions.length;
  }

  get getQuestion(): QuizQuestion {
    return this.allQuestions.filter(
      question => question.questionId === this.questionID
    )[0];
  }

  // countdown timer
  private countDown() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

        // disable the next button until an option has been selected
        if (typeof this.question !== 'undefined') {
          this.question.selectedOption === '' ? this.disabled = true : this.disabled = false;
        }

        this.checkIfAnsweredCorrectly();
        this.calculateQuizPercentage();
        this.calculateTotalElapsedTime(this.elapsedTimes);

        // check if the timer is expired and if the question is less than the last question
        if (this.timeLeft === 0 && this.question && this.currentQuestion < this.totalQuestions) {
          this.navigateToNextQuestion();
        }

        // check if the last question has been answered
        if (this.question && this.currentQuestion === this.totalQuestions && this.hasAnswer === true) {
          this.question.questionId = this.totalQuestions;
          this.router.navigateByUrl('/quiz/results');
          this.quizIsOver = true;
        }

        // check if the timer is expired and if the question is the last question
        if (this.timeLeft === 0 && this.question && this.currentQuestion === this.totalQuestions) {
          this.question.questionId = this.totalQuestions;
          this.router.navigateByUrl('/quiz/results');
          this.quizIsOver = true;
        }
      }
    }, 1000);
  }

  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }

  private calculateTotalElapsedTime(elapsedTimes) {
    this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
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
