import { Component, Input, OnInit } from '@angular/core';
import { ContentSlide, SlideViewType } from '../../types';

@Component({
  selector: 'slides-slide-preview',
  templateUrl: './slide-preview.component.html',
  styleUrls: [
    './slide-preview.component.css',
    '../../../../shared/slide-styles.scss'
  ]
})
export class SlidePreviewComponent {
  @Input() slide!: ContentSlide;
  @Input() mode: SlideViewType = 'preview';
}
