import { AccessService, Permissions } from './../../../../../libs/firebase-login/src/lib/access.service';
import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../form/form.component';
import { FormService } from '../form.service';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

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
              private router: Router) {  }

 delete() {
    this.accessService.oldIsAdmin$.subscribe(console.log);
    console.log('id: ', this.key);
    this.post.hidden = true;
    this.postService
      .updatePost(this.key, this.post)
      .then((result) => {
        // debugger;
        // console.log('result: ', result);
        this.router.navigateByUrl(``);
      })
      .catch((err) => {
        console.log('ERR: ', err);
      });
 }
}
