import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Post } from './form/form.component';
import { Observable } from 'rxjs';
import { getRef } from '@angular/fire/database/utils';
import { map, switchMap } from 'rxjs/operators';


function normalize(feedback: Array<any>) {
  return feedback.map(item => ({
    ...(item.payload && item.payload.val()),
    key: item.key
  }));
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  repo$: AngularFireList<any> = this.database.list('/posts');

  constructor(
    private database: AngularFireDatabase,
    private router: Router) {  }

  getPosts(activatedRoute: ActivatedRoute): Observable<Post[]> {
    return activatedRoute.url.pipe(
      map(() => this.router.url),
      switchMap(url => {
        return this.database
          .list('/posts', ref => ref.orderByChild('href').equalTo(url))
          .snapshotChanges()
          .pipe(map(normalize));
      }),
      map((items: Post[]) => items)
    );
  }

  addPost(
    title: string,
    author: string,
    text: string
    ): any {
      const post = {
        title,
        author,
        text,
        date: new Date().toUTCString(),
        href: this.router.url
      };

      return this.repo$.push(post);
  }
}
