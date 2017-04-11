import {Component, Input} from '@angular/core';
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

  constructor(private router: Router){}
  private generatedSlideId = 0;

  generateSlideId() {
    return this.generatedSlideId++;
  }

  get totalSlides() {
    return this.generatedSlideId;
  }

  nextSlide() {
    if (this.activeSlideId + 1 < this.generatedSlideId) {
      this.router.navigate(['/', ++this.activeSlideId]);
    }
  }

  previousSlide() {
    if (this.activeSlideId > 0) {
      this.router.navigate(['/', --this.activeSlideId]);
    }
  }
}
