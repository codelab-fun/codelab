import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Post } from './form/form.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  repo$: AngularFireList<Post> = this.database.list('/posts');

  constructor(
    private database: AngularFireDatabase) {
  }

  addPost(
    post: Post
  ): any {
    const newpost: Post = {
      ...post,
      date: new Date().toUTCString()
    };
    return this.repo$.push(newpost);
  }

  getPost(id: string): Observable<any> {
    return this.database.object(`/posts/${id}`).valueChanges();
  }
}
