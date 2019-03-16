import { Component, OnInit } from '@angular/core';
import { FormService } from '../form.service';
import { Observable } from 'rxjs';
import { Post } from '../form/form.component';

@Component({
  selector: 'codelab-lent',
  templateUrl: './lent.component.html',
  styleUrls: ['./lent.component.scss']
})
export class LentComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(
    private formService: FormService,
    // private activatedRoute: ActivatedRoute,
    // private router: Router
    ) {
      this.posts$ = this.formService.repo$.valueChanges();
     }

  ngOnInit() {
  }

}
