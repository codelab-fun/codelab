import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';

interface StreamGuest {
  name: string;
  twitter: string;
  avatar: string;
}

export interface StreamSession {
  topic: string;
  guests: [];
}

@Component({
  selector: 'slides-overlay-config',
  templateUrl: './overlay-config.component.html',
  styleUrls: ['./overlay-config.component.css']
})
export class OverlayConfigComponent implements OnInit {
  readonly list = this.db.list<StreamSession>('kirjs/streaming/sessions');
  readonly sessionKey = new BehaviorSubject<string>('-LvXjhMXMb6J9D6mnwss');

  readonly sessions$ = this.list.snapshotChanges().pipe(
    map(snapshot => {
      return snapshot.map(a => {
        return {
          ...a.payload.val(),
          key: a.key
        };
      });
    })
  );

  readonly selectedSession$ = combineLatest([
    this.sessions$,
    this.sessionKey
  ]).pipe(
    map(([sessions, key]) => {
      return sessions[key];
    })
  );

  constructor(readonly db: AngularFireDatabase) {}

  ngOnInit() {}
}
