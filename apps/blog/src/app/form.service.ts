import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

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

  getPost(id: string): Observable<any> {
    console.log(id);
    return this.database.object(`/posts/${id}`).valueChanges();
  }
}
