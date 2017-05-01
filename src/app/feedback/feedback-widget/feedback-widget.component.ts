import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Message} from '../message';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit, OnDestroy {
  repoSubscription: Subscription;
  messages: Array<Message> = [];


  statusMessage = '';
  error = false;
  open: boolean;

  formGroup: FormGroup;
  repo$: FirebaseListObservable<any>;

  constructor(private database: AngularFireDatabase,
              private el: ElementRef,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.repo$ = this.database.list('/feedback');

    this.repoSubscription = combineLatest(this.activatedRoute.url, this.repo$)
      .map(([_, messages]) => {
        return (messages as Array<Message>)
          .filter(m => m.href.toLowerCase() === this.router.url.toLowerCase()).sort();
        }
      ).subscribe(messages => this.messages = messages);
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      comment: ['', Validators.required],
      name: [localStorage.getItem('userName') || '', Validators.required],
      email: [localStorage.getItem('userEmail') || '', []]
    });
  }

  ngOnDestroy() {
    this.repoSubscription.unsubscribe();
  }

  @HostListener('window:mousedown')
  handleDialogClose() {
    // TODO: Move out to a directive
    const belongsToPopup = event['path'].some(item =>
      item.className && item.className.includes('feedback-container')
    );
    if (!belongsToPopup) {
      this.open = false;
    }
  }

  buttonClicked() {
    this.open = !this.open;
  }

  submit() {
    const message: Message = this.formGroup.getRawValue();
    message.href = this.router.url;
    message.timestamp = new Date().toUTCString();
    message.header = this.getHeaderText();

    // TODO: Consider storing in firebase instead?
    localStorage.setItem('userName', message.name);
    localStorage.setItem('userEmail', message.email);
    this.repo$.push(message)
      .then(() => {
        this.formGroup.get('comment').reset();
      }).catch(() => {
      this.statusMessage = 'Error while sending feedback';
      this.error = true;
    });
  }

  private getHeaderText(): string {
    const el = this.el.nativeElement.querySelector('h1:not([style*="display:none"]');
    return el ? el.innerHTML : '';
  }
}
