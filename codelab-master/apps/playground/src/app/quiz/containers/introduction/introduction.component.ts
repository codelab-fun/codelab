import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Quiz } from '@codelab-quiz/shared/models/';
import { QuizService } from '@codelab-quiz/shared/services/*';

@Component({
  selector: 'codelab-quiz-intro',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
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
    if ($event.checked === true) {
      this.quizService.setChecked($event.checked);
    }
  }
}
