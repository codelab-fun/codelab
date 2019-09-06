import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Post } from './form/form.component';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    repo$: AngularFireList<Post> = this.database.list('/posts', (ref) => {
        return ref.orderByChild('hidden').equalTo(null);
      });

    constructor(
        private database: AngularFireDatabase) {
    }

    removePost(id: string) {
        return this.database.object(`posts/${id}`).remove();
    }

    updatePost(id: string, post: Partial<Post>) {
        return this.database.object(`posts/${id}`).update(post);
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
