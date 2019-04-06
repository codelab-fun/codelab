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

    getPreview(text) {
      const sentences = text.split('.').slice(0, 3);
      let s = 0;
      for (let i = 0; i < sentences.length; i++) {
        s += sentences[i].length;
      }
      const limit = 200;
      const a = [];
      a.push(s);
      a.push(text.indexOf('<'));
      a.push(limit);
      a.push(text.length);
      a.sort();
      console.log(a);
      let i = 0; while (a[i] < 0) {i++; }
      const p = a[i];
      console.log(p);
      return text.substring(0, p) + '...';
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
      preview: this.getPreview(text),
      date: new Date().toUTCString()
    };
    // console.log(this.getPreview(text));
    return this.repo$.push(post);
  }
}
