import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { Observable } from 'rxjs';
import { Post } from '../form/form.component';
import { map } from 'rxjs/operators';


@Component({
  selector: 'codelab-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private formService: FormService) {
    // this.posts$ = this.formService.repo$.valueChanges();
    this.posts$ = this.formService.repo$.snapshotChanges()
      .pipe(map(items => {
        return items.map(a => {
          return {
            ...a.payload.val(),
            key: a.payload.key
          };
        }).reverse();
      }));
    // this.posts$ = this.posts$.reverse();
    // this.posts$.subscribe(() => {
    //   debugger;
    // });
  }

  revert() {

  }

  ngOnInit() {
  }

}
