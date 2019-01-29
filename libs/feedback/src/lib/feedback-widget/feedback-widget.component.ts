import { ActivatedRoute } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Message } from '../message';
import { Observable } from 'rxjs';

function findMatchingDOMAncestor(element) {
  while (element.parentNode) {
    if (
      element.className &&
      element.className.indexOf('feedback-container') >= 0
    ) {
      return true;
    }
    element = element.parentNode;
  }
}

@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {
  messages$: Observable<Message[]>;
  open: boolean;

  constructor(
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.messages$ = this.feedbackService.getMessages(this.activatedRoute);
  }

  @HostListener('window:mousedown', ['$event'])
  handleDialogClose(event: MouseEvent) {
    // TODO: Move out to a directive and optimize this
    const belongsToPopup =
      event.target && findMatchingDOMAncestor(event.target);
    if (!belongsToPopup) {
      this.open = false;
    }
  }

  buttonClicked() {
    this.open = !this.open;
  }
}
