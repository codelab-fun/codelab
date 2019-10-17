import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Post } from './common';
import { database } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  repo$: AngularFireList<Post> = this.database.list('/posts', ref => {
    return ref.orderByChild('hidden').equalTo(null);
  });

  constructor(private database: AngularFireDatabase) {}

  getPostById(id: string) {
    return this.database.object(`posts/${id}`);
  }

  removePost(id: string) {
    return this.getPostById(id).remove();
  }

  updatePost(id: string, post: Partial<Post>) {
    return this.getPostById(id).update(post);
  }

  addPost(post: Post): any {
    return this.repo$.push({
      ...post,
      date: database.ServerValue.TIMESTAMP as string
    });
  }

  getPost(id: string): Observable<any> {
    return this.getPostById(id).valueChanges();
  }
}
