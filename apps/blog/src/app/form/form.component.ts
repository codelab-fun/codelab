import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';
import { Router } from '@angular/router';

export interface Post {
  key?: string;
  title: string;
  author: string;
  text: string;
  date: string;
  hidden: boolean;
}

@Component({
  selector: 'codelab-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

  title = new FormControl('', Validators.required);
  author = new FormControl('', Validators.required);
  text = new FormControl('', Validators.required);
  date: Date;
  post: Observable<Post>;
  myform = new FormGroup({
    title: this.title,
    author: this.author,
    text: this.text
  });
  statusMessage = '';
  error = false;

  constructor(private http: HttpClient,
              private formService: FormService,
              private router: Router
  ) { }

  onSubmit() {
    const formValues: any = this.myform.getRawValue();
    this.formService
      .addPost(
        formValues
      )
      .then((result) => {
        this.myform.reset();
        console.log(result);
        const key = result.key;
        this.router.navigateByUrl(`post/${key}`);
      })
      .catch(() => {
        this.statusMessage = 'Error';
        this.error = true;
      });
  }
}
