import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../message';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  messages$: Observable<Message[]>;
  formGroup: FormGroup;
  statusMessage = '';
  error = false;

  constructor(
    private el: ViewContainerRef,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private feedbackService: FeedbackService) {
  }

  ngOnInit() {
    this.messages$ = this.feedbackService.getMessages(this.activatedRoute);
    this.formGroup = this.fb.group({
      comment: ['', Validators.required],
      name: [localStorage.getItem('userName') || '', Validators.required],
      email: [localStorage.getItem('userEmail') || '', []]
    });
  }

  submit() {
    const formValues: any = this.formGroup.getRawValue();
    // TODO: Consider storing in firebase instead?
    localStorage.setItem('userName', formValues.name);
    localStorage.setItem('userEmail', formValues.email);
    this.feedbackService.addMessage(formValues.name, formValues.email, formValues.comment, this.getHeaderText())
      .then(() => {
        // Reset comment field
        this.formGroup.get('comment').reset();
      }).catch(() => {
        this.statusMessage = 'Error while sending feedback';
        this.error = true;
      });
  }

  private getHeaderText(): string {
    // const el = this.el.element.nativeElement.querySelector('h1:not([style*="display:none"]');
    // return el ? el.innerHTML : '';
    return '';
  }

}
