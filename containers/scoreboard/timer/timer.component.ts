import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

import { QuizService } from '../../../services/quiz.service';
import { TimerService } from '../../../services/timer.service';


@Component({
  selector: 'codelab-scoreboard-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [QuizService, TimerService]
})
export class TimerComponent implements OnInit, OnChanges {
  answer;
  @Input() set selectedAnswer(value) {
    this.answer = value;
  }
  hasAnswer: boolean;

  interval;
  timeLeft: number;
  timePerQuestion = 20;
  elapsedTime: number;
  elapsedTimes: [];
  quizIsOver: boolean;

  constructor(private quizService: QuizService,
              private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.getLeftTime$.subscribe(data => {
      this.timeLeft = data;
    });
    this.timer();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedAnswer && changes.selectedAnswer.currentValue !== changes.selectedAnswer.firstChange) {
      this.answer = changes.selectedAnswer.currentValue;
    }
  }

  // countdown clock
  timer() {
    if (this.quizService.isThereAnotherQuestion()) {
      this.interval = setInterval(() => {
        this.quizTimerLogic();
      }, 1000);
      clearInterval();
    }
  }

  quizTimerLogic() {
    if (this.timeLeft > 0) {
      this.timeLeft--;

      if (this.answer) {
        this.hasAnswer = true;
        this.elapsedTime = Math.ceil(this.timePerQuestion - this.timeLeft);
        this.timerService.addElapsedTimeToElapsedTimes(this.elapsedTime);
        this.timerService.calculateTotalElapsedTime(this.elapsedTimes);
      }

      if (this.timeLeft === 0) {
        if (!this.quizService.isFinalQuestion()) {
          this.timerService.quizDelay(3000);
          this.quizService.nextQuestion();
        }
        if (this.quizService.isFinalQuestion() && this.hasAnswer === true) {
          this.quizService.navigateToResults();
          this.quizIsOver = true;
        }
        clearInterval(this.interval);
      }
    } else {
      this.timeLeft = this.timePerQuestion;
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
