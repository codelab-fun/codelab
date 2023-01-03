import { Component, Input } from '@angular/core';
import { ContentSlide, SlideViewType } from '../../presentation-editor/types';

@Component({
  selector: 'slides-slide-preview',
  templateUrl: './slide-preview.component.html',
  styleUrls: [
    './slide-preview.component.css',
    '../../../../../shared/slide-styles.scss',
  ],
})
export class SlidePreviewComponent {
  @Input() slide!: ContentSlide;
  @Input() mode: SlideViewType = 'preview';
}
