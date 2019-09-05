import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Post } from './form/form.component';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  all$: AngularFireList<Post> = this.database.list('/posts');
  repo$: AngularFireList<Post> = this.database.list('/posts', (ref) => {
    return ref.orderByChild('hidden').equalTo(null);
  });

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
