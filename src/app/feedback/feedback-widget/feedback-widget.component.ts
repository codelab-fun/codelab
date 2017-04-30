<<<<<<< HEAD
import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {AngularFireModule, AuthProviders, AuthMethods, AngularFire, FirebaseListObservable} from 'angularfire2';

import {PresentationComponent} from "../../presentation/presentation/presentation.component";
import {Subscription} from "rxjs";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {Message} from "../message";
=======
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngularFire,
  AngularFireModule,
  AuthMethods,
  AuthProviders,
  FirebaseListObservable
  } from 'angularfire2';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from './../message';
import { Observable } from 'rxjs/Observable';
import { PresentationComponent } from '../../presentation/presentation/presentation.component';
import { Subscription } from 'rxjs/Subscription';

>>>>>>> master
@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit, OnDestroy {
  private isOpen: boolean;
  private initialized;
  private repoSubscription: Subscription;
  private routeSubscription: Subscription;

  statusMessage = '';
  error = false;
  formGroup: FormGroup;
  repo$: FirebaseListObservable<any>;
  items: Message;

<<<<<<< HEAD
=======
  formGroup: FormGroup;
  repo$: FirebaseListObservable<any>;
  items: Message;

>>>>>>> master
  set open(value: boolean) {
    this.isOpen = value;
    if (!this.repo$) {
      this.initData();
    }
  }
  get open(): boolean {
    return this.isOpen;
  }
  constructor(
    private angularFire: AngularFire,
    private el: ElementRef,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.url.subscribe(() => {
      if (this.initialized) {
        // Get new data for route
        this.repoSubscription.unsubscribe();
        this.initData();
      }
    });
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      comment: ['', Validators.required],
      name: ['', Validators.required],
<<<<<<< HEAD
      email: ['']
=======
      email: ['', [Validators.required, Validators.email]]
>>>>>>> master
    });
  }

  ngOnDestroy() {
    if (!!this.repoSubscription) {
      this.repoSubscription.unsubscribe();
    }
    this.routeSubscription.unsubscribe();
  }

  initData() {
    this.repo$ = this.angularFire.database.list('/feedback');
    // Get all feedback for this url, sorted by date, newest first
    this.repoSubscription = this.repo$.subscribe(values => {
      this.items = values.map(m => m as Message)
        .filter(m => m.href.toLowerCase() === this.router.url.toLowerCase())
        .sort((a, b) => a > b ? -1 : 1);
    });
    this.initialized = true;
  }

<<<<<<< HEAD
  buttonClicked(){
    this.open = !this.open;
    document.addEventListener('click', () => {
      const belongsToPopup = event['path'].some(item =>
        item.className && item.className.includes('feedback-container')
      );
      if(!belongsToPopup){
        this.open = false;
      }
    });
=======
  getWidth() {
    return this.open ? 25 : 100;
>>>>>>> master
  }

  submit() {
    const message: Message = this.formGroup.getRawValue();
    message.comment = this.htmlEscape(message.comment);
    message.href = this.router.url;
    message.timestamp = new Date().toUTCString();
    message.header = this.getHeaderText();
    this.repo$.push(message)
      .then(x => {
        this.formGroup.reset();
      }).catch(() => {
<<<<<<< HEAD
      this.statusMessage = 'Error while sending feedback';
      this.error = true;
    });
=======
        this.statusMessage = 'Error while sending feedback';
        this.error = true;
      });
>>>>>>> master
  }

  // This looks risky   -DF.
  private getHeaderText(): string {
    const el = document.body.querySelector('h1:not([style*="display:none"]');
    return !!el ? el.innerHTML : '';
  }

  private htmlEscape(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
