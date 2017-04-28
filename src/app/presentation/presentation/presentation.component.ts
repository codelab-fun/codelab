import {
  Component,
  EventEmitter,
  Input,
  Output
  } from '@angular/core';
import { Router } from '@angular/router';

export interface SlideConfig {
  resize: boolean;
  shortcuts: boolean;
}
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  @Input() activeSlideIndex = 0;
  @Input() public width = 1280;
  @Input() public height = 720;
  @Input() public zoom = 1;
  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSlideAdded = new EventEmitter<{ index: number, id: string}>();
  areShortcutsEnabled = true;

  private generatedSlideIndex = 0;

  registerSlide(id: string) {
    const index = this.generatedSlideIndex++;
    this.onSlideAdded.emit({index, id});
    return index;
  }

  get totalSlides() {
    return this.generatedSlideIndex;
  }

  nextSlide(isTriggeredByShortcut: boolean = false) {
    if ((this.activeSlideIndex + 1 < this.generatedSlideIndex) && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
      this.enableShortcuts();
      this.activeSlideIndex++;
      this.onSlideChange.next(this.activeSlideIndex);
    }
  }

  previousSlide(isTriggeredByShortcut: boolean = false) {
    if ((this.activeSlideIndex > 0) && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
      this.enableShortcuts();
      this.activeSlideIndex--;
      this.onSlideChange.next(this.activeSlideIndex);
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
