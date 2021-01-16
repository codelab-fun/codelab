import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

<<<<<<< HEAD
import { Option, QuizQuestion } from '@codelab-quiz/shared/models/';
import { QuizService, TimerService } from '@codelab-quiz/shared/services/*';


@Component({
  selector: "codelab-quiz-question",
  templateUrl: "./question.component.html",
=======
import { QuizQuestion } from '@codelab-quiz/shared/models/QuizQuestion.model';
import { QuizService } from '@codelab-quiz/shared/services/quiz.service';
import { TimerService } from '@codelab-quiz/shared/services/timer.service';


@Component({
  selector: 'codelab-quiz-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizQuestionComponent implements OnInit, OnChanges {
  currentQuestion: QuizQuestion;
  @Output() answer = new EventEmitter<number>();
<<<<<<< HEAD
  @Input() question: QuizQuestion;
  formGroup: FormGroup;
  optionSelected: Option;
  correctAnswers: Option[] = [];
  quizStarted: boolean;
  alreadyAnswered = false;
  multipleAnswer: boolean;
=======
  @Input() set question(value: QuizQuestion) { this.currentQuestion = value; }
  formGroup: FormGroup;
  quizStarted: boolean;
  multipleAnswer: boolean;
  alreadyAnswered = false;
  isAnswered: boolean;
  isCorrectAnswerSelected = false;
  correctAnswers = [];
  correctMessage = '';
  previousUserAnswers: any[] = [];
  previousUserAnswersText = [];
  puaTextSingleAnswer: string[] = [];
  puaTextMultipleAnswer: string[] = [];
  // get puaTextSingleAnswer(): string[] { return this.quizService.previousUserAnswersTextSingleAnswer; }
  // get puaTextMultipleAnswer(): string[] { return this.quizService.previousUserAnswersTextMultipleAnswer; }
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6

  constructor(
    private quizService: QuizService,
    private timerService: TimerService
  ) { }

<<<<<<< HEAD
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      answer: new FormControl(["", Validators.required])
    });

    this.question = this.currentQuestion;
    this.sendCurrentQuestionToQuizService();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.question &&
      changes.question.currentValue !== changes.question.firstChange
    ) {
      this.currentQuestion = changes.question.currentValue;
      this.correctAnswers = this.quizService.getCorrectAnswers(this.currentQuestion);
      this.multipleAnswer = this.correctAnswers.length > 1;

      if (this.formGroup) {
        this.formGroup.patchValue({ answer: "" });
=======
  ngOnInit() {
    this.formGroup = new FormGroup({
      answer: new FormControl(['', Validators.required])
    });

    this.previousUserAnswers = this.quizService.userAnswers;
    console.log('QUESTIONCOMP: ', this.previousUserAnswers);

    this.isAnswered = this.quizService.isAnswered;  // am I using this here?
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue !== changes.question.firstChange) {
      this.currentQuestion = changes.question.currentValue;
      this.correctAnswers = this.quizService.getCorrectAnswers(this.currentQuestion);
      this.multipleAnswer = this.correctAnswers.length > 1;
      this.sendMultipleAnswerToQuizService();

      if (this.formGroup) {
        this.formGroup.patchValue({answer: ''});
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
        this.alreadyAnswered = false;
      }
    }
  }

<<<<<<< HEAD
  setSelected(optionIndex: number): void {
    this.quizStarted = true;
    this.alreadyAnswered = true;
    this.answer.emit(optionIndex);

    if (this.correctAnswers.length === 1) {
      this.currentQuestion.options.forEach(option => {
        option.selected = false;
        option.className = "";
      });
    }
    this.currentQuestion.options[optionIndex].selected = true;
    this.optionSelected = this.currentQuestion.options[optionIndex];
=======
  private sendMultipleAnswerToQuizService(): void {
    this.quizService.setMultipleAnswer(this.multipleAnswer);
  }

  isCorrect(correct: boolean, optionIndex: number): boolean {
    return correct === this.currentQuestion.options[optionIndex].correct;
  }

  setSelected(optionIndex: number): void {
    this.quizStarted = true;
    this.correctMessage = this.quizService.correctMessage;
    this.isCorrectAnswerSelected = this.isCorrect(this.currentQuestion.options[optionIndex].correct, optionIndex);
    this.answer.emit(optionIndex);

    if (this.correctAnswers.length === 1) {
      this.currentQuestion.options.forEach((option) => option.selected = false);
    }
    this.currentQuestion.options[optionIndex].selected = true;
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6

    if (
      optionIndex >= 0 &&
      this.currentQuestion &&
      this.currentQuestion.options &&
<<<<<<< HEAD
      this.currentQuestion.options[optionIndex]["correct"]
    ) {
      this.optionSelected.className = "correct";
=======
      this.currentQuestion.options[optionIndex]['correct']
    ) {
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
      this.timerService.stopTimer();
      this.quizService.correctSound.play();
      optionIndex = null;
    } else {
<<<<<<< HEAD
      this.optionSelected.className = "incorrect";
      this.quizService.incorrectSound.play();
    }
  }

  private sendCurrentQuestionToQuizService(): void {
    this.quizService.setCurrentQuestion(this.currentQuestion);
=======
      this.quizService.incorrectSound.play();
    }
    this.alreadyAnswered = true;
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
  }
}
