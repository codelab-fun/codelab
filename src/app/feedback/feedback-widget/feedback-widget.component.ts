import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { FeedbackService } from './../feedback.service';
import { Message } from '../message';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {

  messages$: Observable<Message[]>;
  open: boolean;

  constructor(
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.messages$ = this.feedbackService.getMessages(this.activatedRoute);
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

}
