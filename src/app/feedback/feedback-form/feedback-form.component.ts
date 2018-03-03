import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../message';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'slides-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  messages$: Observable<Message[]>;
  formGroup: FormGroup;
  statusMessage = '';
  error = false;

  constructor(private el: ViewContainerRef,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private feedbackService: FeedbackService,
              private router: Router) {
  }

  ngOnInit() {
    this.messages$ = this.feedbackService.getMessages(this.activatedRoute);
    this.formGroup = this.fb.group({
      comment: [localStorage[`feedback-${this.router.url}-comment`], Validators.required],
      name: [localStorage.getItem('userName') || '', Validators.required],
      email: [localStorage.getItem('userEmail') || '', []]
    });

    this.formGroup.valueChanges.debounceTime(500).subscribe((data) => {
      localStorage[`feedback-${this.router.url}-comment`] = data.comment;
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
    const el = document.body.querySelector('h1');
    return el ? el.innerHTML : '';
  }

}
