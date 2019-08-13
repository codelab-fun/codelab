import { Component } from '@angular/core';
import { SyncPollConfig } from '@codelab/utils/src/lib/sync/components/poll/common/common';

@Component({
  selector: 'slides-sync-survey',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent {
  readonly polls: SyncPollConfig[] = [
    {
      key: 'js',
      type: 'stars',
      question: 'How well do you know JavaScript',
    },
    {
      key: 'angularjs',
      type: 'stars',
      question: 'How well do you know AngularJS (Old version)',
    },
    {
      key: 'angularjs',
      type: 'stars',
      question: 'How well do you know Angular',
    }
  ];


}
