import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms'
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


@Component({
  selector: 'codelab-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  myform: FormGroup;
  title: FormControl;
  text: FormControl;
  date: Date;
  endpoint: String;

  constructor() { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.endpoint = '';
  }

  createFormControls() {
    this.title = new FormControl('', Validators.required);
    this.text = new FormControl('', Validators.required);

  }

  createForm() {
    this.myform = new FormGroup({
      title: this.title,
      text: this.text
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log('Form Submitted!');
      this.myform.reset();
    }
  }

}
