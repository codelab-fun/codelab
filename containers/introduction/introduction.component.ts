<<<<<<< HEAD
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quiz } from '@codelab-quiz/shared/models/';
import { QuizService } from '@codelab-quiz/shared/services/*';
=======
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QUIZ_DATA } from '@codelab-quiz/shared/quiz-data';
import { Quiz } from '@codelab-quiz/shared/models/Quiz.model';
import { QuizService } from '@codelab-quiz/shared/services/quiz.service';

>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6

@Component({
  selector: 'codelab-quiz-intro',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
<<<<<<< HEAD
export class IntroductionComponent implements OnInit {
  quizzes$: Observable<Quiz[]>;
  quizName$: Observable<string>;
  imagePath = "assets/images/milestones/";

  constructor(
    private quizService: QuizService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.quizzes$ = this.quizService.getQuizzes();
    this.quizName$ = this.activatedRoute.url.pipe(
      map((segments) => segments[1].toString())
    );
  }

  onChange($event): void {
=======
export class IntroductionComponent implements OnInit, OnDestroy {
  quizData: Quiz[] = JSON.parse(JSON.stringify(QUIZ_DATA));
  quizName: String = '';
  private unsubscribe$ = new Subject<void>();

  constructor(private quizService: QuizService,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url
      .pipe(takeUntil(this.unsubscribe$))
        .subscribe(segments => {
          this.quizName = segments[1].toString();
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChange($event) {
>>>>>>> 035150f6244b14c2b94304c0793372e3f9d745f6
    if ($event.checked === true) {
      this.quizService.setChecked($event.checked);
    }
  }
}
