import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Message } from '../message';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AccessService } from '../../../../../apps/codelab/src/app/shared/services/access.service';

@Component({
  selector: 'feedback-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.scss']
})
export class FeedbackWidgetComponent implements OnInit, OnDestroy {
  messages$: Observable<Message[]>;

  formGroup: FormGroup;
  statusMessage = '';
  error = false;

  private readonly destroy = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly accessService: AccessService,
    private readonly feedbackService: FeedbackService,
    private readonly router: Router
  ) {
    this.messages$ = this.feedbackService.getMessagesForCurrentPage();
  }

  ngOnInit() {
    // TODO: Consider the possibility to transfer logic to it's service.
    let value = localStorage[`feedback-${this.router.url}-comment`] || '';
    value = value === 'null' ? '' : value;
    this.formGroup = this.fb.group({
      comment: [value, Validators.required],
      name: [localStorage.getItem('userName') || '', Validators.required],
      email: [localStorage.getItem('userEmail') || '', []]
    });

    this.formGroup.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy)
      )
      .subscribe(data => {
        localStorage[`feedback-${this.router.url}-comment`] = data.comment;
      });
  }

  submit() {
    const formValues: any = this.formGroup.getRawValue();
    localStorage.setItem('userName', formValues.name);
    localStorage.setItem('userEmail', formValues.email);

    this.feedbackService
      .addMessage(
        formValues.name,
        formValues.email,
        formValues.comment,
        this.getHeaderText()
      )
      .then(() => {
        this.formGroup.get('comment').reset();
      })
      .catch(() => {
        this.statusMessage = 'Error while sending feedback';
        this.error = true;
      });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  private getHeaderText(): string {
    const el = document.body.querySelector('h1');
    return el ? el.innerHTML : '';
  }
}
