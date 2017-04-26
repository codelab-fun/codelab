import {
  Component,
  EventEmitter,
  Input,
  Output
  } from '@angular/core';
import { Router } from '@angular/router';

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
  @Output() onSlideAdded = new EventEmitter<{ index: number, id: string}>();
  areShortcutsEnabled = true;

  private generatedSlideId = 0;

  registerSlide(id:string) {
    const index = this.generatedSlideId++;
    this.onSlideAdded.emit({index, id});
    return index;
  }

  get totalSlides() {
    return this.generatedSlideId;
  }

  nextSlide(isTriggeredByShortcut: boolean = false) {
    if ((this.activeSlideId + 1 < this.generatedSlideId) && (this.areShortcutsEnabled || !isTriggeredByShortcut)) {
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
