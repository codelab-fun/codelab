import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../common';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'codelab-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  post$: Observable<Post>;
  key: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.key = this.route.snapshot.params['id'];
    this.post$ = this.postService.getPost(this.key);
  }
}
