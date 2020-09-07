import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { Post } from '../common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'codelab-feed',
  templateUrl: './feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
    this.posts$ = this.postService.repo$.snapshotChanges().pipe(
      map(items => {
        return items
          .map(a => {
            return {
              ...a.payload.val(),
              key: a.payload.key
            };
          })
          .reverse();
      })
    );
  }
}
