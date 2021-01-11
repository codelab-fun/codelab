import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
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
  selectedSlide = 0;

  constructor(readonly route: ActivatedRoute, readonly router: Router) {
    route.paramMap.subscribe(a => {
      this.selectedSlide = Number((a as any)?.params?.id) || 0;
    });
  }

  @HostListener('keydown.arrowdown')
  nextSlide() {
    const next = this.selectedSlide + 1;
    if (next < this.slides.length) {
      this.router.navigate(['admin', 'content', 'a', next]);
    }
  }

  @HostListener('keydown.arrowup')
  prevSlide() {
    const next = this.selectedSlide - 1;
    if (next >= 0) {
      this.router.navigate(['admin', 'content', 'a', next]);
    }
  }

  ngOnInit(): void {}
}
