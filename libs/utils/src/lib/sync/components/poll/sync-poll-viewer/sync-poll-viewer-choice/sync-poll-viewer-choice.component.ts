import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LETTERS } from '../../common/common';

@Component({
  selector: 'codelab-sync-poll-viewer-choice',
  templateUrl: './sync-poll-viewer-choice.component.html',
  styleUrls: ['./sync-poll-viewer-choice.component.css']
})
export class SyncPollViewerChoiceComponent {
  readonly LETTERS = LETTERS;
  @Input() myVote: number;
  @Input() options: string[];
  @Input() enabled = true;
  @Output() vote = new EventEmitter<number | null>();
}
