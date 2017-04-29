import {Component, Input, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PresentationService} from './presentation.service'

export interface SlideConfig {
  resize: boolean,
  shortcuts: boolean
}
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  @Input() activeSlideId : number = 0;
  @Input() public width = 1280;
  @Input() public height = 720;
  @Input() public zoom = 1;
  @Output() onSlideChange = new EventEmitter<number>();
  areShortcutsEnabled = true;

  private generatedSlideId = 0;
  private currentIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private presentationService: PresentationService) {}

  get totalSlides() {
    return this.generatedSlideId;
  }

  registerSlide(milestone?) {
    if (milestone) {
      return this.presentationService.getSetMilestoneSlides()[0];
    }
    return this.generatedSlideId++;
  }

  getNextSlideId() {
    let slides = this.presentationService.getSetMilestoneSlides();

    if (this.currentIndex >= slides.length) {
      this.currentIndex = 0;
    }
    return this.presentationService.getSetMilestoneSlides()[this.currentIndex]
  }

  nextSlide(isTriggeredByShortcut: boolean = false) {
    let milestone = this.route.snapshot.params['milestone'];

    if (milestone) {
      this.currentIndex++;
      this.activeSlideId = this.getNextSlideId();
      this.onSlideChange.next(this.activeSlideId);
    }
    else if ((this.activeSlideId + 1 < this.generatedSlideId) && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
      this.enableShortcuts();
      this.activeSlideId++;
      this.onSlideChange.next(this.activeSlideId);
    }
  }

  previousSlide(isTriggeredByShortcut: boolean = false) {
    if ((this.activeSlideId > 0) && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
      this.enableShortcuts();
      this.activeSlideId--;
      this.onSlideChange.next(this.activeSlideId);
    }
  }

  disableShortcuts() {
    this.areShortcutsEnabled = false;
  }

  enableShortcuts() {
    this.areShortcutsEnabled = true;
  }

  disableResize() {
    // TODO
  }
}
