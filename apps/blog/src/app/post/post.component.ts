import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../form/form.component';
import { FormService } from '../form.service';
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

  constructor(private formService: FormService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.post$ = this.formService.getPost(this.route.snapshot.params['id']);
  }
}
