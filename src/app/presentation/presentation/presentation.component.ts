import {
  Component,
  EventEmitter,
  Input,
  Output
  } from '@angular/core';
import { Mode } from './../mode.enum';
import { SlideComponent } from './../slide/slide.component';
import { Subscription } from 'rxjs/Subscription';

export interface SlideConfig {
  resize: boolean;
  shortcuts: boolean;
}

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent  {
  private generatedSlideIndex = 0;
  private activeMode:Mode = Mode.none;

  @Input() activeSlideIndex = 0;
  @Input() public width = 1280;
  @Input() public height = 720;
  @Input() public zoom = 1;

  @Output() onSlideChange = new EventEmitter<number>();
  @Output() onSlideAdded = new EventEmitter<{ index: number, id: string}>();
  @Output() onModeChange = new EventEmitter<Mode>();
  areShortcutsEnabled = true;
  // Expose enum to template
  modeEnum = Mode;
  
  get mode():Mode {
    return this.activeMode;
  }
  set mode(value:Mode)  {
    this.activeMode = value;
    this.onModeChange.next(value);
  }

  registerSlide(id: string) {
    const index = this.generatedSlideIndex++;
    this.onSlideAdded.next({index, id});
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
