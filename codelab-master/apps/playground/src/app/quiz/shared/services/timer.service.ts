import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timePerQuestion = 20;
  elapsedTime = 0;
  elapsedTimes: number[] = [];
  completionTime: number;

  timer: Observable<number>;
  isStart = new BehaviorSubject<number>(1);
  isStop = new BehaviorSubject<number>(1);
  isReset = new BehaviorSubject<number>(1);
  isTimerStart = false;

  stopTimer(): void {
    if (!this.isTimerStart) {
      return;
    }
    this.isTimerStart = false;
    this.timePerQuestion = 0;
    this.isStop.next(1);
    this.elapsedTimes.push(this.elapsedTime);
  }

  resetTimer(): void {
    if (!this.isTimerStart) {
      this.isTimerStart = true;
      this.isStart.next(1);
    }
    this.isTimerStart = true;
    this.isReset.next(1);
  }

  setElapsed(time: number): void {
    this.elapsedTime = time;
  }

  calculateTotalElapsedTime(elapsedTimes: number[]): number {
    if (elapsedTimes?.length > 0) {
      this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
      return this.completionTime;
    }
  }
}
