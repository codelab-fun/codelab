import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Post } from './form/form.component';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    repo$: AngularFireList<Post> = this.database.list('/posts');

    constructor(
        private database: AngularFireDatabase) {
    }

    removePost(id: string) {
        // console.log(id);
        return this.database.object(`posts/${id}`).remove()
            .then(result => {
                console.log('done with ', result);
            });
    }

    updatePost(id: string, post: Partial<Post>) {
        return this.database.object(`posts/${id}`).update(post);
    }
}
