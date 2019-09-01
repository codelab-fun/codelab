import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormService } from '../form.service';
import { Observable } from 'rxjs';
import { Post } from '../form/form.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'codelab-feed',
  templateUrl: './feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  posts$: Observable<Post[]>;

  constructor(private formService: FormService) {
    this.posts$ = this.formService.repo$.snapshotChanges()
      .pipe(map(items => {
        return items.map(a => {
          return {
            ...a.payload.val(),
            key: a.payload.key
          };
        }).reverse();
      }));
  }
}
