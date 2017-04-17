import {Component, Input} from '@angular/core';

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
  @Input() activeSlideId = 0;
  @Input() public width = 1280;
  @Input() public height = 720;
  @Input() public zoom = 1;
  areShortcutsEnabled = true;
  generatedSlideId = 0;

  registerSlide() {
    return this.generatedSlideId++;
  }

  get totalSlides() {
    return this.generatedSlideId;
  }

  nextSlide(isTriggeredByShortcut: boolean = false) {
    if ((this.areShortcutsEnabled && isTriggeredByShortcut) || this.activeSlideId + 1 < this.generatedSlideId) {
      this.activeSlideId++;
    }
  }

  previousSlide(isTriggeredByShortcut: boolean = false) {
    if ((this.areShortcutsEnabled && isTriggeredByShortcut) || this.activeSlideId > 0) {
      this.activeSlideId--;
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
