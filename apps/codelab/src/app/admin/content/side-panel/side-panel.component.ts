import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Location } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'slides-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  @Input() slides;
  @Output() addSlide = new EventEmitter();
  @Output() reorder = new EventEmitter();
  @Output() updateSelectedSlideIndex = new EventEmitter();
  @Input() selectedSlide = 0;

  constructor(
    readonly location: Location,
    readonly route: ActivatedRoute,
    readonly router: Router
  ) {
    route.paramMap.subscribe(a => {
      this.selectedSlide = Number((a as any)?.params?.id) || 0;
    });
  }

  updateIndex(index: number) {
    if (index < this.slides.length && index >= 0) {
      this.updateSelectedSlideIndex.emit(index);
    }
  }

  @HostListener('keydown.arrowdown')
  nextSlide() {
    this.updateIndex(this.selectedSlide + 1);
  }

  @HostListener('keydown.arrowup')
  prevSlide() {
    this.updateIndex(this.selectedSlide - 1);
  }

  ngOnInit(): void {}
}
