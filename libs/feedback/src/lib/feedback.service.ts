import { Event, NavigationEnd, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { getRef } from '@angular/fire/database/utils';
import { Message } from './message';
import { defer, Observable, of } from 'rxjs';
import {
  filter,
  map,
  publishReplay,
  refCount,
  repeatWhen,
  switchMap
} from 'rxjs/operators';

function normalize(feedback: Array<any>) {
  return feedback.map(item => ({
    ...(item.payload && item.payload.val()),
    key: item.key
  }));
}

@Injectable()
export class FeedbackService {
  private repo$: AngularFireList<any>;
  private ratings$: AngularFireList<any>;

  constructor(private database: AngularFireDatabase, private router: Router) {
    this.repo$ = this.database.list('/feedback');
    this.ratings$ = this.database.list('/ratings');
  }

  // Get a stream of messages filtered by href (of a message)
  getMessages(url: string): Observable<Message[]> {
    return this.database
      .list('/feedback', ref => ref.orderByChild('href').equalTo(url))
      .snapshotChanges()
      .pipe(
        map(normalize),
        map((items: Message[]) => items.filter(item => !item.isDone))
      );
  }

  getMessagesForCurrentPage(): Observable<Message[]> {
    const onNavigationEnd: Observable<Event> = this.router.events.pipe(
      filter(val => val instanceof NavigationEnd)
    );

    const url: Observable<string> = defer(() => of(this.router.url)).pipe(
      repeatWhen(() => onNavigationEnd)
    );

    return url.pipe(
      switchMap(url => this.getMessages(url)),
      publishReplay(1),
      refCount()
    );
  }

  addMessage(
    name: string,
    email: string,
    comment: string,
    header?: string
  ): any {
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

  getRatings(): Observable<any[]> {
    return this.ratings$.valueChanges();
  }

  addRating(lesson: string, rating: string) {
    const path = 'ratings/' + lesson;
    getRef(this.database.database, path).transaction(ratings => {
      if (ratings == null) {
        ratings = {
          lesson: lesson
        };
      }
      const count = ratings[rating] || 0;
      ratings[rating] = count + 1;
      return ratings;
    });
  }
}
