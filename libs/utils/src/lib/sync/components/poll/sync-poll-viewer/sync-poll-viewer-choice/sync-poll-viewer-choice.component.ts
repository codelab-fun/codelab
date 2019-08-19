import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'slides-sync-poll-viewer-choice',
  templateUrl: './sync-poll-viewer-choice.component.html',
  styleUrls: ['./sync-poll-viewer-choice.component.css']
})
export class SyncPollViewerChoiceComponent implements OnInit {
  @Input() myVote: string;
  @Input() answers: string[];
  @Output() vote = new EventEmitter<string | null>();

  constructor() {
  }

  ngOnInit() {
  }

}
