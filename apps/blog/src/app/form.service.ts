import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Post } from './form/form.component';
import { Observable } from 'rxjs';
import { getRef } from '@angular/fire/database/utils';
import { map, switchMap } from 'rxjs/operators';


function normalize(posts: Array<any>) {
  return posts.map(item => ({
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
    private router: Router) { }

  addPost(
    title: string,
    author: string,
    text: string
  ): any {
    const post = {
      title,
      author,
      text,
      date: new Date().toUTCString()
    };
    return this.repo$.push(post);
  }
}
