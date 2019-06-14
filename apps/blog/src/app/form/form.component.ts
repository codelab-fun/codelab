import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../form.service';

export interface Post {
  key?: string;
  title: string;
  author: string;
  text: string;
  date: string;
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
              private formService: FormService
  ) { }

  onSubmit() {
    const formValues: any = this.myform.getRawValue();
    this.formService
      .addPost(
        formValues
      )
      .then(() => {
        this.myform.reset();
      })
      .catch(() => {
        this.statusMessage = 'Error';
        this.error = true;
      });
  }
}
