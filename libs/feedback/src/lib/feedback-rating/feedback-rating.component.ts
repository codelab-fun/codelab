import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'feedback-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback-rating.component.html',
  styleUrls: ['./feedback-rating.component.css']
})
export class FeedbackRatingComponent implements OnInit, AfterViewInit {
  @Input() showSummary = false;
  @Input() lesson = '';
  ratings$: Observable<any[]>;
  ratingsClass = 'ratings ratingshidden';
  rateSelected = -1;
  rates = [
    {
      src: 'ng-smile.svg',
      value: '"perfect',
      text: 'Perfect!'
    },
    {
      src: 'ng-ok.svg',
      value: 'good',
      text: 'Good'
    },
    {
      src: 'ng-soso.svg',
      value: 'soso',
      text: 'Ok'
    },
    {
      src: 'ng-sleepy.svg',
      value: 'hopedformore',
      text: 'Hoped for more!'
    }
  ];

  constructor(
    private ref: ChangeDetectorRef,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.ratings$ = this.feedbackService.getRatings();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ratingsClass = 'ratings slideup';
      // TODO: work on animation process
      this.ref.markForCheck();
    }, 1000);
  }

  rateClass(option: number) {
    let className = '';
    if (option === this.rateSelected) {
      className = 'rateselected';
    }
    return 'rate ' + className;
  }

  selectRate(option: number) {
    this.rateSelected = option;
    this.ratingsClass = 'ratings slidedown';
    this.feedbackService.addRating(this.lesson, this.rates[option].value);
  }
}
