import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Message } from './message';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FeedbackService {
  private repo$: FirebaseListObservable<any>;

  constructor(private database: AngularFireDatabase,
              private router: Router) {
    this.repo$ = this.database.list('/feedback');
  }

  // Get a stream of messages filtered by href (of a message)
  getMessages(activatedRoute: ActivatedRoute): Observable<Message[]> {
    const stream$ = this.repo$
      .switchMap((results: Message[]) =>
        Observable.of(results.filter(m => m.href === this.router.url).filter(m => !m.isDone).sort())
      );
    return activatedRoute.url.switchMap(urls => stream$);
  }

  addMessage(name: string, email: string, comment: string, header?: string): any {
    const message = {
      name,
      email,
      comment,
      header,
      timestamp: new Date().toUTCString(),
      href: this.router.url
    };
    return this.repo$.push(message);
  }
}
