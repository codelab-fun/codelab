import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../form/form.component';
import { FormService } from '../form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'codelab-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePostComponent {
 @Input() post: Post;
 @Input() full: boolean;
}
