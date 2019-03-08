import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

export interface Post {
  title: string;
  author: string;
  text: string;
  date: any;
}

@Component({
  selector: 'codelab-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myform: FormGroup;
  title: FormControl;
  author: FormControl;
  text: FormControl;
  date: Date;
  endpoint: string;
  // post: Post;
  post: Observable<Post>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.endpoint = '';
  }

  createFormControls() {
    this.title = new FormControl('', Validators.required);
    this.author = new FormControl('', Validators.required);
    this.text = new FormControl('', Validators.required);

  }

  createForm() {
    this.myform = new FormGroup({
      title: this.title,
      author: this.author,
      text: this.text
    });
  }

  createpost() {
    const data: Post  = {
      title: this.title, 
      author: this.author, 
      text: this.text, 
      date: Date.now()
    };
    this.post =  this.http.post(this.endpoint + '/posts', data);
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log('Form Submitted!');
      this.myform.reset();
    }
  }

}
