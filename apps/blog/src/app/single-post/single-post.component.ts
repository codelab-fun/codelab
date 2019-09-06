import { AccessService } from './../../../../../libs/firebase-login/src/lib/access.service';
import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../common';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'codelab-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePostComponent {
 @Input() post: Post;
 @Input() full: boolean;
 @Input() key = '';

  constructor
  (
    private postService: PostService,
    private accessService: AccessService,
    private router: Router,
    private snackBar: MatSnackBar) {  }

 delete() {
    this.accessService.oldIsAdmin$.subscribe();
    this.post.hidden = true;
    this.postService
      .updatePost(this.key, this.post)
      .then(() => {
        this.router.navigateByUrl(``);
      })
      .catch((err) => {
        this.snackBar.open(`ERR: ${err}`);
      });
  }
}
