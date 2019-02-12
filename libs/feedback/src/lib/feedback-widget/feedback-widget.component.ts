import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { Message } from '../message';
import { Observable } from 'rxjs';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FeedbackContentComponent } from '@codelab/feedback/src/lib/feedback-content/feedback-content.component';


@Component({
  selector: 'feedback-widget',
  templateUrl: './feedback-widget.component.html',
  styleUrls: ['./feedback-widget.component.css']
})
export class FeedbackWidgetComponent implements OnInit {

  messages$: Observable<Message[]>;

  constructor(
    private overlay: Overlay,
    private el: ElementRef,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.messages$ = this.feedbackService.getMessages(this.activatedRoute);
  }

  open() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.el).withPositions([
        {
          originX: 'center',
          overlayX: 'center',
          originY: 'top',
          overlayY: 'bottom',
        },
      ]);
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(FeedbackContentComponent);

    overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
  }

}
