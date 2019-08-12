import { Component, Input, OnInit } from '@angular/core';
import { SyncService } from '@codelab/utils/src/lib/sync/sync.service';
import { LoginService } from '@codelab/firebase-login';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'firebase';
import { SyncDataService } from '@codelab/utils/src/lib/sync/sync-data.service';

@Component({
  selector: 'slides-sync-playground-presenter',
  templateUrl: './sync-playground-presenter.component.html',
  styleUrls: ['./sync-playground-presenter.component.css'],
  providers: [
    SyncService,
    SyncDataService,
    {
      provide: LoginService,
      useFactory: () => ({
        uid$: new BehaviorSubject<string>(''),
        user$: new BehaviorSubject<any>({})
      })
    },
  ]
})
export class SyncPlaygroundPresenterComponent implements OnInit {
  @Input() userId;

  constructor(private readonly  loginService: LoginService) {
  }

  ngOnInit() {
    (this.loginService.user$ as Subject<User>).next({
      uid: this.userId,
      displayName: 'lol'
    } as User);

    (this.loginService.uid$ as Subject<string>).next(this.userId);
  }
}
