import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Message } from '../message';
import { Observable } from 'rxjs';

@Component({
  selector: 'slides-feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {

  messages$: Observable<Message[]>;
  open: boolean;

  constructor(private feedbackService: FeedbackService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.messages$ = this.feedbackService.getMessages(this.activatedRoute);
  }

  @HostListener('window:mousedown')
  handleDialogClose() {
    // TODO: Move out to a directive
    function findMatchingDOMAncestor(element) {
      while (element.parentNode) {
        if (element.className && element.className.indexOf('feedback-container') >= 0) {
          return true;
        }
        element = element.parentNode;
      }
    }

    const belongsToPopup = event.srcElement && findMatchingDOMAncestor(event.srcElement);
    if (!belongsToPopup) {
      this.open = false;
    }
  }

  buttonClicked() {
    this.open = !this.open;
  }

}
