import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LETTERS } from '../../common/common';
import { UserVote } from '../../common/sync-poll.service';

@Component({
  selector: 'codelab-choice-presenter',
  templateUrl: './choice-presenter.component.html',
  styleUrls: ['./choice-presenter.component.css'],
})
export class ChoicePresenterComponent implements OnChanges {
  @Input() options: string[];
  @Input() answer: string;
  @Input() answerIndex: number;
  @Input() votes: { [key: string]: UserVote };

  breakdown: { [key: string]: number };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('votes' in changes) {
      const startMap = this.options
        .map((a, i) => LETTERS[i])
        .reduce((r, k) => {
          r[k] = 0;
          return r;
        }, {});

      this.breakdown = Object.values(this.votes || {}).reduce(
        (result, response) => {
          const value = response.answer;
          result[LETTERS[value]] = (result[LETTERS[value]] || 0) + 1;
          return result;
        },
        startMap
      );
    }
  }
}
