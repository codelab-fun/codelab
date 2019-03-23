import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { Observable } from 'rxjs';
import { Post } from '../form/form.component';

@Component({
  selector: 'codelab-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(
    private formService: FormService
  ) {
    this.posts$ = this.formService.repo$.valueChanges();
  }

  ngOnInit() {
  }

}
