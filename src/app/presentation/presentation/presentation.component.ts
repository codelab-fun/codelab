import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  @Input() displayShortcuts = true;
  @Input() activeSlideId : number = 0;
  @Input() public width = 1280;
  @Input() public height = 720;
  @Input() public zoom = 1;
  @Output() onSlideChange = new EventEmitter<number>();

  private generatedSlideId = 0;

  generateSlideId() {
    return this.generatedSlideId++;
  }

  get totalSlides() {
    return this.generatedSlideId;
  }

  nextSlide() {
    if (this.activeSlideId + 1 < this.generatedSlideId) {
      this.activeSlideId++;
      this.onSlideChange.next(this.activeSlideId);
    }
  }

  previousSlide() {
    if (this.activeSlideId > 0) {
      this.activeSlideId--;
      this.onSlideChange.next(this.activeSlideId);
    }
  }
}
